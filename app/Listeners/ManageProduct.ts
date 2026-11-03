import Bag from "App/Models/Bag";
import Model from "App/Models/Model";
import Order from "App/Models/Order";
import Shared from "App/Helpers/Shared";
import Product from "App/Models/Product";

export default class ManageProduct {
  public async newProduct(payload) {
    const ids = await Shared.parents(payload.category_id);
    payload.product.related("categories").sync(ids);
    await payload.product.related("models").createMany(payload.models);
    await payload.product.load("models");
    payload.product.models.forEach((model) => {
      model.related("prices").create({price: model.price});
    });
  }

  public async updateProduct(payload) {
    const product = await Product.findOrFail(payload.id);
    await product.merge(payload).save();
    await product.load("models");
    let list: number[] = [];
    await Promise.all(payload.models.map(async (model) => {
      if (model.id) {
        const target = product.models.find((target) => target.id === model.id);
        list.push(target!.id);
        await target!.merge(model).save();
        const orders = await Order.query().where('state', 1)
        const ordersID = orders.map(order => order.id)
        const bags = await Bag.query().whereIn('order_id', ordersID).where('pid', product.id).where('model', model.name)
        await Promise.all(bags.map(async bag => {
          bag.max = target!.count
          bag.change = (parseInt(bag.price) - parseInt(target!.price)).toString()
          bag.price = target!.price
          bag.count = bag.count > target!.count ? target!.count : bag.count
          await bag.save()
        }))
      } else {
        const target = await product.related("models").create(model);
        list.push(target.id);
      }
    }))
    await Model.query().where('product_id', product.id).whereNotIn("id", list).delete()
    const models = await Model.query().whereIn("id", list)
    models.forEach((model) => {
      model.related("prices").create({price: model.price});
    });
  }

}
