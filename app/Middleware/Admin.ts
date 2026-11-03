import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {HttpException} from "@adonisjs/http-server/build/src/Exceptions/HttpException";

export default class Admin {
  public async handle({auth}: HttpContextContract, next: () => Promise<void>) {
    if (auth.use('web').user!.type < 1) throw new HttpException('Not Found', 404)
    await next()
  }
}
