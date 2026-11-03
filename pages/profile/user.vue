<template>
  <sidebar>
    <div class="px-0">
      <p>
        <icon :name="icons.user" class="transition translate-y-1.5" inline size="20"/>
        <span v-if="verified"> خوش آمدید , {{ name }} عزیز </span>
        <span v-else>خوش آمدید , کاربر عزیز , لطفا ثبت نام خود تکمیل کنید</span>
      </p>
      <inertia-link href="/profile/information">
        <btn class="-mr-3 mt-3" text>
          <icon :name="icons.edit" class="-transitiont -translate-y-0.5" left size="20"/>
          <span class="pr-1">ویراش مشخصات</span>
        </btn>
      </inertia-link>
    </div>
  </sidebar>
  <inertia-head>
    <title>پروفایل</title>
  </inertia-head>
</template>
<script>
import {
  mdiHome,
  mdiAccountCircle,
  mdiChartTree,
  mdiBasket,
  mdiCube,
  mdiCalendar,
  mdiPound,
  mdiCloseCircle,
  mdiCheckCircle,
  mdiCircleSlice5,
  mdiAlertCircle, mdiSendCircle, mdiPencilCircle
} from '@mdi/js';

import Sidebar from "@/components/side/profile";

export default {
  components: {Sidebar},
  data() {
    return {
      icons: {
        home: mdiHome,
        user: mdiAccountCircle,
        chart: mdiChartTree,
        basket: mdiBasket,
        product: mdiCube,
        data: mdiCalendar,
        shape: mdiPound,
        cancel: mdiCloseCircle,
        check: mdiCheckCircle,
        progress: mdiCircleSlice5,
        alert: mdiAlertCircle,
        send: mdiSendCircle,
        edit: mdiPencilCircle,
      }
    }
  },
  computed: {
    name() {
      return this.$store.state.authentication.user.first_name
    },
    verified() {
      return this.$store.state.authentication.user
    }
  },
}
</script>
<style>
</style>
