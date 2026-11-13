<template>
  <div class="mt-3 md:mt-6">
    <container>
      <row class="relative">
        <w md="1/2">
          <row>
            <w>
              <photo v-if="product.photos.length > 0" :name="product.name" :photos="product.photos"/>
            </w>
          </row>
        </w>
        <w class="pt-8 md:pt-0 md:px-12 lg:px-16 xl:px-28" md="1/2">
          <div class="min-h-full flex flex-col justify-center">
            <w class="relative mb-8 md:mb-16">
              <h1 class="text-lg text-center md:text-right lg:text-2xl font-bold" v-text="product.name"></h1>
              <div
                  class="mt-8 md:mt-0 justify-center md:justify-start md:absolute md:-left-14 lg:-left-16 lg:-ml-2 xl:-left-28 flex md:h-24 md:flex-col top-0">
                <xmenu v-model="informationMenu" :right="mobile">
                  <template #active="{active}">
                    <aria label="اطلاعات محصول" @click="active">
                      <icon :name="icons.alert" size="22"></icon>
                    </aria>
                  </template>
                  <div class="bg-white shadow-x py-1 transform translate-x-1 md:translate-x-1.5">
                    <ul class="w-full ltr">
                      <li class="py-1.5  px-2.5">
                        <div class="flex">
                          <icon :name="icons.heart" class="pr-1" size="16"/>
                          <span v-text="product.favourites ? getNumber(product.favourites.meta.total) : getNumber('0')"></span>
                        </div>
                      </li>
                      <li class="py-1.5  px-2.5">
                        <div class="flex">
                          <icon :name="icons.comment" class="pr-1" size="16"/>
                          <span v-text="getNumber(product.comments.length)"></span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </xmenu>
                <xmenu v-model="shareMenu" :right="mobile">
                  <template #active="{active}">
                    <aria label="به اشتراک گذاری" @click="active">
                      <icon :name="icons.share" size="22"></icon>
                    </aria>
                  </template>
                  <div class="bg-white w-40 shadow-x py-2 transform translate-x-1 md:translate-x-1.5">
                    <row class="justify-center">
                      <a :href="'https://twitter.com/intent/tweet?url=' + this.path" title="به اشتراک گذاری در توییتر">
                        <aria label="توییتر">
                          <icon :name="icons.twitter" size="24"/>
                        </aria>
                      </a>
                      <a :href="'https://t.me/share/url?url=' + this.path" title="به اشتراک گذاری در تلگرام">
                        <aria label="تلگرام">
                          <icon
                              name="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"
                              size="24"/>
                        </aria>
                      </a>
                      <a :href="'https://wa.me/?text=' + 'خرید ' + this.product.name + ' با قیمت مناسب و تحویل فوری از فروشگاه اینترنتی والکسی ' + this.path "
                         title="به اشتراک گذاری در واتساپ">
                        <aria label="واتساپ">
                          <icon :name="icons.whatsapp" size="24"/>
                        </aria>
                      </a>
                      <aria label="کپی لینک" @click="link">
                        <icon :name="icons.web" size="24"/>
                      </aria>
                    </row>
                  </div>
                </xmenu>
                <xdialog v-model="priceDialog">
                  <template #active>
                    <aria label="نمودار قیمت" @click="addScripts">
                      <icon :name="icons.chart" size="22"/>
                    </aria>
                  </template>
                  <chart :models="product.models" class="relative" @close="closePrice"/>
                </xdialog>
                <btn v-if="isFavourite" label="افزودن به لیست دلخواه">
                  <icon :name="icons.heart" size="22" @click="favourite"/>
                </btn>
                <btn v-else label="حذف کردن از لیست دلخواه">
                  <icon :name="icons.heartEmpty" size="22" @click="favourite"/>
                </btn>
                <btn class="-mr-0.5" label="برگشت به دسته بندی این محصول" @click="back">
                  <icon :name="icons.parent" size="22"/>
                </btn>
              </div>
            </w>
            <inertia-link
                class="group mb-8 flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-l from-sky-600 to-blue-700 px-4 py-3 text-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                href="/partners" title="شروع همکاری با والکسی">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <icon :name="icons.partner" size="22"/>
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-extrabold sm:text-base">آیا همکار هستید؟</span>
                <span class="mt-0.5 block text-[11px] leading-5 text-sky-50 sm:text-xs">برای شروع همکاری و دریافت آلبوم‌ها کلیک کنید</span>
              </span>
              <icon :name="icons.arrow" class="shrink-0 transition-transform group-hover:-translate-x-0.5" size="20"/>
            </inertia-link>
            <w v-if="administrator" class="text-lg mb-8 text-center md:text-right ">
              <div class="justify-center md:justify-end flex flex-row-reverse">
                <xdialog v-model="editorDialog">
                  <template #active="{active}">
                    <aria label="توضیحات" @click="active">
                      <icon :name="icons.description" size="20"/>
                    </aria>
                  </template>
                  <editor :desc="product.description" :pid="product.id" @close="updateDescription"/>
                </xdialog>
                <aria label="کپی" @click="$inertia.visit('/xproduct/'+ product.id + '/duplicate')">
                  <icon :name="icons.copy" size="20"/>
                </aria>
                <xdialog v-model="deleteDialog">
                  <template #active="{active}">
                    <aria label="حذف" @click="active">
                      <icon :name="icons.delete" size="20"/>
                    </aria>
                  </template>
                  <div class="w-64 p-3 bg-white">
                    <row class="p-3 text-md"> آیا مطمئن هستید ؟</row>
                    <row>
                      <div class="relative text-sm">
                        <btn @click="deleteDialog = false">
                          کنسل
                        </btn>
                        <btn @click="deleteProduct">
                          تایید
                        </btn>
                      </div>
                      <space/>
                    </row>
                  </div>
                </xdialog>
                <aria label="ویرایش" @click="$inertia.visit('/xproduct/'+ product.id + '/edit')">
                  <icon :name="icons.edit" size="20"/>
                </aria>
              </div>
            </w>
            <div class="text-neutral-600 mb-8 flex justify-center md:justify-start">
              <span v-for="(feature , i) in  product.features" :key="i" class="px-3 md:pr-0" v-text="feature"/>
            </div>
            <div v-if="available && availableModels.length > 1" class="mb-8 w-52 max-w-full flex mx-auto md:mx-0">
              <xmenu v-model="menu" class="w-full" close-on-click>
                <template #active="{active}">
                  <div class="w-full relative bg-white rounded-full border-neutral-700 border px-3 py-2 flex cursor-pointer" @click="active">
                    <div class="" v-text="availableModels[selectedModel].name"></div>
                    <space/>
                    <icon :class="menu ? 'rotate-180' : 'rotate-0'" :name="icons.menu" class="transform transition-transform" size="16"></icon>
                  </div>
                </template>
                <row class="w-52 bg-white transform -translate-y-1 shadow-x py-2">
                  <w v-for="(model , index) in availableModels" :key="model.id" class="py-3 px-3 hover:bg-neutral-100 cursor-pointer" @click="selectedModel = index ">
                    <span class="flex" v-text="model.name"></span>
                  </w>
                </row>
              </xmenu>
            </div>
            <w v-if="available" class="text-lg mb-8 text-center md:text-right ">
              <div v-if="availableModels[selectedModel].percent > 0">
                <span class="font-bold" v-text="poster ? 'هر متر مربع ' : 'هر ' +  product.type"></span>
                <del class="pr-1" v-text="getPrice(availableModels[selectedModel].price)"></del>
                <span class="pr-1 font-bold" v-text="getPrice(availableModels[selectedModel].calculated) + ' تومان'"></span>
              </div>
              <div v-else>
                <span class="font-bold" v-text="poster ? 'هر متر مربع ' : 'هر ' +  product.type"></span>
                <span class="font-bold pr-1" v-text="getPrice(availableModels[selectedModel].price) + ' تومان'"></span>
              </div>
              <div class="text-sm mt-1 text-gray-500">
                <span>بروزرسانی قیمت </span>
                <span v-text="getTime"></span>
                <span> روز پیش</span>
              </div>
            </w>
            <div v-if="available && !poster" class="mb-5 w-52 max-w-full mx-auto md:mx-0 flex ltr">
              <button
                  class="w-12 relative border-neutral-700 rounded-l-full bg-white border px-3 pt-1 pb-[5px] flex cursor-pointer flex justify-center focus:outline-none transition transform active:scale-95"
                  @click="parseInt(count) >= parseInt(availableModels[selectedModel].count) ? null : count = (parseInt(count) + 1).toString()">
                <icon :name="icons.up" size="20"></icon>
              </button>
              <label class="relative">
                <span class="absolute z-10 top-2 right-3">تعداد</span>
                <input v-model="count" aria-label="تعداد"
                       class="w-[104px] ml-1 relative font-mono text-[18px] bg-white border-neutral-700 border px-3 pr-10 py-0.5 text-left focus:outline-none" type="number"
                       @blur="count === '' ? count =  cleardCount : null" @focus="clearNumber()">
              </label>
              <button
                  class="w-12 ml-1 relative border-neutral-700 rounded-r-full bg-white border px-3 pt-1 pb-[5px] flex cursor-pointer flex justify-center focus:outline-none transition transform active:scale-95"
                  @click="count < 2 ? count = 1 : --count">
                <icon :name="icons.down" class="transform transition-transform" size="20"></icon>
              </button>
            </div>
            <div v-if="available && poster" class="mb-5 w-52 max-w-full mx-auto md:mx-0 flex mt-1.5 relative ltr">
              <label class="relative">
                <span class="absolute z-10 top-1.5 right-2">ارتفاع</span>
                <input v-model="height" class="poster-input relative bg-white border-neutral-700 rounded-l-full border pl-2 pr-10 py-1.5 text-left focus:outline-none" type="number"
                       @blur="height === '' ? height =  '0' : null" @focus="height === '0' ? height = '' : null ">
              </label>
              <label class="relative">
                <span class="absolute z-10 top-1.5 right-2">عرض</span>
                <input v-model="width" class="poster-input ml-2 relative bg-white border-neutral-700 rounded-r-full border pl-2 pr-9 py-1.5 text-left focus:outline-none"
                       type="number"
                       @blur="width === '' ? width =  '0' : null" @focus="width === '0' ? width = '' : null ">
              </label>
              <span v-if="height && height > 0" class="absolute overflow-hidden overflow-ellipsis whitespace-nowrap w-24 -top-6 right-28 text-right rtl transform translate-x-1"
                    v-text="getDimension(height)"></span>
              <span v-if="width && width > 0" class="absolute overflow-hidden overflow-ellipsis whitespace-nowrap w-24 -top-6 right-0 text-right rtl"
                    v-text="getDimension(width)"></span>
            </div>
            <xdialog v-model="quideDialog">
              <template #active="{active}">
                <div  v-if="available" class="w-full flex">
                  <button class="mb-5 px-6 py-2 mx-auto md:mx-0 text-center rounded-full border border-neutral-600 relative md:justify-start w-52" @click="active">
                    <icon :name="icons.circle" class="text-neutral-500 absolute right-2" size="16"/>
                    <icon :name="icons.circle" class="text-neutral-900 absolute right-2 animate-ping" size="16"/>
                    <span class="block -mt-0.5">راهنمای خرید</span>
                    <icon :name="icons.circle" class="text-neutral-500 absolute left-2 top-2" size="16"/>
                    <icon :name="icons.circle" class="text-neutral-900 absolute left-2 top-2 animate-ping" size="16"/>
                  </button>
                </div>
              </template>
              <div class="w-[90vw] md:w-[500px] p-3 bg-white rounded-xl">
                <row class="border-b border-gray-200 pb-2 w-full">
                  <btn icon @click="quideDialog = false">
                    <icon :name="icons.close"></icon>
                  </btn>
                </row>
                <div class="p-3">
                  <span v-if="availableModels[selectedModel].count > 1000"  class="block py-1">تمامی کدهای این آلبوم موجود است</span>
                  <span v-else class="block py-1">لطفا قبل از خرید محصول, موجودی کد مورد نظر خود را استعلام بگیرید</span>
                  <span class="block py-1">پس از ثبت سفارش همکاران ما جهت دریافت کد محصول و ارائه اطلاعات تکمیلی درباره سفارش را به اطلاع شما خواهند رساند</span>
                  <span class="block py-1">سفارش های موجود در انبار های والکسی حداکثر تا یک روز کاری ارسال خواهد شد</span>
                  <span class="block py-1">سفارش های ناموجود در انبار های والکسی حداکثر تا دو روز کاری و به صورت مستقیم از شرکت سازنده ارسال خواهد شد</span>
                </div>
                <row class="w-full justify-end border-t border-gray-200 pt-2">
                  <btn @click="quideDialog = false">
                    <icon :name="icons.check" size="20"/>
                    <span class="pr-1">متوجه شدم</span>
                  </btn>
                </row>
              </div>
            </xdialog>
            <div v-if="available" class="w-52 max-w-full mx-auto md:mx-0 relative">
              <button
                  class="ml-2 w-full relative bg-neutral-900 rounded-full text-white px-3 py-2 flex cursor-pointer flex justify-center focus:outline-none transition transform active:scale-95"
                  @click="add">
                افزودن به سبد خرید
              </button>
              <div
                  class="justify-center hidden w-0.25 md:justify-start md:absolute md:-left-28 translate-x-1 lg:-left-56 xl:-left-72 md:flex md:flex-col bottom-0 transform  xl:translate-x-7">
                <div class="md:flex justify-center">
                  <div class="w-[1px] h-20 bg-neutral-900"></div>
                </div>
              </div>
            </div>
            <div v-else class="text-lg font-bold text-center md:text-right">
              <icon :name="icons.unavailale" class="text-rose-600" inline/>
              <span class="font-bold inline-flex transform -translate-y-2">عدم تولید</span>
              <icon :name="icons.unavailale" class="text-rose-600" inline/>
            </div>
          </div>
        </w>
      </row>
    </container>
    <slider v-if="product.relates && product.relates.length > 0" class="-mb-2 mt-6" name="کد های مکمل">
      <inertia-link v-for="relate in product.relates" :key="relate.id" :href="'/product/' + relate.id + '/' + relate.name.toString().replace(/\s/g  , '-')"
                    class="px-1.5">
        <card class="w-slide">
          <img :alt="relate.name" :src="relate.photo ? relate.photo.normal : '/logo/logo.svg'"/>
          <div class="p-3">
            <span class="h-10 overflow-hidden block text-center" v-text="relate.name"></span>
            <div v-if="relate.model && relate.model.count > 0">
              <div v-if="relate.model.percent > 0" class="flex mt-3 justify-end text-md">
                <del class="pr-1.5" v-text="getPrice(relate.model.price)"></del>
                <span class="font-bold overflow-hidden block pr-1.5" v-text="getPrice(relate.model.calculated)"></span>
                <span class="pr-0.5 font-bold text-sm pt-0.5 block">تومان</span>
              </div>
              <div v-else class="flex justify-end text-md mt-3">
                <span class=" font-bold overflow-hidden block" v-text="getPrice(relate.model.price)"></span>
                <span class="pr-0.5 font-bold text-sm pt-0.5">تومان</span>
              </div>
            </div>
            <div v-else class="flex justify-end text-md mt-3">
              <icon :name="icons.unavailale"/>
              <span class="pr-0.5 font-bold text-sm pt-1">عدم تولید</span>
              <icon :name="icons.unavailale"/>
            </div>
          </div>
        </card>
      </inertia-link>
    </slider>
    <div class="mt-12 py-3 bg-gray-100">
      <row class="px-4 justify-center">
        <w md="1/3">
          <row class="justify-center">
            <icon :name="icons.warranty" class="animate-pulse" size="28"/>
            <span class="pt-1.5 pr-2">تضمین اصالت و کیفیت کالا</span>
          </row>
        </w>
        <w md="1/3" class="mt-2 md:mt-0">
          <row class="justify-center">
            <icon :name="icons.truck" class="animate-pulse" size="32"/>
            <span class="pt-1.5 pr-2">ارسال مستقیم و بدون واسطه از شرکت سازنده</span>
          </row>
        </w>
      </row>
    </div>
    <section class="mt-8">
      <container>
        <div class="rounded-xl bg-neutral-100 px-3 py-4 border border-neutral-200/80 sm:px-5 sm:py-5">
          <div class="mb-3 flex items-center justify-between gap-3 px-1">
            <h2 class="text-sm font-extrabold text-neutral-800 sm:text-base">قبل از خرید بدانید</h2>
            <inertia-link class="hidden items-center gap-1 text-xs font-semibold text-neutral-500 transition-colors hover:text-[#153a2e] sm:flex"
                          href="/before-buy" title="راهنمای کامل خرید">
              <span>راهنمای کامل خرید</span>
              <icon :name="icons.arrow" size="14"/>
            </inertia-link>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <inertia-link v-for="item in beforeBuy" :key="item.title" :href="item.link" :title="item.title"
                          class="group flex flex-col items-center rounded-lg bg-white px-3 py-4 text-center border border-neutral-200/70 transition-shadow hover:shadow-md hover:border-[#c3a26b]/50 focus:outline-none focus-visible:border-[#c3a26b]">
              <div class="flex items-center justify-center gap-2">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3eee4] text-[#a58a5c]">
                  <icon :name="item.icon" size="18"/>
                </span>
                <h3 class="text-xs font-extrabold text-neutral-800 sm:text-sm" v-text="item.title"></h3>
              </div>

              <p class="mt-2 flex-1 text-[11px] leading-6 text-neutral-500 sm:text-xs" v-text="item.text"></p>

              <span class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#153a2e] transition-colors group-hover:text-[#c3a26b] sm:text-xs">
                <span v-text="item.action"></span>
                <icon :name="icons.arrow" class="transition-transform group-hover:-translate-x-0.5" size="13"/>
              </span>
            </inertia-link>
          </div>
        </div>
      </container>
    </section>
  </div>
</template>
<script>
import {
  mdiChartTimelineVariant,
  mdiCheckCircleOutline,
  mdiCloseOutline,
  mdiCommentTextOutline,
  mdiSelectCompare,
  mdiContentCopy,
  mdiCheckboxBlankCircle,
  mdiDeleteOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiPencil,
  mdiClose,
  mdiPlus,
  mdiShieldCheckOutline,
  mdiTruckCheckOutline,
  mdiTextBoxMultipleOutline,
  mdiShare,
  mdiStar,
  mdiStarHalf,
  mdiStarOutline,
  mdiTwitter,
  mdiLink,
  mdiInformationVariant,
  mdiWhatsapp,
  mdiMenuLeft, mdiMenuDown,
  mdiChevronUp,
  mdiChevronDown, mdiHomeExportOutline,
  mdiArrowLeft, mdiHandshakeOutline, mdiRulerSquare, mdiTruckDeliveryOutline
} from '@mdi/js';

import Chart from '@/components/product/chart'
import Photo from '@/components/product/photo'
import Editor from "@/components/product/editor";

export default {
  components: {Editor, Chart, Photo},
  props: ['product', 'category'],
  data() {
    return {
      rating: 0,
      priceDialog: false,
      informationMenu: false,
      shareMenu: false,
      menu: false,
      share: false,
      count: '1',
      width: '0',
      height: '0',
      full: false,
      quideDialog: false,
      editorDialog: false,
      deleteDialog: false,
      releaseFav: true,
      isFavourite: false,
      selectedModel: 0,
      mobile: false,
      path: '',
      cleardCount: '',
      icons: {
        arrow: mdiArrowLeft,
        partner: mdiHandshakeOutline,
        plus: mdiPlus,
        warranty: mdiShieldCheckOutline,
        truck: mdiTruckCheckOutline,
        unavailale: mdiClose,
        parent: mdiHomeExportOutline,
        left: mdiMenuLeft,
        menu: mdiMenuDown,
        up: mdiChevronUp,
        down: mdiChevronDown,
        star: mdiStar,
        edit: mdiPencil,
        description: mdiTextBoxMultipleOutline,
        close: mdiCloseOutline,
        alert: mdiInformationVariant,
        circle: mdiCheckboxBlankCircle,
        share: mdiShare,
        heart: mdiHeart,
        copy: mdiContentCopy,
        starHalf: mdiStarHalf,
        chart: mdiChartTimelineVariant,
        heartEmpty: mdiHeartOutline,
        check: mdiCheckCircleOutline,
        compare: mdiSelectCompare,
        comment: mdiCommentTextOutline,
        starEmpty: mdiStarOutline,
        delete: mdiDeleteOutline,
        web: mdiLink,
        telegram: mdiLink,
        twitter: mdiTwitter,
        whatsapp: mdiWhatsapp,
      },
      beforeBuy: [
        {
          icon: mdiTruckDeliveryOutline,
          title: 'نحوه ارسال و شرایط مرجوعی',
          text: 'از هزینه و زمان ارسال سفارش و شرایط بازگشت کالا مطلع شوید.',
          action: 'مشاهده راهنما',
          link: '/shipping-return'
        },
        {
          icon: mdiRulerSquare,
          title: 'نحوه اندازه‌گیری کاغذ دیواری',
          text: 'با راهنمای اندازه‌گیری و محاسبه‌گر آنلاین، تعداد رول مورد نیاز دیوار خود را دقیق حساب کنید.',
          action: 'محاسبه تعداد رول',
          link: '/measure'
        }
      ]
    }
  },
  computed: {
    authenticated() {
      return this.$page.props.authenticated
    },
    administrator() {
      return this.authenticated && this.$page.props.user && this.$page.props.user.type > 0
    },
    available() {
      return this.availableModels.length > 0
    },
    availableModels() {
      return this.product.models.filter(model => model.count > 0)
    },
    bags() {
      return this.$store.state.basket.bags;
    },
    poster() {
      return this.product.type === 'پوستر'
    },
    getTime() {
      const product = new Date(this.product.models[0].updated_at)
      return this.getNumber(Math.ceil(Math.abs((product.getTime() - Date.now())) / (1000 * 60 * 60 * 24)))
    },
  },
  methods: {
    clearNumber() {
      this.cleardCount = this.count
      this.count = ''
    },
    updateDescription() {
      this.editorDialog = false
      this.$emit('update-product')
    },
    deleteProduct() {
      this.axios.delete('/xproduct/' + this.product.id)
          .then(res => {
            if (res.status === 200) this.$inertia.visit('/category/' + this.product.category.name.toString().replace(/\s/g, '-'))
            this.$store.dispatch('alerts/update', {message: 'محصول ' + this.product.name + ' با موفقیت حذف شد.', type: 'success'})
          })
          .catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}))
    },
    back() {
      if (this.category) window.history.back()
      else this.$inertia.visit('/category/' + this.product.category.name.toString().replace(/\s/g, '-'))
    },
    add() {
      if (!this.available) return;
      if (this.full && !this.poster) {
        this.$store.dispatch('alerts/update', {message: 'شما حداکثر موجودی محصول را به سبد خرید خود اضافه کرده اید', type: 'success', time: 6000})
        return
      }
      if (this.bags.filter(bag => bag.pid === this.product.id && (bag.model === this.availableModels[this.selectedModel].name)).length > 0) {
        let target = this.bags.find(bag => bag.pid === this.product.id && (bag.model === this.availableModels[this.selectedModel].name))
        if (target.count + parseInt(this.count) > target.max && !this.poster) {
          const message = 'شما نهایتا ' + this.getNumber(target.max) + ' ' + target.type + ' از این محصول را میتوانید به سبد خرید خود اضافه کنید , در حال حاضر ' + this.getNumber(target.count)
              + ' ' + target.type + ' از این در سبد خرید شما موجود است و شما میتواند فقط ' + this.getNumber(target.max - target.count) + ' ' + target.type + ' را به سبد خرید خود اضافه کنید'
          this.$store.dispatch('alerts/update', {message: message, type: 'error', time: 12000})
          this.count = target.max - target.count
          return;
        }
      }
      if (this.poster && (!this.width || parseInt(this.width) < 1 || !this.height || parseInt(this.height) < 1)) {
        this.$store.dispatch('alerts/update', {
          message: 'ابعاد پوستر بسیار کوچک است',
          type: 'error',
          time: 12000
        })
        return;
      }
      if (this.authenticated) this.$store.dispatch('basket/add', {
        product: this.product,
        type: this.product.type,
        model: this.availableModels[this.selectedModel],
        count: this.poster ? 1 : parseInt(this.count),
        width: this.poster ? parseInt(this.width) : undefined,
        height: this.poster ? parseInt(this.height) : undefined,
      });
      else this.addAndclearBagInCookie()
    },
    favourite() {
      if (!this.releaseFav) return;
      this.releaseFav = false;
      this.axios.post('/xproduct/' + this.product.id + '/favourite')
          .then(res => {
            if (res.status === 200) this.releaseFav = true
            this.isFavourite ? this.isFavourite = false : this.isFavourite = true;
            this.$emit('update-product')
          })
          .catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}))
    },
    addAndclearBagInCookie() {
      this.$store.commit('basket/add', {
        product: this.product,
        type: this.product.type,
        model: this.product.models[this.selectedModel],
        count: parseInt(this.count)
      })
    },
    checkFavourite() {
      if (!this.authenticated) return;
      this.axios.get('/xproduct/' + this.product.id + '/heart')
          .then(res => {
            if (res.status === 200) this.isFavourite = res.data.type === 1
          })
    },
    getDimension(dimension) {
      if (dimension < 100) {
        return this.getNumber(dimension) + ' سانتی متر'
      } else if (dimension >= 100 && dimension < 100000) {
        return this.getNumber(dimension / 100) + ' متر'
      } else {
        return this.getNumber(dimension / 100000) + ' کیلو متر'
      }
    },
    link() {
      console.log(this.$inertia.page.url)
      let textarea = document.createElement('textarea')
      textarea.textContent = 'https://wallexy.com' + this.$inertia.page.url
      document.body.appendChild(textarea)
      let selection = document.getSelection()
      let range = document.createRange()
      range.selectNode(textarea)
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      selection.removeAllRanges()
      document.body.removeChild(textarea)
      this.$store.dispatch('alerts/update', {message: 'لینک کپی شد', type: 'success'})
    },
    addScripts() {
      let apexchart = document.createElement('SCRIPT');
      apexchart.src = 'https://cdn.jsdelivr.net/npm/apexcharts'
      apexchart.id = 'apex'
      document.body.appendChild(apexchart)
      this.priceDialog = true
    },
    closePrice() {
      this.priceDialog = false
      document.body.removeChild(document.getElementById('apex'))
    }
  },
  watch: {
    count(val) {
      if (this.full) this.count = 0
      if (parseInt(val) > this.availableModels[this.selectedModel].count) this.count = this.availableModels[this.selectedModel].count
    },
    bags: {
      deep: true,
      handler(bags) {
        if (bags.filter(bag => bag.pid === this.product.id && (bag.model === this.product.models[this.selectedModel].name || bag.model === 'single')).length > 0) {
          let target = this.bags.find(bag => bag.pid === this.product.id && (bag.model === this.product.models[this.selectedModel].name || bag.model === 'single'));
          if (target.count === target.max) {
            this.count = 0
            this.full = true
          }
          if (this.full && target.count < target.max) {
            this.count = target.max - target.count
            this.full = false
          }
        }
      }
    }
  },
  mounted() {
    this.checkFavourite();
    this.path = window.location.href
    this.mobile = window.innerWidth < 640
  }
}
</script>
