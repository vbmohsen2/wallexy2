import axios from 'axios'

export default class SMS {

  private static API_KEY: string = "jMbnQaOcrj9TJmNQCL8hi66ASVmR7dh1oQnLxuc5f5WoUO48"

  public static async verify(number: string, token: string) {

    const config = {
      method: 'post',
      url: 'https://api.sms.ir/v1/send/verify',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'x-api-key': this.API_KEY
      },
      data: JSON.stringify({
        "mobile": number,
        "templateId": 75722,
        "parameters": [
          {name: "token", value: token}
        ],
      })
    };
    await axios(config).catch(err => console.log(err))
  }

  public static async cancel(number: string, order: string) {
    const config = {
      method: 'post',
      url: 'https://api.sms.ir/v1/send/verify',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'x-api-key': this.API_KEY
      },
      data: JSON.stringify({
        "mobile": number,
        "templateId": 75723,
        "parameters": [
          {name: "order", value: order}
        ],
      })
    };
    await axios(config).catch(err => console.log(err))
  }

  public static async progress(number: string, order: string) {
    const config = {
      method: 'post',
      url: 'https://api.sms.ir/v1/send/verify',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'x-api-key': this.API_KEY
      },
      data: JSON.stringify({
        "mobile": number,
        "templateId": 75724,
        "parameters": [
          {name: "order", value: order}
        ],
      })
    };
    await axios(config).catch(err => console.log(err))
  }

  public static async send(number: string, order: string, date: string) {
    const config = {
      method: 'post',
      url: 'https://api.sms.ir/v1/send/verify',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'x-api-key': this.API_KEY
      },
      data: JSON.stringify({
        "mobile": number,
        "templateId": 75725,
        "parameters": [
          {name: "date", value: date},
          {name: "order", value: order}
        ],
      })
    };
    await axios(config).catch(err => console.log(err))
  }
}
