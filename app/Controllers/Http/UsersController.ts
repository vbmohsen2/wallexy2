import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Validation from "App/Helpers/Validation";
import Message from "App/Helpers/Message";
import Comment from "App/Models/Comment";
import User from "App/Models/User";
import Order from "App/Models/Order";

export default class UsersController {

  public async user({auth, inertia}: HttpContextContract) {
    const user = await auth.use("web").user!
    await user.load("information")
    return inertia.render('profile/user', {user})
  }

  public async xuser({auth, response}: HttpContextContract) {
    const user = await auth.use("web").user!
    await user.load("information")
    return response.ok(user)
  }

  public async basket({auth, response}: HttpContextContract) {
    const user = await auth.use("web").user!;
    await user.load("basket", q => q.preload("bags"))
    const data = await user.serialize()
    user.basket.bags.map(async bag => {
      await bag.merge({change: '0'}).save()
      if (bag.count === 0) await bag.delete()
    })
    return response.ok(data.basket.bags);
  }

  public async orders({inertia, auth}: HttpContextContract) {
    const user = await auth.use('web').user!
    await user.load('orders', (q) => {
      q.where('state', '!=', 1).preload('bags')
    })
    return inertia.render('profile/orders/index', {orders: user.orders})
  }

  public async showOrder({request, inertia}: HttpContextContract) {
    const order = await Order.findOrFail(request.param('order'))
    await order.load('bags')
    await order.load('banks', q => q.where('mode', 'normal').select('amount', 'reference', 'status', 'created_at'))
    return inertia.render('profile/orders/show', {order})
  }

  public async showFactor({request, inertia , response}: HttpContextContract) {
    const order = await Order.findOrFail(request.param('factor'))
    if (order.state  < 3) return response.redirect().back()
    await order.load('bags')
    await order.load('user' , q => q.preload('information'))
    return inertia.render('profile/orders/factor', {order})
  }

  public async information({inertia, request}: HttpContextContract) {
    const basket = !!request.header('basket')
    return inertia.render('profile/information', {basket})
  }

  public async informationUpdate({request, response, auth}: HttpContextContract) {
    const number = await request.validate({
      schema: Validation.number(),
      messages: Message.getMessage()
    });
    const payload = await request.validate({
      schema: Validation.information(),
      messages: Message.getMessage()
    });
    const user = await auth.use("web").user!;
    await user.merge({firstName: payload.first_name, lastName: payload.last_name}).save();
    let data = JSON.parse(JSON.stringify(payload))
    delete data.first_name
    delete data.last_name
    await user.related("information").updateOrCreate({}, data);

    if (user.number !== number.number) {
      await user.load("token");
      if (!user.token) {
        const randomNumber: number = Math.floor(1000 + Math.random() * 9000);
        await user.related("token").create({value: randomNumber.toString()});
        setTimeout(async function () {
          await user.related("token").query().delete();
        }, 500000);
      }
      return response.ok({done: true, type: "number"});
    }
    return response.ok({done: true, type: "default"});
  }

  public async number({request, response, auth}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.number(),
      messages: Message.getMessage(),
    });
    const user = await auth.use("web").user!;
    await user.load("token");
    if (!user.token || !request.input("token")) return response.unprocessableEntity();
    if (user.token.value !== request.input("token")) return response.unauthorized();
    const userExist = await User.findBy('number', payload.number)
    if (userExist) return response.forbidden();
    user.number = payload.number;
    await user.save();
    return response.ok({done: true});
  }

  public async favourites({inertia, auth}: HttpContextContract) {
    const user = await auth.use("web").user!;
    await user.load("favourites", function (q) {
      q.preload("product", function (query) {
        query.preload("photo");
      });
    });
    return inertia.render('profile/favourites', {favourites: user.favourites});
  }

  public async comments({auth, inertia}: HttpContextContract) {
    const user = await auth.use("web").user!;
    await user.load("comments", function (q) {
      q.preload("product", function (query) {
        query.preload("photo");
      });
    });
    return inertia.render('profile/comments', {comments: user.comments});
  }

  public async updateComment({request, response, auth}: HttpContextContract) {
    const comment = await Comment.findOrFail(request.param("comment"));
    const user = await auth.use("web").user!;
    if (user.id !== comment.userId) return response.forbidden();
    const payload = await request.validate({
      schema: Validation.comment(),
      messages: Message.getMessage(),
    });
    await comment.merge({...payload, state: 0}).save();
    return response.ok({done: true});
  }

  public async destroyComment({request, response, auth}: HttpContextContract) {
    const comment = await Comment.findOrFail(request.param("comment"));
    const user = await auth.use("web").user!;
    if (user.id !== comment.userId) return response.forbidden();
    await comment.delete();
    return response.ok({done: true});
  }

  public async notifications({inertia, auth}: HttpContextContract) {
    const user = await auth.use("web").user!;
    await user.load('notifications')
    return inertia.render('profile/notifications', {notifications: user.notifications});
  }

  public async destroyNotification({response, auth}: HttpContextContract) {
    const user = await auth.use("web").user!;
    await user.related('notifications').query().delete()
    return response.ok({done: true});
  }
}
