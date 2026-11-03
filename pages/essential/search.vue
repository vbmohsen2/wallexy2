<template>
  <div class="mt-4">
    <div class="py-1 backdrop-blur-sm w-full sticky top-16 md:top-20 z-20">
      <div class="absolute top-0 left-0 w-full h-full bg-gray-300 opacity-30"/>
      <container>
        <row>
          <xmenu v-model="sortMenu" close-on-click right>
            <template #active="{active}">
              <aria icon @click="active">
                <div class="flex">
                  <icon :name="icons.sort" size="18"/>
                  <span class="px-1 text-sm">مرتب سازی</span>
                  <span v-if="sortType === 1">بر اساس گران ترین</span>
                  <span v-if="sortType === 2">بر اساس ارزان ترین</span>
                  <span v-if="sortType === 3">بر اساس جدید ترین</span>
                  <span v-if="sortType === 4">بر اساس پرفروش ترین</span>
                  <span v-if="sortType === 5">بر اساس محبوبت ترین</span>
                  <span v-if="sortType === 6">بر اساس پربازدید ترین</span>
                </div>
              </aria>
            </template>
            <div class="bg-white w-32 shadow-x py-2">
              <ul class="w-full">
                <li class="py-2 px-3 cursor-pointer hover:bg-neutral-100" @click="sort(1)">
                  <div class="flex">
                    <icon :name="icons.expensive" class="pl-2" size="16"/>
                    <span>گران ترین</span>
                  </div>
                </li>
                <li class="py-2 px-3 cursor-pointer hover:bg-neutral-100" @click="sort(2)">
                  <div class="flex">
                    <icon :name="icons.cheap" class="pl-2" size="16"/>
                    <span>ارزان ترین</span>
                  </div>
                </li>
                <li class="py-2 px-3 cursor-pointer hover:bg-neutral-100" @click="sort(3)">
                  <div class="flex">
                    <icon :name="icons.news" class="pl-2" size="16"/>
                    <span>جدید ترین</span>
                  </div>
                </li>
                <li class="py-2 px-3 cursor-pointer hover:bg-neutral-100" @click="sort(4)">
                  <div class="flex">
                    <icon :name="icons.seller" class="pl-2" size="16"/>
                    <span>پرفروش ترین</span>
                  </div>
                </li>
                <li class="py-2 px-3 cursor-pointer hover:bg-neutral-100" @click="sort(5)">
                  <div class="flex">
                    <icon :name="icons.heart" class="pl-2" size="16"/>
                    <span>محبوبت ترین</span>
                  </div>
                </li>
                <li class="py-2 px-3 cursor-pointer hover:bg-neutral-100" @click="sort(6)">
                  <div class="flex">
                    <icon :name="icons.eye" class="pl-2" size="16"/>
                    <span>پر بازدید ترین</span>
                  </div>
                </li>
              </ul>
            </div>
          </xmenu>
          <space/>
          <xdialog v-model="filterDialog" close-on-click right>
            <template #active="{active}">
              <aria icon @click="active">
                <div class="flex">
                  <span class="pl-1">فیلتر</span>
                  <icon :name="icons.filter" size="18"/>
                </div>
              </aria>
            </template>
            <div class="bg-white max-w-screen-xs w-96 overflow-hidden shadow-x rounded-xl">
              <row class="px-1 shadow-lg special py-2">
                <span class="py-2 px-2 text-md">فیلتر کردن</span>
                <space/>
                <btn icon="بستن منو" @click="filterDialog = false">
                  <icon :name="icons.close"/>
                </btn>
              </row>
              <div class="overflow-y-auto max-h-[80vh] scrollbar">
                <row>
                  <w class="bg-neutral-100 shadow-x">
                    <xswitch v-model="available" class="py-2.5 px-4 pb-3.5 text-md" label="فقط موجود"/>
                  </w>
                </row>
                <row>
                  <w class="py-3 px-3 bg-neutral-100">
                    <span class="text-md">قیمت</span>
                  </w>
                  <w class="px-4 py-5">
                    <div class="w-full relative">
                      <label>
                        <input ref="right" v-model="min" :max="$page.props.high" class="w-full top-[-10px] z-10 relative outline-none pointer-events-none appearance-none bg-transparent"
                               :min="$page.props.low"
                               step="2000" type="range" @change="setPrice">
                      </label>
                      <label>
                        <input ref="left" v-model="max" :max="$page.props.high"
                               class="w-full z-10 -top-[39px] relative outline-none pointer-events-none appearance-none bg-transparent"
                               :min="$page.props.low" step="2000"
                               type="range" @change="setPrice">
                      </label>
                      <div class="absolute left-0 z-0 bg-neutral-300 w-full h-0.5 top-0"></div>
                    </div>
                    <div class="flex justify-around -mt-3">
                      <div>
                        <span class="block text-center">از</span>
                        <span class="block text-center font-bold text-md" v-text="getPrice(min)"></span>
                        <span class="block text-center">تومان</span>
                      </div>
                      <div>
                        <span class="block text-center">تا</span>
                        <span class="block text-center font-bold text-md" v-text="getPrice(max)"></span>
                        <span class="block text-center">تومان</span>
                      </div>
                    </div>
                  </w>
                </row>
              </div>
              <div>
                <row class="py-3 px-1.5 special shadow-x">
                  <div class="px-1.5 w-full">
                    <button class="w-full py-2 border-neutral-700 rounded-full border text-neutral-700 focus:outline-none transform transition-all active:scale-95"
                            @click="refresh()">اعمال تغییرات
                    </button>
                  </div>
                </row>
              </div>
            </div>
          </xdialog>
        </row>
      </container>
    </div>
    <container>
      <row class="-mx-1">
        <inertia-link v-for="product in products" :key="product.id" :href="'/product/' + product.id + '/' + product.name.toString().replace(/\s/g  , '-')"
                      class="mt-6 px-3 product-item sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <card>
            <img :alt="product.name" :src="product.photo ? product.photo.normal : '/logo/logo.svg'"/>
            <div class="p-3">
              <span class="h-10 overflow-hidden block text-center" v-text="product.name"></span>
              <div v-if="product.model && product.model.count > 0">
                <div v-if="product.model.percent > 0" class="flex mt-3 justify-end text-md">
                  <del class="pr-1.5" v-text="getPrice(product.model.price)"></del>
                  <span class="font-bold overflow-hidden block pr-1.5" v-text="getPrice(product.model.calculated)"></span>
                  <span class="pr-0.5 font-bold text-sm pt-0.5 block">تومان</span>
                </div>
                <div v-else class="flex justify-end text-md mt-3">
                  <span class=" font-bold overflow-hidden block" v-text="getPrice(product.model.price)"></span>
                  <span class="pr-0.5 font-bold text-sm pt-0.5">تومان</span>
                </div>
              </div>
              <div v-else class="flex justify-end text-md mt-3">
                <span class="pr-0.5 font-bold text-sm pt-1">ناموجود</span>
              </div>
            </div>
          </card>
        </inertia-link>
      </row>
    </container>
  </div>
  <inertia-head>
    <title>جستجوی محصولات</title>
  </inertia-head>
</template>
<script>
import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiBasketPlus,
  mdiCalendar,
  mdiCashMinus,
  mdiCashPlus,
  mdiClose,
  mdiEyeOutline,
  mdiFilter,
  mdiHeart,
  mdiPlusBoxOutline,
  mdiShape,
  mdiSort
} from '@mdi/js';

export default {
  data() {
    return {
      lock: false,
      sortMenu: false,
      available: false,
      filterDialog: false,
      min: this.$page.props.low,
      max: this.$page.props.high,
      sortType: this.$page.props.sort,
      products: this.$page.props.products,
      icons: {
        plus: mdiPlusBoxOutline,
        sort: mdiSort,
        close: mdiClose,
        category: mdiShape,
        filter: mdiFilter,
        left: mdiArrowLeft,
        right: mdiArrowRight,
        cheap: mdiCashMinus,
        expensive: mdiCashPlus,
        heart: mdiHeart,
        news: mdiCalendar,
        seller: mdiBasketPlus,
        eye: mdiEyeOutline,
      },
    }
  },
  methods: {
    setParams(key, value) {
      let search = new URLSearchParams(window.location.search)
      search.set(key, value)
      window.history.replaceState(null, 'path', window.location.pathname + '?' + search.toString().replaceAll('%2C', '.'))
    },
    setPrice() {
      this.setParams('min', this.min)
      this.setParams('max', this.max)
    },
    sort(type) {
      if (type === this.sortType) return false
      this.sortType = type
      this.setParams('sort', type)
      this.refresh()
    },
    reset() {
      this.filterDialog = false
      this.$inertia.visit(window.location.pathname)
    },
    refresh() {
      this.filterDialog = false
      this.$inertia.visit(window.location.pathname + window.location.search)
    },
    match() {
      let search = new URLSearchParams(window.location.search)
      if (search.get('min')) this.min = search.get('min')
      if (search.get('max')) this.max = search.get('max')
    }
  },
  mounted() {
    this.match()
  },
  watch: {
    min(value) {
      if (parseInt(value) > this.max) this.min = this.max
    },
    max(value) {
      if (parseInt(value) < this.min) this.max = this.min
    },
    available: function (val) {
      this.setParams('available', val)
    }
  }
}
</script>

