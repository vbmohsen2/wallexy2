const soap = require('soap')
import {DateTime} from "luxon"

export default class Transaction {
  private static user = "8331852"
  private static terminal = "8331852"
  private static password = "87698252"
  private static url = "https://wallexy.ir/callback"
  private static error = {code: 1000, message: "مشکل در اتصال به درگاه"}
  private static soapLink = "https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl"
  private static options = {overrideRootElement: {namespace: 'ns1'}, wsdl_options: {timeout: 10000}}

  public static async xxx(): Promise<any> {

    return new Promise((resolve, _reject) => {
      return resolve(true)
    })
  }

  public static async pay(amount: string, order: string): Promise<any> {
    const payload = {
      terminalId: this.terminal,
      userName: this.user,
      userPassword: this.password,
      orderId: order,
      localDate: DateTime.now().toFormat('yyyyMMdd'),
      localTime: DateTime.now().toFormat('HHmmss'),
      amount: (parseInt(amount) * 10).toString(),
      additionalData: order,
      callBackUrl: this.url,
      payerId: 0,
    }
    return new Promise((resolve, reject) => {
      soap.createClient(this.soapLink, this.options, (error, client) => {
        if (error) reject(this.error)
        client.bpPayRequest(payload, (err, result, _body) => {
          if (err) reject(this.error)
          if (result.return.toString().startsWith('0')) return resolve(result.return.split(',')[1])
          const error = {code: parseInt(result.return), message: this.codes[result.return]}
          return reject(error);
        })
      })
    })
  }

  public static async verify(order: string, reference: string): Promise<any> {
    const payload = {
      orderId: order,
      saleOrderId: order,
      userName: this.user,
      terminalId: this.terminal,
      userPassword: this.password,
      saleReferenceId: reference
    }
    return new Promise((resolve, reject) => {
      soap.createClient(this.soapLink, this.options, (error, client) => {
        if (error) reject(this.error)
        client.bpVerifyRequest(payload, (err, result, _body) => {
          if (err) reject(this.error)
          if (result.return.toString() === '0') return resolve(true)
          const error = {code: parseInt(result.return), message: this.codes[result.return]}
          return reject(error);
        })
      })
    })
  }

  public static async settle(order: string, reference: string): Promise<any> {
    const payload = {
      orderId: order,
      saleOrderId: order,
      userName: this.user,
      terminalId: this.terminal,
      userPassword: this.password,
      saleReferenceId: reference
    }
    return new Promise((resolve, reject) => {
      soap.createClient(this.soapLink, this.options, (error, client) => {
        if (error) reject(this.error)
        client.bpSettleRequest(payload, (err, result, _body) => {
          if (err) reject(this.error)
          if (result.return.toString() === '0') return resolve(true)
          const error = {code: parseInt(result.return), message: this.codes[result.return]}
          return reject(error);
        })
      })
    })
  }

  public static async inquery(order: string, reference: string): Promise<any> {
    const payload = {
      orderId: order,
      saleOrderId: order,
      userName: this.user,
      terminalId: this.terminal,
      userPassword: this.password,
      saleReferenceId: reference
    }
    return new Promise((resolve, reject) => {
      soap.createClient(this.soapLink, this.options, (error, client) => {
        if (error) reject(this.error)
        client.bpInquiryRequest(payload, (err, result, _body) => {
          if (err) reject(this.error)
          if (result.return.toString() === '0') return resolve(true)
          const error = {code: parseInt(result.return), message: this.codes[result.return]}
          return reject(error);
        })
      })
    })
  }

  public static async reversal(order: string, reference: string): Promise<any> {
    const payload = {
      orderId: order,
      saleOrderId: order,
      userName: this.user,
      terminalId: this.terminal,
      userPassword: this.password,
      saleReferenceId: reference
    }
    return new Promise((resolve, reject) => {
      soap.createClient(this.soapLink, this.options, (error, client) => {
        if (error) reject(this.error)
        client.bpReversalRequest(payload, (err, result, _body) => {
          if (err) reject(this.error)
          if (result.return.toString() === '0') return resolve(true)
          const error = {code: parseInt(result.return), message: this.codes[result.return]}
          return reject(error);
        })
      })
    })
  }


  public static codes = {
    0: 'ﺗﺮاﻛﻨﺶ ﺑﺎ ﻣﻮﻓﻘﻴﺖ اﻧﺠﺎم ﺷﺪ',
    11: 'ﺷﻤﺎره ﻛﺎرت ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    12: 'ﻣﻮﺟﻮدي ﻛﺎﻓﻲ ﻧﻴﺴﺖ',
    13: 'رﻣﺰ ﻧﺎدرﺳﺖ اﺳﺖ',
    14: 'ﺗﻌﺪاد دﻓﻌﺎت وارد ﻛﺮدن رﻣﺰ ﺑﻴﺶ از ﺣﺪ ﻣﺠﺎز اﺳﺖ',
    15: 'ﻛﺎرت ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    16: 'دﻓﻌﺎت ﺑﺮداﺷﺖ وﺟﻪ ﺑﻴﺶ از ﺣﺪ ﻣﺠﺎز اﺳﺖ',
    17: 'ﻛﺎرﺑﺮ از اﻧﺠﺎم ﺗﺮاﻛﻨﺶ ﻣﻨﺼﺮف ﺷﺪه اﺳﺖ',
    18: 'ﺗﺎرﻳﺦ اﻧﻘﻀﺎي ﻛﺎرت ﮔﺬﺷﺘﻪ اﺳﺖ',
    19: 'ﻣﺒﻠﻎ ﺑﺮداﺷﺖ وﺟﻪ ﺑﻴﺶ از ﺣﺪ ﻣﺠﺎز اﺳﺖ',
    111: 'ﺻﺎدر ﻛﻨﻨﺪه ﻛﺎرت ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    112: 'ﺧﻄﺎي ﺳﻮﻳﻴﭻ ﺻﺎدر ﻛﻨﻨﺪه ﻛﺎرت',
    113: 'ﭘﺎﺳﺨﻲ از ﺻﺎدر ﻛﻨﻨﺪه ﻛﺎرت درﻳﺎﻓﺖ ﻧﺸﺪ',
    114: 'دارﻧﺪه ﻛﺎرت ﻣﺠﺎز ﺑﻪ اﻧﺠﺎم اﻳﻦ ﺗﺮاﻛﻨﺶ ﻧﻴﺴﺖ',
    21: 'ﭘﺬﻳﺮﻧﺪه ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    23: 'ﺧﻄﺎي اﻣﻨﻴﺘﻲ رخ داده اﺳﺖ',
    24: 'اﻃﻼﻋﺎت ﻛﺎرﺑﺮي ﭘﺬﻳﺮﻧﺪه ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    25: 'ﻣﺒﻠﻎ ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    31: 'ﭘﺎﺳﺦ ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    32: 'ﻓﺮﻣﺖ اﻃﻼﻋﺎت وارد ﺷﺪه ﺻﺤﻴﺢ ﻧﻤﻲ ﺑﺎﺷﺪ',
    33: 'ﺣﺴﺎب ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    34: 'ﺧﻄﺎي ﺳﻴﺴﺘﻤﻲ',
    35: 'ﺗﺎرﻳﺦ ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    41: 'ﺷﻤﺎره درﺧﻮاﺳﺖ ﺗﻜﺮاري اﺳﺖ',
    42: 'ﺗﺮاﻛﻨﺶ فروش یافت نشد',
    43: 'قبلا تایید درﺧﻮاﺳﺖ داده ﺷﺪه اﺳﺖ',
    44: 'درخواست تایید یافت نشد',
    45: 'ﺗﺮاﻛﻨﺶ واریز ﺷﺪه اﺳﺖ',
    46: 'ﺗﺮاﻛﻨﺶ واریز نشده اﺳﺖ',
    47: 'ﺗﺮاﻛﻨﺶ واریز یافت نشد',
    48: 'تراکنش برگشت شده است',
    49: 'تراکنش کسر یافت نشد',
    412: 'شناسه قبض نادرست است',
    413: 'ﺷﻨﺎﺳﻪ ﭘﺮداﺧﺖ ﻧﺎدرﺳﺖ اﺳﺖ',
    414: 'سازﻣﺎن ﺻﺎدر ﻛﻨﻨﺪه ﻗﺒﺾ ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    415: 'زﻣﺎن ﺟﻠﺴﻪ ﻛﺎري ﺑﻪ ﭘﺎﻳﺎن رسیده است',
    416: 'ﺧﻄﺎ در ﺛﺒﺖ اﻃﻼﻋﺎت',
    417: 'ﺷﻨﺎﺳﻪ ﭘﺮداﺧﺖ ﻛﻨﻨﺪه ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    418: 'اﺷﻜﺎل در ﺗﻌﺮﻳﻒ اﻃﻼﻋﺎت ﻣﺸﺘﺮي',
    419: 'ﺗﻌﺪاد دﻓﻌﺎت ورود اﻃﻼﻋﺎت از ﺣﺪ ﻣﺠﺎز ﮔﺬﺷﺘﻪ اﺳﺖ',
    421: 'آی پی نامعتبر است',
    51: 'ﺗﺮاﻛﻨﺶ ﺗﻜﺮاري اﺳﺖ',
    54: 'ﺗﺮاﻛﻨﺶ ﻣﺮﺟﻊ ﻣﻮﺟﻮد ﻧﻴﺴﺖ',
    55: 'ﺗﺮاﻛﻨﺶ ﻧﺎﻣﻌﺘﺒﺮ اﺳﺖ',
    61: 'ﺧﻄﺎ در واریز',
    1000: 'مشکل در اتصال به درگاه',
  }
}
