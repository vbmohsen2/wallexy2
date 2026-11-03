import Token from "App/Services/Token";
import Order from "App/Services/Order"
import Sitemap from "App/Services/Sitemap"
import Category from "App/Services/Category";
import Limit from "App/Services/Limit";
import Bank from "App/Services/Bank";
import {ApplicationContract} from '@ioc:Adonis/Core/Application'


export default class AppProvider {
  constructor(protected app: ApplicationContract) {
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
    await Token.run()
    await Limit.run()
    await Sitemap.run()
  }

  public async ready() {
    setInterval(async () => await this.service(), 1000)
  }

  public async service() {
    const date = new Date()
    const sec = date.getSeconds()
    const min = date.getMinutes()
    const hour = date.getHours()
    const day = date.getDay()

    if (sec % 10 === 0) await Order.run()
    if (min % 30 === 0 && sec === 20) await Bank.run()
    if (min % 30 === 0 && sec === 20) await Limit.run()
    if (day === 0 && hour === 6 && min === 0 && sec === 30) await Sitemap.run()
    if (day === 0 && hour === 6 && min === 0 && sec === 40) await Category.run()
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
