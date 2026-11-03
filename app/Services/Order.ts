import {DateTime} from "luxon";

export default class Order {
  public static async run(){
    const {default: Order} = await import('App/Models/Order')
    const {default: Product} = await import('App/Models/Product')
    const orders = await Order.query().preload('bags').where('state', 2).where('cancel_at', '<', DateTime.now().minus({seconds: 30}).toISO())
    orders.map(async order => {
      order.bags.map(async bag => {
        const product = await Product.find(bag.pid)
        if (!product) return
        await product.load('models')
        const model = product.models.find(model => model.name === bag.model)
        if (!model) return
        await model.merge({count: model.count + bag.count}).save()
      });
      order.state = 0
      await order.save()
    })
  }
}
