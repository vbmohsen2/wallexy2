<template>
  <header class="fixed w-full p-2 z-30">
    <container>
      <row class="-mx-2 md:-mx-0">
        <w class="relative mt-1.5">
          <div class="h-16 md:h-20 w-full rounded-xl absolute overflow-hidden center px-4 bg-white opacity-50"/>
          <div id="blur" class="h-16 md:h-20 backdrop-blur rounded-xl shadow-md flex justify-center items-center">
            <div class="h-12 w-full flex items-center justify-between px-3">
              <div class="flex">
                <xsheet v-model="menuDialog">
                  <template #active="{active}">
                    <aria label="منو دسته بندی ها" @click="active">
                      <icon :name="icons.menu" class="transform rotate-90"></icon>
                    </aria>
                  </template>
                  <div class="flex bg-white shadow-x rounded-xl">
                    <row class="py-3 px-3 -mt-3 md: md:-mt-1.5 w-full">
                      <w>
                        <row class="justify-center">
                          <btn label="بستن منو دسته بندی ها" @click="menuDialog = false">
                            <icon :name="icons.up" size="30"></icon>
                          </btn>
                        </row>
                      </w>
                      <w class="mt-4 pb-3">
                        <span>دسته بندی محصولات</span>
                      </w>
                      <w class="pb-3 overflow-y-auto max-h-[60vh]">
                        <row>
                          <w v-for="(category) in categories" :key="category.id">
                            <category :category="category" :depth="1" @close="menuDialog = false"/>
                          </w>
                        </row>
                      </w>
                    </row>
                  </div>
                </xsheet>
                <xsheet v-model="searchDialog">
                  <template #active="{active}">
                    <aria class="mr-4 md:mr-10 xl:mr-16" label="منوی جستجوی محصولات" @click="active">
                      <icon :name="icons.search"></icon>
                    </aria>
                  </template>
                  <div class="bg-white shadow-x rounded-xl">
                    <row class="py-3 px-3 w-full" @click="searchDialog = false">
                      <w>
                        <row class="justify-center">
                          <btn label="بستن منوی جستجوی محصولات">
                            <icon :name="icons.up" size="30"></icon>
                          </btn>
                        </row>
                      </w>
                    </row>
                    <row class="p-4">
                      <label class="w-full relative">
                        <span class="block mb-2">جستجوی محصولات</span>
                        <input :value="searchModel" class="focus:outline-none px-3 pr-12 h-12 w-full bg-neutral-200 rounded-full" type="text"
                               @input="searchModel = $event.target.value">
                        <icon :class="{'animate-bounce' : animate}" :name="icons.search" class="absolute bottom-3 right-3"/>
                      </label>
                    </row>
                    <row class="px-4 pb-3 overflow-hidden">
                      <expand>
                        <expand>
                          <div v-show="products.length > 0">
                            <inertia-link @click="searchDialog = false" v-for="product in products" :key="product.id" :href="'/product/' + product.id + '/' + product.name.toString().replace(/\s/g  , '-')"
                                          :title="product.name" class="py-2 mt-3 border border-neutral-200 rounded-full px-2 flex w-full">
                              <icon :name="icons.search" class="pl-1" size="16"/>
                              <span v-text="product.name"></span>
                            </inertia-link>
                            <w>
                              <row class="mt-3">
                                <space/>
                                <btn class="-ml-2" @click="navigate">
                                  نمایش همه محصولات
                                </btn>
                              </row>
                            </w>
                          </div>
                        </expand>
                      </expand>
                    </row>
                  </div>
                </xsheet>
              </div>
              <inertia-link href="/" title="فروشگاه اینترنتی والکسی">
                <div class="pt-1"><img alt="لوگوی فروشگاه اینترنتی والکسی" class="w-10 h-10" height="40" src="/logo/logo.svg" width="40"></div>
              </inertia-link>
              <user/>
            </div>
          </div>
        </w>
      </row>
    </container>
  </header>
</template>
<script>

import User from '@/components/auth/user'
import Expand from "@/transitions/expand";
import Category from "@/components/custom/xcategory";

import {mdiShoppingOutline, mdiMenu, mdiMagnify, mdiShape, mdiChevronUp} from '@mdi/js';

export default {
  components: {User, Expand, Category},
  data: () => ({
    timer: 0,
    email: '',
    scroll: false,
    searchModel: '',
    menuDialog: false,
    searchDialog: false,
    products: [],
    animate: false,
    categories: [],
    icons: {
      menu: mdiMenu,
      search: mdiMagnify,
      up: mdiChevronUp,
      category: mdiShape,
      basket: mdiShoppingOutline,
    }
  }),
  methods: {
    scrolling() {
      this.scroll = window.scrollY > 1
    },navigate() {
      this.searchDialog = false
      this.$inertia.visit('/search?query=' + this.searchModel)
    }
  },
  async mounted() {
    window.dispatchEvent(new Event('scroll'))
    window.addEventListener('scroll', this.scrolling)
    this.categories = await this.axios.get('/xcategory').then(res => res.data)
  },
  watch: {
    menuDialog(value) {
      if (value) this.searchDialog = false
    },
    searchDialog(value) {
      if (value) this.menuDialog = false
    },
    searchModel(value) {
      if (value) this.menuDialog = false
      clearTimeout(this.timer)
      this.animate = value.length > 2
      this.timer = setTimeout(() => {
        if (value.length > 2) {
          this.axios.post('/search', {query: value.toString().trim()})
              .then(res => {
                this.products = res.data
                this.menu = true;
                this.animate = false;
                if (this.products.length === 0) this.$store.dispatch('alerts/update', {message: 'چیزی برای نمایش پیدا نشد.', type: 'warning'});
              }).catch(() => {
            this.products = []
            this.menu = false;
            this.animate = false;
            this.$store.dispatch('alerts/update', {message: 'چیزی برای نمایش پیدا نشد.', type: 'warning'});
          })
        } else {
          this.animate = false
          this.menu = false
        }
      }, 1000)
    }
  }
}
</script>
