import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import Validation from "App/Helpers/Validation"
import Message from "App/Helpers/Message"
import Product from "App/Models/Product"
import Model from "App/Models/Model"
import Favourite from "App/Models/Favourite"
import Comment from "App/Models/Comment"
import Event from "@ioc:Adonis/Core/Event"
import FileSystem from "App/Helpers/FileSystem"
import sharp from "sharp"
import Drive from "@ioc:Adonis/Core/Drive"
import Like from "App/Models/Like"
import Order from "App/Models/Order"
import Bag from "App/Models/Bag"
import Shared from "App/Helpers/Shared"

export default class ProductsController {

  public async index({request, response}: HttpContextContract) {
    const products = await Product.query().preload('models').preload('photo').whereIn('id', request.input('list').split(',').filter((el: string) => el !== '').map((el: string) => parseInt(el)))
    return response.ok(products)
  }

  public async create({request, inertia, response}: HttpContextContract) {
    if (!request.header('id')) return response.redirect('/')
    return inertia.render('product/create', {category: request.header('id')})
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.product(),
      messages: Message.getMessage(),
    })
    const product = await Product.create(payload)
    await Event.emit("new:product", {product, ...payload})
    return response.created({id: product.id, name: product.name})
  }

  public async slug({request, inertia}: HttpContextContract) {
    const product = await Shared.product(request, "slug")
    product.flag = !!request.header('category')
    return inertia.render('product/show', {product})
  }

  public async show({request, response}: HttpContextContract) {
    const product = await Shared.product(request, "id")
    product.flag = !!request.header('category')
    return response.ok(product)
  }

  public async edit({request, inertia}: HttpContextContract) {
    const product = await Product.query().preload('photos').preload('models').where('id', request.param('id')).firstOrFail()
    return inertia.render('product/edit', {product})
  }

  public async duplicate({request, inertia}: HttpContextContract) {
    const product = await Product.query().preload('photos').preload('models').where('id', request.param('pid')).firstOrFail()
    return inertia.render('product/duplicate', {product})
  }

  public async update({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.product(),
      messages: Message.getMessage(),
    })
    const product = await Product.findOrFail(request.param('id'))
    await Event.emit("update:product", {id: product.id, ...payload})
    return response.ok({done: "ok"})
  }

  public async destroy({request, response}: HttpContextContract) {
    const product = await Product.findOrFail(request.param("id"))
    await product.related("categories").sync([])
    await product.load('photos')
    await Promise.all(product.photos.map(async photo => {
      await Drive.delete(FileSystem.PATH + photo.path + photo.orginal)
      await Drive.delete(FileSystem.PATH + photo.path + photo.small)
      await Drive.delete(FileSystem.PATH + photo.path + photo.normal)
      await Drive.delete(FileSystem.PATH + photo.path + photo.large)
    }))
    await product.delete()
    return response.ok({done: "ok"})
  }

  public async model({request, response}: HttpContextContract) {
    const model = await Model.findOrFail(request.param("m"))
    await model.load('prices')
    return response.ok(model.prices)
  }

  public async description({request, response}: HttpContextContract) {
    const product = await Product.findOrFail(request.param("pid"))
    await product.merge({description: request.input("description")}).save()
    return response.ok({done: "ok"})
  }

  public async favourite({request, response, auth}: HttpContextContract) {
    const product = await Product.findOrFail(request.param("pid"))
    const user = await auth.use("web").user!
    const favourite = await Favourite.query()
      .where("user_id", user.id)
      .where("product_id", product.id)
      .first()
    if (favourite) {
      await favourite.delete()
      return response.ok({type: 0})
    } else {
      await product.related("favourites").create({userId: user.id})
      return response.ok({type: 1})
    }
  }

  public async heart({request, response, auth}: HttpContextContract) {
    const product = await Product.findOrFail(request.param("pid"))
    const user = await auth.use("web").user!
    const favourite = await Favourite.query()
      .where("user_id", user.id)
      .where("product_id", product.id)
      .first()
    if (favourite) {
      return response.ok({type: 1})
    } else {
      return response.noContent()
    }
  }

  public async comment({request, response, auth}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.comment(),
      messages: Message.getMessage(),
    })
    const user = await auth.use("web").user!
    const product = await Product.findOrFail(request.param("pid"))
    const hasComment = await Comment.query().where("user_id", user.id).where("product_id", product.id).first()
    if (hasComment) return response.forbidden()
    if (!user.firstName) return response.badRequest()
    const orders = await Order.query().where('user_id', user.id).where('state', '>', 2)
    const list = orders.map((order) => order.id)
    const bag = await Bag.query().whereIn('order_id', list).where('pid', product.id).first()
    const comment = await product.related("comments").create({...payload, userId: user.id})
    if (bag) await comment.merge({buyer: 1}).save()
    return response.ok({done: "ok"})
  }

  public async like({request, response, auth}: HttpContextContract) {
    const like = request.input("type") === "like"
    const comment = await Comment.findOrFail(request.param("cid"))
    const user = await auth.use("web").user!
    if (like) {
      const likeExist = await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("like").first()
      if (likeExist) {
        await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("like").delete()
        return response.ok({type: 1})
      } else {
        const dislikeExist = await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("dislike").first()
        if (dislikeExist) {
          await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("dislike").delete()
          await Like.create({userId: user.id, commentId: comment.id, like: 1,})
          return response.ok({type: 2})
        } else {
          await Like.create({userId: user.id, commentId: comment.id, like: 1,})
          return response.ok({type: 3})
        }
      }
    } else {
      const dislikeExist = await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("dislike").first()
      if (dislikeExist) {
        await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("dislike").delete()
        return response.ok({type: 1})
      } else {
        const likeExist = await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("like").first()
        if (likeExist) {
          await Like.query().where("user_id", user.id).where("comment_id", comment.id).whereNotNull("like").delete()
          await Like.create({userId: user.id, commentId: comment.id, dislike: 1})
          return response.ok({type: 2})
        } else {
          await Like.create({userId: user.id, commentId: comment.id, dislike: 1})
          return response.ok({type: 3})
        }
      }
    }
  }

  public async photos({request, response}) {
    const images = request.files("photos")
    const product = await Product.findOrFail(request.param("pid"))
    for (let image of images) {
      await image.moveToDisk("products/" + FileSystem.getDate())
      let photo = await sharp(image.filePath)
      await photo.metadata().then(async function (metadata) {
        return await photo
          .resize(metadata.width > metadata.height ? {width: 1200} : {height: 1200})
          .toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/orginal-" + image.fileName)
      })
      await sharp(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/orginal-" + image.fileName)
        .resize(750, 750).toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/lg-" + image.fileName)
      await sharp(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/lg-" + image.fileName)
        .resize(400, 400).toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/md-" + image.fileName)
      await sharp(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/md-" + image.fileName)
        .resize(100, 100).toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/sm-" + image.fileName)
      await product.related("photos").create({
        orginal: 'orginal-' + image.fileName,
        small: 'sm-' + image.fileName,
        normal: 'md-' + image.fileName,
        large: 'lg-' + image.fileName,
        path: "/products/" + FileSystem.getDate() + "/",
      })
      await Drive.delete(image.filePath)
    }
    return response.ok('id')
  }

  public async photo({request, response}) {
    const photo = request.file("photo")
    await photo.moveToDisk("products/" + FileSystem.getDate())
    let upload = await sharp(photo.filePath)
    await upload.metadata().then(async function (metadata) {
      return await upload
        .resize(metadata.width > metadata.height ? {width: 1200} : {height: 1200})
        .toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/orginal-" + photo.fileName)
    })
    await sharp(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/orginal-" + photo.fileName)
      .resize(750, 750).toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/lg-" + photo.fileName)
    await sharp(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/lg-" + photo.fileName)
      .resize(400, 400).toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/md-" + photo.fileName)
    await sharp(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/md-" + photo.fileName)
      .resize(100, 100).toFile(FileSystem.PATH + "/products/" + FileSystem.getDate() + "/sm-" + photo.fileName)
    await Drive.delete(photo.filePath)
    return response.ok({
      orginal: 'orginal-' + photo.fileName,
      small: 'sm-' + photo.fileName,
      normal: 'md-' + photo.fileName,
      large: 'lg-' + photo.fileName,
      path: "/products/" + FileSystem.getDate() + "/",
    })
  }

  public async delete({request, response}: HttpContextContract) {
    const product = await Product.findOrFail(request.param("pid"))
    await product.load("photo", q => q.where("id", request.param("id")))
    await Drive.delete(FileSystem.PATH + product.photo.path + product.photo.orginal)
    await Drive.delete(FileSystem.PATH + product.photo.path + product.photo.small)
    await Drive.delete(FileSystem.PATH + product.photo.path + product.photo.normal)
    await Drive.delete(FileSystem.PATH + product.photo.path + product.photo.large)
    await product.related("photos").query().where("id", request.param("id")).delete()
    return response.ok(true)
  }

}
