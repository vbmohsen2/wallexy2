<template>
  <container class="mt-4">
    <header class="text-center py-4 md:py-6">
      <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 mb-4">
        <icon :name="icons.terms" size="16"/>
        <span class="pt-0.5">قوانین خرید از والکسی</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3">
        قوانین و <span class="text-emerald-600">مقررات</span>
      </h1>
      <p class="text-sm text-neutral-500 max-w-2xl mx-auto leading-7">
        با ثبت سفارش در والکسی، شما شرایط زیر را می‌پذیرید. لطفاً پیش از خرید این صفحه را مطالعه کنید تا
        فرآیند سفارش، پرداخت، ارسال و مرجوعی برای شما شفاف باشد.
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
        <span>نیاز به راهنمایی دارید؟</span>
      </div>
      <p>
        اگر درباره این قوانین پرسشی دارید، از
        <inertia-link class="text-emerald-700 font-semibold hover:underline" href="/contact">صفحه تماس با ما</inertia-link>
        با کارشناسان والکسی در ارتباط باشید. شرایط ارسال و مرجوعی نیز به‌صورت کامل در
        <inertia-link class="text-emerald-700 font-semibold hover:underline" href="/shipping-return">این صفحه</inertia-link>
        توضیح داده شده است.
      </p>
    </section>
  </container>

  <inertia-head>
    <title>قوانین و مقررات | Wallexy</title>
    <meta content="قوانین و مقررات فروشگاه اینترنتی والکسی؛ شرایط ثبت سفارش، پرداخت، ارسال، قیمت‌گذاری، مرجوعی و مالکیت معنوی." name="description"/>
    <meta content="index, follow" name="robots"/>
    <meta content="https://wallexy.ir/terms" property="og:url"/>
    <meta content="قوانین و مقررات | والکسی" property="og:title"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image"/>
    <meta content="website" property="og:type"/>
    <meta content="fa_IR" property="og:locale"/>
  </inertia-head>
</template>

<script>
import {mdiCheckCircleOutline, mdiCreditCardOutline, mdiGavel, mdiHeadset, mdiRefreshCircle, mdiScaleBalance, mdiShieldLockOutline, mdiTruckFastOutline} from '@mdi/js';

export default {
  data: () => ({
    icons: {
      terms: mdiGavel,
      check: mdiCheckCircleOutline,
      support: mdiHeadset,
    },
    sections: [
      {
        id: 'order',
        title: 'ثبت سفارش',
        icon: mdiGavel,
        items: [
          'ثبت سفارش در والکسی به معنی پذیرش این قوانین توسط خریدار است',
          'اطلاعات واردشده (نام، شماره تماس و نشانی) باید صحیح و متعلق به خود خریدار باشد',
          'والکسی حق دارد سفارش‌های مشکوک یا دارای اطلاعات ناقص را پیش از ارسال با خریدار هماهنگ کند',
        ]
      },
      {
        id: 'price',
        title: 'قیمت‌ها و موجودی',
        icon: mdiScaleBalance,
        intro: 'قیمت کاغذدیواری و پوستر بر اساس نرخ روز و موجودی انبار تعیین می‌شود؛ بنابراین ممکن است در بازه‌های زمانی مختلف تغییر کند.',
        items: [
          'قیمت درج‌شده در زمان ثبت سفارش، مبنای محاسبه است',
          'در صورت تغییر موجودی یا قیمت پیش از تأیید نهایی، موضوع پیش از پرداخت به شما اطلاع داده می‌شود',
          'برای اطمینان از موجودی و قیمت روز می‌توانید از صفحه «قبل از خرید بدانید» استعلام بگیرید',
        ]
      },
      {
        id: 'payment',
        title: 'پرداخت',
        icon: mdiCreditCardOutline,
        items: [
          'پرداخت از طریق درگاه‌های بانکی معتبر و امن انجام می‌شود',
          'سفارش پس از تأیید پرداخت وارد مرحله آماده‌سازی و ارسال می‌شود',
          'در صورت کسر مبلغ از حساب و ناموفق بودن تراکنش، مبلغ طبق رویه بانک در بازه زمانی مشخص بازگردانده می‌شود',
        ]
      },
      {
        id: 'shipping',
        title: 'ارسال سفارش',
        icon: mdiTruckFastOutline,
        intro: 'زمان تحویل به مقصد، روش ارسال و هزینه حمل در صفحه «نحوه ارسال و شرایط مرجوعی» به تفصیل آمده است.',
        items: [
          'زمان آماده‌سازی و ارسال برای هر سفارش به‌صورت جداگانه اعلام می‌شود',
          'بررسی سالم بودن بسته در حضور مأمور حمل، مسئولیت خریدار است',
        ]
      },
      {
        id: 'return',
        title: 'مرجوعی و انصراف',
        icon: mdiRefreshCircle,
        items: [
          'شرایط و مهلت مرجوعی تابع صفحه «نحوه ارسال و شرایط مرجوعی» است',
          'کالا باید در بسته‌بندی اولیه و بدون باز شدن رول‌ها و بدون آسیب باشد',
          'در صورت وجود مغایرت یا ایراد فنی، هزینه‌های مربوطه بر عهده والکسی خواهد بود',
        ]
      },
      {
        id: 'rights',
        title: 'مالکیت معنوی',
        icon: mdiShieldLockOutline,
        intro: 'تمام محتوای این سایت شامل متن‌ها، تصاویر، طرح‌ها، لوگو و نرم‌افزار، متعلق به والکسی است و هرگونه استفاده تجاری از آن بدون اجازه کتبی ممنوع است.'
      },
      {
        id: 'changes',
        title: 'تغییر قوانین',
        icon: mdiGavel,
        intro: 'والکسی می‌تواند این قوانین را در صورت نیاز به‌روزرسانی کند. نسخه معتبر همیشه همین صفحه است و ادامه استفاده از سایت به معنی پذیرش نسخه جاری است.'
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
