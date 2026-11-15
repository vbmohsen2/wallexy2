<template>
  <footer class="relative mt-10 w-full overflow-hidden bg-neutral-900 text-neutral-400">
    <!-- خط تزئینی بالای فوتر -->
    <div class="h-1 w-full bg-gradient-to-l from-emerald-600 via-emerald-400 to-teal-500"></div>
    <!-- هاله تزئینی -->
    <div class="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

    <!-- بدنه فوتر: تمام عریض -->
    <div class="relative w-full px-4 pb-9 pt-9 md:px-8 md:pt-11 lg:px-10 xl:px-14">
      <div class="flex w-full flex-col gap-y-9 lg:flex-row lg:items-start lg:justify-between lg:gap-x-8 xl:gap-x-12">

        <!-- ۱. برند والکسی -->
        <div class="w-full lg:w-[27%] lg:max-w-md lg:shrink-0">
          <inertia-link class="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg transition-transform hover:scale-[1.02]"
                        href="/" title="فروشگاه اینترنتی والکسی">
            <img alt="لوگوی والکسی" class="h-9 w-9" height="36" src="/logo/logo.svg" width="36">
            <span class="text-md font-extrabold text-neutral-900">والکسی</span>
          </inertia-link>

          <p class="mt-4 text-sm leading-7 text-neutral-400">
            والکسی، بستری آنلاین برای انتخاب و تأمین کاغذدیواری؛ با دسترسی به آلبوم‌ها و طرح‌های متنوع
            برای مشتریان و فعالان دکوراسیون داخلی.
          </p>

          <!-- راه‌های ارتباط سریع -->
          <ul class="mt-4 space-y-1.5 text-sm">
            <li>
              <a class="group flex items-center gap-2 whitespace-nowrap text-neutral-400 transition-colors hover:text-emerald-400"
                 href="tel:09904283848" title="شماره همراه پشتیبانی فروش">
                <icon :name="icons.cellphone" class="text-emerald-500/80 transition-colors group-hover:text-emerald-400" size="16"/>
                <span class="text-neutral-500">پشتیبانی فروش:</span>
                <span dir="ltr" v-text="getNumber('0990 428 3848')"></span>
              </a>
            </li>
            <li>
              <a class="group flex items-center gap-2 whitespace-nowrap text-neutral-400 transition-colors hover:text-emerald-400"
                 href="tel:09015656733" title="شماره همراه پشتیبانی همکار">
                <icon :name="icons.phone" class="text-emerald-500/80 transition-colors group-hover:text-emerald-400" size="16"/>
                <span class="text-neutral-500">پشتیبانی همکار:</span>
                <span dir="ltr" v-text="getNumber('0901 565 6733')"></span>
              </a>
            </li>
            <li>
              <a class="group flex items-center gap-2 whitespace-nowrap text-neutral-400 transition-colors hover:text-emerald-400"
                 href="mailto:info@wallexy.ir" title="ایمیل والکسی">
                <icon :name="icons.email" class="text-emerald-500/80 transition-colors group-hover:text-emerald-400" size="16"/>
                <span dir="ltr">info@wallexy.ir</span>
              </a>
            </li>
            <li class="flex items-center gap-2 whitespace-nowrap text-neutral-500">
              <icon :name="icons.time" class="text-emerald-500/80" size="16"/>
              <span>روزهای کاری، ۹ صبح تا ۹ شب</span>
            </li>
          </ul>

          <!-- شبکه‌های اجتماعی -->
          <div class="mt-5 flex items-center gap-2 whitespace-nowrap">
            <span class="text-xs text-neutral-500">ما را دنبال کنید:</span>
            <a v-for="social in socials" :key="social.title"
               :href="social.href" :title="social.title" target="_blank" rel="noopener"
               class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400">
              <icon :name="social.icon" size="18"/>
            </a>
          </div>
        </div>

        <!-- ۲ تا ۴. ستون‌های لینک -->
        <div class="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:flex lg:gap-x-8 xl:gap-x-12">
          <nav v-for="column in columns" :key="column.title" class="lg:shrink-0">
            <h3 class="mb-4 flex items-center gap-2 whitespace-nowrap text-sm font-bold text-white">
              <icon :name="column.icon" class="text-emerald-400" size="18"/>
              <span v-text="column.title"></span>
            </h3>
            <ul class="space-y-1">
              <li v-for="link in column.links" :key="link.title">
                <inertia-link v-if="link.href" :href="link.href" :title="link.title"
                              class="group -mx-2 flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white">
                  <icon :name="link.icon"
                        class="shrink-0 text-neutral-500 transition-colors group-hover:text-emerald-400" size="16"/>
                  <span v-text="link.title"></span>
                </inertia-link>
                <a v-else :href="link.url" :title="link.title" target="_blank" rel="noopener"
                   class="group -mx-2 flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white">
                  <icon :name="link.icon"
                        class="shrink-0 text-neutral-500 transition-colors group-hover:text-emerald-400" size="16"/>
                  <span v-text="link.title"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- ۵. نمادهای اعتماد -->
        <div class="w-full lg:w-auto lg:shrink-0">
          <h3 class="mb-4 flex items-center gap-2 whitespace-nowrap text-sm font-bold text-white">
            <icon :name="icons.shield" class="text-emerald-400" size="18"/>
            <span>نمادهای اعتماد</span>
          </h3>
          <div class="flex flex-wrap items-center gap-2.5">
            <!-- نماد اعتماد الکترونیکی -->
            <a class="flex h-[76px] w-[76px] items-center justify-center rounded-xl bg-white p-2 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/20"
               href="https://trustseal.enamad.ir/?id=450719&amp;Code=Zl5OiqMQ5zEG0FXuIWbP5eg2PX3p9DW5"
               referrerpolicy="origin" target="_blank" title="نماد اعتماد الکترونیکی">
              <img alt="نماد اعتماد الکترونیکی" class="max-h-full max-w-full object-contain" src="/logo/enamad.png">
            </a>
            <!-- نماد ساماندهی -->
            <a class="flex h-[76px] w-[76px] items-center justify-center rounded-xl bg-white p-2 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/20"
               href="https://ecunion.ir/verify/wallexy.ir?token=9014794684fbd1e46e2c"
               target="_blank" title="نماد ساماندهی">
              <img alt="نماد ساماندهی" class="max-h-full max-w-full object-contain" src="/logo/kasbokar.png">
            </a>
            <!-- نماد ضمانت ترب؛ برای جایگزینی با تصویر رسمی، فایل را در public/logo/torob.png قرار دهید
                 و به‌جای بلوک زیر از <img alt="ضمانت خرید ترب" src="/logo/torob.png"> استفاده کنید -->
            <a class="flex h-[76px] w-[76px] flex-col items-center justify-center gap-1 rounded-xl bg-white p-2 text-center shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/20"
               href="https://torob.com/shop/109843/%D9%88%D8%A7%D9%84%DA%A9%D8%B3%DB%8C/" target="_blank" rel="noopener" title="ضمانت خرید ترب">
<!--              <icon :name="icons.cart" class="text-red-500" size="24"/>-->
              <img
                src="https://api.torob.com/third-party/guarantee/v1/hologram/?instance_id=109843"
                alt="ضمانت ترب"
                loading="lazy"
                decoding="async"
              >
<!--              <span class="text-[10px] font-bold leading-3 text-neutral-700">ضمانت خرید<br>ترب</span>-->
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ۶. نوار پایانی -->
    <div class="border-t border-white/10 bg-black/25">
      <div class="flex w-full flex-col items-center gap-3 px-4 py-4 text-xs sm:flex-row sm:justify-between md:px-8 lg:px-10 xl:px-14">
        <div class="flex items-center gap-4 whitespace-nowrap">
          <inertia-link class="text-neutral-400 transition-colors hover:text-emerald-400" href="/privacy" title="حریم خصوصی">
            حریم خصوصی
          </inertia-link>
          <span class="h-3 w-px bg-white/15"></span>
          <inertia-link class="text-neutral-400 transition-colors hover:text-emerald-400" href="/terms" title="قوانین و مقررات">
            قوانین و مقررات
          </inertia-link>
        </div>
        <div class="flex items-center gap-1.5 whitespace-nowrap text-neutral-500">
          <icon :name="icons.copyright" size="14"/>
          <span>تمامی حقوق مادی و معنوی برای والکسی محفوظ است.</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import {
  mdiCartOutline,
  mdiCellphone,
  mdiClipboardTextOutline,
  mdiClockOutline,
  mdiCopyright,
  mdiDeskphone,
  mdiEmailOutline,
  mdiFrequentlyAskedQuestions,
  mdiHandshakeOutline,
  mdiInstagram,
  mdiPostOutline,
  mdiRulerSquare,
  mdiShieldCheckOutline,
  mdiTruckDeliveryOutline,
  mdiTwitter,
  mdiViewGridOutline,
  mdiWallpaper
} from '@mdi/js';

const telegram = 'M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z'

export default {
  data: () => ({
    icons: {
      wallpaper: mdiWallpaper,
      poster: mdiPostOutline,
      gallery: mdiViewGridOutline,
      contact: mdiDeskphone,
      faq: mdiFrequentlyAskedQuestions,
      shipping: mdiTruckDeliveryOutline,
      measure: mdiRulerSquare,
      partner: mdiHandshakeOutline,
      steps: mdiClipboardTextOutline,
      telegram: telegram,
      instagram: mdiInstagram,
      twitter: mdiTwitter,
      email: mdiEmailOutline,
      time: mdiClockOutline,
      shield: mdiShieldCheckOutline,
      cart: mdiCartOutline,
      copyright: mdiCopyright,
      cellphone: mdiCellphone,
      phone: mdiDeskphone,
    },
    socials: [
      {title: 'اینستاگرام والکسی', href: 'https://www.instagram.com/wallexy_info/', icon: mdiInstagram},
      {title: 'کانال تلگرام والکسی', href: 'https://t.me/wallexy_info', icon: telegram},
      {title: 'توییتر والکسی', href: 'https://twitter.com/wallexy_info/', icon: mdiTwitter},
    ],
    columns: [
      {
        title: 'خرید و انتخاب',
        icon: mdiWallpaper,
        links: [
          {title: 'کاغذدیواری', href: '/category/کاغذ-دیواری', icon: mdiWallpaper},
          {title: 'پوستر دیواری', href: '/category/پوستر-دیواری', icon: mdiPostOutline},
          {title: 'گالری طرح‌ها', href: '/category/گالری-طرح-ها', icon: mdiViewGridOutline},
        ]
      },
      {
        title: 'خدمات مشتریان',
        icon: mdiDeskphone,
        links: [
          {title: 'تماس با ما', href: '/contact', icon: mdiDeskphone},
          {title: 'پرسش‌های متداول', href: '/faq', icon: mdiFrequentlyAskedQuestions},
          {title: 'نحوه ارسال و شرایط مرجوعی', href: '/shipping-return', icon: mdiTruckDeliveryOutline},
          {title: 'راهنمای اندازه‌گیری', href: '/measure', icon: mdiRulerSquare},
        ]
      },
      {
        title: 'خدمات همکاران',
        icon: mdiHandshakeOutline,
        links: [
          {title: 'همکاری با والکسی', href: '/partners', icon: mdiHandshakeOutline},
          {title: 'مراحل درخواست', href: '/partners#steps', icon: mdiClipboardTextOutline},
          {title: 'کانال تلگرام', url: 'https://t.me/wallexy_info', icon: telegram},
        ]
      },
    ]
  })
}
</script>
