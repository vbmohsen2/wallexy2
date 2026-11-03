export default class Category {
  public static async run() {
    const {default: Category} = await import('App/Models/Category')
    const categories = await Category.query().preload('products')
    for (const category of categories) {
      category.filters.forEach(filter => {
        let payload: any
        const values: string[] = []
        category.products.forEach(product => {
          product.filters.split(' ').forEach(xfilter => {
            let target = xfilter.split('_')[0].replace(/-/g, ' ')
            let item = xfilter.split('_')[1].replace(/-/g, ' ')
            if (target === filter.name && !values.includes(item)) values.push(item)
            payload = values.map(value => {
              return {name: value, model: false}
            })
          })
        })
        filter.values = payload
      })
      await category.save()
    }
  }
}
