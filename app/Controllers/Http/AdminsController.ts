import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Limit from "App/Models/Limit";
import Comment from "App/Models/Comment";
import Order from "App/Models/Order";
import Notification from 'App/Models/Notification';
import Product from 'App/Models/Product';
import Category from 'App/Models/Category';
import {DateTime} from 'luxon';
import Slide from 'App/Models/Slide';
import Shared from "App/Helpers/Shared";
import Drive from "@ioc:Adonis/Core/Drive";
import FileSystem from 'App/Helpers/FileSystem';
import SMS from "App/Helpers/SMS";

export default class AdminsController {

  public async user({request, response}: HttpContextContract) {
    const user = await User.findOrFail(request.param('number'))
    return response.ok(user)
  }

  public async ban({request, response}: HttpContextContract) {
    const user = await User.findOrFail(request.param('number'))
    await Limit.create({number: user.number, type: 'ban'})
    return response.ok(true)
  }

  public async slides({inertia}: HttpContextContract) {
    const brands = await Slide.query().where('type', 'brand')
    const middles = await Slide.query().where('type', 'middle')
    const slides = await Slide.query().whereIn('type', ['mobile', 'desktop'])
    const banners = await Slide.query().where('type', 'like', 'banner%')
    return inertia.render('admin/slides', {slides, banners, middles, brands})
  }

  public async storeSlide({request, response}: HttpContextContract) {
    const image = request.file('photo')!
    await image.moveToDisk('slides/' + request.input('type'))
    await Slide.create({
      type: request.input('type'),
      path: '/slides/' + request.input('type') + '/' + image.fileName,
      link: request.input('link'),
      text: request.input('text')
    })
    const brands = await Slide.query().where('type', 'brand')
    const middles = await Slide.query().where('type', 'middle')
    const slides = await Slide.query().whereIn('type', ['mobile', 'desktop'])
    const banners = await Slide.query().where('type', 'like', 'banner%')
    return response.ok({slides, banners, middles, brands})
  }

  public async destroySlide({request, response}: HttpContextContract) {
    const slide = await Slide.findOrFail(request.param('slide'))
    await Drive.delete(FileSystem.PATH + slide.path);
    await slide.delete()
    const brands = await Slide.query().where('type', 'brand')
    const middles = await Slide.query().where('type', 'middle')
    const slides = await Slide.query().whereIn('type', ['mobile', 'desktop'])
    const banners = await Slide.query().where('type', 'like', 'banner%')
    return response.ok({slides, middles: middles, banners, brands})
  }

  public async orders({inertia}: HttpContextContract) {
    const orders = await Order.query().preload('bags').whereIn('state', [0, 3, 4, 5])
      .orderBy('created_at', 'desc').whereBetween('created_at', [DateTime.now().minus({weeks: 2}).toISO(), DateTime.now().toISO()])
    return inertia.render('admin/orders/index', {orders})

  }

  public async orderType({request, response}: HttpContextContract) {
    const orders = await Order.query().preload('bags').where('state', request.param('type'))
      .orderBy('created_at', 'desc').whereBetween('created_at', [DateTime.now().minus({weeks: 4}).toISO(), DateTime.now().toISO()])
    return response.ok(orders)
  }

  public async orderNumber({request, response}: HttpContextContract) {
    const user = await User.findByOrFail('number', request.param('number'))
    await user.load('orders', (q) => {
      q.whereIn('state', [0, 3, 4, 5])
      q.preload('bags')
    })
    return response.ok(user.orders)
  }

  public async showOrder({request, inertia}: HttpContextContract) {
    const order = await Order.findOrFail(request.param('order'))
    await order.load('bags')
    await order.load('user')
    await order.load('banks', q => q.where('mode', 'advance'))
    return inertia.render('admin/orders/show', {order})
  }

  public async updateOrder({request, response}: HttpContextContract) {
    const order = await Order.findOrFail(request.param('order'))
    order.state = request.input('state')
    order.days = request.input('days')
    order.tracking = request.input('tracking')
    await order.save()
    await order.load('user')
    await order.load('bags')
    await order.load('banks')
    if (order.state === 4 && request.input('days')) {
      const date = DateTime.now().plus({days: parseInt(request.input('days'))}).setLocale('fa').toLocaleString({year: 'numeric', month: '2-digit', day: '2-digit'})
      await SMS.send(order.user.number, order.id.toString(), date)
    }
    return response.ok({order})
  }

  public async categories({inertia}: HttpContextContract) {
    const categories = await Category.query().preload("children").where("parent_id", 0)
    return inertia.render('admin/categories', {categories})
  }

  public async updateCategory({request, response}: HttpContextContract) {
    const price = request.input('price')
    const discount = request.input('discount')
    const category = await Category.findOrFail(request.param('category'))
    const products = await Product.query().where('category_id', category.id).preload('models')

    await Promise.all(products.map(async product => {
      await Promise.all(product.models.map(async model => {
        model.price = price
        model.percent = parseInt(discount)
        await model.save()
        await model.refresh()
        await product.merge({price: model.calculated}).save()
      }))
    }))
    
    const categories = await Shared.children(category.id)
    await Promise.all(categories.map(async category => {
      await category.load('products', q => q.first())
      category.price = category.products[0].price
      await category.save()
    }))
    response.ok(true)
  }

  public async products({inertia}: HttpContextContract) {
    const categories = await Category.query().preload("children").where("parent_id", 0)
    return inertia.render('admin/products', {categories})
  }

  public async updateProduct({request, response}: HttpContextContract) {
    const type = request.input('type') === 'available'
    const products = await Product.query().preload('models').whereIn('code', request.input('codes'))
    products.map(async product => {
      product.models.map(async model => {
        model.count = type ? 1000000 : 0
        model.save()
      })
      await product.load('model')
      product.price = type ? '0' : product.model.calculated
      await product.save()
    })
    response.ok({done: 'ok'})
  }

  public async inventory({request, response}: HttpContextContract) {
    const categoty = await Category.findOrFail(request.param('category'))
    await categoty.load('products', (q) => {
      q.preload('model')
    })
    const list: Array<string> = [];
    categoty.products.forEach(product => {
      if (product.model.count === 0) list.push(product.code)
    })
    response.ok(list)
  }

  public async comments({inertia}: HttpContextContract) {
    const comments = await Comment.query().preload('product', function (q) {
      q.preload('photo')
    }).preload('user').where('state', 0)
    return inertia.render('admin/comments', {comments})
  }

  public async updateComment({request, response}: HttpContextContract) {
    const comment = await Comment.findOrFail(request.param('comment'))
    comment.state = request.input('state')
    await comment.save()
    await comment.load('product')
    comment.state === 0 && await Notification.create({userId: comment.userId, text: 'کامنت شما با عنوان ' + comment.title + ' برای محصول ' + comment.product.name + ' تایید نشد'})
    return response.ok(true)
  }

  public async answerComment({request, response}: HttpContextContract) {
    const comment = await Comment.findOrFail(request.param('comment'))
    comment.answer = request.input('answer')
    await comment.save()
    return response.ok(true)
  }

}
