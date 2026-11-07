import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Validation from "App/Helpers/Validation";
import Message from "App/Helpers/Message";
import Slide from "App/Models/Slide";
import Database from "@ioc:Adonis/Lucid/Database";
import {DateTime} from "luxon";

export default class DataController {

  public async main({inertia, request}: HttpContextContract) {
    const smartphone = /iPhone|Android/.test(request.header('User-Agent')!)
    const brands = await Slide.query().where('type', 'brand')
    const middles = await Slide.query().where('type', 'middle')
    const banners = await Slide.query().where('type', 'like', 'banner%')
    const slides = await Slide.query().whereIn('type', ['mobile', 'desktop'])
    let data = {slides, middles, banners, brands, before: {}, after: [{}]}
    data.before = {
      name: 'کاغذ دیواری',
      products: await Product.query().preload('photo').preload('model').select('id', 'name', 'price').orderByRaw('random()').limit(8)
    }
    data.after.pop()
    const news = '"id", "name", "price", (select count(*) from "views" where "created_at" > \'' +
        DateTime.now().minus({month: 1}).toISO() + '\' AND "created_at" < \'' + DateTime.now().toISO() + '\' AND "products"."id" = "views"."product_id") as "count"'
    data.after.push({
      name: 'پربازدید ترین محصولات',
      products: await Product.query().preload('photo').preload('model').select(Database.raw(news)).orderBy('count', 'desc').limit(8)
    })
    data.after.push({
      name: 'جدیدترین محصولات',
      products: await Product.query().preload('photo').preload('model').select('id', 'name', 'price').orderBy('created_at', 'desc').limit(8)
    })
    return inertia.render('index', {data, smartphone})
  }


  public async contact({inertia}: HttpContextContract) {
    return inertia.render('contact')
  }

  public async beforeBuy({inertia}: HttpContextContract) {
    return inertia.render('before-buy')
  }

  public async shippingReturn({inertia}: HttpContextContract) {
    return inertia.render('shipping-return')
  }

  public async measure({inertia}: HttpContextContract) {
    return inertia.render('measure')
  }

  public async mail({request, response}: HttpContextContract) {
    await request.validate({
      schema: Validation.mail(),
      messages: Message.getMessage(),
    });
    return response.ok("Email Added")
  }

  public async finder({request, response}: HttpContextContract) {
    const query = request.input('query')
    let keys = ''
    let values: string[] = []
    query.split(' ').forEach((value: any) => {
      keys += 'normalized ilike ? and '
      values.push('%' + this.convertor(value) + '%')
    });
    keys = '(' + keys.substring(0, keys.length - 4) + ')'
    const order = 'count desc'
    const select = 'id, name, price, (select count(*) from favourites where products.id = favourites.product_id) as count'
    const products = await Product.query().preload('model').whereRaw(keys, values).select(Database.raw(select)).orderByRaw(order).limit(4)
    return response.ok(products)

  }

  private convertor(value: string) {
    const id = {'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'};
    return value.replace(/[^0-9.]/g, w => id[w] || w);
  }

  public async search({request, inertia}: HttpContextContract) {
    const query = request.input('query')
    if (!query) return inertia.redirectBack()
    let keys = ''
    let values: string[] = []
    query.split(' ').forEach((value: any) => {
      keys += 'normalized ilike ? and '
      values.push('%' + this.convertor(value) + '%')
    });
    keys = '(' + keys.substring(0, keys.length - 5) + ')'

    const low = await Product.query().whereRaw(keys, values).min('price', 'value').then(products => products[0].$extras.value)
    const high = await Product.query().whereRaw(keys, values).max('price', 'value').then(products => products[0].$extras.value)
    const available = !!request.input('available')
    const min = request.input('min') ? request.input('min') : 1
    const max = request.input('max') ? request.input('max') : high
    const sort = request.input('sort') ? parseInt(request.input('sort')) : 6
    let order: string
    let select = 'id, name, price'
    switch (sort) {
      case 1 :
        order = 'price::int desc'
        break
      case 2 :
        order = 'price::int asc'
        break
      case 3 :
        order = '`created_at` desc'
        break
      case 4 :
        order = 'count desc'
        select = 'id, name, price, (select count(*) from sells where products.id = sells.product_id) as count'
        break
      case 5 :
        order = 'count desc'
        select = 'id, name, price, (select count(*) from favourites where products.id = favourites.product_id) as count'
        break
      default :
        order = 'count desc'
        select = 'id, name, price, (select count(*) from views where products.id = views.product_id) as count'
        break
    }
    const products = await Product.query().preload('model').preload('photo').where(q => {
      q.whereRaw(keys, values)
      if (available) q.where('price', '>', 0)
      if (min > 0) q.where('price', '>', parseInt(min))
      if (max < high) q.where('price', '<', parseInt(max))
    }).select(Database.raw(select)).orderByRaw('price::int = 0').orderByRaw(order).limit(50)
    return inertia.render('essential/search', {sort, low, high, products})
  }
}
