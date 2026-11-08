import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from '@ioc:Adonis/Core/Validator'
import Partner from 'App/Models/Partner'
import Drive from '@ioc:Adonis/Core/Drive'
import FileSystem from 'App/Helpers/FileSystem'

export default class PartnersController {

  public async index({inertia}: HttpContextContract) {
    return inertia.render('partners')
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        fullName: schema.string({trim: true}, [rules.minLength(3), rules.maxLength(100)]),
        phoneNumber: schema.string({trim: true}, [rules.regex(/^09[0-9]{9}$/)]),
        storeName: schema.string({trim: true}, [rules.minLength(2), rules.maxLength(150)]),
        cityName: schema.string({trim: true}, [rules.minLength(2), rules.maxLength(100)]),
        activityType: schema.string({trim: true}, [rules.minLength(2), rules.maxLength(100)]),
        tierSelection: schema.string.optional({trim: true}, [rules.maxLength(50)]),
      }),
      messages: {
        'fullName.required': 'نام و نام خانوادگی الزامی است',
        'fullName.minLength': 'نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد',
        'fullName.maxLength': 'نام و نام خانوادگی بیش از حد طولانی است',
        'phoneNumber.required': 'شماره تماس همراه الزامی است',
        'phoneNumber.regex': 'شماره تماس همراه صحیح نیست (مثال: 09123456789)',
        'storeName.required': 'نام فروشگاه یا کسب‌وکار الزامی است',
        'storeName.minLength': 'نام فروشگاه باید حداقل ۲ کاراکتر باشد',
        'storeName.maxLength': 'نام فروشگاه بیش از حد طولانی است',
        'cityName.required': 'شهر محل فعالیت الزامی است',
        'cityName.minLength': 'شهر محل فعالیت باید حداقل ۲ کاراکتر باشد',
        'cityName.maxLength': 'شهر محل فعالیت بیش از حد طولانی است',
        'activityType.required': 'نوع فعالیت الزامی است',
        'activityType.minLength': 'نوع فعالیت صحیح نیست',
        'activityType.maxLength': 'نوع فعالیت بیش از حد طولانی است',
      },
    })

    const card = request.file('cardFile', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })
    const store = request.file('storeFile', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    if (card && !card.isValid) {
      return response.unprocessableEntity({message: 'فایل کارت ویزیت معتبر نیست: ' + card.errors[0].message})
    }
    if (store && !store.isValid) {
      return response.unprocessableEntity({message: 'فایل تصویر فروشگاه معتبر نیست: ' + store.errors[0].message})
    }

    const cardFile = card ? await this.upload(card) : null
    const storeFile = store ? await this.upload(store) : null

    const partner = await Partner.create({
      fullName: payload.fullName,
      phone: payload.phoneNumber,
      storeName: payload.storeName,
      city: payload.cityName,
      activityType: payload.activityType,
      tier: payload.tierSelection || 'پایه',
      cardFile,
      storeFile,
      status: Partner.STATUS.pending,
    })

    return response.ok({
      message: 'درخواست همکاری با موفقیت ثبت شد',
      partner,
    })
  }

  public async adminIndex({inertia}: HttpContextContract) {
    const partners = await Partner.query().orderBy('created_at', 'desc')
    return inertia.render('admin/partners', {partners})
  }

  public async update({request, response}: HttpContextContract) {
    const partner = await Partner.findOrFail(request.param('partner'))
    const status = request.input('status')
    if (status && Object.values(Partner.STATUS).includes(status)) {
      partner.status = status
    }
    if (request.input('note') !== undefined) {
      partner.note = request.input('note')
    }
    await partner.save()
    return response.ok(partner)
  }

  public async destroy({request, response}: HttpContextContract) {
    const partner = await Partner.findOrFail(request.param('partner'))
    if (partner.cardFile) await Drive.delete(FileSystem.PATH + partner.cardFile)
    if (partner.storeFile) await Drive.delete(FileSystem.PATH + partner.storeFile)
    await partner.delete()
    return response.ok({message: 'درخواست حذف شد'})
  }

  private async upload(file: any) {
    const directory = 'partners/' + FileSystem.getDate()
    const name = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + file.extname
    await file.moveToDisk(directory, {name})
    return '/' + directory + '/' + name
  }
}
