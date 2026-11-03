import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Order from "App/Models/Order";
import Product from "App/Models/Product";
import Validation from "App/Helpers/Validation";
import Message from "App/Helpers/Message";
import {DateTime} from "luxon";
import Bag from 'App/Models/Bag';
import Transaction from 'App/Helpers/Transaction';
import Bank from "App/Models/Bank";
import Encryption from "@ioc:Adonis/Core/Encryption";
import SMS from "App/Helpers/SMS";

export default class OrdersController {

  public async basket({auth, inertia}: HttpContextContract) {
    const user = await auth.use('web').user
    if (user) {
      await user.load('information')
      return inertia.render('profile/orders/basket', {user})
    } else {
      return inertia.render('profile/orders/basket', {user: false})
    }
  }
  
  public async store({auth, request, response}: HttpContextContract) {
    const payload = await request.validate({schema: Validation.bags(), messages: Message.getMessage()})
    const user = await auth.use('web').user!
    await user.load('basket')
    await user.basket.related('bags').query().delete()
    await user.basket.related('bags').createMany(payload.bags)
    return response.ok({done: 'ok'})
  }

  public async bags({auth, response}: HttpContextContract) {
    const user = await auth.use('web').user!
    await user.load('basket', q => q.preload('bags'))
    return response.ok(user.basket.bags)
  }

  public async pay({response, auth}: HttpContextContract) {
    const user = await auth.use('web').user!
    if (!user.firstName || !user.lastName) return response.forbidden()
    await user.load('basket', function (q) {
      q.preload('bags')
    })
    let price = 0
    const order = user.basket
    if (order.state === 100) return response.badRequest()
    order.state = 100;
    await order.save()
    let flag = false
    await Promise.all(user.basket.bags.map(async bag => {
      const product = await Product.findOrFail(bag.pid)
      await product.load('models')
      const model = product.models.find(model => model.name === bag.model)
      if (product.name !== bag.name || !model) {
        await bag.delete()
        flag = true
        return
      }
      if (bag.price !== model.price || bag.count > model.count || bag.percent !== model.percent) {
        await bag.merge({price: model.price, percent: model.percent}).save()
        if (bag.count > model.count) await bag.merge({count: model.count, max: model.count}).save()
        flag = true
        return
      }
      if (bag.width && bag.height && bag.width > 0 && bag.width > 0) price += (parseInt(model.calculated) * bag.count) * (bag.width / 100 * bag.height / 100)
      else price += parseInt(model.calculated) * bag.count
    }))
    if (flag) return response.unprocessableEntity('تغییراتی در سبد خرید اعمال شده است , صفحه دوباره بارگذاری میشود')
    if (price > 200000000) return response.unprocessableEntity("حداکثر مبلغ خرید ۲۰۰ میلیون است, برای خرید های با مبالغ بالاتر باید چند سفارش انجام دهید")
    const sale = Date.now().toString() + order.id
    await Transaction.pay(price.toString(), sale)
      .then(async reference => {
        await order.related('banks').create({mode: 'normal', status: 0, amount: price.toString()})
        await order.related('banks').create({status: 1, sale, mode: 'advance', type: 'خرید', response: 0, amount: price.toString(), reference})
        await user.load('information')
        const information = user.information
        order.cancelAt = DateTime.now().plus({minutes: 120})
        order.state = 2
        order.bank = 1
        order.address = 'استان ' + information.province + ' , ' + 'شهر ' + information.city + ' , ' + information.address + ' , ' + 'پلاک ' + information.plate
        information.floor ? order.address += ' , ' + 'واحد ' + information.floor : order.address += '' + ' , ' + 'کد پستی ' + information.post
        await order.save()
        const orders = await Order.query().where('state', 1)
        const list = orders.map(order => order.id)
        order.bags.map(async bag => {
          const product = await Product.findOrFail(bag.pid)
          await product.load('models')
          const model = product.models.find(model => model.name === bag.model)
          if (!model) return
          await model.merge({count: model.count - bag.count}).save()
          const bags = await Bag.query().whereIn('order_id', list).where('pid', bag.pid).where('name', bag.name).where('model', bag.model)
          bags.map(async bag => await bag.merge({max: model.count, count: bag.count > model.count ? model.count : bag.count}).save())
        });
        await user.related('orders').create({})
        setTimeout(async () => await order.refresh().then(async () => order.state === 2 && await SMS.cancel(user.number, order.id.toString())), 600000)
        return response.ok(reference)
      }).catch(async err => {
        await order.related('banks').create({status: 0, sale, type: 'خرید', response: err.code, mode: 'advance', message: err.message, amount: price.toString()})
        order.state = 1;
        await order.save()
        console.log(err)
        if (err.code === 25) return response.unprocessableEntity('این سفارش قبلا به درگاه پرداخت انتقال یافته است, صفحه دوباره بارگذاری میشود')
        return response.internalServerError()
      })
  }

  public async repay({request, response, auth}: HttpContextContract) {
    const user = await auth.use('web').user!
    if (!user.firstName || !user.lastName) return response.forbidden()
    let price = 0
    const order = await Order.findOrFail(request.input('id'))
    await order.load('bags')
    if (order.userId !== user.id) return response.badRequest()
    await Promise.all(order.bags.map(async bag => {
      const product = await Product.findOrFail(bag.pid)
      await product.load('models')
      const model = product.models.find(model => model.name === bag.model)!
      if (bag.width && bag.height && bag.width > 0 && bag.width > 0) price += (parseInt(model.calculated) * bag.count) * (bag.width / 100 * bag.height / 100)
      else price += parseInt(model.calculated) * bag.count
    }))
    if (price > 50000000) return response.unprocessableEntity("حداکثر مبلغ خرید ۵۰ میلیون است, برای خرید های با مبالغ بالاتر باید چند سفارش انجام دهید")
    const sale = Date.now().toString() + order.id
    return await Transaction.pay(price.toString(), sale)
      .then(async reference => {
        await order.related('banks').create({mode: 'normal', status: 0, amount: price.toString()})
        await order.related('banks').create({status: 1, sale, type: 'درخواست خرید مجدد', mode: 'advance', response: 0, amount: price.toString(), reference})
        order.cancelAt = DateTime.now().plus({minutes: 10})
        await order.save()
        return response.ok(reference)
      }).catch(async err => {
        await order.related('banks').create({status: 0, sale, type: 'درخواست خرید مجدد', mode: 'advance', response: err.code, message: err.message, amount: price.toString()})
        return response.internalServerError()
      })
  }

  public async progress(number, id) {
    await SMS.progress(number, id.toString())
    await SMS.progress("09904283848", id.toString())
    await SMS.progress("09352408600", id.toString())
  }

  public async callback({request, response}: HttpContextContract) {
    const encrypt = Encryption.encrypt(JSON.stringify(request.all()), '30mins')
    return response.redirect().withQs({encrypt}).toPath('/verify')
  }

  public async verify({request, auth, response, inertia}: HttpContextContract) {
    if (!request.input('encrypt')) return response.redirect('/')
    const encrypt = Encryption.decrypt(request.input('encrypt'))
    if (!encrypt) return inertia.render('essential/verify', {code: 0, message: 'زمان بررسی تراکنش به پایان رسیده است'})
    const decrypt = JSON.parse(<string>encrypt)
    const user = await auth.use('web').user!
    const bank = await Bank.query().where('sale', decrypt['SaleOrderId']).where('mode', 'advance').orderBy('created_at', 'desc').first()
    if (!bank) return inertia.render('essential/verify', {code: 0, message: 'چنین سفارشی ثبت نشده , لطفا با پشتیبانی تماس بگیرید'})
    if (decrypt['ResCode'] !== '0') {
      const order = await Order.findOrFail(bank.orderId)
      await order.related('banks').create({
        amount: bank.amount,
        status: 0,
        mode: 'advance',
        type: 'تایید تراکنش',
        response: decrypt["ResCode"],
        sale: decrypt['SaleOrderId'],
        message: 'درخواست تایید تراکنش از سمت بانک با خطا مواجه شد' + Transaction.codes[parseInt(decrypt["ResCode"])]
      })
      return inertia.render('essential/verify', {code: 0, message: 'تراکنش ناموفق بود.'})
    }
    const checker = await Bank.query().where('sale', decrypt['SaleOrderId']).where('order_id', bank.orderId).where('mode', 'advance').where('type', 'تایید').where('status', 1).first()
    if (checker) return inertia.render('essential/verify', {code: 1, message: "کد پیگیری سفارش " + checker.id + " - کد ارجاع " + checker.reference})
    await user.load('orders', q => q.where('state', 2).where('id', bank.orderId))
    if (!user.orders[0]) return inertia.render('essential/verify', {code: 0, message: 'چنین سفارشی ثبت نشده , لطفا با پشتیبانی تماس بگیرید'})
    const order = user.orders[0]
    return await Transaction.verify(decrypt['SaleOrderId'], decrypt['SaleReferenceId'])
      .then(async () => {
        order.related('banks').create({
          status: 1,
          response: 0,
          mode: 'advance',
          type: 'تایید',
          amount: bank.amount,
          token: decrypt['RefId'],
          sale: decrypt['SaleOrderId'],
          final: decrypt['FinalAmount'],
          pan: decrypt['CardHolderInfo'],
          card: decrypt['CardHolderPan'],
          reference: decrypt['SaleReferenceId'],
          message: 'تایید تراکنش با موفقیت انجام شد',
        })
        await order.load('bags')
        order.bags.map(async bag => {
          const product = await Product.findOrFail(bag.pid)
          await product.related('sells').create({})
          await product.load('comments', q => q.where('user_id', user.id))
          if (product.comments.length > 0) await product.comments[0].merge({buyer: 1}).save()
        })
        await this.progress(user.number, order.id)
        await order.merge({state: 3, bank: 2, paidAt: DateTime.now()}).save()
        await Bank.query().where('order_id', order.id).where('mode', 'normal').orderBy('created_at', 'desc').update({status: 1})
        return await Transaction.settle(decrypt['SaleOrderId'], decrypt['SaleReferenceId'])
          .then(async () => {
            await order.merge({bank: 3}).save()
            order.related('banks').create({
              status: 1,
              response: 0,
              type: 'واریز',
              mode: 'advance',
              amount: bank.amount,
              token: decrypt['RefId'],
              sale: decrypt['SaleOrderId'],
              final: decrypt['FinalAmount'],
              pan: decrypt['CardHolderInfo'],
              card: decrypt['CardHolderPan'],
              reference: decrypt['SaleReferenceId'],
              message: 'واریز مبلغ به والکسی با موفقیت انجام شد',
            })
            return inertia.render('essential/verify', {code: 1, message: "کد پیگیری سفارش " + order.id + " - کد ارجاع " + decrypt['SaleReferenceId']})
          }).catch(async error => {
            order.related('banks').create({
              status: 0,
              mode: 'advance',
              type: 'واریز',
              response: error.code,
              amount: bank.amount,
              token: decrypt['RefId'],
              sale: decrypt['SaleOrderId'],
              final: decrypt['FinalAmount'],
              pan: decrypt['CardHolderInfo'],
              card: decrypt['CardHolderPan'],
              reference: decrypt['SaleReferenceId'],
              message: 'درخواست واریز تراکنش از سمت بانک با خطا مواجه شد ' + error.message
            })
            if (error.code === 45) await order.merge({bank: 3}).save()
            return inertia.render('essential/verify', {code: 1, message: "کد پیگیری سفارش " + order.id + " - کد ارجاع " + decrypt['SaleReferenceId']})
          })
      }).catch(async () => {
        return await Transaction.inquery(decrypt['SaleOrderId'], decrypt['SaleReferenceId'])
          .then(async () => {
            order.related('banks').create({
              status: 1,
              response: 0,
              mode: 'advance',
              type: 'استعلام',
              amount: bank.amount,
              token: decrypt['RefId'],
              sale: decrypt['SaleOrderId'],
              final: decrypt['FinalAmount'],
              pan: decrypt['CardHolderInfo'],
              card: decrypt['CardHolderPan'],
              reference: decrypt['SaleReferenceId'],
              message: 'تراکنش قبلا تایید شده است'
            })
            await order.load('bags')
            order.bags.map(async bag => {
              const product = await Product.findOrFail(bag.pid)
              await product.related('sells').create({})
              await product.load('comments', q => q.where('user_id', user.id))
              if (product.comments.length > 0) await product.comments[0].merge({buyer: 1}).save()
            })
            await this.progress(user.number, order.id)
            await order.merge({state: 3, bank: 2, paidAt: DateTime.now()}).save()
            await Bank.query().where('order_id', order.id).where('mode', 'normal').orderBy('created_at', 'desc').update({status: 1})
            return await Transaction.settle(decrypt['SaleOrderId'], decrypt['SaleReferenceId'])
              .then(async () => {
                await order.merge({bank: 3}).save()
                order.related('banks').create({
                  status: 1,
                  response: 0,
                  type: 'واریز',
                  mode: 'advance',
                  amount: bank.amount,
                  token: decrypt['RefId'],
                  sale: decrypt['SaleOrderId'],
                  final: decrypt['FinalAmount'],
                  pan: decrypt['CardHolderInfo'],
                  card: decrypt['CardHolderPan'],
                  reference: decrypt['SaleReferenceId'],
                  message: 'واریز مبلغ به والکسی با موفقیت انجام شد',
                })
                return inertia.render('essential/verify', {code: 1, message: "کد پیگیری سفارش " + order.id + " - کد ارجاع " + decrypt['SaleReferenceId']})
              }).catch(async error => {
                order.related('banks').create({
                  status: 1,
                  mode: 'advance',
                  type: 'واریز',
                  response: error.code,
                  amount: bank.amount,
                  token: decrypt['RefId'],
                  sale: decrypt['SaleOrderId'],
                  final: decrypt['FinalAmount'],
                  pan: decrypt['CardHolderInfo'],
                  card: decrypt['CardHolderPan'],
                  reference: decrypt['SaleReferenceId'],
                  message: 'درخواست واریز تراکنش از سمت بانک با خطا مواجه شد ' + error.message
                })
                if (error.code === 45) await order.merge({bank: 3}).save()
                return inertia.render('essential/verify', {code: 1, message: "کد پیگیری سفارش " + order.id + " - کد ارجاع " + decrypt['SaleReferenceId']})
              })
          }).catch(async () => {
            return await Transaction.reversal(decrypt['SaleOrderId'], decrypt['SaleReferenceId'])
              .then(async () => {
                order.related('banks').create({
                  status: 1,
                  response: 0,
                  type: 'برگشت',
                  mode: 'advance',
                  amount: bank.amount,
                  token: decrypt['RefId'],
                  sale: decrypt['SaleOrderId'],
                  final: decrypt['FinalAmount'],
                  pan: decrypt['CardHolderInfo'],
                  card: decrypt['CardHolderPan'],
                  reference: decrypt['SaleReferenceId'],
                  message: 'درخواست برگشت با موفقیت ثبت شد'
                })
                return inertia.render('essential/verify', {code: 0, message: 'تراکنش ناموفق بود, مبلغ پرداختی به زودی به حساب شما بازخواهد گشت.'})
              }).catch(error => {
                order.related('banks').create({
                  status: 1,
                  mode: 'advance',
                  type: 'برگشت',
                  response: error.code,
                  amount: bank.amount,
                  token: decrypt['RefId'],
                  sale: decrypt['SaleOrderId'],
                  final: decrypt['FinalAmount'],
                  pan: decrypt['CardHolderInfo'],
                  card: decrypt['CardHolderPan'],
                  reference: decrypt['SaleReferenceId'],
                  message: 'درخواست برگشت تراکنش از سمت بانک با خطا مواجه شد ' + error.message
                })
                return inertia.render('essential/verify', {code: 0, message: 'تراکنش ناموفق بود, مبلغ پرداختی به زودی به حساب شما بازخواهد گشت.'})
              })
          })
      })
  }
}
