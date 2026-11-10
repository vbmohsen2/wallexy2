<template>
  <div class="mt-3">
    <container>
      <row class="-mx-3">
        <w class="px-3" lg="2/3">
          <carousel v-if="data.slides && data.slides.length > 0" :slides="slides" :smartphone="smartphone"/>
        </w>
        <w v-if="data.banners && data.banners.filter(slide => slide.type === 'bannerdesktop').length === 2 " class="px-3 lg:pr-0 pl-3 hidden sm:block" lg="1/3">
          <row class="mt-3 lg:mt-0 -mx-1.5">
            <w class="lg:pb-1.5 px-1.5" lg="full" sm="1/2">
              <div>
                <a :href="desktop[0].link" :title="desktop[0].text">
                  <img :alt="desktop[0].text" :src="'https://static.wallexy.ir' + desktop[0].path" class="rounded-xl" height="260" width="480">
                </a>
              </div>
            </w>
            <w class="strech px-1.5" lg="full" sm="1/2">
              <div>
                <a :href="desktop[1].link" :title="desktop[1].text">
                  <img :alt="desktop[1].text" :src="'https://static.wallexy.ir' + desktop[1].path" class="rounded-xl lg:pt-[1px] xl:pt-0" height="260" width="480">
                </a>
              </div>
            </w>
          </row>
        </w>
        <w v-if="data.banners && data.banners.filter(slide => slide.type === 'bannermobile').length === 2 " class="px-3 sm:hidden">
          <row>
            <w class="mt-3" lg="full">
              <div>
                <a :href="mobile[0].link" :title="mobile[0].text">
                  <img :alt="mobile[0].text" :src="'https://static.wallexy.ir' + mobile[0].path" class="rounded-xl w-full" height="120" width="480">
                </a>
              </div>
            </w>
            <w class="mt-3" lg="full">
              <div>
                <a :href="mobile[1].link" :title="mobile[1].text">
                  <img :alt="mobile[1].text" :src="'https://static.wallexy.ir' + mobile[1].path" class="rounded-xl w-full" height="120" width="480">
                </a>
              </div>
            </w>
          </row>
        </w>
      </row>
    </container>
    <slider v-if="data.brands && data.brands.length > 0" class="-mb-2 mt-6" name="برندها">
      <inertia-link v-for="brand in data.brands" :key="brand.id" :href="brand.link" :title="brand.text" class="px-1.5">
        <client>
          <img :alt="brand.text" :src="'https://static.wallexy.ir' + brand.path" class="rounded-full min-w-[100px] md:min-w-[114px] xl:min-w-[120px]" height="120" width="120"/>
        </client>
      </inertia-link>
    </slider>
    <slider v-if="data.before && data.before.products.length > 0" :name="data.before.name" class="-mb-2 mt-6">
      <inertia-link v-for="product in data.before.products" :key="product.id"
                    :href="'/product/' + product.id + '/' + product.name.toString().replace(/\s/g  , '-')" class="px-1.5">
        <card class="w-slide special">
          <client>
            <img :alt="product.name" :src="product.photo ? product.photo.normal : '/logo/logo.svg'" height="400" width="400"/>
          </client>
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
              <span class="pr-0.5 font-bold text-sm pt-1">عدم تولید</span>
            </div>
          </div>
        </card>
      </inertia-link>
    </slider>
    <slider v-for="(part , index) in data.after" :key="part.name + index" :name="part.name" class="-mb-2 mt-6">
      <inertia-link v-for="(product) in part.products" :key="product.id"
                    :href="'/product/' + product.id + '/' + product.name.toString().replace(/\s/g  , '-')" class="px-1.5">
        <card class="w-slide special">
          <client>
            <img :alt="product.name" :src="product.photo ? product.photo.normal : '/logo/logo.svg'" height="400" width="400"/>
          </client>
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
              <span class="pr-0.5 font-bold text-sm pt-1">عدم تولید</span>
            </div>
          </div>
        </card>
      </inertia-link>
    </slider>
    <section class="mt-6">
      <container>
        <div class="rounded-xl bg-neutral-100 px-3 py-4 border border-neutral-200/80 sm:px-5 sm:py-5">
          <div class="mb-3 flex items-center justify-between gap-3 px-1">
            <h2 class="text-sm font-extrabold text-neutral-800 sm:text-base">پیش از خرید، مطمئن شوید</h2>
            <inertia-link class="hidden items-center gap-1 text-xs font-semibold text-neutral-500 transition-colors hover:text-[#153a2e] sm:flex"
                          href="/before-buy" title="راهنمای کامل خرید">
              <span>راهنمای کامل خرید</span>
              <icon :name="icons.arrow" size="14"/>
            </inertia-link>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <inertia-link v-for="item in trusts" :key="item.title" :href="item.link" :title="item.title"
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
    <section class="mt-6">
      <container>
        <div class="relative overflow-hidden rounded-2xl bg-[#153a2e] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div class="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full border border-white/5"/>
          <div class="pointer-events-none absolute -bottom-28 -right-20 w-72 h-72 rounded-full border border-white/5"/>
          <div class="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-white/5 to-transparent md:block"/>

          <div class="relative grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-6">
            <!-- متن معرفی -->
            <div class="space-y-3 text-center md:text-right">
              <div class="flex items-center justify-center gap-2 text-[#c7a874] md:justify-start">
                <span class="hidden h-px w-7 bg-[#c7a874]/60 sm:block"/>
                <span class="text-[11px] font-semibold tracking-wide sm:text-xs">ویژه همکاران تجاری و فعالان حوزه دکوراسیون</span>
              </div>

              <h2 class="text-xl font-extrabold leading-7 text-white sm:text-2xl">
                کسب‌وکار دکوراسیون دارید؟
                <span class="mt-0.5 block text-[#d9c39a]">بیایید مسیر همکاری را شروع کنیم.</span>
              </h2>

              <p class="mx-auto max-w-xl text-xs leading-6 text-white/70 sm:text-sm md:mx-0">
                والکسی در جایگاه برند پیشرو در صنعت کاغذدیواری، با مدل همکاری شفاف، توزیع قاعده‌مند آلبوم‌ها و پشتیبانی اختصاصی، همراه کسب‌وکار شماست.
              </p>

              <div class="flex flex-wrap items-center justify-center gap-2 pt-1 md:justify-start">
                <inertia-link class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#c3a26b] px-5 py-2.5 text-xs font-bold text-[#20342b] shadow-sm transition-colors hover:bg-[#d4b57e] sm:text-sm"
                              href="/partners" title="درخواست همکاری با والکسی">
                  <span>درخواست همکاری</span>
                  <icon :name="icons.arrow" size="16"/>
                </inertia-link>
                <inertia-link class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/25 px-4 py-2.5 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10 sm:text-sm"
                              href="/partners#tiers" title="مشاهده سطوح همکاری">
                  <span>مشاهده سطوح همکاری</span>
                </inertia-link>
              </div>
            </div>

            <!-- کارت مراحل -->
            <div class="w-full max-w-sm justify-self-center md:justify-self-end">
              <div class="rounded-xl bg-white p-4 text-center shadow-x sm:p-5">
                <span class="block text-[9px] font-bold tracking-[0.22em] text-[#a58a5c]">WALLEXY BUSINESS</span>
                <h3 class="mt-1 text-base font-extrabold text-[#173a2e] sm:text-lg">شروع همکاری در چند مرحله</h3>

                <div class="mt-3 space-y-2.5 text-right">
                  <div class="flex items-start gap-2.5">
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9dfcb] text-[10px] font-bold text-[#7d6538]">۱</span>
                    <div class="pt-0.5">
                      <p class="text-xs font-bold text-neutral-800">ثبت درخواست همکاری</p>
                      <p class="mt-0.5 text-[10px] leading-5 text-neutral-500">اطلاعات و مدارک کسب‌وکار خود را ثبت کنید.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9dfcb] text-[10px] font-bold text-[#7d6538]">۲</span>
                    <div class="pt-0.5">
                      <p class="text-xs font-bold text-neutral-800">بررسی و تأیید</p>
                      <p class="mt-0.5 text-[10px] leading-5 text-neutral-500">کارشناسان والکسی درخواست شما را ارزیابی می‌کنند.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9dfcb] text-[10px] font-bold text-[#7d6538]">۳</span>
                    <div class="pt-0.5">
                      <p class="text-xs font-bold text-neutral-800">آغاز همکاری و دریافت آلبوم</p>
                      <p class="mt-0.5 text-[10px] leading-5 text-neutral-500">پس از تأیید، آلبوم‌ها برای شما ارسال می‌شود.</p>
                    </div>
                  </div>
                </div>

                <inertia-link class="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#173a2e] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1f4d3d] sm:text-sm"
                              href="/partners#apply" title="ثبت درخواست همکاری">
                  <span>درخواست همکاری</span>
                  <icon :name="icons.arrow" size="14"/>
                </inertia-link>
              </div>
            </div>
          </div>
        </div>
      </container>
    </section>
    <section class="mt-6">
      <container>
        <div class="rounded-xl bg-neutral-100 px-3 py-4 border border-neutral-200/80 sm:px-5 sm:py-5">
          <div class="mb-3 flex items-center justify-between gap-3 px-1">
            <h2 class="text-sm font-extrabold text-neutral-800 sm:text-base">بیشتر بدانید</h2>
            <inertia-link class="hidden items-center gap-1 text-xs font-semibold text-neutral-500 transition-colors hover:text-[#153a2e] sm:flex"
                          href="/contact" title="تماس با کارشناسان والکسی">
              <span>تماس با کارشناسان</span>
              <icon :name="icons.arrow" size="14"/>
            </inertia-link>
          </div>

          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <inertia-link v-for="item in guides" :key="item.title" :href="item.link" :title="item.title"
                          class="group flex items-start gap-3 rounded-lg bg-white px-4 py-4 border border-neutral-200/70 transition-shadow hover:shadow-md hover:border-[#c3a26b]/50 focus:outline-none focus-visible:border-[#c3a26b] sm:gap-4">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3eee4] text-[#a58a5c]">
                <icon :name="item.icon" size="20"/>
              </span>
              <div class="min-w-0 flex-1">
                <h3 class="text-xs font-extrabold text-neutral-800 sm:text-sm" v-text="item.title"></h3>
                <p class="mt-1 text-[11px] leading-6 text-neutral-500 sm:text-xs" v-text="item.text"></p>
                <span class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#153a2e] transition-colors group-hover:text-[#c3a26b] sm:text-xs">
                  <span v-text="item.action"></span>
                  <icon :name="icons.arrow" class="transition-transform group-hover:-translate-x-0.5" size="13"/>
                </span>
              </div>
            </inertia-link>
          </div>
        </div>
      </container>
    </section>
  </div>
  <inertia-head>
    <title>قیمت کاغذ دیواری</title>
    <link href="https://wallexy.ir/" rel="canonical">
    <meta content="512" name="og:image:width" property="og:image:width">
    <meta content="512" name="og:image:height" property="og:image:height">
    <meta content="image/png" name="og:image:type" property="og:image:type">
    <meta content="والکسی" data-hid="og:title" data-n-head="ssr" name="og:title" property="og:title">
    <meta content="website" data-hid="og:type" data-n-head="ssr" name="og:type" property="og:type">
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" name="og:image" property="og:image">
    <meta content="https://wallexy.ir" data-hid="og:url" data-n-head="ssr" name="og:url" property="og:url">
    <meta content="والکسی" data-hid="og:site_name" data-n-head="ssr" name="og:site_name" property="og:site_name">
    <link v-for="slide in slides" :key="slide.id" :href="'https://static.wallexy.ir/' + slide.path" as="image" fetchpriority="high" rel="preload">
    <link v-for="banner in banners" :key="banner.id" :href="'https://static.wallexy.ir/' + banner.path" as="image" fetchpriority="high" rel="preload">
    <link v-for="product in products" :key="product.id" :href="product.photo.normal" as="image" fetchpriority="high" rel="preload">
    <meta
        content="فروشگاه آنلاین والکسی , فروش آنلاین تمامی برند ها و مدل های کاغذ دیواری و پوستر با تضمین قیمت مناسب, کیفیت و اصل بودن کالا , تحویل فوری و در بسته بندی با کیفیت می باشد."
        name="og:description" property="og:description">
    <meta
        content="فروشگاه آنلاین والکسی , فروش آنلاین تمامی برند ها و مدل های کاغذ دیواری و پوستر با تضمین قیمت مناسب, کیفیت و اصل بودن کالا , تحویل فوری و در بسته بندی با کیفیت می باشد."
        name="description">
    <component is="script" type="application/ld+json">{
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "wallexy - والکسی",
      "image": "https://wallexy.ir/logo/logo.png",
      "@id": "https://wallexy.ir",
      "url": "https://wallexy.ir",
      "telephone": "+984533848382",
      "priceRange": "IRR",
      "address": {
      "@type": "PostalAddress",
      "streetAddress": "خیابان عطایی، مجتمع شورا سنتر، پلاک M74",
      "addressLocality": "اردبیل",
      "addressCountry": "IR"
      },
      "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.21750,
      "longitude": 48.28835
      },
      "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Saturday",
      "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
      },
      "sameAs": [
      "https://t.me/wallexy_info",
      "https://www.instagram.com/wallexy_info/",
      "https://twitter.com/wallexy_info"
      ]
      }
    </component>
  </inertia-head>
</template>
<script>

import Carousel from '@/components/custom/carousel'
import {
  mdiArrowLeft,
  mdiBackupRestore,
  mdiFrequentlyAskedQuestions,
  mdiRefresh,
  mdiRulerSquare,
  mdiTruckDeliveryOutline
} from '@mdi/js'

export default {
  components: {Carousel},
  props: {
    data: Object,
    smartphone: Boolean
  },
  data() {
    return {
      products: JSON.parse(JSON.stringify(this.$page.props.data.before.products ? this.$page.props.data.before.products : [])),
      slides: this.smartphone ? this.data.slides.filter(photo => photo.type === 'mobile') : this.data.slides.filter(photo => photo.type === 'desktop'),
      banners: this.smartphone ? this.data.slides.filter(photo => photo.type === 'bannermobile') : this.data.slides.filter(photo => photo.type === 'bannerdesktop'),
      icons: {
        arrow: mdiArrowLeft
      },
      trusts: [
        {
          icon: mdiRefresh,
          title: 'موجودی و قیمت',
          text: 'پیش از پرداخت، موجودی و قیمت روز محصول را استعلام کنید.',
          action: 'استعلام کنید',
          link: '/before-buy#availability'
        },
        {
          icon: mdiTruckDeliveryOutline,
          title: 'ارسال سفارش',
          text: 'از هزینه و شرایط ارسال سفارش مطلع شوید.',
          action: 'راهنمای ارسال',
          link: '/shipping-return#shipping'
        },
        {
          icon: mdiBackupRestore,
          title: 'بازگشت کالا',
          text: 'شرایط مرجوعی و بازگشت از خرید را بررسی کنید.',
          action: 'شرایط مرجوعی',
          link: '/shipping-return#return'
        }
      ],
      guides: [
        {
          icon: mdiRulerSquare,
          title: 'راهنمای اندازه‌گیری',
          text: 'نمی‌دانید چند رول کاغذدیواری لازم دارید؟ با راهنمای اندازه‌گیری و محاسبه‌گر آنلاین، تعداد رول دیوارهایتان را دقیق حساب کنید.',
          action: 'محاسبه تعداد رول',
          link: '/measure'
        },
        {
          icon: mdiFrequentlyAskedQuestions,
          title: 'سؤالات متداول',
          text: 'پاسخ پرتکرارترین پرسش‌ها درباره موجودی و قیمت، اصالت محصول، زمان ارسال و شرایط مرجوعی را یک‌جا ببینید.',
          action: 'مشاهده پاسخ‌ها',
          link: '/faq'
        }
      ]
    }
  },
  computed: {
    desktop() {
      return this.data.banners.filter(slide => slide.type === 'bannerdesktop')
    },
    mobile() {
      return this.data.banners.filter(slide => slide.type === 'bannermobile')
    }
  }
}
</script>
