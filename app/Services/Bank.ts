import Transaction from "App/Helpers/Transaction";

export default class Bank {
  public static async run() {
    const {default: Bank} = await import('App/Models/Bank')
    const {default: Order} = await import('App/Models/Order')
    const orders = await Order.query().where('bank', 2)
    orders.map(async order => {
      const bank = await Bank.query().where('order_id', order.id).where('mode', 'advance').whereNotNull('card').firstOrFail()
      await Transaction.settle(bank.sale, bank.reference)
        .then(async () => {
          await order.merge({bank: 3}).save()
          order.related('banks').create({
            status: 1,
            response: 0,
            type: 'واریز زمینه',
            mode: 'advance',
            amount: bank.amount,
            token: bank.token,
            sale: bank.sale,
            final: bank.final,
            pan: bank.pan,
            card: bank.card,
            reference: bank.reference,
            message: 'واریز مبلغ به والکسی با موفقیت انجام شد',
          })
        }).catch(async error => {
          order.related('banks').create({
            status: 1,
            mode: 'advance',
            type: 'واریز زمینه',
            response: error.code,
            amount: bank.amount,
            token: bank.token,
            sale: bank.sale,
            final: bank.final,
            pan: bank.pan,
            card: bank.card,
            reference: bank.reference,
            message: 'درخواست واریز تراکنش از سمت بانک با خطا مواجه شد ' + error.message
          })
          if (error.code === 45) await order.merge({bank: 3}).save()
        })
    })
  }
}
