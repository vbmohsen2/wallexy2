<template>
  <header class="fixed inset-x-0 top-0 z-30">
    <!-- نوار استعلام موجودی و قیمت -->
    <div class="relative overflow-hidden bg-emerald-700 text-white/85">
      <div class="pointer-events-none absolute inset-0 opacity-[0.14]"
           style="background-image: radial-gradient(circle at 18% 50%, #c3a26b 0, transparent 42%), radial-gradient(circle at 82% 50%, #2f6b55 0, transparent 48%)"/>
      <container class="relative flex h-9 items-center justify-between gap-2">
        <div class="flex min-w-0 items-center gap-2 text-[11px] md:text-xs">
          <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c3a26b]/15 text-[#d9c39a]">
            <icon :name="icons.notice" size="13"/>
          </span>
          <span class="truncate md:hidden">موجودی و قیمت روز را استعلام کنید</span>
          <span class="hidden md:inline">قبل از خرید، از موجودی و قیمت روز محصول استعلام بگیرید.</span>
        </div>
        <inertia-link class="group inline-flex shrink-0 items-center gap-1 rounded-full border border-[#c3a26b]/40 bg-[#c3a26b]/10 px-2.5 py-1 text-[11px] font-semibold text-[#e8d7b6] transition-colors hover:bg-[#c3a26b] hover:text-[#20342b] md:text-xs"
                      href="/before-buy" title="قبل از خرید بدانید">
          <span>قبل از خرید بدانید</span>
          <icon :name="icons.arrow" class="transition-transform group-hover:-translate-x-0.5" size="13"/>
        </inertia-link>
      </container>
      <div class="h-px w-full bg-gradient-to-l from-transparent via-[#c3a26b]/60 to-transparent"/>
    </div>

    <div class="px-2 pt-2">
      <container>
        <div class="relative">
          <div class="absolute inset-0 rounded-xl bg-white/70"/>
          <div id="blur" :class="scroll ? 'shadow-x' : 'shadow-md'"
               class="relative rounded-xl border border-white/70 bg-white/80 backdrop-blur-xl transition-shadow duration-300">

            <!-- ردیف بالا: منو (موبایل) - لوگو - جستجو - آیکون ها -->
            <div class="flex h-14 items-center gap-2 px-2 md:h-[68px] md:gap-4 md:px-4">
              <button class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e9dfcb] bg-[#f8f5ee] text-[#153a2e] transition-colors hover:bg-[#f3eee4] lg:hidden"
                      type="button" aria-label="باز کردن منوی سایت" :aria-expanded="mobileMenu ? 'true' : 'false'"
                      aria-controls="mobile-menu" @click="mobileMenu = true">
                <icon :name="icons.menu" size="22"/>
              </button>

              <inertia-link class="group flex shrink-0 items-center gap-2" href="/" title="فروشگاه اینترنتی والکسی">
                <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3eee4] ring-1 ring-[#e9dfcb] transition-colors group-hover:bg-[#e9dfcb]/60 md:h-11 md:w-11">
                  <img alt="لوگوی فروشگاه اینترنتی والکسی" class="h-7 w-7 md:h-9 md:w-9" height="44" src="/logo/logo.svg" width="44">
                </span>
                <span class="hidden leading-none sm:block">
                  <span class="block text-md font-extrabold text-[#153a2e]">والکسی</span>
                  <span class="mt-1 block text-[10px] font-medium text-neutral-400">کاغذدیواری و پوستر</span>
                </span>
              </inertia-link>

              <!-- جستجو (دسکتاپ) -->
              <div class="hidden flex-1 justify-center sm:flex">
                <div class="relative w-full max-w-xl">
                  <form class="relative" role="search" @submit.prevent="navigate">
                    <input v-model="searchModel"
                           class="h-10 w-full rounded-full border border-neutral-200/80 bg-white/80 pr-10 pl-10 text-sm text-neutral-800 placeholder-neutral-400 transition focus:border-[#c3a26b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a26b]/20 md:h-11"
                           type="text"
                           placeholder="جستجوی کاغذدیواری، پوستر و طرح..."
                           aria-label="جستجوی محصولات">
                    <icon :class="{'animate-pulse' : animate}" :name="icons.search"
                          class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a58a5c]" size="20"/>
                    <button v-if="searchModel" aria-label="پاک کردن جستجو"
                            class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                            type="button" @click="clearSearch">
                      <icon :name="icons.close" size="16"/>
                    </button>
                  </form>

                  <!-- نتایج زنده جستجو -->
                  <div v-if="products.length > 0"
                       class="absolute right-0 left-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#e9dfcb] bg-white shadow-x">
                    <div class="flex items-center justify-between border-b border-neutral-100 px-4 py-2">
                      <span class="text-[11px] font-bold text-neutral-400">نتایج جستجو</span>
                      <span class="text-[11px] text-[#a58a5c]" v-text="products.length + ' مورد'"></span>
                    </div>
                    <inertia-link v-for="product in products" :key="product.id"
                                  :href="productLink(product)" :title="product.name"
                                  class="group flex items-center gap-2 border-b border-neutral-100/70 px-4 py-2.5 last:border-0 hover:bg-[#f8f5ee]"
                                  @click="closeResults">
                      <icon :name="icons.search" class="shrink-0 text-[#c3a26b]" size="15"/>
                      <span class="truncate text-sm text-neutral-700" v-text="product.name"></span>
                      <icon :name="icons.arrow" class="mr-auto shrink-0 text-neutral-300 transition-transform group-hover:-translate-x-0.5 group-hover:text-[#a58a5c]" size="14"/>
                    </inertia-link>
                    <button class="w-full py-2.5 text-center text-sm font-semibold text-[#153a2e] transition-colors hover:bg-[#f3eee4]"
                            type="button" @click="navigate">
                      نمایش همه نتایج
                    </button>
                  </div>
                </div>
              </div>

              <div class="mr-auto flex shrink-0 items-center gap-1.5 sm:mr-0">
<!--                <inertia-link class="hidden items-center gap-1.5 rounded-full border border-[#e9dfcb] bg-[#f8f5ee] px-3 py-2 text-xs font-semibold text-[#153a2e] transition-colors hover:bg-[#f3eee4] xl:flex"-->
<!--                              href="/before-buy" title="استعلام موجودی و قیمت">-->
<!--                  <icon :name="icons.notice" class="text-[#a58a5c]" size="16"/>-->
<!--                  <span>استعلام موجودی</span>-->
<!--                </inertia-link>-->
                <div class="rounded-full border border-neutral-200/80 bg-white/70 p-0.5">
                  <user/>
                </div>
              </div>
            </div>

            <!-- جستجو (موبایل) -->
            <div class="px-2 pb-2 sm:hidden">
              <div class="relative">
                <form class="relative" role="search" @submit.prevent="navigate">
                  <input v-model="searchModel"
                         class="h-10 w-full rounded-full border border-neutral-200/80 bg-white/80 pr-10 pl-10 text-sm text-neutral-800 placeholder-neutral-400 transition focus:border-[#c3a26b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a26b]/20"
                         type="text"
                         placeholder="جستجوی محصولات..."
                         aria-label="جستجوی محصولات">
                  <icon :class="{'animate-pulse' : animate}" :name="icons.search"
                        class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a58a5c]" size="19"/>
                  <button v-if="searchModel" aria-label="پاک کردن جستجو"
                          class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                          type="button" @click="clearSearch">
                    <icon :name="icons.close" size="16"/>
                  </button>
                </form>

                <div v-if="products.length > 0"
                     class="absolute right-0 left-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#e9dfcb] bg-white shadow-x">
                  <inertia-link v-for="product in products" :key="product.id"
                                :href="productLink(product)" :title="product.name"
                                class="flex items-center gap-2 border-b border-neutral-100/70 px-4 py-2.5 last:border-0 hover:bg-[#f8f5ee]"
                                @click="closeResults">
                    <icon :name="icons.search" class="shrink-0 text-[#c3a26b]" size="15"/>
                    <span class="truncate text-sm text-neutral-700" v-text="product.name"></span>
                  </inertia-link>
                  <button class="w-full py-2.5 text-center text-sm font-semibold text-[#153a2e] transition-colors hover:bg-[#f3eee4]"
                          type="button" @click="navigate">
                    نمایش همه نتایج
                  </button>
                </div>
              </div>
            </div>

            <!-- ردیف پایین: دسته بندی ها (مگا منو) + دکمه همکاری -->
            <div class="hidden border-t border-[#e9dfcb]/70 lg:block">
              <div class="relative" @mouseleave="activeCategory = null">
                <div class="flex items-center gap-2 px-2 py-1.5">
                  <nav class="no-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto" aria-label="دسته بندی محصولات">
                    <div v-for="category in categories" :key="category.id" class="shrink-0"
                         @mouseenter="activeCategory = category">
                      <inertia-link :href="categoryLink(category)"
                                    class="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-[#f8f5ee] hover:text-[#153a2e]"
                                    :class="{'bg-[#f3eee4] text-[#153a2e]' : activeCategory && activeCategory.id === category.id}">
                        <span v-text="category.name"></span>
                        <icon v-if="hasChildren(category)" :name="icons.chevron"
                              class="text-[#c3a26b] transition-transform duration-200"
                              :class="{'rotate-180' : activeCategory && activeCategory.id === category.id}" size="16"/>
                      </inertia-link>
                    </div>
                  </nav>

                  <inertia-link class="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#c3a26b] px-4 py-2 text-sm font-bold text-[#20342b] shadow-sm transition-colors hover:bg-[#d4b57e]"
                                href="/partners" title="همکاری با والکسی" @mouseenter="activeCategory = null">
                    <icon :name="icons.handshake" size="17"/>
                    <span>همکاری با والکسی</span>
                  </inertia-link>
                </div>

                <!-- مگا منو -->
                <transition name="menu">
                  <div v-if="activeCategory && hasChildren(activeCategory)"
                       class="absolute right-0 left-0 top-full z-40 pt-2">
                    <div class="overflow-hidden rounded-xl border border-[#e9dfcb] bg-white shadow-x">
                      <div class="h-1 w-full bg-gradient-to-l from-[#153a2e] via-[#2f6b55] to-[#c3a26b]"/>
                      <div class="max-h-[70vh] overflow-y-auto p-4">
                        <div class="mb-3 flex items-center justify-between px-1">
                          <span class="flex items-center gap-2 text-sm font-extrabold text-[#153a2e]">
                            <span class="h-4 w-1 rounded-full bg-[#c3a26b]"/>
                            <span v-text="activeCategory.name"></span>
                          </span>
                          <inertia-link :href="categoryLink(activeCategory)"
                                        class="group flex items-center gap-1 text-xs font-semibold text-[#a58a5c] transition-colors hover:text-[#153a2e]">
                            <span>مشاهده همه</span>
                            <icon :name="icons.arrow" class="transition-transform group-hover:-translate-x-0.5" size="14"/>
                          </inertia-link>
                        </div>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3 lg:grid-cols-4">
                          <inertia-link v-for="child in activeCategory.children" :key="child.id"
                                        :href="categoryLink(child)"
                                        class="group block rounded-lg px-3 py-2 transition-colors hover:bg-[#f8f5ee]">
                            <span class="flex items-center gap-1 text-sm font-semibold text-neutral-800 transition-colors group-hover:text-[#153a2e]">
                              <span class="h-1 w-1 shrink-0 rounded-full bg-[#c3a26b]"/>
                              <span v-text="child.name"></span>
                              <icon :name="icons.arrow" class="mr-auto text-transparent transition-colors group-hover:text-[#a58a5c]" size="14"/>
                            </span>
                            <span v-if="hasChildren(child)" class="mt-1 flex flex-wrap gap-1 pr-2">
                              <span v-for="sub in child.children.slice(0, 6)" :key="sub.id"
                                    class="rounded-full bg-[#f3eee4] px-2 py-0.5 text-[11px] text-[#7d6538]" v-text="sub.name"></span>
                            </span>
                          </inertia-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

          </div>
        </div>
      </container>
    </div>

    <!-- منوی موبایل -->
    <Teleport to="#teleport">
      <transition name="overlay">
        <div v-if="mobileMenu" class="fixed inset-0 z-40 bg-neutral-900/50 backdrop-blur-sm lg:hidden"
             @click="mobileMenu = false"/>
      </transition>
      <transition name="drawer">
        <aside v-if="mobileMenu" id="mobile-menu"
               class="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
               aria-label="منوی موبایل">
          <div class="relative flex items-center justify-between border-b border-[#e9dfcb] px-4 py-3">
            <inertia-link class="flex items-center gap-2" href="/" title="فروشگاه اینترنتی والکسی" @click="mobileMenu = false">
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3eee4] ring-1 ring-[#e9dfcb]">
                <img alt="لوگوی والکسی" class="h-7 w-7" height="36" src="/logo/logo.svg" width="36">
              </span>
              <span class="leading-none">
                <span class="block text-md font-extrabold text-[#153a2e]">والکسی</span>
                <span class="mt-1 block text-[10px] font-medium text-neutral-400">کاغذدیواری و پوستر</span>
              </span>
            </inertia-link>
            <button class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8f5ee] text-neutral-500 transition-colors hover:bg-[#f3eee4] hover:text-[#153a2e]"
                    type="button" aria-label="بستن منو" @click="mobileMenu = false">
              <icon :name="icons.close" size="20"/>
            </button>
            <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-[#c3a26b]/60 to-transparent"/>
          </div>

          <div class="flex-1 overflow-y-auto px-4 py-4">
            <div class="mb-2 flex items-center gap-2 px-1">
              <icon :name="icons.grid" class="text-[#a58a5c]" size="17"/>
              <span class="text-xs font-bold text-neutral-400">دسته‌بندی محصولات</span>
            </div>

            <div v-for="category in categories" :key="category.id" class="border-b border-neutral-100 last:border-0">
              <div class="flex items-center">
                <inertia-link :href="categoryLink(category)"
                              class="flex flex-1 items-center gap-2 py-3 text-sm font-semibold text-neutral-700"
                              @click="mobileMenu = false">
                  <span class="h-1.5 w-1.5 rounded-full bg-[#c3a26b]"/>
                  <span v-text="category.name"></span>
                </inertia-link>
                <button v-if="hasChildren(category)" type="button"
                        class="flex h-8 w-8 items-center justify-center rounded-full text-[#a58a5c] transition-colors hover:bg-[#f8f5ee]"
                        :aria-label="'نمایش زیردسته‌های ' + category.name"
                        :aria-expanded="openMobileCategory === category.id ? 'true' : 'false'"
                        @click="toggleMobileCategory(category)">
                  <icon :name="icons.chevron" class="transition-transform duration-200"
                        :class="{'rotate-180' : openMobileCategory === category.id}" size="18"/>
                </button>
              </div>
              <div v-if="hasChildren(category)" v-show="openMobileCategory === category.id" class="pb-2 pr-3">
                <inertia-link v-for="child in category.children" :key="child.id"
                              :href="categoryLink(child)"
                              class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-neutral-600 transition-colors hover:bg-[#f8f5ee] hover:text-[#153a2e]"
                              @click="mobileMenu = false">
                  <icon :name="icons.arrow" class="text-[#c3a26b]" size="13"/>
                  <span v-text="child.name"></span>
                </inertia-link>
              </div>
            </div>

            <div class="mb-2 mt-5 flex items-center gap-2 px-1">
              <span class="h-3 w-1 rounded-full bg-[#c3a26b]"/>
              <span class="text-xs font-bold text-neutral-400">دسترسی سریع</span>
            </div>
            <nav class="grid grid-cols-1 gap-1">
              <inertia-link v-for="link in quickLinks" :key="link.title" :href="link.href" :title="link.title"
                            class="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-[#f8f5ee] hover:text-[#153a2e]"
                            @click="mobileMenu = false">
                <icon :name="link.icon" class="text-[#a58a5c]" size="17"/>
                <span v-text="link.title"></span>
                <icon :name="icons.arrow" class="mr-auto text-neutral-300" size="14"/>
              </inertia-link>
            </nav>
          </div>

          <div class="border-t border-[#e9dfcb] bg-[#f8f5ee] px-4 py-3">
            <inertia-link class="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#c3a26b] px-4 py-2.5 text-sm font-bold text-[#20342b] transition-colors hover:bg-[#d4b57e]"
                          href="/partners" title="همکاری با والکسی" @click="mobileMenu = false">
              <icon :name="icons.handshake" size="17"/>
              <span>همکاری با والکسی</span>
            </inertia-link>
            <div class="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
              <icon :name="icons.phone" class="text-[#a58a5c]" size="14"/>
              <span>پشتیبانی فروش:</span>
              <a class="font-semibold text-[#153a2e]" dir="ltr" href="tel:09904283848" v-text="getNumber('0990 428 3848')"></a>
            </div>
          </div>
        </aside>
      </transition>
    </Teleport>
  </header>
</template>

<script>
import User from '@/components/auth/user'

import {
  mdiAlertCircleOutline,
  mdiArrowLeft,
  mdiChevronDown,
  mdiClose,
  mdiDeskphone,
  mdiFrequentlyAskedQuestions,
  mdiHandshakeOutline,
  mdiMagnify,
  mdiMenu,
  mdiPhoneOutline,
  mdiRulerSquare,
  mdiTruckDeliveryOutline,
  mdiViewGridOutline
} from '@mdi/js';

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
    mobileMenu: false,
    openMobileCategory: null,
    icons: {
      search: mdiMagnify,
      chevron: mdiChevronDown,
      close: mdiClose,
      notice: mdiAlertCircleOutline,
      arrow: mdiArrowLeft,
      menu: mdiMenu,
      grid: mdiViewGridOutline,
      handshake: mdiHandshakeOutline,
      phone: mdiPhoneOutline,
    },
    quickLinks: [
      {title: 'قبل از خرید بدانید', href: '/before-buy', icon: mdiAlertCircleOutline},
      {title: 'همکاری با والکسی', href: '/partners', icon: mdiHandshakeOutline},
      {title: 'راهنمای اندازه‌گیری', href: '/measure', icon: mdiRulerSquare},
      {title: 'ارسال و مرجوعی', href: '/shipping-return', icon: mdiTruckDeliveryOutline},
      {title: 'سؤالات متداول', href: '/faq', icon: mdiFrequentlyAskedQuestions},
      {title: 'تماس با ما', href: '/contact', icon: mdiDeskphone},
    ]
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
    toggleMobileCategory(category) {
      this.openMobileCategory = this.openMobileCategory === category.id ? null : category.id
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
      this.mobileMenu = false
      this.$inertia.visit('/search?query=' + this.searchModel)
    },
    closeOnEscape(event) {
      if (event.key === 'Escape') {
        this.mobileMenu = false
        this.activeCategory = null
      }
    }
  },
  async mounted() {
    window.dispatchEvent(new Event('scroll'))
    window.addEventListener('scroll', this.scrolling)
    window.addEventListener('keydown', this.closeOnEscape)
    this.categories = await this.axios.get('/xcategory').then(res => res.data)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrolling)
    window.removeEventListener('keydown', this.closeOnEscape)
    if (typeof document !== 'undefined') document.body.style.overflow = ''
  },
  watch: {
    mobileMenu(value) {
      if (typeof document !== 'undefined') document.body.style.overflow = value ? 'hidden' : ''
    },
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
