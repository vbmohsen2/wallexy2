<template>
  <header class="fixed w-full z-30">
    <!-- نوار استعلام موجودی و قیمت -->
    <div class="w-full bg-emerald-600 text-white">
      <container class="flex items-center justify-between gap-2 py-2">
        <div class="flex items-center gap-1.5 min-w-0 text-xs md:text-sm">
          <icon :name="icons.notice" class="shrink-0" size="16"/>
          <span class="truncate md:hidden">موجودی و قیمت روز را استعلام کنید</span>
          <span class="hidden md:inline">قبل از خرید، از موجودی و قیمت روز محصول استعلام بگیرید.</span>
        </div>
        <inertia-link class="shrink-0 inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full px-3 py-1 text-xs md:text-sm font-semibold transition-colors"
                      href="/before-buy" title="قبل از خرید بدانید">
          <span class="hidden xs:inline">قبل از خرید بدانید</span>
          <span class="xs:hidden">بیشتر بدانید</span>
          <icon :name="icons.arrow" size="14"/>
        </inertia-link>
      </container>
    </div>

    <div class="p-2">
      <container>
        <div class="relative">
          <div class="h-full w-full rounded-xl absolute inset-0 overflow-hidden bg-white bg-opacity-70"/>
          <div id="blur" class="relative backdrop-blur-xl rounded-xl shadow-md border border-white/60">

            <!-- ردیف بالا: لوگو (راست) - جستجو (وسط) - آیکون ها (چپ) -->
            <div class="flex items-center gap-2 md:gap-4 h-16 md:h-20 px-2 md:px-4">
              <inertia-link class="shrink-0 flex items-center" href="/" title="فروشگاه اینترنتی والکسی">
                <img alt="لوگوی فروشگاه اینترنتی والکسی" class="w-10 h-10 md:w-11 md:h-11" height="44" src="/logo/logo.svg" width="44">
              </inertia-link>

              <div class="flex-1 min-w-0 flex justify-center">
                <div class="relative w-full max-w-xl">
                  <form class="relative" role="search" @submit.prevent="navigate">
                    <input v-model="searchModel"
                           class="h-10 md:h-11 w-full rounded-full bg-neutral-100/80 border border-neutral-200/80 pr-10 pl-10 text-sm text-neutral-800 placeholder-neutral-400 transition focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                           type="text"
                           placeholder="جستجوی محصولات..."
                           aria-label="جستجوی محصولات">
                    <icon :class="{'animate-pulse' : animate}" :name="icons.search"
                          class="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size="20"/>
                    <button v-if="searchModel" aria-label="پاک کردن جستجو" class="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1.5 rounded-full transition-colors"
                            type="button" @click="clearSearch">
                      <icon :name="icons.close" size="16"/>
                    </button>
                  </form>

                  <!-- نتایج زنده جستجو (بدون پاپ اپ) -->
                  <div v-if="products.length > 0" class="absolute right-0 left-0 top-full mt-2 z-50 bg-white rounded-xl shadow-x border border-neutral-100 overflow-hidden">
                    <inertia-link v-for="product in products" :key="product.id"
                                  :href="productLink(product)" :title="product.name"
                                  class="flex items-center gap-2 px-4 py-2.5 hover:bg-neutral-50 border-b border-neutral-100/70 last:border-0"
                                  @click="closeResults">
                      <icon :name="icons.search" class="shrink-0 text-neutral-400" size="16"/>
                      <span class="text-sm text-neutral-700 truncate" v-text="product.name"></span>
                    </inertia-link>
                    <button class="w-full text-center text-sm font-semibold text-emerald-600 hover:bg-emerald-50 py-2.5 transition-colors"
                            type="button" @click="navigate">
                      نمایش همه محصولات
                    </button>
                  </div>
                </div>
              </div>

              <div class="shrink-0 flex items-center">
                <user/>
              </div>
            </div>

            <!-- ردیف پایین: دسته بندی ها (مگا منو) + دکمه همکاری -->
            <div class="border-t border-neutral-200/70">
              <div class="relative" @mouseleave="activeCategory = null">
                <div class="flex items-center gap-2 px-1 md:px-2 py-1.5">
                  <nav class="flex-1 min-w-0 flex items-center gap-0.5 overflow-x-auto md:overflow-visible no-scrollbar" aria-label="دسته بندی محصولات">
                    <div v-for="category in categories" :key="category.id" class="shrink-0"
                         @mouseenter="activeCategory = category">
                      <inertia-link :href="categoryLink(category)"
                                    class="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-emerald-600 transition-colors">
                        <span v-text="category.name"></span>
                        <icon v-if="hasChildren(category)" :name="icons.chevron"
                              class="text-neutral-400 transition-transform duration-200"
                              :class="{'rotate-180 text-emerald-600' : activeCategory && activeCategory.id === category.id}" size="16"/>
                      </inertia-link>
                    </div>
                  </nav>

                  <inertia-link class="shrink-0 inline-flex items-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 shadow-sm transition-colors"
                                href="/contact" title="همکاری با والکسی" @mouseenter="activeCategory = null">
                    <span>همکاری با والکسی</span>
                  </inertia-link>
                </div>

                <!-- مگا منو -->
                <div v-if="activeCategory && hasChildren(activeCategory)"
                     class="absolute right-0 left-0 top-full z-40 pt-2">
                  <div class="bg-white rounded-xl shadow-x border border-neutral-100 p-4 max-h-[70vh] overflow-y-auto">
                    <div class="flex items-center justify-between px-1 mb-2">
                      <span class="text-sm font-bold text-neutral-800" v-text="activeCategory.name"></span>
                      <inertia-link :href="categoryLink(activeCategory)"
                                    class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                        مشاهده همه
                      </inertia-link>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1">
                      <inertia-link v-for="child in activeCategory.children" :key="child.id"
                                    :href="categoryLink(child)"
                                    class="block rounded-lg px-3 py-2 hover:bg-neutral-50 transition-colors">
                        <span class="flex items-center gap-1 text-sm font-semibold text-neutral-800">
                          <span v-text="child.name"></span>
                          <icon :name="icons.arrow" class="text-emerald-600" size="14"/>
                        </span>
                        <span v-if="hasChildren(child)" class="mt-1 flex flex-wrap gap-1">
                          <span v-for="sub in child.children.slice(0, 6)" :key="sub.id"
                                class="text-[11px] text-neutral-500 bg-neutral-100 rounded-full px-2 py-0.5" v-text="sub.name"></span>
                        </span>
                      </inertia-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </container>
    </div>
  </header>
</template>
<script>

import User from '@/components/auth/user'

import {mdiMagnify, mdiChevronDown, mdiAlertCircleOutline, mdiArrowLeft, mdiClose} from '@mdi/js';

export default {
  components: {User},
  data: () => ({
    timer: 0,
    email: '',
    scroll: false,
    searchModel: '',
    products: [],
    animate: false,
    categories: [],
    activeCategory: null,
    icons: {
      search: mdiMagnify,
      chevron: mdiChevronDown,
      close: mdiClose,
      notice: mdiAlertCircleOutline,
      arrow: mdiArrowLeft,
    }
  }),
  methods: {
    scrolling() {
      this.scroll = window.scrollY > 1
    },
    categoryLink(category) {
      return '/category/' + category.name.replace(/\s/g, '-')
    },
    productLink(product) {
      return '/product/' + product.id + '/' + product.name.toString().replace(/\s/g, '-')
    },
    hasChildren(category) {
      return category.children && category.children.length > 0
    },
    clearSearch() {
      clearTimeout(this.timer)
      this.searchModel = ''
      this.products = []
    },
    closeResults() {
      this.products = []
    },
    navigate() {
      if (!this.searchModel) return
      clearTimeout(this.timer)
      this.products = []
      this.$inertia.visit('/search?query=' + this.searchModel)
    }
  },
  async mounted() {
    window.dispatchEvent(new Event('scroll'))
    window.addEventListener('scroll', this.scrolling)
    this.categories = await this.axios.get('/xcategory').then(res => res.data)
  },
  watch: {
    searchModel(value) {
      clearTimeout(this.timer)
      this.animate = value.length > 2
      this.timer = setTimeout(() => {
        if (value.length > 2) {
          this.axios.post('/search', {query: value.toString().trim()})
              .then(res => {
                this.products = res.data
                this.animate = false;
                if (this.products.length === 0) this.$store.dispatch('alerts/update', {message: 'چیزی برای نمایش پیدا نشد.', type: 'warning'});
              }).catch(() => {
            this.products = []
            this.animate = false;
            this.$store.dispatch('alerts/update', {message: 'چیزی برای نمایش پیدا نشد.', type: 'warning'});
          })
        } else {
          this.animate = false
          this.products = []
        }
      }, 1000)
    }
  }
}
</script>
