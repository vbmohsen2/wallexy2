<template>
  <container class="mt-4">
    <!-- هدر صفحه -->
    <header class="text-center py-4 md:py-6">
      <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 mb-4">
        <icon :name="icons.truck" size="16"/>
        <span class="pt-0.5">راهنمای سفارش</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3">
        نحوه ارسال و <span class="text-emerald-600">شرایط مرجوعی</span>
      </h1>
      <p class="text-sm text-neutral-500 max-w-2xl mx-auto leading-7">
        برای اینکه فرآیند خرید و بازگشت کالا کاملاً شفاف باشد، در این صفحه روش‌های ارسال سفارش،
        زمان تحویل، هزینه حمل و تمام شرایط مرجوعی کاغذدیواری والکسی را مطالعه کنید.
        لطفاً این راهنما را پیش از ثبت سفارش و پیش از باز کردن رول‌ها بررسی کنید.
      </p>
    </header>

    <!-- خلاصه شرایط -->
    <section class="mb-4">
      <row class="-mx-2">
        <w v-for="summary in summaries" :key="summary.title" class="px-2 mb-2" md="1/3">
          <div class="h-full bg-white border border-neutral-200 rounded-xl p-4 flex items-start gap-3">
            <div class="w-10 h-10 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <icon :name="summary.icon" size="22"/>
            </div>
            <div>
              <div class="text-lg font-extrabold text-neutral-900 leading-7" v-text="summary.value"></div>
              <div class="text-sm text-neutral-500 leading-6" v-text="summary.title"></div>
            </div>
          </div>
        </w>
      </row>
    </section>

    <!-- فهرست مطالب -->
    <section class="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 mb-4">
      <h2 class="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-3">
        <icon :name="icons.list" class="text-emerald-600" size="20"/>
        <span>در این صفحه می‌خوانید</span>
      </h2>
      <row class="-mx-2">
        <w v-for="(section, index) in sections" :key="section.id" class="px-2 mb-2" lg="1/3" sm="1/2">
          <a :href="'#' + section.id"
             class="flex items-center gap-2 text-sm text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-lg px-2 py-1.5 transition-colors">
            <span class="w-6 h-6 shrink-0 rounded-full bg-neutral-100 text-neutral-500 text-xs font-bold flex items-center justify-center" v-text="toPersian(index + 1)"></span>
            <span v-text="section.short"></span>
          </a>
        </w>
      </row>
    </section>

    <!-- بخش‌های محتوا -->
    <section v-for="(section, index) in sections" :id="section.id" :key="section.id"
             class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <div class="flex items-start gap-3 mb-4">
        <div class="w-10 h-10 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <icon :name="section.icon" size="22"/>
        </div>
        <div>
          <div class="text-xs text-emerald-600 font-semibold mb-1" v-text="'بخش ' + toPersian(index + 1)"></div>
          <h2 class="text-lg md:text-xl font-bold text-neutral-900 leading-8" v-text="section.title"></h2>
        </div>
      </div>

      <p v-if="section.intro" class="text-sm text-neutral-600 leading-7 mb-4" v-text="section.intro"></p>

      <ul v-if="section.items" class="space-y-2.5 mb-4">
        <li v-for="item in section.items" :key="item" class="flex items-start gap-2 text-sm text-neutral-600 leading-7">
          <icon :name="icons.check" class="text-emerald-500 shrink-0 mt-1" size="18"/>
          <span v-text="item"></span>
        </li>
      </ul>

      <div v-if="section.chips" class="flex flex-wrap gap-2 mb-4">
        <span v-for="chip in section.chips" :key="chip"
              class="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-700 text-sm px-3 py-1.5 rounded-full">
          <icon :name="icons.check" class="text-emerald-600" size="16"/>
          <span v-text="chip"></span>
        </span>
      </div>

      <div v-if="section.highlight" class="flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
        <div class="text-2xl md:text-3xl font-extrabold text-emerald-700 shrink-0" v-text="section.highlight.value"></div>
        <div class="text-sm text-emerald-800 leading-7" v-text="section.highlight.label"></div>
      </div>

      <div v-if="section.sub" class="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
        <h3 class="text-md font-bold text-neutral-900 mb-2" v-text="section.sub.title"></h3>
        <p class="text-sm text-neutral-600 leading-7" v-text="section.sub.text"></p>
      </div>

      <div v-if="section.note"
           class="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 text-sm leading-7">
        <icon :name="icons.alert" class="shrink-0 mt-1" size="18"/>
        <span v-text="section.note"></span>
      </div>
    </section>

    <!-- راهنماهای مرتبط -->
    <section class="bg-white border border-emerald-200 rounded-xl p-5 md:p-6 mb-4">
      <h2 class="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-3">
        <icon :name="icons.info" class="text-emerald-600" size="20"/>
        <span>راهنماهای مرتبط</span>
      </h2>
      <row class="-mx-2">
        <w class="px-2 mb-2" md="1/2">
          <inertia-link class="flex items-center justify-between gap-3 bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-200 rounded-lg p-4 transition-colors"
                        href="/before-buy" title="قبل از خرید بدانید">
            <div class="flex items-center gap-3">
              <icon :name="icons.shield" class="text-emerald-600" size="22"/>
              <div>
                <div class="text-sm font-semibold text-neutral-900">قبل از خرید بدانید</div>
                <div class="text-xs text-neutral-500 mt-1">موجودی، قیمت روز، اصالت محصول و نکات مهم خرید</div>
              </div>
            </div>
            <icon :name="icons.arrow" class="text-emerald-600 shrink-0" size="18"/>
          </inertia-link>
        </w>
        <w class="px-2 mb-2" md="1/2">
          <inertia-link class="flex items-center justify-between gap-3 bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-200 rounded-lg p-4 transition-colors"
                        href="/measure" title="راهنمای نحوه اندازه‌گیری کاغذدیواری">
            <div class="flex items-center gap-3">
              <icon :name="icons.ruler" class="text-emerald-600" size="22"/>
              <div>
                <div class="text-sm font-semibold text-neutral-900">نحوه اندازه‌گیری</div>
                <div class="text-xs text-neutral-500 mt-1">۴ روش ساده + محاسبه‌گر آنلاین تعداد رول</div>
              </div>
            </div>
            <icon :name="icons.arrow" class="text-emerald-600 shrink-0" size="18"/>
          </inertia-link>
        </w>
      </row>
    </section>

    <!-- سوال پایانی -->
    <section class="bg-neutral-900 text-white rounded-xl p-6 md:p-8 mb-4 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
        <icon :name="icons.question" size="24"/>
      </div>
      <h2 class="text-xl md:text-2xl font-extrabold mb-3">هنوز درباره سفارش مطمئن نیستید؟</h2>
      <p class="text-sm text-neutral-300 max-w-xl mx-auto leading-7 mb-5">
        اگر درباره طرح، رنگ، کد، لت‌نامبر، تعداد رول، قیمت، موجودی، نحوه ارسال یا شرایط مرجوعی سؤال دارید،
        پیش از خرید با کارشناسان والکسی مشورت کنید. هدف ما این است که پیش از خرید، اطلاعات کافی در اختیار شما باشد
        تا انتخابی مطمئن و بدون ابهام داشته باشید.
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <a class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
           href="tel:+989904283848" title="تماس با کارشناسان والکسی">
          <icon :name="icons.phone" size="18"/>
          <span>تماس با کارشناسان</span>
        </a>
        <a class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
           href="https://t.me/wallexy_info" rel="noopener" target="_blank" title="استعلام در تلگرام">
          <icon :name="icons.send" size="18"/>
          <span>استعلام در تلگرام</span>
        </a>
        <inertia-link class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                      href="/contact" title="صفحه تماس با ما">
          <icon :name="icons.message" size="18"/>
          <span>صفحه تماس با ما</span>
        </inertia-link>
      </div>
      <p class="text-xs text-neutral-400 mt-5">والکسی؛ همراه شما در انتخاب و تأمین کاغذدیواری.</p>
    </section>
  </container>

  <inertia-head>
    <title>نحوه ارسال و شرایط مرجوعی | والکسی</title>
    <meta content="راهنمای نحوه ارسال سفارش کاغذدیواری از والکسی و شرایط مرجوعی؛ زمان ارسال، بارنامه، هزینه حمل، مهلت ۱۰ روزه مرجوعی، شرایط کالا، لت‌نامبر، اختلاف رنگ و هزینه بازگشت کالا." name="description"/>
    <link href="https://wallexy.ir/shipping-return" rel="canonical"/>
    <link href="https://wallexy.ir/shipping-return" hreflang="fa-IR" rel="alternate"/>
    <link href="https://wallexy.ir/shipping-return" hreflang="x-default" rel="alternate"/>
    <meta content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" name="robots"/>
    <meta content="والکسی" name="author"/>
    <meta content="والکسی" name="publisher"/>
    <meta content="نحوه ارسال, شرایط مرجوعی, ارسال کاغذ دیواری, مرجوعی کاغذ دیواری, هزینه ارسال والکسی, بارنامه, لت نامبر, اختلاف رنگ کاغذ دیواری" name="keywords"/>

    <meta content="fa_IR" property="og:locale"/>
    <meta content="website" property="og:type"/>
    <meta content="والکسی" property="og:site_name"/>
    <meta content="نحوه ارسال و شرایط مرجوعی | والکسی" property="og:title"/>
    <meta content="راهنمای ارسال سفارش و شرایط مرجوعی کاغذدیواری والکسی؛ زمان ارسال، بارنامه، هزینه حمل، مهلت ۱۰ روزه مرجوعی، شرایط کالا و نکات مهم پیش از نصب." property="og:description"/>
    <meta content="https://wallexy.ir/shipping-return" property="og:url"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image:secure_url"/>
    <meta content="512" property="og:image:width"/>
    <meta content="512" property="og:image:height"/>
    <meta content="image/png" property="og:image:type"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" property="og:image:alt"/>

    <meta content="summary_large_image" name="twitter:card"/>
    <meta content="@wallexy_info" name="twitter:site"/>
    <meta content="@wallexy_info" name="twitter:creator"/>
    <meta content="نحوه ارسال و شرایط مرجوعی | والکسی" name="twitter:title"/>
    <meta content="راهنمای ارسال سفارش و شرایط مرجوعی کاغذدیواری والکسی؛ زمان ارسال، بارنامه، هزینه حمل، مهلت ۱۰ روزه مرجوعی، شرایط کالا و نکات مهم پیش از نصب." name="twitter:description"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" name="twitter:image"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" name="twitter:image:alt"/>

    <component is="script" type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://wallexy.ir/shipping-return#webpage",
            "url": "https://wallexy.ir/shipping-return",
            "name": "نحوه ارسال و شرایط مرجوعی | والکسی",
            "description": "راهنمای نحوه ارسال سفارش کاغذدیواری از والکسی و شرایط مرجوعی؛ زمان ارسال، بارنامه، هزینه حمل، مهلت ۱۰ روزه مرجوعی، شرایط کالا، لت‌نامبر، اختلاف رنگ و هزینه بازگشت کالا.",
            "inLanguage": "fa-IR",
            "dateModified": "2026-11-07",
            "isPartOf": {"@id": "https://wallexy.ir/#website"},
            "about": {"@id": "https://wallexy.ir/#organization"},
            "breadcrumb": {"@id": "https://wallexy.ir/shipping-return#breadcrumb"}
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://wallexy.ir/shipping-return#breadcrumb",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "خانه", "item": "https://wallexy.ir/"},
              {"@type": "ListItem", "position": 2, "name": "نحوه ارسال و شرایط مرجوعی", "item": "https://wallexy.ir/shipping-return"}
            ]
          }
        ]
      }
    </component>
  </inertia-head>
</template>

<script>
import {
  mdiAlertCircleOutline,
  mdiArrowLeft,
  mdiBackupRestore,
  mdiBarcode,
  mdiCalendarClock,
  mdiCashMultiple,
  mdiCheckCircleOutline,
  mdiClockOutline,
  mdiCreditCardOutline,
  mdiFileDocumentOutline,
  mdiFormatListNumbered,
  mdiInformationOutline,
  mdiMessageTextOutline,
  mdiPackageVariantClosed,
  mdiPaletteOutline,
  mdiPhone,
  mdiRulerSquare,
  mdiSend,
  mdiShieldCheckOutline,
  mdiTruckDeliveryOutline,
  mdiWall
} from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        alert: mdiAlertCircleOutline,
        arrow: mdiArrowLeft,
        barcode: mdiBarcode,
        check: mdiCheckCircleOutline,
        info: mdiInformationOutline,
        list: mdiFormatListNumbered,
        message: mdiMessageTextOutline,
        phone: mdiPhone,
        question: mdiInformationOutline,
        ruler: mdiRulerSquare,
        send: mdiSend,
        shield: mdiShieldCheckOutline,
        truck: mdiTruckDeliveryOutline
      },
      summaries: [
        {
          icon: mdiCalendarClock,
          value: '۱۰ روز',
          title: 'مهلت درخواست مرجوعی از زمان ثبت سفارش'
        },
        {
          icon: mdiClockOutline,
          value: 'حداکثر ۱ روز کاری',
          title: 'زمان ارسال سفارش پس از ثبت'
        },
        {
          icon: mdiCashMultiple,
          value: 'بر عهده مشتری',
          title: 'هزینه حمل سفارش'
        }
      ],
      sections: [
        {
          id: 'shipping',
          short: 'نحوه ارسال سفارش',
          icon: mdiTruckDeliveryOutline,
          title: 'نحوه ارسال سفارش',
          intro: 'سفارش‌ها معمولاً از طریق باربری‌های معتبر بین‌شهری ارسال می‌شوند. استفاده از این روش کمک می‌کند سفارش‌ها با هزینه حمل مناسب‌تری به شهرهای مختلف ارسال شوند و هزینه ارسال تا حد زیادی کاهش پیدا کند.'
        },
        {
          id: 'delivery-time',
          short: 'زمان ارسال',
          icon: mdiClockOutline,
          title: 'زمان ارسال',
          items: [
            'سفارش‌ها معمولاً حداکثر طی ۱ روز کاری پس از ثبت سفارش ارسال می‌شوند.',
            'زمان رسیدن سفارش به مقصد نیز به شهر مقصد، مسیر باربری و شرایط حمل‌ونقل بستگی دارد.'
          ]
        },
        {
          id: 'waybill',
          short: 'ارسال بارنامه',
          icon: mdiFileDocumentOutline,
          title: 'ارسال بارنامه',
          intro: 'پس از ارسال سفارش، بارنامه در اولین روز کاری پس از ثبت سفارش برای مشتری ارسال می‌شود تا اطلاعات حمل و امکان پیگیری بار در اختیار شما باشد.'
        },
        {
          id: 'shipping-cost',
          short: 'هزینه ارسال',
          icon: mdiCashMultiple,
          title: 'هزینه ارسال',
          intro: 'هزینه حمل سفارش بر عهده مشتری است و با توجه به مقصد، حجم سفارش و روش حمل تعیین می‌شود.',
          note: 'استفاده از باربری‌های معتبر بین‌شهری کمک می‌کند هزینه حمل سفارش نسبت به روش‌های ارسال مستقیم و خرده‌بار، تا حد زیادی کاهش پیدا کند.'
        },
        {
          id: 'return',
          short: 'شرایط مرجوعی',
          icon: mdiBackupRestore,
          title: 'شرایط مرجوعی',
          intro: 'برای اینکه فرآیند خرید و بازگشت کالا کاملاً شفاف باشد، لطفاً شرایط زیر را پیش از ثبت سفارش مطالعه کنید.'
        },
        {
          id: 'return-deadline',
          short: 'مهلت مرجوعی',
          icon: mdiCalendarClock,
          title: 'مهلت مرجوعی',
          highlight: {
            value: '۱۰ روز',
            label: 'امکان درخواست بازگشت کالا تا ۱۰ روز پس از ثبت سفارش، حتی اگر تنها ۱ رول از سفارش نیاز به مرجوعی داشته باشد.'
          },
          intro: 'در صورت رعایت شرایط مرجوعی، امکان درخواست بازگشت کالا تا ۱۰ روز پس از ثبت سفارش وجود دارد.'
        },
        {
          id: 'product-condition',
          short: 'شرایط کالا برای مرجوعی',
          icon: mdiPackageVariantClosed,
          title: 'شرایط کالا برای مرجوعی',
          items: [
            'کالا باید در شرایط اولیه خود و کاملاً پلمپ و وکیوم کارخانه باشد و هیچ‌گونه برش، چسباندن یا نصب روی آن انجام نشده باشد.',
            'پس از باز شدن رول، برش، چسباندن یا نصب کاغذدیواری، امکان مرجوعی به دلیل انتخاب رنگ، طرح یا مشخصات کالا وجود نخواهد داشت.'
          ]
        },
        {
          id: 'check-before-install',
          short: 'بررسی کد، لت‌نامبر و رنگ',
          icon: mdiBarcode,
          title: 'بررسی کد، لت‌نامبر و رنگ',
          intro: 'به دلیل تفاوت زمان تولید آلبوم‌ها و کاغذدیواری‌ها و همچنین فرآیند تولید، ممکن است رنگ محصول با نمونه موجود در آلبوم یا سری‌های مختلف تولید، تفاوت جزئی داشته باشد. بنابراین پیش از باز کردن رول‌ها و شروع نصب، حتماً موارد زیر را بررسی و با سفارش خود مطابقت دهید:',
          chips: [
            'کد محصول',
            'رنگ و طرح',
            'لت‌نامبر (Lot Number)',
            'تعداد رول',
            'سلامت ظاهری بسته‌بندی و کالا'
          ],
          note: 'توصیه می‌کنیم مصرف‌کننده نیز پیش از باز شدن رول‌ها، محصول را بررسی و تأیید کند.'
        },
        {
          id: 'color-difference',
          short: 'اختلاف جزئی رنگ',
          icon: mdiPaletteOutline,
          title: 'اختلاف جزئی رنگ',
          intro: 'به دلیل فرآیند چاپ و تولید کاغذدیواری، ممکن است بین تصاویر نمایش‌داده‌شده، نمونه آلبوم و محصول واقعی یا بین سری‌های مختلف تولید، اختلاف جزئی در رنگ وجود داشته باشد.',
          highlight: {
            value: 'تا ۲۰٪',
            label: 'اختلاف رنگ تا حدود ۲۰٪ می‌تواند در فرآیند تولید طبیعی باشد.'
          },
          note: 'برای پروژه‌هایی که به چندین رول نیاز دارند، توصیه می‌شود تمام رول‌های موردنیاز از یک سری تولید (Lot Number) تهیه شوند.'
        },
        {
          id: 'mismatch',
          short: 'مغایرت یا ایراد کالا',
          icon: mdiAlertCircleOutline,
          title: 'مغایرت یا ایراد کالا',
          intro: 'اگر پس از دریافت سفارش، مغایرتی در کد، طرح، رنگ، لت‌نامبر، تعداد یا سلامت کالا مشاهده کردید، موضوع را پیش از باز کردن رول، برش یا نصب با کارشناسان والکسی در میان بگذارید.',
          items: [
            'در صورت تأیید مغایرت یا ایراد قابل قبول از سوی والکسی و رعایت شرایط مرجوعی، کالا قابل بازگشت خواهد بود.',
            'مبلغ مربوط به کالای تأییدشده پس از دریافت و بررسی، به مشتری بازگردانده می‌شود.'
          ]
        },
        {
          id: 'return-cost',
          short: 'هزینه بازگشت کالا',
          icon: mdiCreditCardOutline,
          title: 'هزینه بازگشت کالا',
          items: [
            'در مواردی که مرجوعی به دلیل انتخاب اشتباه مشتری، تغییر نظر یا عدم نیاز به کالا انجام شود، هزینه بازگشت کالا بر عهده مشتری خواهد بود.',
            'در موارد مربوط به مغایرت یا ایراد تأییدشده، نحوه پرداخت هزینه بازگشت پس از بررسی توسط والکسی به مشتری اعلام می‌شود.'
          ]
        },
        {
          id: 'before-install',
          short: 'اهمیت بررسی پیش از نصب',
          icon: mdiWall,
          title: 'اهمیت بررسی پیش از نصب',
          intro: 'کاغذدیواری محصولی است که پس از برش و نصب امکان بررسی و بازگرداندن آن به شرایط اولیه وجود ندارد.',
          items: [
            'پیش از شروع کار، تمام رول‌ها را بررسی کنید.',
            'از مطابقت کد، طرح، رنگ، لت‌نامبر و تعداد با سفارش خود اطمینان حاصل کنید.'
          ],
          note: 'مسئولیت بررسی و تأیید محصول پیش از باز کردن رول و شروع نصب، بر عهده خریدار است.'
        }
      ]
    }
  },
  methods: {
    toPersian(value) {
      return String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit])
    }
  }
}
</script>
