import Category from "App/Models/Category";
import Product from "App/Models/Product";
import Database from "@ioc:Adonis/Lucid/Database";

export default class Shared {

  public static list: number[] = []

  public static async parents(id: number) {
    let ids: number[] = [];
    let category = await Category.find(id);
    if (category) {
      ids.push(category!.id);
      await category!.load("parent");
      while (category!.parent !== null) {
        ids.push(category!.parent.id);
        category = category!.parent;
      }
    }
    return ids;
  }

  public static async children(id: number) {
    let category = await Category.find(id);
    if (category) {
      this.list.push(category.id);
      await category.load("children")
      const ids = category.children.map(child => child.id)
      await this.infinite(ids)
    }
    return Category.query().whereIn('id', this.list);
  }

  public static async infinite(ids: number[]) {
    const categories = await Category.query().whereIn('id', ids)
    await Promise.all(categories.map(async category => {
      this.list.push(category.id)
      await category.load("children")
      const ids = category.children.map(child => child.id)
      if (category.children !== null) await this.infinite(ids)
    }))
  }

  public static async category(request, type) {
    const slug = decodeURI(request.param(type)).toString().replace(/-/g, ' ');
    const query = Database.raw('MIN(price::int) AS low , MAX(price::int) AS high')
    const category = await Category.findByOrFail("name", slug);
    await category.load('children', q => q.select('id', 'name'))
    const range = await Product.query().select(query).where('category_id', category.id).first()
    const available = !!request.input('available')
    const min = request.input('min') ? request.input('min') : 0
    const sort = request.input('sort') ? parseInt(request.input('sort')) : 6
    const page = request.input('page') ? parseInt(request.input('page')) : 1
    const max = request.input('max') ? request.input('max') : category.$extras.high
    const filters = request.input('filters') ? request.input('filters').split('.') : []
    await category.load('products', q => {
      q.preload('photo').preload('model').select('name', 'price')
      if (min > 0) q.where('price', '>', parseInt(min))
      if (available) q.where('price', '>', 0)
      if (max < category.$extras.high) q.where('price', '<', parseInt(max))
      if (filters.length > 0) {
        const types: any[] = []
        filters.map(filter => {
          if (!types.find(type => type.name === filter.split('_')[0])) {
            types.push({name: filter.split('_')[0], values: [], keys: []})
          }
          const type = types.find(type => type.name === filter.split('_')[0])
          if (!type.values.includes(filter.split('_')[1])) type.values.push(filter.split('_')[1])
        })
        types.map((type) => {
          let query = ''
          type.values.map(value => {
            query += 'filters like ? or '
            type.keys.push('%' + type.name + '_' + value + '%')
          })
          query = query.substring(0, query.length - 4)
          query = '(' + query
          query += ')'
          q.whereRaw(query, type.keys)
        })
      }
      q.orderByRaw("price::int = 0")
      switch (sort) {
        case 1 :
          q.orderByRaw('price::int desc')
          break
        case 2 :
          q.orderByRaw('price::int asc')
          break
        case 3 :
          q.orderBy('created_at', 'desc')
          break
        case 4 :
          q.withAggregate('favourites', q => q.count('*').as('count')).orderBy('count', 'desc')
          break
        case 5 :
          q.withAggregate('sells', q => q.count('*').as('count')).orderBy('count', 'desc')
          break
        default :
          q.withAggregate('views', q => q.count('*').as('count')).orderBy('count', 'desc')
          break
      }
      q.forPage(type === 'slug' ? 1 : page, 40)
    })
    const data = category.serialize()
    data.sort = sort
    data.products = category.products
    data.low = range ? range.$extras.low : 0
    data.high = range ? range.$extras.high : 1
    return data
  }

  public static async product(request, type) {
    const slug = decodeURI(request.param(type)).toString().replace(/-/g, ' ');
    const product = await Product.query().preload("models").preload("photos").preload("category")
        .preload("comments", q => q.preload("extra"))
        .preload("favourites", q => q.select('id').count('id as total').groupBy('id'))
        .preload("score", q => q.select('id' ,'score').avg('score as average').groupBy('id'))
        .where("name", slug).firstOrFail();
    const payload = product.serialize()
    await product.related('views').create({})
    if (payload.codes) {
      const relates = await Product.query().preload("model").preload("photo").whereIn("code", payload.codes.split('.'))
      const random = await Product.query().preload("model").preload("photo").where("category_id", payload.category_id)
          .where('id', '!=', payload.id).whereNotIn('code', payload.codes.split('.')).limit(8 - payload.codes.split('.').length);
      payload.relates = [...relates, ...random]
    }
    return payload
  }
}
