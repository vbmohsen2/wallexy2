<template>
  <sidebar class="mt-4">
    <div v-if="messages.length < 1" class="pa-3">
      <div class="mb-0 py-6 body-2 text-center flex justify-center">
        <icon :name="icons.alert" class="mx-1" size="18"/>
        <span>پیامی برای نمایش وجود ندارد.</span>
      </div>
    </div>
    <div v-else class="bg-neutral-200 p-3">
      <row class="mb-4  -ml-2">
        <space/>
        <btn>
          <row @click.native="deleteMessages">
            <span>پاک کردن همه پیامها</span>
            <icon class="pr-1.5" :name="icons.delete" size="20"/>
          </row>
        </btn>
      </row>
      <row v-for="message in messages" :key="message.id" class="relative py-3">
        <icon :name="icons.message" size="20"/>
        <span class="pt-0.5 pr-1" v-text="message.text"></span>
      </row>
    </div>
  </sidebar>
  <inertia-head>
    <title>پیام ها</title>
  </inertia-head>
</template>
<script>
import {
  mdiEmailRemoveOutline,
  mdiEmailOutline, mdiAlertCircleOutline

} from '@mdi/js';
import Sidebar from "@/components/side/profile";

export default {
  components: {Sidebar},
  data() {
    return {
      icons: {
        message: mdiEmailOutline,
        delete: mdiEmailRemoveOutline,
        alert: mdiAlertCircleOutline,
      },
      messages: this.$page.props.notifications,
    }
  },
  methods: {
    deleteMessages() {
      this.$axios.delete('/profile/notification')
        .then(async () => {
          this.messages = []
        }).catch(() => {
        this.$store.dispatch('notifications/update', {data: ['مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .'], type: 'error'})
      })
    },
  }
}
</script>
