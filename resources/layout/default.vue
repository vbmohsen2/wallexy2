<!--suppress NpmUsedModulesInstalled -->
<template>
  <div class="flex flex-col min-h-screen flex-grow flex-shrink-0 text-neutral-900">
    <header-x/>
    <main :style="headerHeight ? { marginTop: headerHeight + 8 + 'px' } : null"
          class="flex-grow relative flex flex-shrink-0 md:mt-48 mt-44">
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
  data: () => ({
    headerHeight: 0
  }),
  methods: {
    measureHeader() {
      const header = document.querySelector('header')
      this.headerHeight = header ? header.offsetHeight : 0
    }
  },
  async mounted() {
    this.measureHeader()
    this.$nextTick(this.measureHeader)
    window.addEventListener('resize', this.measureHeader)
    this.$store.commit('authentication/authenticate', this.$page.props.authenticated)
    if (this.$page.props.authenticated) {
      this.$store.commit('basket/update', await this.axios.get('/profile/basket').then(res => res.data))
      this.$store.commit('authentication/user', this.$page.props.user)
    }
    this.$page.props.alert && this.$store.dispatch('alerts/update', {message: this.$page.props.alert, type: 'warning'})
  }
}
</script>
