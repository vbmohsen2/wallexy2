import Env from '@ioc:Adonis/Core/Env'

export default class FileSystem {

  /**
   * Defaults to the production path, and can be overridden locally
   * via the STATIC_PATH environment variable.
   */
  public static PATH = Env.get('STATIC_PATH', '/var/server/static/wallexy')

  public static getDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
    const date = new Date();
    return date.getFullYear() + '/' + monthNames[date.getMonth()]
  }

}

