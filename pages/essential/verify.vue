<template>
  <container class="h-full">
    <row class="justify-center h-full items-center">
      <div>
        <w>
          <icon :class="$page.props.code === 1 ? 'text-green-600' : 'text-rose-600'" :name="icons.card" size="48"></icon>
        </w>
        <w>
          <p v-if="$page.props.code === 1" class="text-center text-lg mb-0 mt-4">
            تراکنش موفق بود.
          </p>
          <p v-else class="text-center text-lg mb-0 mt-4">
            تراکنش ناموفق بود.
          </p>
          <p class="text-center mb-0 mt-4 w-80" v-text="$page.props.message"/>
          <row class="justify-center mt-8">
            <inertia-link href="/">
              <row class="justify-center">
                <btn class="bg-neutral-700 text-white rounded-full">
                  صفحه اصلی
                </btn>
              </row>
            </inertia-link>
          </row>
        </w>
      </div>
    </row>
  </container>
  <inertia-head>
    <title>بررسی تراکنش بانکی</title>
  </inertia-head>
</template>
<script>
import {mdiCreditCardWireless} from '@mdi/js'
export default {
  data() {
    return {
      icons: {
        card: mdiCreditCardWireless
      },
    }
  }
}
</script>
