import fs from "fs";
import xmlbuilder from 'xmlbuilder'
import Application from '@ioc:Adonis/Core/Application'

export default class Sitemap {
  public static async run() {
    const {default: Blog} = await import('App/Models/Blog')
    const {default: Product} = await import('App/Models/Product')
    const {default: Category} = await import('App/Models/Category')

    const blogs = await Blog.all()
    const categories = await Category.all()
    const products = await Product.query().preload('photo')

    const blogsXML = {urlset: {'@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9', url: [{}]}}
    const today = new Date().toISOString().slice(0, 10)
    const categoriesXML = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url: [
          {loc: 'https://wallexy.ir/'},
          {loc: 'https://wallexy.ir/blog'},
          {loc: 'https://wallexy.ir/contact', lastmod: today},
          {loc: 'https://wallexy.ir/before-buy', lastmod: today}
        ]
      }
    }
    const productsXML = {urlset: {'@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1', '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9', url: [{}]}}
    blogsXML.urlset.url.pop()
    productsXML.urlset.url.pop()

    categories.map(category => categoriesXML.urlset.url.push({loc: 'https://wallexy.ir/category/' + encodeURI(category.name.replace(/\s/g, '-'))}))
    blogs.map(blog => blogsXML.urlset.url.push({loc: 'https://wallexy.ir/blog/post/' + blog.id + '/' + encodeURI(blog.title.replace(/\s/g, '-')), lastmod: blog.updatedAt.toISODate()}))
    products.map(product => {
      if (!product.photo) return
      productsXML.urlset.url.push({
        loc: 'https://wallexy.ir/product/' + product.id + '/' + encodeURI(product.name.replace(/\s/g, '-')),
        'image:image': {'image:loc': 'https://static.wallexy.ir' + product.photo.path + product.photo.normal, 'image:caption': product.name}
      })
    })

    var xmlB = xmlbuilder.create(blogsXML).end({pretty: true});
    var xmlC = xmlbuilder.create(categoriesXML).end({pretty: true});
    var xmlP = xmlbuilder.create(productsXML).end({pretty: true});

    /**
     * Resolve sitemaps from the application root, so the same code works
     * both in development (project/public) and production (build/public).
     */
    const sitemapsPath = Application.makePath('public', 'sitemaps')
    fs.mkdirSync(sitemapsPath, { recursive: true })

    fs.writeFileSync(sitemapsPath + '/blogs.xml', xmlB);
    fs.writeFileSync(sitemapsPath + '/products.xml', xmlP);
    fs.writeFileSync(sitemapsPath + '/categories.xml', xmlC);
  }
}
