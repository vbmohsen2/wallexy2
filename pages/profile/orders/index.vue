<template>
    <sidebar>
      <card v-if="paginate.length < 1" class="pa-3">
        <div class="mb-0 py-6 body-2 text-center flex justify-center">
          <icon :name="icons.alert" class="mx-1" size="18"/>
          <span>سفارشی برای نمایش وجود ندارد.</span>
        </div>
      </card>
      <div v-for="order in paginate" :key="order.id" class="shadow-lg border-neutral-200 border mb-4 rounded-xl overflow-hidden">
        <row class="pr-3 py-1 bg-neutral-200">
          <div class="flex">
            <icon :name="getStateIcon(order.state)" size="20"/>
            <span class="pr-1 py-2 mt-0.5" v-text="getState(order.state)"></span>
            <span v-if="order.state === 2" class="block mt-0.5 py-2 pr-2">|</span>
            <btn v-if="order.state === 2" class="block text-neutral-500 " @click.native="repay(order.id)">پرداخت سفارش</btn>
          </div>
          <space/>
          <inertia-link :href="'/profile/orders/' + order.id ">
            <btn class="text-neutral-600 mt-0.5">
              جزئیات سفارش
            </btn>
          </inertia-link>
        </row>
        <row v-if="order.state === 2" class="py-1 mt-0.5 bg-neutral-200 justify-center">
          <span class="py-2" v-text="'در صورت عدم پرداخت تا ' + calculateDate(order.cancel_at) + ' دقیقه دیگر سفارش لغو خواهد شد'"></span>
        </row>
        <row class="p-3 bg-neutral-100 overflow-x-auto" nowrap>
          <w v-for="bag in order.bags" :key="bag.id" all="16" class="min-w-16 md:min-w-auto ml-3">
            <img :alt="bag.name" :src="bag.photo.replace('normal' , 'small')" class="w-full h-full rounded-lg">
          </w>
        </row>
        <row class="px-3 py-1 bg-neutral-200">
          <div class="flex">
            <icon :name="icons.money" size="20"/>
            <span class="pr-1 py-2 mt-0.5" v-text="getOrderPrice(order)"></span>
          </div>
          <space/>
          <div class="flex">
            <icon :name="icons.date" size="20"/>
            <span class="pr-1 py-2 mt-0.5" v-text="new Date(order.created_at).toLocaleDateString('fa')"></span>
          </div>
        </row>
      </div>
      <row v-if="ordersLength > 6" class="bg-neutral-200 shadow-lg py-2 justify-center">
        <btn icon="صفحه قبل" @click.native="page > 1 ? updatePage(--page) : updatePage(1)">
          <icon :name="icons.right" size="20"/>
        </btn>
        <span class="text-md pt-1.5 px-3" v-text="getNumber(page)"/>
        <btn icon="صفحه بعد" @click.native="page < ordersLength ? updatePage(++page) : updatePage(ordersLength)">
          <icon :name="icons.left" size="20"/>
        </btn>
      </row>
      <xdialog v-model="dialog">
        <div class="flex justify-center align-center p-6 bg-white">
          <icon :name="icons.bank" class="animate-bounce"/>
          <span class="pr-2">در حال انتقال به درگاه</span>
        </div>
      </xdialog>
    </sidebar>
  <inertia-head>
    <title>لیست سفارشات</title>
  </inertia-head>
</template>

<script>
import {
  mdiAlertCircle,
  mdiArrowLeft,
  mdiArrowRight,
  mdiBankOutline,
  mdiCalendar, mdiCash,
  mdiCheckCircle,
  mdiCircleSlice5,
  mdiCloseCircle,
  mdiPound,
  mdiSendCircle
} from "@mdi/js";
import Sidebar from "@/components/side/profile";

export default {
  components: {Sidebar},
  data() {
    return {
      page: 1,
      dialog: false,
      orders: this.$page.props.orders,
      icons: {
        bank: mdiBankOutline,
        left: mdiArrowLeft,
        right: mdiArrowRight,
        date: mdiCalendar,
        shape: mdiPound,
        money: mdiCash,
        cancel: mdiCloseCircle,
        check: mdiCheckCircle,
        progress: mdiCircleSlice5,
        alert: mdiAlertCircle,
        send: mdiSendCircle,
      }
    }
  },
  computed: {
    paginate() {
      return this.orders.slice((this.page - 1) * 8, this.page * 8)
    },
    ordersLength() {
      return Math.ceil(this.orders.length / 8)
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
    updatePage(page) {
      this.page = page;
    },
    calculateDate(cancel) {
      const now = Date.now()
      const date = new Date(cancel)
      const different = date - now
      return this.getNumber(Math.ceil(different / (1000 * 60)))
    },
    async repay(id) {
      if (this.dialog) return
      this.dialog = true
      this.axios.post('/pay', {id: id}).then(res => {
        const form = document.createElement("form");
        const mobile = document.createElement("mobile");
        const reference = document.createElement("input");
        form.method = "POST";
        form.action = "https://bpm.shaparak.ir/pgwchannel/startpay.mellat";
        reference.value = res.data;
        reference.name = "RefId";
        reference.type = 'text'
        form.appendChild(mobile);
        form.appendChild(reference);
        document.body.appendChild(form);
        form.submit();
      }).catch(() => {
        this.dialog = false
        this.$store.dispatch('notifications/update', {data: ['مشکلی پیش آمده است, ما در حال رفع مشکل هستیم, لطفا صبور باشید .'], type: 'error'})
      })
    },

  }
}
</script>
