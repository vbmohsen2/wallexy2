<!--suppress NpmUsedModulesInstalled -->
<template>
  <div class="flex flex-col min-h-screen flex-grow flex-shrink-0 text-neutral-900">
    <header-x/>
    <main class="flex-grow relative flex flex-shrink-0 md:mt-24 mt-20">
      <transition name="page">
        <div :key="$page.url" class="w-full mb-3">
          <slot/>
        </div>
      </transition>
    </main>
    <footer-x/>
  </div>
  <errors/>
</template>

<script>
import FooterX from '@/layout/footer.vue'
import HeaderX from '@/layout/header.vue'
import Errors from '@/components/custom/errors'

export default {
  components: {
    FooterX,
    HeaderX,
    Errors
  },
  async mounted() {
    this.$store.commit('authentication/authenticate', this.$page.props.authenticated)
    if (this.$page.props.authenticated) {
      this.$store.commit('basket/update', await this.axios.get('/profile/basket').then(res => res.data))
      this.$store.commit('authentication/user', this.$page.props.user)
    }
    this.$page.props.alert && this.$store.dispatch('alerts/update', {message: this.$page.props.alert, type: 'warning'})
  }
}
</script>
