<template>
  <container class="mt-4">
    <!-- هدر صفحه -->
    <header class="text-center py-4 md:py-6">
      <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 mb-4">
        <icon :name="icons.help" size="16"/>
        <span class="pt-0.5">راهنمای خرید و پشتیبانی</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3">
        سؤالات <span class="text-emerald-600">متداول والکسی</span>
      </h1>
      <p class="text-sm text-neutral-500 max-w-2xl mx-auto leading-7">
        پاسخ پرسش‌های خود درباره ثبت سفارش، نحوه پرداخت، استعلام موجودی و ارسال محصولات والکسی را در این صفحه پیدا کنید.
      </p>
    </header>

    <!-- جست‌وجو -->
    <div class="relative mb-4">
      <input id="faqSearch" v-model="searchQuery" aria-label="جست‌وجو در سؤالات متداول" type="text"
             class="w-full bg-white border border-neutral-200 rounded-xl pr-12 pl-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
             placeholder="جست‌وجوی سوال یا کلمه کلیدی (مثلاً: ارسال، مرجوعی، لت‌نامبر)...">
      <icon :name="icons.search" class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size="20"/>
    </div>

    <!-- دسته‌بندی‌ها -->
    <nav aria-label="دسته‌بندی سؤالات" class="flex flex-wrap gap-2 mb-4 border-b border-neutral-200 pb-3">
      <button v-for="category in categories" :key="category.key" type="button"
              :class="activeCategory === category.key
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                : 'bg-transparent text-neutral-500 border-transparent hover:bg-neutral-100 hover:text-neutral-800'"
              class="border px-4 py-1.5 rounded-lg text-sm transition-colors"
              @click="activeCategory = category.key">
        <span v-text="category.label"></span>
      </button>
    </nav>

    <!-- لیست سؤالات -->
    <main class="bg-white border border-neutral-200 rounded-xl px-5 md:px-6">
      <div v-for="(item, index) in filteredFaqs" :key="item.id"
           class="border-b border-neutral-200 last:border-b-0">
        <button :aria-expanded="openFaq === item.id" :aria-controls="'faq-ans-' + item.id"
                class="w-full flex items-center justify-between gap-4 py-4 text-right text-sm md:text-md font-bold text-neutral-900 hover:text-emerald-700 transition-colors"
                type="button" @click="toggleFaq(item.id)">
          <span class="flex items-start gap-2.5">
            <span class="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-neutral-100 text-neutral-500 text-xs font-bold flex items-center justify-center"
                  v-text="toPersian(index + 1)"></span>
            <span v-text="item.question"></span>
          </span>
          <icon :name="icons.chevron"
                :class="{'rotate-180 text-emerald-600': openFaq === item.id}"
                class="shrink-0 text-neutral-400 transition-transform duration-300" size="20"/>
        </button>
        <div v-show="openFaq === item.id" :id="'faq-ans-' + item.id" class="pb-5 pr-8 text-sm text-neutral-600 leading-7">
          <span v-text="item.answer"></span>
        </div>
      </div>

      <!-- حالت خالی -->
      <div v-if="filteredFaqs.length === 0" class="text-center py-12 px-4">
        <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-neutral-100 text-neutral-400 flex items-center justify-center">
          <icon :name="icons.search" size="26"/>
        </div>
        <p class="text-sm text-neutral-500 mb-4">سؤالی متناسب با عبارت جست‌وجوشده پیدا نشد.</p>
        <button class="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                type="button" @click="resetFilters">
          <span>نمایش همه سؤال‌ها</span>
        </button>
      </div>
    </main>

    <!-- راهنماهای مرتبط -->
    <section class="bg-white border border-emerald-200 rounded-xl p-5 md:p-6 mt-4">
      <h2 class="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-3">
        <icon :name="icons.info" class="text-emerald-600" size="20"/>
        <span>راهنماهای مرتبط</span>
      </h2>
      <row class="-mx-2">
        <w v-for="guide in guides" :key="guide.href" class="px-2 mb-2" md="1/2">
          <inertia-link :href="guide.href" :title="guide.title"
                        class="flex items-center justify-between gap-3 bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-200 rounded-lg p-4 transition-colors">
            <div class="flex items-center gap-3">
              <icon :name="guide.icon" class="text-emerald-600" size="22"/>
              <div>
                <div class="text-sm font-semibold text-neutral-900" v-text="guide.title"></div>
                <div class="text-xs text-neutral-500 mt-1" v-text="guide.subtitle"></div>
              </div>
            </div>
            <icon :name="icons.arrow" class="text-emerald-600 shrink-0" size="18"/>
          </inertia-link>
        </w>
      </row>
    </section>

    <!-- تماس -->
    <section class="bg-neutral-900 text-white rounded-xl p-6 md:p-8 mt-4 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
        <icon :name="icons.message" size="24"/>
      </div>
      <h2 class="text-xl md:text-2xl font-extrabold mb-3">پاسخ سؤال خود را پیدا نکردید؟</h2>
      <p class="text-sm text-neutral-300 max-w-xl mx-auto leading-7 mb-5">
        با تیم والکسی در ارتباط باشید؛ کارشناسان ما برای راهنمایی درباره محصول، موجودی، قیمت و پیگیری سفارش در کنار شما هستند.
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <a class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
           href="tel:+989904283848" title="تماس با کارشناسان والکسی">
          <icon :name="icons.phone" size="18"/>
          <span>تماس با کارشناسان</span>
        </a>
        <a class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
           href="https://t.me/wallexy_info" rel="noopener" target="_blank" title="پشتیبانی در تلگرام">
          <icon :name="icons.send" size="18"/>
          <span>پشتیبانی در تلگرام</span>
        </a>
        <inertia-link class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                      href="/contact" title="صفحه تماس با ما">
          <icon :name="icons.support" size="18"/>
          <span>صفحه تماس با ما</span>
        </inertia-link>
      </div>
    </section>
  </container>

  <inertia-head>
    <title>سؤالات متداول والکسی | Wallexy</title>
    <meta content="پاسخ سؤالات متداول والکسی درباره ثبت سفارش، نحوه پرداخت، استعلام موجودی و قیمت، مشخصات و رنگ، نحوه ارسال، بارنامه، شرایط مرجوعی و تضمین اصالت کالا." name="description"/>
    <link href="https://wallexy.ir/faq" rel="canonical"/>
    <link href="https://wallexy.ir/faq" hreflang="fa-IR" rel="alternate"/>
    <link href="https://wallexy.ir/faq" hreflang="x-default" rel="alternate"/>
    <meta content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" name="robots"/>
    <meta content="والکسی" name="author"/>
    <meta content="والکسی" name="publisher"/>
    <meta content="سوالات متداول والکسی, ثبت سفارش, نحوه پرداخت, استعلام موجودی, ارسال کاغذ دیواری, مرجوعی, لت نامبر, اصالت کالا" name="keywords"/>

    <meta content="fa_IR" property="og:locale"/>
    <meta content="website" property="og:type"/>
    <meta content="والکسی" property="og:site_name"/>
    <meta content="سؤالات متداول والکسی | Wallexy" property="og:title"/>
    <meta content="پاسخ پرسش‌های شما درباره ثبت سفارش، پرداخت، استعلام موجودی و قیمت، ارسال، مرجوعی و اصالت محصولات والکسی." property="og:description"/>
    <meta content="https://wallexy.ir/faq" property="og:url"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image:secure_url"/>
    <meta content="512" property="og:image:width"/>
    <meta content="512" property="og:image:height"/>
    <meta content="image/png" property="og:image:type"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" property="og:image:alt"/>

    <meta content="summary_large_image" name="twitter:card"/>
    <meta content="@wallexy_info" name="twitter:site"/>
    <meta content="@wallexy_info" name="twitter:creator"/>
    <meta content="سؤالات متداول والکسی | Wallexy" name="twitter:title"/>
    <meta content="پاسخ پرسش‌های شما درباره ثبت سفارش، پرداخت، استعلام موجودی و قیمت، ارسال، مرجوعی و اصالت محصولات والکسی." name="twitter:description"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" name="twitter:image"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" name="twitter:image:alt"/>

    <component is="script" type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://wallexy.ir/faq#webpage",
            "url": "https://wallexy.ir/faq",
            "name": "سؤالات متداول والکسی | Wallexy",
            "description": "پاسخ سؤالات متداول والکسی درباره ثبت سفارش، نحوه پرداخت، استعلام موجودی و قیمت، مشخصات و رنگ، نحوه ارسال، بارنامه، شرایط مرجوعی و تضمین اصالت کالا.",
            "inLanguage": "fa-IR",
            "dateModified": "2026-11-08",
            "isPartOf": {"@id": "https://wallexy.ir/#website"},
            "about": {"@id": "https://wallexy.ir/#organization"},
            "mainEntity": {"@id": "https://wallexy.ir/faq#faq"},
            "breadcrumb": {"@id": "https://wallexy.ir/faq#breadcrumb"}
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://wallexy.ir/faq#breadcrumb",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "خانه", "item": "https://wallexy.ir/"},
              {"@type": "ListItem", "position": 2, "name": "سؤالات متداول", "item": "https://wallexy.ir/faq"}
            ]
          },
          {
            "@type": "FAQPage",
            "@id": "https://wallexy.ir/faq#faq",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "آیا والکسی فروش حضوری دارد؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "خیر، سفارش‌ها به‌صورت آنلاین ثبت و برای مشتریان ارسال می‌شوند."
                }
              },
              {
                "@type": "Question",
                "name": "آیا می‌توانم سفارش خود را در واتساپ ثبت کنم؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "بله، می‌توانید کد محصول موردنظر را ارسال کنید تا پس از بررسی موجودی و قیمت روز، برای ادامه خرید راهنمایی شوید."
                }
              },
              {
                "@type": "Question",
                "name": "آیا موجودی و قیمت محصولات سایت به‌روز است؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "موجودی و قیمت کاغذدیواری‌ها ممکن است تغییر کند. به همین دلیل، پیش از هرگونه پرداخت، موجودی و قیمت روز محصول را از والکسی استعلام بگیرید."
                }
              },
              {
                "@type": "Question",
                "name": "آیا قیمت پایین‌تر محصولات والکسی به معنای کیفیت پایین‌تر است؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "خیر، قیمت پایین‌تر به معنای درجه کیفی پایین‌تر نیست. در صورت یکسان‌بودن کد محصول و آلبوم، محصول همان کالای عرضه‌شده در سایر فروشگاه‌هاست؛ با این تفاوت که هزینه‌ها و حاشیه سود فروش می‌تواند متفاوت باشد."
                }
              },
              {
                "@type": "Question",
                "name": "چرا باید هنگام خرید به لت‌نامبر توجه کنم؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "رول‌هایی که از سری‌های تولید متفاوت هستند، ممکن است اختلاف جزئی در رنگ یا چاپ داشته باشند. بهتر است تعداد موردنیاز را از ابتدا محاسبه کنید و رول‌ها را تا حد امکان از یک لت‌نامبر تهیه کنید."
                }
              },
              {
                "@type": "Question",
                "name": "تا چه زمانی می‌توانم همان لت‌نامبر را دوباره تهیه کنم؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "معمولاً تا حدود یک ماه، در صورت موجودبودن، امکان تهیه رول تکمیلی وجود دارد؛ اما پس از چند ماه احتمال پیدا کردن همان لت‌نامبر کمتر می‌شود."
                }
              },
              {
                "@type": "Question",
                "name": "چرا رنگ کاغذدیواری در نمایشگرها متفاوت دیده می‌شود؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "تنظیمات نمایشگر، نور محیط و شرایط عکاسی می‌توانند باعث شوند رنگ محصول کمی متفاوت از تصویر دیده شود."
                }
              },
              {
                "@type": "Question",
                "name": "کدام روش ارسال هزینه کمتری دارد؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "هزینه ارسال به حجم و وزن سفارش، مقصد و روش حمل بستگی دارد. باربری برای سفارش‌های حجیم معمولاً اقتصادی‌تر است، اما بهتر است پیش از ارسال، هزینه روش‌های موجود را بررسی کنید."
                }
              },
              {
                "@type": "Question",
                "name": "چرا بارنامه بلافاصله پس از ارسال سفارش فرستاده نمی‌شود؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "صدور یا دریافت تصویر بارنامه ممکن است با کمی فاصله از زمان تحویل سفارش به باربری انجام شود. معمولاً بارنامه روز بعد از ثبت سفارش ارسال خواهد شد."
                }
              },
              {
                "@type": "Question",
                "name": "تا چند روز امکان مرجوع‌کردن کالا وجود دارد؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "طبق شرایط والکسی، مهلت مرجوعی ۱۰ روز از زمان ثبت سفارش است. کالا باید پلمب و بسته‌بندی کارخانه سالم داشته باشد و باز یا نصب نشده باشد."
                }
              },
              {
                "@type": "Question",
                "name": "اگر محصول موجود نباشد یا قیمت آن تغییر کند، چه می‌شود؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "به دلیل تغییرات موجودی و قیمت، لازم است پیش از پرداخت استعلام روز انجام شود. اگر پس از پرداخت امکان تأمین محصول با شرایط تأییدشده وجود نداشته باشد، موضوع به شما اطلاع داده می‌شود و مبلغ پرداختی عودت داده خواهد شد."
                }
              },
              {
                "@type": "Question",
                "name": "آیا اصالت کاغذدیواری‌های والکسی تضمین می‌شود؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "بله، اصالت کالاهای عرضه‌شده در والکسی تضمین می‌شود. محصولات از شرکت مرجع تأمین می‌شوند و پایین‌تر بودن قیمت به معنای تقلبی‌بودن یا درجه کیفی پایین‌تر کالا نیست."
                }
              },
              {
                "@type": "Question",
                "name": "هزینه ارسال سفارش را چه کسی پرداخت می‌کند؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "هزینه ارسال معمولاً بر عهده مشتری است و با توجه به روش ارسال و مقصد محاسبه می‌شود."
                }
              },
              {
                "@type": "Question",
                "name": "اگر رول‌های کاغذدیواری کم بیاید، می‌توانم دوباره سفارش بدهم؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "بله، در صورت موجودبودن محصول و امکان تأمین همان لت‌نامبر، می‌توانید رول تکمیلی سفارش دهید."
                }
              }
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
  mdiChevronDown,
  mdiHelpCircleOutline,
  mdiInformationOutline,
  mdiMagnify,
  mdiMessageTextOutline,
  mdiPhone,
  mdiRulerSquare,
  mdiSend,
  mdiShieldCheckOutline,
  mdiTruckDeliveryOutline
} from '@mdi/js'

export default {
  data() {
    return {
      searchQuery: '',
      activeCategory: 'all',
      openFaq: null,
      icons: {
        alert: mdiAlertCircleOutline,
        arrow: mdiArrowLeft,
        chevron: mdiChevronDown,
        help: mdiHelpCircleOutline,
        info: mdiInformationOutline,
        message: mdiMessageTextOutline,
        phone: mdiPhone,
        search: mdiMagnify,
        send: mdiSend,
        shield: mdiShieldCheckOutline,
        support: mdiMessageTextOutline,
        truck: mdiTruckDeliveryOutline
      },
      categories: [
        {key: 'all', label: 'همه سؤال‌ها'},
        {key: 'order', label: 'ثبت سفارش و خرید'},
        {key: 'stock', label: 'موجودی و قیمت'},
        {key: 'technical', label: 'مشخصات و رنگ'},
        {key: 'shipping', label: 'ارسال و تحویل'},
        {key: 'returns', label: 'مرجوعی و ضمانت'}
      ],
      faqs: [
        {
          id: 1,
          category: 'order',
          keywords: 'فروش حضوری سفارش آنلاین',
          question: 'آیا والکسی فروش حضوری دارد؟',
          answer: 'خیر، سفارش‌ها به‌صورت آنلاین ثبت و برای مشتریان ارسال می‌شوند.'
        },
        {
          id: 2,
          category: 'order',
          keywords: 'واتساپ ثبت سفارش خرید آنلاین کد محصول',
          question: 'آیا می‌توانم سفارش خود را در واتساپ ثبت کنم؟',
          answer: 'بله، می‌توانید کد محصول موردنظر را ارسال کنید تا پس از بررسی موجودی و قیمت روز، برای ادامه خرید راهنمایی شوید.'
        },
        {
          id: 3,
          category: 'stock',
          keywords: 'موجودی قیمت روز استعلام پرداخت',
          question: 'آیا موجودی و قیمت محصولات سایت به‌روز است؟',
          answer: 'موجودی و قیمت کاغذدیواری‌ها ممکن است تغییر کند. به همین دلیل، پیش از هرگونه پرداخت، موجودی و قیمت روز محصول را از والکسی استعلام بگیرید.'
        },
        {
          id: 4,
          category: 'stock',
          keywords: 'قیمت ارزان کیفیت سود آلبوم درجه کیفی',
          question: 'آیا قیمت پایین‌تر محصولات والکسی به معنای کیفیت پایین‌تر است؟',
          answer: 'خیر، قیمت پایین‌تر به معنای درجه کیفی پایین‌تر نیست. در صورت یکسان‌بودن کد محصول و آلبوم، محصول همان کالای عرضه‌شده در سایر فروشگاه‌هاست؛ با این تفاوت که هزینه‌ها و حاشیه سود فروش می‌تواند متفاوت باشد.'
        },
        {
          id: 5,
          category: 'technical',
          keywords: 'لت نامبر پارت سری تولید اختلاف رنگ چاپ رول',
          question: 'چرا باید هنگام خرید به لت‌نامبر توجه کنم؟',
          answer: 'رول‌هایی که از سری‌های تولید متفاوت هستند، ممکن است اختلاف جزئی در رنگ یا چاپ داشته باشند. بهتر است تعداد موردنیاز را از ابتدا محاسبه کنید و رول‌ها را تا حد امکان از یک لت‌نامبر تهیه کنید.'
        },
        {
          id: 6,
          category: 'technical',
          keywords: 'تهیه لت نامبر تکمیلی خرید مجدد رول اضافه',
          question: 'تا چه زمانی می‌توانم همان لت‌نامبر را دوباره تهیه کنم؟',
          answer: 'معمولاً تا حدود یک ماه، در صورت موجودبودن، امکان تهیه رول تکمیلی وجود دارد؛ اما پس از چند ماه احتمال پیدا کردن همان لت‌نامبر کمتر می‌شود.'
        },
        {
          id: 7,
          category: 'technical',
          keywords: 'رنگ تصویر مانیتور نمایشگر عکاسی نور تفاوت',
          question: 'چرا رنگ کاغذدیواری در نمایشگرها متفاوت دیده می‌شود؟',
          answer: 'تنظیمات نمایشگر، نور محیط و شرایط عکاسی می‌توانند باعث شوند رنگ محصول کمی متفاوت از تصویر دیده شود.'
        },
        {
          id: 8,
          category: 'shipping',
          keywords: 'هزینه ارسال پست باربری ارزان حمل نقل',
          question: 'کدام روش ارسال هزینه کمتری دارد؟',
          answer: 'هزینه ارسال به حجم و وزن سفارش، مقصد و روش حمل بستگی دارد. باربری برای سفارش‌های حجیم معمولاً اقتصادی‌تر است، اما بهتر است پیش از ارسال، هزینه روش‌های موجود را بررسی کنید.'
        },
        {
          id: 9,
          category: 'shipping',
          keywords: 'بارنامه کد رهگیری باربری زمان تحویل',
          question: 'چرا بارنامه بلافاصله پس از ارسال سفارش فرستاده نمی‌شود؟',
          answer: 'صدور یا دریافت تصویر بارنامه ممکن است با کمی فاصله از زمان تحویل سفارش به باربری انجام شود. معمولاً بارنامه روز بعد از ثبت سفارش ارسال خواهد شد.'
        },
        {
          id: 10,
          category: 'returns',
          keywords: 'مرجوعی بازگشت کالا ۱۰ روز مهلت پلمب تعویض',
          question: 'تا چند روز امکان مرجوع‌کردن کالا وجود دارد؟',
          answer: 'طبق شرایط والکسی، مهلت مرجوعی ۱۰ روز از زمان ثبت سفارش است. کالا باید پلمب و بسته‌بندی کارخانه سالم داشته باشد و باز یا نصب نشده باشد.'
        },
        {
          id: 11,
          category: 'stock',
          keywords: 'عدم موجودی عودت وجه استعلام تغییر قیمت تامین',
          question: 'اگر محصول موجود نباشد یا قیمت آن تغییر کند، چه می‌شود؟',
          answer: 'به دلیل تغییرات موجودی و قیمت، لازم است پیش از پرداخت استعلام روز انجام شود. اگر پس از پرداخت امکان تأمین محصول با شرایط تأییدشده وجود نداشته باشد، موضوع به شما اطلاع داده می‌شود و مبلغ پرداختی عودت داده خواهد شد.'
        },
        {
          id: 12,
          category: 'returns',
          keywords: 'اصالت کالا ضمانت اورجینال کیفیت شرکتی مرجع',
          question: 'آیا اصالت کاغذدیواری‌های والکسی تضمین می‌شود؟',
          answer: 'بله، اصالت کالاهای عرضه‌شده در والکسی تضمین می‌شود. محصولات از شرکت مرجع تأمین می‌شوند و پایین‌تر بودن قیمت به معنای تقلبی‌بودن یا درجه کیفی پایین‌تر کالا نیست.'
        },
        {
          id: 13,
          category: 'shipping',
          keywords: 'هزینه کرایه پرداخت مشتری نحوه محاسبه',
          question: 'هزینه ارسال سفارش را چه کسی پرداخت می‌کند؟',
          answer: 'هزینه ارسال معمولاً بر عهده مشتری است و با توجه به روش ارسال و مقصد محاسبه می‌شود.'
        },
        {
          id: 14,
          category: 'order',
          keywords: 'کم آمدن رول خرید مجدد لت نامبر تکمیلی',
          question: 'اگر رول‌های کاغذدیواری کم بیاید، می‌توانم دوباره سفارش بدهم؟',
          answer: 'بله، در صورت موجودبودن محصول و امکان تأمین همان لت‌نامبر، می‌توانید رول تکمیلی سفارش دهید.'
        }
      ],
      guides: [
        {
          href: '/before-buy',
          title: 'قبل از خرید بدانید',
          subtitle: 'موجودی، قیمت روز، اصالت محصول و نکات مهم خرید',
          icon: mdiShieldCheckOutline
        },
        {
          href: '/shipping-return',
          title: 'نحوه ارسال و شرایط مرجوعی',
          subtitle: 'زمان ارسال، بارنامه، هزینه حمل و مهلت ۱۰ روزه مرجوعی',
          icon: mdiTruckDeliveryOutline
        },
        {
          href: '/measure',
          title: 'نحوه اندازه‌گیری',
          subtitle: '۴ روش ساده + محاسبه‌گر آنلاین تعداد رول',
          icon: mdiRulerSquare
        },
        {
          href: '/contact',
          title: 'تماس با ما',
          subtitle: 'شماره تماس پشتیبانی، ایمیل و آدرس دفتر مرکزی',
          icon: mdiMessageTextOutline
        }
      ]
    }
  },
  computed: {
    filteredFaqs() {
      const query = this.searchQuery.trim().toLowerCase()
      return this.faqs.filter(item => {
        const categoryMatch = this.activeCategory === 'all' || item.category === this.activeCategory
        const searchMatch = !query ||
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query) ||
          item.keywords.toLowerCase().includes(query)
        return categoryMatch && searchMatch
      })
    }
  },
  methods: {
    toggleFaq(id) {
      this.openFaq = this.openFaq === id ? null : id
    },
    resetFilters() {
      this.searchQuery = ''
      this.activeCategory = 'all'
      this.openFaq = null
    },
    toPersian(value) {
      return String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit])
    }
  }
}
</script>
