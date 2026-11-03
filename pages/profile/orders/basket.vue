<template>
  <container class="h-full mt-4">
    <row v-if="bags.length === 0 && visible" class="mx-0 justify-center h-full items-center">
      <w>
        <div class="pa-3">
          <icon :name="icons.basketFill" size="100"/>
          <p class="  mt-8 body-2 text-center grey--text">
            در سبد کالا محصولی وجود ندارد
          </p>
        </div>
      </w>
    </row>
    <row v-else>
      <w class="md:pl-3" lg="2/3" md="7/12" xl="3/4">
        <row v-if="!authenticated" class="bg-neutral-200 shadow-lg rounded-xl p-3 mb-4">
          <icon :name="icons.alert" size="20"/>
          <span class="pr-1.5">لطفا برای پرداخت و تکمیل خرید , وارد حساب کاربری خود شوید.</span>
        </row>
        <row v-if="authenticated && !verified" class="bg-neutral-200 rounded-xl shadow-lg p-3 mb-4">
          <inertia-link :headers="{basket: true}" href="/profile/information" title="اطلاعات حساب">
            <row nowrap>
              <icon :name="icons.alert" size="20"/>
              <span class="pr-1.5">لطفا اطلاعات حساب کاربری خود را تکمیل کنید.</span>
            </row>
          </inertia-link>
        </row>
        <div v-if="authenticated && verified" class="px-3 py-3 mb-4 div-wrapper bg-neutral-200 shadow-lg rounded-xl">
          <p class="mb-0">
            <icon :name="icons.map" class="transform translate-y-1" inline size="20"></icon>
            <span
                v-text=" 'ارسال به ' + user.information.province + '، ' + user.information.city + '، ' + user.information.address + '، پلاک ' + getNumber(user.information.plate) + getFloor(user.information.floor)">
            </span>
            <inertia-link :headers="{basket: true}" href="/profile/information" title="تغییر آدرس">
              <btn class="px-0 text-neutral-600 text-sm">تغییر آدرس</btn>
            </inertia-link>
          </p>
        </div>
        <card v-for="(bag , index) in bags" :key="bag.id" class="mb-4 relative" style="cursor: pointer">
          <row class="mx-0 pl-7">
            <w all="1/3" class="p-2 sm:p-0 md:p-2 lg:p-0" lg="2/6" md="1/3" sm="5/12" xl="1/4">
              <inertia-link :href="'/product/' + bag.pid + '/' + bag.name.replace(/\s/g , '-')" :title="bag.name">
                <img :alt="bag.name" :src="bag.photo" class="bag-photo"/>
              </inertia-link>
            </w>
            <w all="2/3" class="p-2.5 " lg="4/6" md="2/3" sm="7/12" xl="3/4">
              <inertia-link :href="'/product/' + bag.pid + '/' + bag.name.replace(/\s/g , '-')" :title="bag.name">
                <p class="mb-0">
                  <icon :name="icons.product" class="transform translate-y-1" inline size="18"></icon>
                  <span class="pr-1">
                  {{ getNumber(bag.name) }}
                  </span>
                </p>
                <p v-if="bag.model !== 'single'" class="mb-0 mt-1 ">
                  <icon :name="icons.model" class="transform translate-y-1" inline size="18"></icon>
                  <span class="pr-1">
                  {{ getNumber(bag.model) }}
                  </span>
                </p>
                <p v-if="bag.percent > 0" class="mb-0 mt-1 ">
                  <icon :name="icons.money" class="transform translate-y-1 text-neutral-500" color="red" inline size="18"></icon>
                  <del>
                    {{ getPriceX(bag) }} تومان
                  </del>
                </p>
                <p class="mb-0 mt-1 ">
                  <icon :class="{'text-neutral-500' : bag.percent > 0}" :name="icons.money" class="transform translate-y-1" inline size="18"></icon>
                  <span class="pr-1">
                  {{ getCalculated(bag) }} تومان
                  </span>
                </p>
                <p v-if="bag.percent > 0" class="mb-0 mt-1 ">
                  <icon :name="icons.percent" class="transform translate-y-1" inline size="18"></icon>
                  <span class="pr-1">
                  {{ getNumber(bag.percent) }} درصد تخفیف
                  </span>
                </p>
                <p class="mb-0 mt-1 ">
                  <icon :name="icons.basket" class="transform translate-y-1" inline size="18"></icon>
                  <span v-if="bag.count > 0" class="pr-1"> {{ getNumber(bag.count) + ' ' + bag.type }}</span>
                  <span v-if="bag.width && bag.height && bag.width > 0 && bag.height > 0" class="pr-1" v-text="getDimension(bag.width)"></span>
                  <span v-if="bag.width && bag.height && bag.width > 0 && bag.height > 0">در</span>
                  <span v-if="bag.width && bag.height && bag.width > 0 && bag.height > 0" v-text="getDimension(bag.height)"></span>
                  <span v-if="bag.count === 0" class="pr-1">موجودی این محصول به پایان رسیده است</span>
                </p>
                <p v-if="bag.count > 0 && bag.change && parseInt(bag.change) !== 0" class="mb-0 mt-1 ">
                  <icon :class="parseInt(bag.change) <= 0  ? 'text-neutral-600' : 'text-neutral-600'" :name="parseInt(bag.change) <= 0 ? icons.up : icons.down"
                        class="transform translate-y-1" inline
                        size="18"></icon>
                  <span v-if="parseInt(bag.change) <= 0" class="pr-1">قیمت این محصول {{ getPrice(Math.abs(bag.change)) }} تومان افزایش یافته است</span>
                  <span v-else class="pr-1">قیمت این محصول {{ getPrice(bag.change) }} تومان کاهش یافته است</span>
                </p>
              </inertia-link>
            </w>
            <div class="absolute w-9 px-0.5 h-full top-0 left-0 bg-neutral-100">
              <row class="mx-0 flex-column justify-around py-1 h-full">
                <div class="pt-1">
                  <btn icon="کاهش تعداد محصول" @click.native="increase(index)">
                    <icon :name="icons.plus" size="22"/>
                  </btn>
                  <btn class="mt-4" icon="افزایش تعداد محصول" @click.native="decrease(index)">
                    <icon :name="icons.minus" size="22"></icon>
                  </btn>
                </div>
                <div class="flex items-end pb-1">
                  <btn icon="پاک کردن از سبد خرید" @click.native="deleteBag(index)">
                    <icon :name="icons.delete" size="22"></icon>
                  </btn>
                </div>
              </row>
            </div>
          </row>
        </card>
      </w>
      <w v-if="bags.length > 0" lg="1/3" md="5/12" xl="1/4">
        <card>
          <row class="py-4 bg-neutral-100">
            <h3 class="px-4">تسویه حساب</h3>
            <space/>
            <h4 class="px-4">
              {{ getNumber(bags.length) }} عدد کالا
            </h4>
          </row>
          <row class="mx-3  pa-4 py-6 flex-column">
            <w>
              <row>
                <span class="mb-0">قیمت کالا ها</span>
                <space/>
                <span class="mb-0">{{ getPrice(Math.floor(totalPrice)) }} تومان</span>
              </row>
              <div class="my-4 h-0.5 bg-neutral-200"></div>
              <row v-if="totalCalculatedPercent > 0" class="mt-2 pink--text">
                <span class="mb-0">تخفیف کالا ها</span>
                <space/>
                <span class="mb-0">({{ getPrice(Math.floor(totalCalculatedPercent * 1000) / 10) }}%) {{ getPrice(Math.floor(totalPercent)) }} تومان</span>
              </row>
              <div v-if="totalCalculatedPercent > 0" class="my-4 h-0.5 bg-neutral-200"></div>
              <row class="mt-2 ">
                <span class="mb-0">هزینه ارسال</span>
                <space/>
                <span class="mb-0">پس کرایه باربری</span>
              </row>
              <!--  <row class="mt-2 ">-->
              <!--    <span class="mb-0">هزینه ارسال</span>-->
              <!--    <space/>-->
              <!--    <span v-if="sendingPrice === 0" class="mb-0">رایگان</span>-->
              <!--    <span v-else class="mb-0">{{ getPrice(sendingPrice) }} تومان</span>-->
              <!--  </row>-->
              <div class="my-4 h-0.5 bg-neutral-200"></div>
              <row class="mt-2">
                <span class="mb-0">مبلغ قابل پرداخت</span>
                <space/>
                <span class="mb-0">
                    {{ getPrice(parseInt(totalCalculated)) }}
                    تومان
                  </span>
              </row>
            </w>
          </row>
          <row class="mx-4 pb-4">
            <btn v-if="authenticated && verified" class="mx-auto border rounded-full border-neutral-900 w-full text-center" @click.native="pay()">
              پرداخت
            </btn>
            <inertia-link v-else-if="authenticated && !verified" :headers="{basket: true}" href="/profile/information" title="اطلاعات حساب">
              <btn class="mx-auto border rounded-full border-neutral-900 w-full text-center">
                لطفا مشخصات خود را ثبت کنید!
              </btn>
            </inertia-link>
            <btn v-else class="mx-auto border border-neutral-900 w-full rounded-full text-center" @click.native="$store.commit('authentication/dialog' , true)">
              لطفا وارد حساب کاربری خود شوید!
            </btn>
          </row>
        </card>
      </w>
    </row>
    <xdialog v-model="dialog">
      <div class="flex justify-center align-center p-6 bg-white rounded-xl">
        <icon :name="icons.bank" class="animate-bounce"/>
        <span class="pr-2">در حال انتقال به درگاه</span>
      </div>
    </xdialog>
  </container>
  <inertia-head>
    <title>سبد خرید</title>
  </inertia-head>
</template>
<script>
import {
  mdiBankOutline,
  mdiCube,
  mdiBasket,
  mdiArrowUp,
  mdiAccount,
  mdiArrowDown,
  mdiMapMarker,
  mdiBasketFill,
  mdiSackPercent,
  mdiAlertCircle,
  mdiArrowUpBoldBox,
  mdiArrowDownBoldBox,
  mdiBasketRemoveOutline,
  mdiCheckboxMultipleBlank, mdiCash,
} from '@mdi/js';

export default {
  data() {
    return {
      visible: false,
      dialog: false,
      icons: {
        plus: mdiArrowUp,
        bank: mdiBankOutline,
        product: mdiCube,
        basket: mdiBasket,
        map: mdiMapMarker,
        account: mdiAccount,
        minus: mdiArrowDown,
        money: mdiCash,
        up: mdiArrowUpBoldBox,
        alert: mdiAlertCircle,
        percent: mdiSackPercent,
        basketFill: mdiBasketFill,
        down: mdiArrowDownBoldBox,
        delete: mdiBasketRemoveOutline,
        model: mdiCheckboxMultipleBlank
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.authentication.user
    },
    verified() {
      return this.$store.state.authentication.user.first_name
    },
    authenticated() {
      return this.$store.state.authentication.authenticated
    },
    bags() {
      return this.$store.state.basket.bags
    },
    bagsCount() {
      return this.$store.getters['basket/bagsCount']
    },
    totalPrice() {
      return this.$store.getters['basket/totalPrice']
    },
    totalPercent() {
      return this.totalPrice - this.totalCalculated
    },
    sendingPrice() {
      if (this.bags.length < 1)
        return 0
      else {
        if (this.totalCalculated < 5000000) return 100000;
        else return 0;
      }
    },
    totalCalculatedPercent() {
      return this.totalPercent / this.totalPrice;
    },
    totalCalculated() {
      return this.$store.getters['basket/totalCalculated']
    },
  },
  mounted() {
    this.dialog = false
    this.visible = true
  },
  methods: {
    deleteBag(index) {
      if (this.authenticated) this.$store.dispatch('basket/remove', index);
      else this.$store.commit('basket/remove', index);
    },
    increase(index) {
      if (this.authenticated) this.$store.dispatch('basket/increase', index);
      else this.$store.commit('basket/increase', index);
    },
    decrease(index) {
      if (this.authenticated) this.$store.dispatch('basket/decrease', index);
      else this.$store.commit('basket/decrease', index);
    },
    getFloor(floor) {
      if (floor === null)
        return '';
      else
        return "، واحد " + this.getNumber(floor)
    },
    getPriceX(bag) {
      if (bag.width && bag.height && bag.width > 0 && bag.height > 0) {
        return this.getPrice(bag.price * (bag.width / 100 * bag.height / 100))
      } else {
        return this.getPrice(bag.price)
      }
    },
    getCalculated(bag) {
      if (bag.width && bag.height && bag.width > 0 && bag.height > 0) {
        return this.getPrice((parseInt(bag.calculated).toFixed() * (bag.width / 100 * bag.height / 100)).toString())
      } else {
        return this.getPrice(parseInt(bag.calculated).toFixed().toString())
      }
    },
    getDimension(dimension) {
      if (dimension < 100) {
        return this.getNumber(dimension) + ' سانتی متر'
      } else if (dimension >= 100 && dimension < 100000) {
        return this.getNumber(dimension / 100) + ' متر'
      } else {
        return this.getNumber(dimension / 100000) + ' کیلو متر'
      }
    },
    async pay() {
      if (this.dialog) return
      this.dialog = true
      if (parseInt(this.totalCalculated) > 200000000) {
        await this.$store.dispatch('alerts/update', {message: 'حداکثر مبلغ خرید ۲۰۰ میلیون است, برای خرید های با مبالغ بالاتر باید چند سفارش انجام دهید', type: 'warning'})
        this.dialog = false
        return
      }
      let flag = true;
      await this.axios.get('/bags').then(res => {
        res.data.map(clientBag => {
          if (!flag) return;
          let serverBag = this.bags.find(serverBag => serverBag.pid === clientBag.pid && serverBag.model === clientBag.model);
          flag = serverBag.price === clientBag.price && parseInt(serverBag.percent) === parseInt(clientBag.percent) && parseInt(serverBag.count) === parseInt(clientBag.count);
        })
      })
      if (!flag) {
        this.dialog = true
        await this.$store.dispatch('alerts/update', {message: 'تغییراتی در سبد خرید اعمال شده است , صفحه دوباره بارگذاری میشود.', type: 'warning'})
        return setTimeout(() => window.location = '/basket', 3000)
      }
      if (this.authenticated)
        this.axios.get('/pay')
            .then(res => {
              const form = document.createElement("form");
              const mobile = document.createElement("mobile");
              const reference = document.createElement("input");
              form.method = "POST";
              form.action = "https://bpm.shaparak.ir/pgwchannel/startpay.mellat";
              reference.value = res.data;
              reference.name = "RefId";
              reference.type = 'text'
              mobile.value = this.user.number;
              mobile.name = "MobileNo";
              mobile.type = 'text'
              form.appendChild(mobile);
              form.appendChild(reference);
              document.body.appendChild(form);
              this.dialog = false
              form.submit();
            }).catch(err => {
          this.dialog = false
          if (err.response.status === 403)
            this.$store.dispatch('alerts/update', {message: 'لطفا ثبت نام خود را کامل کنید.', type: 'error'})
          else if (err.response.status === 422) {
            this.$store.dispatch('alerts/update', {message: err.response.data, type: 'warning'})
            setTimeout(() => window.location = '/basket', 3000)
          } else if (err.response.status === 429)
            this.$store.dispatch('alerts/update', {
              message: 'سفارشات در حال پردازش بسیاری ثبت شده است , لطفا آنها را پرداخت کنید یا منتظر باشید تا لغو شوند.',
              type: 'warning'
            })
          else if (err.response.status === 418)
            this.$store.dispatch('alerts/update', {
              message: 'امروز سفارشات زیادی بدلیل عدم پرداخت لغو شده است , تا ۲۴ ساعت آینده امکان خریدن محصولات ممکن نیست.',
              type: 'warning'
            })
          else
            this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است, ما در حال رفع مشکل هستیم, لطفا صبور باشید .', type: 'error'})
        })
    },
  },
}
</script>
