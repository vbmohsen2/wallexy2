<template>
  <sidebar>
    <card class="p-1 mb-4">
      <row class="p-3">
        <label class="relative w-full">
          <input v-model="searchModel" class="w-full h-11 border rounded-sm border-neutral-500 bg-neutral-200 focus:outline-none px-3" placeholder="جستجوی سفارش"
                 @keypress.enter="search">
          <btn class="absolute top-1.5 left-1" icon @click.native="search">
            <icon :name="icons.search" size="20"/>
          </btn>
        </label>
      </row>
      <row class="pb-1">
        <space/>
        <btn @click.native="updateType(0)"> لغو شده</btn>
        <btn @click.native="updateType(3)">در حال پردازش</btn>
        <btn @click.native="updateType(4)">ارسال شده</btn>
        <btn @click.native="updateType(5)">تحویل شده</btn>
      </row>
    </card>
    <card v-if="paginate.length < 1" class="pa-3">
      <div class="mb-0 py-6 body-2 text-center flex justify-center">
        <icon :name="icons.alert" class="mx-1" size="18"/>
        <span>  سفارشی برای نمایش وجود ندارد.</span>
      </div>
    </card>
    <div v-for="order in paginate" :key="order.id" class="shadow-lg mb-4 rounded-xl border border-neutral-200 overflow-hidden">
      <row class="pr-3 py-1 bg-neutral-200">
        <div class="flex">
          <icon :name="getStateIcon(order.state)" size="20"/>
          <span class="pr-1 py-2" v-text="getState(order.state)"></span>
        </div>
        <space/>
        <inertia-link :href="'/admin/order/' + order.id">
          <btn class="text-neutral-600">
            جزئیات سفارش
          </btn>
        </inertia-link>
      </row>
      <row class="p-3 bg-neutral-100 overflow-x-auto" nowrap>
        <w v-for="bag in order.bags" :key="bag.id" all="16" class="min-w-16 md:min-w-auto ml-3">
          <img :alt="bag.name" :src="bag.photo.replace('normal' , 'small')" class="w-full h-full rounded-lg">
        </w>
      </row>
      <row class="px-3 py-1 bg-neutral-200">
        <div class="flex">
          <icon :name="icons.money" size="20"/>
          <span class="pr-1 py-2" v-text="getOrderPrice(order)"></span>
        </div>
        <space/>
        <div class="flex">
          <icon :name="icons.date" size="20"/>
          <span class="pr-1 py-2" v-text="new Date(order.created_at).toLocaleDateString('fa')"></span>
        </div>
      </row>
    </div>
    <row v-if="ordersLength > 6" class="bg-neutral-200 shadow-lg py-2 justify-center">
      <btn icon @click.native="page > 1 ? updatePage(--page) : updatePage(1)">
        <icon :name="icons.right" size="20"/>
      </btn>
      <span class="text-md pt-1.5 px-3" v-text="getNumber(page)"/>
      <btn icon @click.native="page < ordersLength ? updatePage(++page) : updatePage(ordersLength)">
        <icon :name="icons.left" size="20"/>
      </btn>
    </row>
  </sidebar>
</template>
<script>
import {mdiAlertCircle, mdiArrowLeft, mdiArrowRight, mdiCalendar, mdiCheckCircle, mdiCircleSlice5, mdiCloseCircle, mdiPound, mdiSendCircle, mdiMagnify, mdiCash} from "@mdi/js";
import Sidebar from '@/components/side/admin'
export default {
  components :{Sidebar},
  data() {
    return {
      page: 1,
      searchModel: '',
      icons: {
        left: mdiArrowLeft,
        right: mdiArrowRight,
        date: mdiCalendar,
        shape: mdiPound,
        cancel: mdiCloseCircle,
        check: mdiCheckCircle,
        progress: mdiCircleSlice5,
        alert: mdiAlertCircle,
        send: mdiSendCircle,
        search: mdiMagnify,
        money : mdiCash,
      },
      orders : this.$page.props.orders,
      ordersLength : Math.ceil(this.$page.props.orders / 8)
    }
  },
  computed: {
    paginate() {
      return this.orders.slice((this.page - 1) * 8, this.page * 8)
    }
  },
  methods: {
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
    async updateType(type) {
      this.orders = await this.axios.get('/admin/orders/type/' + type).then(res => res.data).catch(err => err.response.status);
      this.ordersLength = Math.ceil(this.orders.length / 8);
    },
    async search() {
      if (!this.searchModel.match(/(09[01239][0-9]{8}$)/)) {
        await this.$inertia.visit('/admin/order/' + this.searchModel)
        return
      }
      this.orders = await this.axios.get('/admin/orders/number/' + this.searchModel).then(res => res.data).catch(err => err.response.status);
      this.ordersLength = Math.ceil(this.orders.length / 8);
    },
    updatePage(page) {
      this.page = page
    },

  }
}
</script>
