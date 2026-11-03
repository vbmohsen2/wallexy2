import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Blog from 'App/Models/Blog'
import Validation from 'App/Helpers/Validation'
import Message from 'App/Helpers/Message'
import Drive from '@ioc:Adonis/Core/Drive'
import FileSystem from 'App/Helpers/FileSystem'

export default class BlogsController {

  public async index({request, inertia}: HttpContextContract) {
    const page = request.qs()['page'] ? parseInt(request.qs()['page']) : 1
    const count = (await Blog.query().count('*', 'total').firstOrFail()).$extras.total
    const pages = this.getPages(page, Math.ceil(count / 10), 3);
    const hot = await Blog.query().select('id', 'title', 'views').orderBy('views').limit(6)
    const latest = await Blog.query().select('id', 'title', 'created_at').orderBy('created_at').orderBy('created_at', "desc").limit(6)
    const posts = await Blog.query().select('id', 'title', 'short', 'photo', 'views', 'created_at').orderBy('created_at', "desc").forPage(page, 10)
    return inertia.render('blog/index', {posts, hot, latest, count, pages, page})
  }

  public async create({inertia}: HttpContextContract) {
    return inertia.render('blog/create')
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.blog(),
      messages: Message.getMessage(),
    })
    const post = await Blog.create(payload)
    const photo = request.file('image')
    if (!photo) return response.internalServerError()
    await photo.moveToDisk('posts/' + FileSystem.getDate())
    await post.merge({photo: '/posts/' + FileSystem.getDate() + '/' + photo.fileName}).save()
    return response.ok(true)
  }

  public async slug({request, inertia}: HttpContextContract) {
    const post = await Blog.findOrFail(request.param('id'))
    post.views = ++post.views
    await post.save()
    return inertia.render('blog/show', {post})
  }

  public async edit({request, inertia}: HttpContextContract) {
    const post = await Blog.findOrFail(request.param('id'))
    return inertia.render('blog/edit', {post})
  }

  public async update({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.blog(),
      messages: Message.getMessage(),
    })
    const post = await Blog.findOrFail(request.param('id'))
    await post.merge(payload).save()
    const photo = request.file('image')
    if (photo) {
      await photo.moveToDisk('posts/' + FileSystem.getDate())
      await post.merge({photo: '/posts/' + FileSystem.getDate() + '/' + photo.fileName}).save()
    }
    return response.ok(true)
  }

  public async destroy({request, response}: HttpContextContract) {
    const post = await Blog.findOrFail(request.param('id'))
    await Drive.delete(FileSystem.PATH + post.photo)
    await post.delete()
    return response.ok(true)
  }

  public async photo({request, response}) {
    const image = request.file('upload')
    await image.moveToDisk('posts/' + FileSystem.getDate() + '/')
    return response.ok({
      url: 'https://static.wallexy.ir/posts/' + FileSystem.getDate() + '/' + image.fileName,
    })
  }

  public async delete({request, response}: HttpContextContract) {
    await Drive.delete(FileSystem.PATH + request.input('photo').replace('https://static.wallexy.ir', ''))
    return response.ok('done')
  }

  protected getPages(page, total, side): number[] {
    let right = page - side;
    let left = page + side;
    const saved_page = page;
    let pages: number[] = [];
    if (right < 1) left += Math.abs(right) + 1;
    if (page + side >= total) right -= Math.abs(total - left);
    if (right < 1) right = 1;
    while (page < left && page < total) pages.push(++page)
    pages = pages.reverse();
    page = saved_page;
    pages.push(page)
    while (page > right) pages.push(--page)
    pages = pages.reverse();
    return page > total ? [] : pages;
  }
}
