<template>
  <container class="print:hidden">
    <row class="py-3">
      <btn class="bg-neutral-900 text-white rounded-xl" onclick="window.history.back()">بازگشت</btn>
      <space/>
      <btn class="bg-neutral-900 text-white rounded-xl" @click="$inertia.visit('/')">صفحه اصلی</btn>
      <space/>
      <btn class="bg-neutral-900 text-white rounded-xl" @click="dialog">چاپ فاکتور</btn>
    </row>
  </container>
  <div class="border border-neutral-800" style="max-width: 1000px;margin: auto;direction: rtl">
    <row class="w-full p-3 border-b border-b-neutral-800">
      <w><span> فروشنده : فروشگاه اینترنتی والکسی</span></w>
    </row>
    <row class="w-full p-3">
      <w sm="1/2"><span>صورتحساب آقای / خانم : {{ order.user.first_name + order.user.last_name }}</span></w>
      <w sm="1/2"><span class="text-end block"> {{ new Date().toLocaleDateString('fa') }}</span></w>
    </row>
    <row class="w-full p-3 pt-0">
      <w sm="1/2"><span>تلفن : {{ order.user.number }}</span></w>
      <w sm="1/2"><span class="text-end block">شماره فاکتور : {{ getNumber(order.id) }}</span></w>
    </row>
    <row class="w-full p-3 pt-0 border-b border-b-neutral-800">
      <w><span>آدرس : {{ address }}</span></w>
    </row>
    <row class="w-full border-b border-b-neutral-800">
      <w all="1/12" class="border-l p-2 border-neutral-800">ردیف</w>
      <w all="6/12" class="border-l p-2 border-neutral-800">شرح کالا</w>
      <w all="1/12" class="border-l p-2 border-neutral-800">تعداد</w>
      <w all="2/12" class="border-l p-2 border-neutral-800">مبلغ واحد تومان</w>
      <w all="2/12" class="p-2">مبلغ کل تومان</w>
    </row>
    <row v-for="(product , index) in order.bags" class="w-full border-b border-b-neutral-800">
      <w all="1/12" class="border-l p-2 border-neutral-800"><span v-text="getNumber(index + 1)"></span></w>
      <w all="6/12" class="border-l p-2 border-neutral-800"><span v-text="product.name"></span></w>
      <w all="1/12" class="border-l p-2 border-neutral-800"><span v-text="getNumber(product.count) + ' کارتن'"></span></w>
      <w all="2/12" class="border-l p-2 border-neutral-800"><span v-text="getPrice(product.price)"></span></w>
      <w all="2/12" class="p-2"><span v-text="getPrice(product.price * product.count)"></span></w>
    </row>
    <row class="w-full p-3">
      <w sm="1/2"><span>مبلغ کل فاکتور</span></w>
      <w sm="1/2"><span class="text-end block" v-text="price"></span></w>
    </row>
  </div>
  <inertia-head>
    <title>{{'فاکتور شماره ' + getNumber(order.id)}}</title>
  </inertia-head>
</template>
<script>
import Printer from '@/layout/printer'

export default {
  props: {
    order: Object,
  },
  layout: Printer,
  methods: {
    dialog() {
      window.print()
    }
  },
  computed: {
    information() {
      return this.order.user.information
    },
    address() {
      return this.information.province + ' ' + this.information.city  + ' ' + this.information.address
    },
    price() {
      let price = 0
      this.order.bags.map(product => price += product.count * product.price)
      return this.getPrice(price) + ' تومان'
    }
  }
}
</script>
