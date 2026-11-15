<template>
  <container class="mt-4">
    <header class="text-center py-4 md:py-6">
      <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 mb-4">
        <icon :name="icons.lock" size="16"/>
        <span class="pt-0.5">حریم خصوصی کاربران</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3">
        سیاست <span class="text-emerald-600">حریم خصوصی والکسی</span>
      </h1>
      <p class="text-sm text-neutral-500 max-w-2xl mx-auto leading-7">
        والکسی متعهد است اطلاعات شخصی شما را محترم بشمارد. در این صفحه توضیح می‌دهیم چه اطلاعاتی جمع‌آوری می‌شود،
        چگونه از آن استفاده می‌کنیم و شما چه اختیاراتی نسبت به داده‌های خود دارید.
      </p>
    </header>

    <section v-for="(section, index) in sections" :id="section.id" :key="section.id"
             class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <div class="flex items-start gap-3 mb-3">
        <div class="w-10 h-10 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <icon :name="section.icon" size="22"/>
        </div>
        <div>
          <div class="text-xs text-emerald-600 font-semibold mb-1" v-text="'بخش ' + toPersian(index + 1)"></div>
          <h2 class="text-lg md:text-xl font-bold text-neutral-900 leading-8" v-text="section.title"></h2>
        </div>
      </div>
      <p v-if="section.intro" class="text-sm text-neutral-600 leading-7 mb-3" v-text="section.intro"></p>
      <ul v-if="section.items" class="space-y-2">
        <li v-for="item in section.items" :key="item" class="flex items-start gap-2 text-sm text-neutral-600 leading-7">
          <icon :name="icons.check" class="text-emerald-500 shrink-0 mt-1" size="18"/>
          <span v-text="item"></span>
        </li>
      </ul>
    </section>

    <section class="bg-emerald-50 border border-emerald-100 rounded-xl p-5 md:p-6 mb-4 text-sm text-neutral-700 leading-7">
      <div class="flex items-center gap-2 font-bold text-neutral-900 mb-2">
        <icon :name="icons.support" class="text-emerald-600" size="20"/>
        <span>پرسشی درباره حریم خصوصی دارید؟</span>
      </div>
      <p>
        برای هر پرسش یا درخواست مرتبط با داده‌های شخصی خود می‌توانید از طریق
        <inertia-link class="text-emerald-700 font-semibold hover:underline" href="/contact">صفحه تماس با ما</inertia-link>
        یا ایمیل <a class="text-emerald-700 font-semibold hover:underline" href="mailto:info@wallexy.ir">info@wallexy.ir</a>
        با ما در ارتباط باشید.
      </p>
    </section>
  </container>

  <inertia-head>
    <title>حریم خصوصی | Wallexy</title>
    <meta content="سیاست حریم خصوصی فروشگاه اینترنتی والکسی؛ نحوه جمع‌آوری، استفاده و نگهداری اطلاعات شخصی کاربران." name="description"/>
    <meta content="index, follow" name="robots"/>
    <meta content="https://wallexy.ir/privacy" property="og:url"/>
    <meta content="حریم خصوصی | والکسی" property="og:title"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image"/>
    <meta content="website" property="og:type"/>
    <meta content="fa_IR" property="og:locale"/>
  </inertia-head>
</template>

<script>
import {mdiCheckCircleOutline, mdiCookieOutline, mdiLockOutline, mdiShieldAccountOutline, mdiShareVariantOutline, mdiAccountEditOutline, mdiHeadset} from '@mdi/js';

export default {
  data: () => ({
    icons: {
      lock: mdiLockOutline,
      check: mdiCheckCircleOutline,
      support: mdiHeadset,
    },
    sections: [
      {
        id: 'collect',
        title: 'چه اطلاعاتی جمع‌آوری می‌کنیم؟',
        icon: mdiAccountEditOutline,
        intro: 'برای ارائه خدمات فروش، تنها اطلاعاتی را دریافت می‌کنیم که برای ثبت و ارسال سفارش یا پاسخ به شما ضروری است:',
        items: [
          'شماره همراه، نام و نام خانوادگی، نشانی و کد پستی برای ثبت و ارسال سفارش',
          'اطلاعات سفارش‌ها، سبد خرید و سابقه خرید برای پیگیری و پشتیبانی',
          'نشانی ایمیل در صورت عضویت در خبرنامه یا ارتباط ایمیلی با ما',
          'اطلاعات فنی محدود مانند نوع مرورگر و دستگاه، برای بهبود عملکرد و امنیت سایت',
        ]
      },
      {
        id: 'usage',
        title: 'از اطلاعات شما چگونه استفاده می‌کنیم؟',
        icon: mdiShieldAccountOutline,
        items: [
          'تأیید هویت با رمز یکبار مصرف پیامکی و ورود امن به حساب کاربری',
          'آماده‌سازی، ارسال و پیگیری سفارش‌ها و هماهنگی با شرکت‌های حمل',
          'پاسخ به درخواست‌ها، پشتیبانی و رسیدگی به مرجوعی یا شکایات',
          'اطلاع‌رسانی درباره وضعیت سفارش، جشنواره‌ها و پیشنهادهای والکسی (در صورت رضایت شما)',
        ]
      },
      {
        id: 'share',
        title: 'اشتراک‌گذاری اطلاعات با دیگران',
        icon: mdiShareVariantOutline,
        intro: 'والکسی اطلاعات شخصی شما را نمی‌فروشد. اطلاعات تنها در این موارد محدود در اختیار دیگران قرار می‌گیرد:',
        items: [
          'شرکت‌های حمل و پست، تنها برای تحویل سفارش و به اندازه لازم',
          'درگاه‌های پرداخت بانکی برای انجام و تأیید تراکنش‌ها',
          'مراجع قانونی و قضایی، در صورت وجود الزام قانونی',
        ]
      },
      {
        id: 'security',
        title: 'نگهداری و امنیت اطلاعات',
        icon: mdiLockOutline,
        items: [
          'اطلاعات روی سرورهای امن نگهداری می‌شود و دسترسی به آن محدود به کارکنان مجاز است',
          'ارتباط شما با سایت از طریق پروتکل امن (HTTPS) انجام می‌شود',
          'اطلاعات تنها تا زمانی نگهداری می‌شود که برای ارائه خدمات یا رعایت الزامات قانونی لازم است',
        ]
      },
      {
        id: 'cookies',
        title: 'کوکی‌ها',
        icon: mdiCookieOutline,
        intro: 'برای حفظ وضعیت ورود، نگهداری سبد خرید و بهبود تجربه کاربری از کوکی استفاده می‌کنیم. می‌توانید کوکی‌ها را از تنظیمات مرورگر خود غیرفعال کنید، اما بخشی از امکانات سایت ممکن است درست کار نکند.'
      },
      {
        id: 'rights',
        title: 'حقوق شما',
        icon: mdiShieldAccountOutline,
        items: [
          'دسترسی به اطلاعات ثبت‌شده خود در بخش حساب کاربری',
          'اصلاح یا به‌روزرسانی اطلاعات نادرست',
          'درخواست حذف حساب کاربری و اطلاعات مرتبط، با رعایت الزامات قانونی نگهداری اسناد مالی',
          'لغو عضویت در خبرنامه از طریق لینک انتهای پیام‌ها یا تماس با پشتیبانی',
        ]
      },
    ]
  }),
  methods: {
    toPersian(value) {
      return String(value).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    }
  }
}
</script>
