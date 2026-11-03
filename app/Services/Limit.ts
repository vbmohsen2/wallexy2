import {DateTime} from "luxon";

export default class Limit {
  public static async run(){
    const {default: Limit} = await import('App/Models/Limit')
    await Limit.query().where('created_at', '<', DateTime.now().minus({hour: 12}).toISO()).delete()
  }
}
