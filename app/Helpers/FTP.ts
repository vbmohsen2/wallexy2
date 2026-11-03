const ftp = require("basic-ftp")


export default class FTP {

  public static path = '/'

  public static config = {
    host: '',
    user: '',
    password: ''
  }

  public static async upload(from: string, to: string) {
    const client = new ftp.Client(60000)
    client.ftp.verbose = true
    try {
      await client.access(this.config)
      await client.uploadFrom(from, this.path + to)
    } catch (err) {
      return err
    }
    client.close()
  }

  public static async remove(path) {
    const client = new ftp.Client(60000)
    try {
      await client.access(this.config)
      await client.remove(this.path + path)
    } catch (err) {
      return err
    }
    client.close()
  }
}
