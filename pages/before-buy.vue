<template>
  <container class="mt-4">
    <!-- هدر صفحه -->
    <header class="text-center py-4 md:py-6">
      <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 mb-4">
        <icon :name="icons.shield" size="16"/>
        <span class="pt-0.5">راهنمای خرید</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3">
        قبل از خرید <span class="text-emerald-600">بدانید</span>
      </h1>
      <p class="text-sm text-neutral-500 max-w-2xl mx-auto leading-7">
        هر آنچه لازم است پیش از سفارش کاغذدیواری از والکسی بدانید. خرید کاغذدیواری فقط انتخاب یک طرح زیبا نیست؛
        اطمینان از موجودی، قیمت، مشخصات محصول، تعداد رول و شرایط ارسال و مرجوعی هم اهمیت دارد.
      </p>
    </header>

    <!-- هشدار استعلام موجودی و قیمت -->
    <section class="bg-emerald-600 text-white rounded-xl p-5 md:p-6 mb-4 shadow-md">
      <row class="items-center -mx-2">
        <w class="px-2 mb-4 md:mb-0" md="2/3">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 shrink-0 rounded-lg bg-white/20 flex items-center justify-center">
              <icon :name="icons.alert" size="22"/>
            </div>
            <div>
              <h2 class="text-lg font-bold mb-1">قبل از پرداخت، موجودی و قیمت روز را استعلام بگیرید</h2>
              <p class="text-sm text-emerald-50 leading-7">
                موجودی و قیمت محصولات ممکن است تغییر کند. برای اطمینان از کد محصول، موجودی و قیمت روز،
                پیش از ثبت سفارش با کارشناسان والکسی در تماس باشید.
              </p>
            </div>
          </div>
        </w>
        <w class="px-2" md="1/3">
          <div class="flex flex-col gap-2">
            <a class="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
               href="tel:+989904283848" title="تماس با کارشناسان والکسی">
              <icon :name="icons.phone" size="18"/>
              <span>تماس با کارشناسان</span>
            </a>
            <a class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/40 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
               href="https://t.me/wallexy_info" rel="noopener" target="_blank" title="استعلام در تلگرام">
              <icon :name="icons.send" size="18"/>
              <span>استعلام در تلگرام</span>
            </a>
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

    <!-- راهنمای اندازه‌گیری -->
    <section class="relative overflow-hidden bg-white border border-emerald-200 rounded-xl p-5 md:p-6 mb-4">
      <div class="absolute -left-12 -top-12 w-40 h-40 rounded-full bg-emerald-50 opacity-70 pointer-events-none"/>
      <row class="relative items-center -mx-3">
        <w class="px-3 mb-4 md:mb-0" md="2/3">
          <div class="flex items-start gap-3">
            <div class="w-11 h-11 shrink-0 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <icon :name="icons.measure" size="22"/>
            </div>
            <div>
              <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200 mb-2">
                <span class="pt-0.5">ابزار کمکی خرید</span>
              </div>
              <h2 class="text-lg font-bold text-neutral-900 mb-1">نمی‌دانید چند رول کاغذدیواری لازم دارید؟</h2>
              <p class="text-sm text-neutral-500 leading-7">
                پیش از ثبت سفارش، اندازه دیوارها را با راهنمای «نحوه اندازه‌گیری» والکسی بررسی کنید.
                در این راهنما چهار روش ساده، از ترسیم کروکی تا محاسبه توسط کارشناس، همراه با محاسبه‌گر آنلاین تعداد رول آموزش داده شده است.
              </p>
            </div>
          </div>
        </w>
        <w class="px-3" md="1/3">
          <inertia-link class="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                        href="/measure" title="راهنمای نحوه اندازه‌گیری کاغذدیواری">
            <icon :name="icons.ruler" size="18"/>
            <span>راهنمای نحوه اندازه‌گیری</span>
            <icon :name="icons.arrow" size="16"/>
          </inertia-link>
          <div class="text-center text-xs text-neutral-500 mt-2">۴ روش ساده + محاسبه‌گر آنلاین تعداد رول</div>
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

      <div v-if="section.steps" class="space-y-2 mb-4">
        <div v-for="(step, stepIndex) in section.steps" :key="step"
             class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
          <span class="w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center" v-text="toPersian(stepIndex + 1)"></span>
          <span class="text-sm text-neutral-700 leading-7 pt-0.5" v-text="step"></span>
        </div>
      </div>

      <div v-if="section.chips" class="flex flex-wrap gap-2 mb-4">
        <span v-for="chip in section.chips" :key="chip"
              class="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-700 text-sm px-3 py-1.5 rounded-full">
          <icon :name="icons.truck" class="text-emerald-600" size="16"/>
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

    <!-- سوال پایانی -->
    <section class="bg-neutral-900 text-white rounded-xl p-6 md:p-8 mb-4 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
        <icon :name="icons.question" size="24"/>
      </div>
      <h2 class="text-xl md:text-2xl font-extrabold mb-3">هنوز سؤالی دارید؟</h2>
      <p class="text-sm text-neutral-300 max-w-xl mx-auto leading-7 mb-5">
        اگر درباره انتخاب محصول، موجودی، قیمت، تعداد رول، ارسال یا شرایط مرجوعی سؤالی دارید،
        پیش از ثبت سفارش با کارشناسان والکسی در ارتباط باشید. ما ترجیح می‌دهیم پیش از خرید
        تمام ابهامات شما برطرف شود تا با اطمینان بیشتری سفارش خود را ثبت کنید.
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <a class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
           href="tel:+989904283848" title="تماس با کارشناسان والکسی">
          <icon :name="icons.phone" size="18"/>
          <span>تماس با کارشناسان</span>
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
    <title>قبل از خرید بدانید</title>
    <meta content="راهنمای خرید کاغذدیواری از والکسی؛ استعلام موجودی و قیمت روز، کیفیت و اصالت محصول، تفاوت رنگ تصاویر، مراحل ثبت سفارش، ارسال، شرایط مرجوعی و نکات مهم قبل از نصب." name="description"/>
    <link href="https://wallexy.ir/before-buy" rel="canonical"/>
    <link href="https://wallexy.ir/before-buy" hreflang="fa-IR" rel="alternate"/>
    <link href="https://wallexy.ir/before-buy" hreflang="x-default" rel="alternate"/>
    <meta content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" name="robots"/>
    <meta content="والکسی" name="author"/>
    <meta content="والکسی" name="publisher"/>
    <meta content="قبل از خرید بدانید, راهنمای خرید کاغذ دیواری, استعلام موجودی کاغذ دیواری, قیمت روز کاغذ دیواری, شرایط مرجوعی والکسی, نحوه ارسال والکسی, نکات قبل از نصب کاغذ دیواری" name="keywords"/>

    <meta content="fa_IR" property="og:locale"/>
    <meta content="website" property="og:type"/>
    <meta content="والکسی" property="og:site_name"/>
    <meta content="قبل از خرید بدانید | والکسی" property="og:title"/>
    <meta content="هر آنچه لازم است پیش از سفارش کاغذدیواری از والکسی بدانید؛ استعلام موجودی و قیمت روز، اصالت محصول، مراحل ثبت سفارش، ارسال، مرجوعی و نکات قبل از نصب." property="og:description"/>
    <meta content="https://wallexy.ir/before-buy" property="og:url"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image:secure_url"/>
    <meta content="512" property="og:image:width"/>
    <meta content="512" property="og:image:height"/>
    <meta content="image/png" property="og:image:type"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" property="og:image:alt"/>

    <meta content="summary_large_image" name="twitter:card"/>
    <meta content="@wallexy_info" name="twitter:site"/>
    <meta content="@wallexy_info" name="twitter:creator"/>
    <meta content="قبل از خرید بدانید | والکسی" name="twitter:title"/>
    <meta content="هر آنچه لازم است پیش از سفارش کاغذدیواری از والکسی بدانید؛ استعلام موجودی و قیمت روز، اصالت محصول، مراحل ثبت سفارش، ارسال، مرجوعی و نکات قبل از نصب." name="twitter:description"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" name="twitter:image"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" name="twitter:image:alt"/>

    <component is="script" type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://wallexy.ir/before-buy#webpage",
            "url": "https://wallexy.ir/before-buy",
            "name": "قبل از خرید بدانید | والکسی",
            "description": "راهنمای خرید کاغذدیواری از والکسی؛ استعلام موجودی و قیمت روز، کیفیت و اصالت محصول، تفاوت رنگ تصاویر، مراحل ثبت سفارش، ارسال، شرایط مرجوعی و نکات مهم قبل از نصب.",
            "inLanguage": "fa-IR",
            "dateModified": "2026-11-03",
            "isPartOf": {"@id": "https://wallexy.ir/#website"},
            "about": {"@id": "https://wallexy.ir/#organization"},
            "breadcrumb": {"@id": "https://wallexy.ir/before-buy#breadcrumb"}
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://wallexy.ir/before-buy#breadcrumb",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "خانه", "item": "https://wallexy.ir/"},
              {"@type": "ListItem", "position": 2, "name": "قبل از خرید بدانید", "item": "https://wallexy.ir/before-buy"}
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
  mdiBarcode,
  mdiCartOutline,
  mdiCheck,
  mdiCheckCircleOutline,
  mdiClipboardCheckOutline,
  mdiFormatListNumbered,
  mdiImageOutline,
  mdiInformationOutline,
  mdiMessageTextOutline,
  mdiPaletteOutline,
  mdiPhone,
  mdiRefresh,
  mdiRulerSquare,
  mdiSend,
  mdiShieldCheckOutline,
  mdiTruckDeliveryOutline
} from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        alert: mdiAlertCircleOutline,
        barcode: mdiBarcode,
        cart: mdiCartOutline,
        check: mdiCheckCircleOutline,
        checklist: mdiClipboardCheckOutline,
        image: mdiImageOutline,
        info: mdiInformationOutline,
        list: mdiFormatListNumbered,
        message: mdiMessageTextOutline,
        palette: mdiPaletteOutline,
        phone: mdiPhone,
        refresh: mdiRefresh,
        send: mdiSend,
        shield: mdiShieldCheckOutline,
        truck: mdiTruckDeliveryOutline,
        question: mdiInformationOutline,
        checkMark: mdiCheck,
        measure: mdiRulerSquare,
        ruler: mdiRulerSquare,
        arrow: mdiArrowLeft
      },
      sections: [
        {
          id: 'availability',
          short: 'موجودی و قیمت محصولات',
          icon: mdiRefresh,
          title: 'موجودی و قیمت محصولات؛ قبل از پرداخت استعلام بگیرید',
          intro: 'یکی از مهم‌ترین نکات در خرید کاغذدیواری، اطمینان از موجودی و قیمت روز محصول است.',
          items: [
            'موجودی کاغذدیواری‌ها ممکن است به دلیل فروش هم‌زمان یا تغییر موجودی شرکت‌های تأمین‌کننده، مرتباً تغییر کند.',
            'اطلاعات موجودی در وب‌سایت ممکن است با موجودی لحظه‌ای انبار یا آلبوم تأمین‌کننده یکسان نباشد.',
            'قیمت محصولات نیز ممکن است تغییر کند.',
            'بنابراین پیش از پرداخت، حتماً کد محصول، موجودی و قیمت روز را با کارشناسان والکسی بررسی کنید.'
          ],
          note: 'هدف ما این است که سفارش شما با اطلاعات دقیق و بدون ابهام نهایی شود.'
        },
        {
          id: 'quality',
          short: 'کیفیت و اصالت محصول',
          icon: mdiShieldCheckOutline,
          title: 'کیفیت و اصالت کاغذدیواری',
          intro: 'یکی از نگرانی‌های خریداران اینترنتی، تفاوت کیفیت محصول با تصور اولیه آن‌هاست.',
          items: [
            'در والکسی محصولات بر اساس آلبوم و کد مشخص عرضه می‌شوند.',
            'هر محصول دارای کد و آلبوم مرجع است.',
            'ملاک تطبیق محصول، کد و آلبوم آن است.',
            'قیمت پایین‌تر یک محصول لزوماً به معنای کیفیت پایین‌تر آن نیست.',
            'برای یک کد و آلبوم یکسان، درجه‌بندی ساختگی یک و دو در نظر گرفته نشده است.',
            'در صورت نیاز، می‌توانید پیش از خرید درباره مشخصات محصول و آلبوم آن از کارشناسان ما سؤال کنید.'
          ]
        },
        {
          id: 'images',
          short: 'تصاویر و تفاوت رنگ‌ها',
          icon: mdiPaletteOutline,
          title: 'تصاویر محصول و تفاوت رنگ‌ها',
          intro: 'تصاویر وب‌سایت برای مشاهده طرح، رنگ و انتخاب محصول تهیه شده‌اند؛ با این حال ممکن است تصویر نمایش‌داده‌شده با ظاهر محصول در محیط واقعی تفاوت جزئی داشته باشد. این تفاوت می‌تواند به دلایل زیر باشد:',
          items: [
            'تنظیمات نور و روشنایی نمایشگر موبایل یا کامپیوتر',
            'تفاوت نمایش رنگ در صفحه‌نمایش‌های مختلف',
            'شرایط نورپردازی محیط',
            'تفاوت طبیعی میان تولیدات یا سری‌های مختلف محصول'
          ],
          note: 'اگر تطابق دقیق رنگ برای فضای شما اهمیت زیادی دارد، پیشنهاد می‌کنیم پیش از ثبت سفارش با کارشناسان والکسی مشورت کنید.'
        },
        {
          id: 'order',
          short: 'ثبت سفارش و پرداخت',
          icon: mdiCartOutline,
          title: 'سفارش چگونه ثبت و پرداخت می‌شود؟',
          intro: 'تمام سفارش‌های والکسی به‌صورت آنلاین ثبت می‌شوند و فروش حضوری نداریم. مراحل خرید به این صورت است:',
          steps: [
            'محصول موردنظر خود را انتخاب کنید.',
            'کد محصول را برای استعلام موجودی و قیمت روز ارسال کنید.',
            'پس از تأیید موجودی و قیمت، سفارش خود را نهایی کنید.',
            'پرداخت را از طریق درگاه آنلاین یا روش پرداخت هماهنگ‌شده انجام دهید.',
            'سفارش برای آماده‌سازی و ارسال به واحد مربوطه ارجاع می‌شود.'
          ],
          note: 'توصیه می‌کنیم تا پیش از تأیید نهایی موجودی و قیمت، پرداختی انجام ندهید.'
        },
        {
          id: 'shipping',
          short: 'بسته‌بندی و ارسال',
          icon: mdiTruckDeliveryOutline,
          title: 'بسته‌بندی و ارسال سفارش',
          intro: 'سفارش‌ها پس از آماده‌سازی از طریق روش‌های ارسال متناسب با مقصد و شرایط سفارش ارسال می‌شوند.',
          chips: ['باربری و حمل‌ونقل اقتصادی', 'پست', 'تیپاکس'],
          items: [
            'هزینه ارسال، بسته به روش انتخابی و مقصد، بر عهده خریدار می‌باشد.',
            'بارنامه معمولاً یک روز پس از ثبت سفارش یا صبح روز کاری بعد ارسال خواهد شد.',
            'زمان رسیدن سفارش به مقصد به شرکت حمل‌ونقل و مسیر ارسال بستگی دارد.'
          ]
        },
        {
          id: 'return',
          short: 'شرایط مرجوعی و بازگشت وجه',
          icon: mdiRefresh,
          title: 'شرایط مرجوعی و بازگشت وجه',
          intro: 'برای اینکه با اطمینان بیشتری خرید کنید، شرایط مرجوعی محصولات در والکسی مشخص شده است.',
          highlight: {
            value: '۱۰ روز',
            label: 'مهلت مرجوعی از زمان ثبت سفارش'
          }
        },
        {
          id: 'before-install',
          short: 'بررسی‌های قبل از نصب',
          icon: mdiClipboardCheckOutline,
          title: 'قبل از نصب کاغذدیواری حتماً بررسی کنید',
          intro: 'این بخش بسیار مهم است. لطفاً پیش از باز کردن بسته‌بندی و شروع نصب، موارد زیر را بررسی کنید:',
          items: [
            'کد محصول با سفارش شما مطابقت داشته باشد.',
            'طرح و رنگ کاغذدیواری صحیح باشد.',
            'تعداد رول‌های دریافتی با سفارش مطابقت داشته باشد.',
            'شماره سری ساخت یا Lot Number رول‌ها بررسی شود.',
            'بسته‌بندی و پلمب محصولات سالم باشد.'
          ],
          sub: {
            title: 'چرا بررسی شماره سری ساخت مهم است؟',
            text: 'در سفارش‌های چندرولی، بهتر است رول‌ها از یک سری ساخت باشند تا احتمال اختلاف جزئی رنگ میان رول‌ها کاهش پیدا کند.'
          },
          note: 'در صورت مشاهده هرگونه مغایرت یا آسیب، قبل از باز کردن بسته‌بندی و نصب، با والکسی تماس بگیرید. پس از برش یا نصب، امکان بررسی و پذیرش بسیاری از مغایرت‌های ظاهری وجود نخواهد داشت.'
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
