<template>
  <row class="justify-center mt-6 md:mt-20 items-center">
    <div>
      <w>
        <icon :class="code === 100 ? 'text-neutral-500' : 'text-neutral-500'" :name="icons.card" size="48"></icon>
      </w>
      <w v-if="code !== 100">
        <p class="text-center text-neutral-800 text-lg mb-0 mt-4">
          تراکنش ناموفق بود.
        </p>
        <p class="text-center text-neutral-800 mb-0 mt-4" v-text="error">
        </p>
      </w>
      <w v-if="code === 100">
        <p class="text-lg text-center text-neutral-800 mb-0 mt-4">
          تراکنش موفق بود.
        </p>
        <p class="pt-2" v-text="'کد پیگیری : ' + getNumber(transid)">
        </p>
      </w>
    </div>
  </row>
  <inertia-head>
    <title>بررسی تراکنش</title>
  </inertia-head>
</template>
<style>
</style>
<script>
import {mdiCreditCardWireless} from '@mdi/js'

export default {
  async asyncData({$axios, route}) {

    let transid = ''
    let error = ''
    const status = route.query.Status;
    const authority = route.query.Authority;
    const amount = route.query.Amount;

    if (status === "NOK") return {code: 1, error: 'لغو سفارش توسط کاربر'}

    const result = await $axios.post('/admin/verify', {token: authority, amount: amount}).then(res => {
      transid = res.data
      return 100
    }).catch(err => {
      console.dir(err)
      error = err.response.data
      return err.response.status
    })


    return {code: result, transid, error}
  },
  head() {
    return {
      title: 'تایید تراکنش بانکی',
      link: [
        {hid: 'canonical', rel: 'canonical', href: 'https://wallexy.com' + this.$route.fullPath}
      ],
    }
  },
  data() {
    return {
      icons: {
        card: mdiCreditCardWireless
      },
    }
  }
}
</script>
