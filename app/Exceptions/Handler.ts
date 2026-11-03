/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }


  public async handle(error: any, ctx: HttpContextContract) {
    const {session, response, inertia} = ctx;

    if (error.status === 400) {
      session.flash('alert', 'User or password is incorrect.')
      return response.redirect('/');
    }

    if (error.status === 401) {
      session.flash('alert', 'You need to login')
      return response.redirect('/');
    }

    if (error.status === 403) {
      session.flash('user', 'You returned to main page because you dont have enough authorities')
      return response.redirect('/');
    }

    if (error.status === 404) {
      const error = await inertia.render('error/404')
      return response.notFound(error)
    }

    if (error.status >= 500) {
      const error = await inertia.render('error/500')
      return response.internalServerError(error)
    }

    return super.handle(error, ctx);
  }
}
