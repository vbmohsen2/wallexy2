import {DateTime} from "luxon";

export default class Token {
  public static async run(){
    const {default: Token} = await import('App/Models/Token')
    await Token.query().where('created_at', '<', DateTime.now().minus({minutes: 5}).toISO()).delete()
  }
}
