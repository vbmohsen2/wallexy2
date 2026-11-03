import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Validation from "App/Helpers/Validation";
import Message from "App/Helpers/Message";
import Category from "App/Models/Category";
import Product from "App/Models/Product";
import Shared from "App/Helpers/Shared";
import FileSystem from "App/Helpers/FileSystem";


export default class CategoriesController {

  public async index({response}: HttpContextContract) {
    const categories = await Category.query().preload("children").where("parent_id", 0)
    return response.ok(categories);
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.category(),
      messages: Message.getMessage(),
    });
    const category = await Category.create(payload);
    return response.created(category);
  }

  public async show({request, response}: HttpContextContract) {
    return response.ok(await Shared.category(request, "id"));
  }

  public async slug({request, inertia}: HttpContextContract) {
    const category = await Shared.category(request, "slug")
    return inertia.render('category/show', {category});
  }

  public async update({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.category(),
      messages: Message.getMessage(),
    });
    const category = await Category.findOrFail(request.param("id"));
    const changed = category.parentId !== payload.parent_id
    await category.merge(payload).save();
    if (changed) {
      const products = await Product.query().where('category_id', category.id)
      const ids = await Shared.parents(category.id)
      await Promise.all(products.map(async product => await product.related('categories').sync(ids)))
    }
    return response.created(category);
  }

  public async destroy({request, response}: HttpContextContract) {
    const category = await Category.findOrFail(request.param("id"));
    await category.loadCount('children').loadCount('products')
    if (category.$extras.products_count > 0) return response.forbidden('این دسته بندی دارای محصول میباشد')
    if (category.$extras.children_count > 0) return response.forbidden('این دسته بندی دسته بندی ها زیر مجموعه دارد')
    await category.delete();
    return response.ok({id: category.id});
  }

  public async photo({request, response}: HttpContextContract) {
    const photo = request.file('photo')
    const category = await Category.findOrFail(request.param('category'))
    if (!photo) return response.internalServerError()
    await photo.moveToDisk('categories/' + FileSystem.getDate())
    await category.merge({photo: '/categories/' + FileSystem.getDate() + '/' + photo.fileName}).save()
    return response.ok(true)
  }

}
