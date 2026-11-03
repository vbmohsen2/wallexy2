<template>
  <sidebar>
    <row class="bg-neutral-200 shadow-lg rounded-xl p-3">
      <w>
        <row class="mb-2.5 relative">
          <icon :name="icons.shape" size="20"/>
          <span class="pr-1 pt-0.5" v-text="'کد سفارش ' + getNumber(order.id)"></span>
          <inertia-link v-if="order.state > 2" class="absolute top-0 left-0 py-1 px-3 text-white bg-neutral-900 rounded-full" :href="'/profile/factor/' + order.id">نمایش فاکتور</inertia-link>
        </row>
        <row class="mb-2.5">
          <icon :name="icons.money" size="20"/>
          <span class="pr-1 pt-0.5" v-text="getOrderPrice(order)"></span>
        </row>
        <row class="mb-2.5">
          <icon :name="getStateIcon(order.state)" size="20"/>
          <span class="pr-1 pt-0.5" v-text="getState(order.state)"></span>
        </row>
        <row class="mb-2.5">
          <icon :name="icons.date" size="20"/>
          <span class="pr-1 pt-0.5" v-text="new Date(order.created_at).toLocaleDateString('fa')"></span>
        </row>
        <a v-if="order.tracking && order.tracking.length > 0" :href="'https://tracking.post.ir/?id=' + order.tracking" title="رهگیری پستی">
          <row class="mb-2.5">
            <icon :name="icons.tracking" size="20"/>
            <span class="pr-1 pt-0.5" v-text="getNumber(order.tracking)"></span>
          </row>
        </a>
        <row v-if="order.days" class="mb-2.5">
          <icon :name="icons.delivery" size="20"/>
          <span class="pr-1 pt-0.5"
                v-text="'زمان تقریبی تحویل ' + new Date(new Date().setDate(new Date(order.paid_at).getDate() + parseInt(order.days)))
                .toLocaleDateString('fa' , {month : 'long' ,year : 'numeric' , day:'2-digit' , weekday :'long'})
                .replace(',' , '').split(' ').reverse().join(' ')"></span>
        </row>
        <row>
          <icon :name="icons.map" size="20"/>
          <span class="pr-1 pt-0.5" v-text="getNumber(order.address)"></span>
        </row>
      </w>
    </row>
    <div v-for="bag in order.bags" :key="bag.id" class="bg-neutral-200 shadow-lg rounded-xl overflow-hidden mt-4">
      <inertia-link :title="bag.name"  :href="'/product/' + bag.pid + '/' + bag.name.toString().replace(/\s/g  , '-')">
        <row class="mx-0 pl-7">
          <w all="1/3" class="p-2 sm:p-0 " md="1/4" sm="1/3" xl="1/6">
            <img :alt="bag.name" :src="bag.photo" class="w-full"/>
          </w>
          <w all="2/3" class="p-2.5 " md="3/4" sm="2/3" xl="5/6">
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
                  {{ getReal(bag) }} تومان
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
            </p>
          </w>
        </row>
      </inertia-link>
    </div>
    <card class="mt-4 p-3" v-for="bank in order.banks" :key="bank.id">
      <p class="mb-0">
        <icon :class="bank.status === 1 ? 'text-green-600' : 'text-rose-600'" :name="bank.status === 1 ? icons.cardCheck : icons.cardFailed" class="transform translate-y-1" inline size="18"></icon>
        <span class="pr-1" v-text="bank.status === 1 ? 'پرداخت موفق' : 'پرداخت ناموفق'"></span>
      </p>
      <p class="mb-0 pt-1">
        <icon :name="icons.money" class="transform translate-y-1" inline size="18"></icon>
        <span class="pr-1" v-text="getPrice(bank.amount) + ' تومان'"></span>
      </p>
      <p class="mb-0 pt-1">
        <icon :name="icons.date" class="transform translate-y-1" inline size="18"></icon>
        <span class="pr-1" v-text="new Date(bank.created_at).toLocaleDateString('fa' , {year :'numeric' , month : '2-digit' , day : '2-digit' , hour:'2-digit' , minute : '2-digit'})"></span>
      </p>
      <p v-if="bank.status === 1 && bank.reference" class="mb-0 pt-1">
        <icon :name="icons.bank" class="transform translate-y-1" inline size="18"></icon>
        <span class="pr-1">کد ارجاع</span>
        <span class="pr-1" v-text="getNumber(bank.reference)"></span>
      </p>
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
  mdiCheckboxMultipleBlank,
  mdiCheckCircle,
  mdiCircleSlice5,
  mdiCloseCircle,
  mdiCreditCardMultiple,
  mdiCreditCardRemove, mdiCube, mdiImageSizeSelectLarge,
  mdiMapMarker,
  mdiPound, mdiSackPercent,
  mdiSendCircle,
  mdiCashMarker,
  mdiTruckDeliveryOutline,
  mdiEmailSearchOutline, mdiCash
} from '@mdi/js';

import Sidebar from "@/components/side/profile";

export default {
  components: {Sidebar},
  data() {
    return {
      icons: {
        account: mdiAccount,
        left: mdiArrowLeft,
        right: mdiArrowRight,
        date: mdiCalendar,
        shape: mdiPound,
        cancel: mdiCloseCircle,
        check: mdiCheckCircle,
        progress: mdiCircleSlice5,
        alert: mdiAlertCircle,
        send: mdiSendCircle,
        basket: mdiBasket,
        basketFill: mdiBasketFill,
        map: mdiMapMarker,
        bank: mdiBank,
        money : mdiCash,
        cardCheck: mdiCreditCardMultiple,
        cardFailed: mdiCreditCardRemove,
        model: mdiCheckboxMultipleBlank,
        product: mdiCube,
        percent: mdiSackPercent,
        size: mdiImageSizeSelectLarge,
        sendMap: mdiCashMarker,
        delivery: mdiTruckDeliveryOutline,
        tracking: mdiEmailSearchOutline
      },
      order : this.$page.props.order
    }
  },
  methods: {
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
