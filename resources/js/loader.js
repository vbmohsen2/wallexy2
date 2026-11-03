export default {
  getPrice(n) {
    const digits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    if (n === null || n === undefined) return 'Error'
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(/\d/g, x => digits[x]);
  },

  getNumber(n) {
    const digits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    if (n === null || n === undefined) return 'Error'
    return n.toString().replace(/\d/g, x => digits[x]);
  },

  getOrderPrice(order) {
    let price = 0;
    order.bags.forEach(bag => {
      let real = bag.price * (1 - bag.percent / 100)
      if (bag.width && bag.height && bag.width > 0 && bag.height > 0) price += bag.count * (real * (bag.width / 100 * bag.height / 100))
      else price += bag.count * real
    })
    // if (order.bags.length > 0 && price < 5000000) price += 100000
    return this.getPrice(price) + ' تومان';
  },
  getState(state) {
    switch (state) {
      case 0:
        return 'لغو شده'
      case 2:
        return 'در انتظار پرداخت'
      case 3:
        return 'در حال پردازش'
      case 4:
        return 'ارسال شده'
      case 5:
        return 'تحویل شده'
    }
  }
}
