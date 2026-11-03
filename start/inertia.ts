/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia';

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors');
  },
  alert: (ctx) => {
    return ctx.session.flashMessages.get('alert');
  },
  authenticated: async ({auth}) => {
    return await auth.use('web').check()
  },
  user: async ({auth}) => {
    if (await auth.use('web').check()) {
      const user = await auth.use('web').authenticate()
      await user.load('information')
      return user
    }
    return null
  }
}).version(() => Inertia.manifestFile('public/assets/manifest.json'));
