<template>
  <sidebar>
    <row class="bg-neutral-200 rounded-xl shadow-lg py-4 p-3 mb-4">
      <w>
        <row class="mb-2.5">
          <icon :name="icons.shape" size="20"/>
          <span class="pr-1" v-text="'کد سفارش ' + getNumber(order.id)"></span>
        </row>
        <row class="mb-2.5">
          <icon :name="icons.money" size="20"/>
          <span class="pr-1" v-text="getOrderPrice(order)"></span>
        </row>
        <row class="mb-2.5">
          <icon :name="icons.account" size="20"/>
          <span class="pr-1" v-text="(order.user.first_name + ' ' + order.user.last_name)"></span>
        </row>
        <row class="mb-2.5">
          <icon :name="icons.phone" size="20"/>
          <span class="pr-1" v-text="getNumber(order.user.number)"></span>
        </row>
        <row class="mb-2.5">
          <icon :name="getStateIcon(order.state)" size="20"/>
          <span class="pr-1" v-text="getState(order.state)"></span>
        </row>
        <row class="mb-2.5">
          <icon :name="icons.date" size="20"/>
          <span class="pr-1" v-text="new Date(order.created_at).toLocaleDateString('fa')"></span>
        </row>
        <a v-if="order.tracking && order.tracking.length > 0" :href="'https://tracking.post.ir/?id=' + order.tracking" title="رهگیری پستی">
          <row class="mb-2.5">
            <icon :name="icons.tracking" size="20"/>
            <span class="pr-1" v-text="getNumber(order.tracking)"></span>
          </row>
        </a>
        <row v-if="order.days" class="mb-2.5">
          <icon :name="icons.delivery" size="20"/>
          <span class="pr-1"
                v-text="'زمان تقریبی تحویل ' + new Date(new Date().setDate(new Date(order.paid_at).getDate() + parseInt(order.days)))
                .toLocaleDateString('fa' , {month : 'long' ,year : 'numeric' , day:'2-digit' , weekday :'long'})
                .replace(',' , '').split(' ').reverse().join(' ')"></span>
        </row>
        <row nowrap>
          <icon :name="icons.map" size="20"/>
          <span class="pr-1" v-text="getNumber(order.address)"></span>
        </row>
      </w>
    </row>
    <div class="mb-4 -mx-2 rounded-xl">
      <row>
        <w class="px-2" lg="1/3" md="1/2">
          <input v-model="daysModel" class="input" placeholder="زمان تحویل">
        </w>
        <w class="px-2 mt-3 md:mt-0" lg="1/3" md="1/2">
          <input v-model="trackingModel" class="input" placeholder="کد رهگیری">
        </w>
        <w class="px-2 mt-3 lg:mt-0" lg="1/3">
          <xmenu v-model="stateMenu" close-on-click full>
            <template #active="{active}">
              <div class="w-full cursor-pointer border border-neutral-200 h-full rounded-sm py-3 special relative" @click="active">
                <span class="pr-3 block" v-text="getState(order.state)"></span>
                <icon :class="{'rotate-180' : stateMenu}" :name="icons.menu" class="absolute left-3 top-3 transition transform" size="20"></icon>
              </div>
            </template>
            <div class="bg-white shadow-x transform -translate-y-1">
              <ul>
                <li class="option-item" @click="updateOrder(0)" v-text="getState(0)"></li>
                <li class="option-item" @click="updateOrder(3)" v-text="getState(3)"></li>
                <li class="option-item" @click="updateOrder(4)" v-text="getState(4)"></li>
                <li class="option-item" @click="updateOrder(5)" v-text="getState(5)"></li>
              </ul>
            </div>
          </xmenu>
        </w>
      </row>
    </div>
    <div v-for="bag in order.bags" :key="bag.id" class="bg-neutral-200 shadow-lg mt-4 rounded-xl overflow-hidden">
      <inertia-link :href="'/product/' + bag.pid + '/' + bag.name.toString().replace(/\s/g  , '-')" :title="bag.name">
        <row class="mx-0 pl-7">
          <w all="1/3" class="p-2 sm:p-0 " md="1/4" sm="1/3" xl="1/6">
            <img :alt="bag.name" :src="bag.photo" class="bag-photo"/>
          </w>
          <w all="2/3" class="p-2.5 " md="3/4" sm="2/3" xl="5/6">
            <row class="py-1" nowrap>
              <icon :name="icons.product" size="18"></icon>
              <span class="pr-1">{{ getNumber(bag.name) }}</span>
            </row>
            <row v-if="bag.model !== 'single'" class="py-1">
              <icon :name="icons.model" size="18"></icon>
              <span class="pr-1">{{ getNumber(bag.model) }}</span>
            </row>
            <row v-if="bag.percent > 0" class="py-1">
              <icon :name="icons.money" color="red" size="18"></icon>
              <del> {{ getPriceX(bag) }} تومان</del>
            </row>
            <row class="py-1">
              <icon :class="{'text-neutral-500' : bag.percent > 0}" :name="icons.money" size="18"></icon>
              <span class="pr-1"> {{ getReal(bag) }} تومان</span>
            </row>
            <row v-if="bag.percent > 0" class="py-1">
              <icon :name="icons.percent" size="18"></icon>
              <span class="pr-1">{{ getNumber(bag.percent) }} درصد تخفیف</span>
            </row>
            <row class="py-1">
              <icon :name="icons.basket" size="18"></icon>
              <span v-if="bag.count > 0" class="pr-1"> {{ getNumber(bag.count) + ' ' + bag.type }}</span>
              <span v-if="bag.width && bag.height && bag.width > 0 && bag.height > 0" class="pr-1" v-text="getDimension(bag.width)"></span>
              <span v-if="bag.width && bag.height && bag.width > 0 && bag.height > 0">در</span>
              <span v-if="bag.width && bag.height && bag.width > 0 && bag.height > 0" v-text="getDimension(bag.height)"></span>
            </row>
          </w>
        </row>
      </inertia-link>
    </div>
    <card v-for="bank in order.banks" :key="bank.id" class="mt-4 p-3">
      <row class="mb-0 ">
        <icon :name="icons.bank" inline size="20"></icon>
        <span class="pr-1" v-text="'درخواست ' + bank.type"></span>
      </row>
      <row class="mb-0 pt-2">
        <icon :class="bank.status === 0 ? 'text-rose-600' : 'text-green-600'" :name="icons.server" inline size="20"></icon>
        <span class="pr-1">وضعیت درخواست</span>
        <span class="pr-1" v-text="bank.status === 0 ? ' ناموفق ' : ' موفق '"></span>
      </row>
      <row class="mb-0 pt-2">
        <icon :class="bank.response === 0 ? 'text-green-600' : 'text-rose-600'" :name="icons.response" inline size="20"></icon>
        <span class="pr-1">کد پاسخ درخواست</span>
        <span class="pr-1" v-text="bank.response"></span>
      </row>
      <row v-if="bank.sale" class="mb-0 pt-2">
        <icon :name="icons.sale" inline size="20"></icon>
        <span class="pr-1">کد سفارش</span>
        <span class="pr-1" v-text="getNumber(bank.sale)"></span>
      </row>
      <row v-if="bank.reference" class="mb-0 pt-2">
        <icon :name="icons.reference" inline size="20"></icon>
        <span class="pr-1">کد ارجاع</span>
        <span class="pr-1" v-text="getNumber(bank.reference)"></span>
      </row>
      <row v-if="bank.card" class="mb-0 pt-2">
        <icon :name="icons.card" inline size="20"></icon>
        <span class="pr-1" v-text="bank.card"></span>
      </row>
      <row class="mb-0 pt-2">
        <icon :name="icons.money" inline size="20"></icon>
        <span class="pr-1" v-text="getPrice(bank.amount) + ' تومان'"></span>
      </row>
      <row v-if="bank.final" class="mb-0 pt-2">
        <icon :name="icons.final" inline size="20"></icon>
        <span class="pr-1" v-text="getPrice(bank.final / 10) + ' تومان'"></span>
      </row>
      <row class="mb-0 pt-2">
        <icon :name="icons.date" inline size="20"></icon>
        <span class="pr-1"
              v-text="new Date(bank.created_at).toLocaleDateString('fa' , {year :'numeric' , month : '2-digit' , day : '2-digit' , hour:'2-digit' , minute : '2-digit'})"></span>
      </row>
      <row v-if="bank.message" class="mb-0 pt-2">
        <icon :name="icons.message" inline size="20"></icon>
        <span class="pr-1" v-text="bank.message"></span>
      </row>
      <row v-if="bank.pan" class="mb-0 pt-2" nowrap>
        <icon :name="icons.pan" inline size="20"></icon>
        <span class="pr-1 overflow-hidden" v-text="bank.pan"></span>
      </row>
    </card>
  </sidebar>
  <inertia-head>
    <title>نمایش سفارش</title>
  </inertia-head>
</template>
<script>
import {
  mdiAccount,
  mdiAlertCircle,
  mdiArrowLeft,
  mdiArrowRight,
  mdiBank, mdiBasket, mdiBasketFill,
  mdiCalendar,
  mdiCreditCard,
  mdiCreditCardWireless,
  mdiCheckboxMultipleBlank,
  mdiCheckCircle,
  mdiCircleSlice5,
  mdiCashCheck,
  mdiBankTransfer,
  mdiBankCheck,
  mdiServerNetwork,
  mdiCloseCircle,
  mdiCreditCardMultiple,
  mdiCreditCardRemove, mdiCube, mdiImageSizeSelectLarge,
  mdiMapMarker,
  mdiPound, mdiSackPercent,
  mdiSendCircle,
  mdiCashMarker,
  mdiTruckDeliveryOutline,
  mdiEmailSearchOutline,
  mdiCellphone,
  mdiChevronDown,
  mdiServer,
  mdiScriptTextOutline,
  mdiMessageFastOutline,
  mdiCloseNetwork, mdiCash
} from '@mdi/js';
import Sidebar from '@/components/side/admin'

export default {
  components: {Sidebar},
  data() {
    return {
      stateMenu: false,
      daysModel: '',
      trackingModel: '',
      icons: {
        error: mdiCloseNetwork,
        token: mdiScriptTextOutline,
        server: mdiServer,
        sale: mdiBankTransfer,
        response: mdiServerNetwork,
        account: mdiAccount,
        left: mdiArrowLeft,
        right: mdiArrowRight,
        date: mdiCalendar,
        pan: mdiCreditCardWireless,
        card: mdiCreditCard,
        shape: mdiPound,
        cancel: mdiCloseCircle,
        check: mdiCheckCircle,
        progress: mdiCircleSlice5,
        message: mdiMessageFastOutline,
        alert: mdiAlertCircle,
        send: mdiSendCircle,
        basket: mdiBasket,
        basketFill: mdiBasketFill,
        map: mdiMapMarker,
        bank: mdiBank,
        reference: mdiBankCheck,
        cardCheck: mdiCreditCardMultiple,
        cardFailed: mdiCreditCardRemove,
        model: mdiCheckboxMultipleBlank,
        product: mdiCube,
        percent: mdiSackPercent,
        phone: mdiCellphone,
        size: mdiImageSizeSelectLarge,
        sendMap: mdiCashMarker,
        delivery: mdiTruckDeliveryOutline,
        tracking: mdiEmailSearchOutline,
        menu: mdiChevronDown,
        money: mdiCash,
        final: mdiCashCheck,
      },
      order: this.$page.props.order
    }
  },
  mounted() {
    this.daysModel = this.order.days
    this.trackingModel = this.order.tracking
  },
  methods: {
    async updateOrder(state) {
      this.order = await this.axios.put('/admin/order/' + this.order.id, {state: state, days: this.daysModel, tracking: this.trackingModel}).then(res => {
        this.$store.dispatch('alerts/update', {message: 'سفارش بروز شد .', type: 'success'})
        return res.data.order
      }).catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}))
    },
    sendingetPrice(order) {
      let price = 0;
      order.bags.forEach(bag => {
        let real = bag.price * (1 - bag.percent / 100)
        if (bag.width && bag.height && bag.width > 0 && bag.height > 0) price += bag.count * (real * (bag.width / 100 * bag.height / 100))
        else price += bag.count * real
      })
      return price < 5000000 ? "هزینه ارسال " + this.getPrice(100000) + " تومان" : "رایگان"
    },
    getStateIcon(state) {
      switch (state) {
        case 0:
          return this.icons.cancel
        case 2:
          return this.icons.alert
        case 3:
          return this.icons.progress
        case 4:
          return this.icons.send
        case 5:
          return this.icons.check
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
    getPayState(state) {
      switch (state) {
        case 0:
          return 'ناموفق'
        case 1:
          return 'موفق'
      }
    },
    getPriceX(bag) {
      if (bag.width && bag.height && bag.width > 0 && bag.height > 0) {
        return this.getPrice(bag.price * (bag.width / 100 * bag.height / 100))
      } else {
        return this.getPrice(bag.price)
      }
    },
    getReal(bag) {
      if (bag.width && bag.height && bag.width > 0 && bag.height > 0) {
        return this.getPrice((bag.price * (1 - bag.percent / 100)) * (bag.width / 100 * bag.height / 100))
      } else {
        return this.getPrice(bag.price * (1 - bag.percent / 100))
      }
    }
  }
}
</script>
