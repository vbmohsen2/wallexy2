import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import SMS from "App/Helpers/SMS";
import User from "App/Models/User"
import Limit from "App/Models/Limit"
import Message from "App/Helpers/Message"
import Validation from "App/Helpers/Validation"

export default class AuthController {

  public async login({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.number(),
      messages: Message.getMessage(),
    })

    const attempts = await Limit.query().where('number', payload.number).where('type', 'login')

    if (attempts.length > 100) return response.forbidden()

    await Limit.create({number: payload.number, type: 'login'})

    let user = await User.firstOrCreate(payload, payload)

    await user.load("token")

    if (!user.token) {
      const random: number = Math.floor(1000 + Math.random() * 9000)
      await user.related("token").create({value: random.toString()})
      await SMS.verify(user.number, random.toString())
      setTimeout(async function () {
        await user.related("token").query().delete()
      }, 240000)
    }
    return response.ok({done: true})
  }

  public async verify({request, response, auth}: HttpContextContract) {
    const payload = await request.validate({
      schema: Validation.number(),
      messages: Message.getMessage(),
    })
    const user = await User.query().where("number", payload.number).preload("token").first()
    if (!user || !user.token || !request.input("token")) return response.unprocessableEntity()
    if (user.token.value !== request.input("token")) return response.unauthorized()
    await user.load("basket")
    await user.load("information")
    if (!user.basket) await user.related("basket").create({})
    await auth.use("web").login(user, true)
    return response.ok(user)
  }

  public async logout({response, auth}: HttpContextContract) {
    await auth.use("web").logout()
    return response.ok(true)
  }
}
