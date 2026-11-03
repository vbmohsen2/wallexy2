<template>
  <container class="mt-4">
    <!-- هدر صفحه -->
    <header class="text-center py-4 md:py-6">
      <div class="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-600 px-4 py-1.5 rounded-full text-sm font-medium border border-neutral-200 mb-4">
        <icon :name="icons.support" size="16"/>
        <span class="pt-0.5">پشتیبانی و تماس</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3">
        چطور می‌توانیم <span class="text-neutral-500">کمک کنیم؟</span>
      </h1>
      <p class="text-sm text-neutral-500 max-w-xl mx-auto leading-7">
        برای دریافت اطلاعات دقیق درباره محصولات، شرایط ثبت سفارش و خدمات پس از خرید، می‌توانید با تیم والکسی در ارتباط باشید.
      </p>
    </header>

    <!-- کارت‌های تماس -->
    <row class="-mx-2">
      <w v-for="contact in contacts" :key="contact.title" class="px-2 mb-4" md="1/3">
        <a :href="contact.href" :title="contact.title"
           class="block h-full bg-white border border-neutral-200 rounded-xl p-5 text-center shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center">
            <icon :name="contact.icon" size="24"/>
          </div>
          <div class="text-sm text-neutral-500 mb-2" v-text="contact.title"></div>
          <div :class="{'ltr': contact.ltr}" class="text-md font-bold text-neutral-900 inline-block" v-text="contact.value"></div>
          <div class="text-xs text-neutral-500 mt-1.5" v-text="contact.subtext"></div>
        </a>
      </w>
    </row>

    <!-- پشتیبانی همکاران -->
    <section class="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <row class="items-center -mx-3">
        <w class="px-3 mb-6 md:mb-0" md="2/3">
          <div class="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-medium border border-neutral-200 mb-3">
            <icon :name="icons.partner" size="14"/>
            <span class="pt-0.5">پشتیبانی همکاران</span>
          </div>
          <h2 class="text-xl font-bold text-neutral-900 mb-3">همکار گرامی، از اینجا با ما در ارتباط باشید</h2>
          <p class="text-sm text-neutral-500 leading-7 mb-5">
            برای پیگیری سفارش‌ها، دریافت راهنمایی و طرح پرسش‌های مربوط به همکاری، می‌توانید از طریق پشتیبانی آنلاین والکسی با ما در ارتباط باشید.
          </p>
          <row class="-mx-1">
            <w class="px-1 mb-2" sm="1/2">
              <a class="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                 href="https://t.me/wallexy_info" rel="noopener" target="_blank" title="مشاهده شرایط همکاری">
                <icon :name="icons.send" size="18"/>
                <span>مشاهده شرایط همکاری</span>
              </a>
            </w>
            <w class="px-1 mb-2" sm="1/2">
              <a class="w-full inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                 href="https://t.me/wallexy_info" rel="noopener" target="_blank" title="بخش همکاران">
                <icon :name="icons.users" size="18"/>
                <span>بخش همکاران</span>
              </a>
            </w>
          </row>
        </w>
        <w class="px-3" md="1/3">
          <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-5 text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center">
              <icon :name="icons.headset" size="24"/>
            </div>
            <div class="text-xs text-neutral-500">پاسخگویی سریع</div>
            <div class="text-2xl font-extrabold text-neutral-900 my-1">۹ تا ۲۱</div>
            <div class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mt-1">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              پشتیبانی آنلاین فعال است
            </div>
          </div>
        </w>
      </row>
    </section>

    <!-- شبکه‌های اجتماعی -->
    <section class="bg-white border border-neutral-200 rounded-xl p-5 md:p-7 mb-4 text-center">
      <h2 class="text-lg font-bold text-neutral-900 mb-1">ما را دنبال کنید</h2>
      <p class="text-sm text-neutral-500 mb-5">تازه‌های والکسی را در شبکه‌های اجتماعی ببینید.</p>
      <row class="-mx-2">
        <w v-for="social in socials" :key="social.name" class="px-2 mb-3" md="1/3">
          <a :href="social.href" :title="social.name" rel="noopener" target="_blank"
             class="flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl p-4 transition-colors text-right">
            <div class="w-10 h-10 shrink-0 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
              <icon :name="social.icon" size="20"/>
            </div>
            <div>
              <div class="text-sm font-bold text-neutral-900" v-text="social.name"></div>
              <div class="text-xs text-neutral-500" v-text="social.handle"></div>
            </div>
          </a>
        </w>
      </row>
    </section>

    <!-- آدرس و نقشه -->
    <section class="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 mb-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 shrink-0 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
          <icon :name="icons.location" size="20"/>
        </div>
        <div>
          <div class="text-xs text-neutral-500">آدرس دفتر مرکزی</div>
          <div class="text-sm font-medium text-neutral-900">اردبیل، خیابان عطایی، مجتمع شورا سنتر، پلاک M74</div>
        </div>
      </div>
      <div class="w-full h-[220px] rounded-xl overflow-hidden border border-neutral-200">
        <iframe :src="map" class="w-full h-full border-0" loading="lazy" title="نقشه دفتر مرکزی والکسی"></iframe>
      </div>
      <a :href="mapLink" class="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mt-3" rel="noopener" target="_blank">
        <icon :name="icons.open" size="16"/>
        <span>مشاهده روی نقشه بزرگ</span>
      </a>
    </section>

    <!-- سوالات متداول -->
    <section class="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <h2 class="text-xl font-extrabold text-neutral-900 text-center mb-4">سوالات متداول کاربران</h2>
      <div v-for="(item, index) in faqs" :key="index" class="border-b border-neutral-200 last:border-b-0">
        <button :aria-expanded="openFaq === index" class="w-full flex items-center justify-between gap-4 py-4 text-right text-md font-bold text-neutral-900"
                type="button" @click="toggleFaq(index)">
          <span v-text="item.question"></span>
          <span :class="{'rotate-45': openFaq === index}" class="shrink-0 text-xl text-neutral-400 transition-transform duration-200">+</span>
        </button>
        <div v-show="openFaq === index" class="pb-4 text-sm text-neutral-500 leading-7" v-text="item.answer"></div>
      </div>
    </section>
  </container>

  <inertia-head>
    <title>تماس با ما</title>
    <meta content="تماس با فروشگاه اینترنتی والکسی؛ شماره تلفن پشتیبانی فروش و همکاران، ایمیل، آدرس دفتر مرکزی در اردبیل، نقشه و پاسخ سوالات متداول." name="description"/>
    <link href="https://wallexy.ir/contact" rel="canonical"/>
    <link href="https://wallexy.ir/contact" hreflang="fa-IR" rel="alternate"/>
    <link href="https://wallexy.ir/contact" hreflang="x-default" rel="alternate"/>
    <meta content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" name="robots"/>
    <meta content="والکسی" name="author"/>
    <meta content="والکسی" name="publisher"/>
    <meta content="تماس با والکسی, شماره تماس والکسی, پشتیبانی والکسی, ایمیل والکسی, آدرس دفتر والکسی, فروشگاه اینترنتی کاغذ دیواری" name="keywords"/>
    <meta content="IR-03" name="geo.region"/>
    <meta content="اردبیل" name="geo.placename"/>
    <meta content="38.22185;48.28674" name="geo.position"/>
    <meta content="38.22185, 48.28674" name="ICBM"/>

    <meta content="fa_IR" property="og:locale"/>
    <meta content="website" property="og:type"/>
    <meta content="والکسی" property="og:site_name"/>
    <meta content="تماس با ما | والکسی" property="og:title"/>
    <meta content="راه‌های ارتباط با فروشگاه اینترنتی والکسی؛ شماره تماس پشتیبانی فروش و همکاران، ایمیل، آدرس دفتر مرکزی و سوالات متداول." property="og:description"/>
    <meta content="https://wallexy.ir/contact" property="og:url"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image:secure_url"/>
    <meta content="512" property="og:image:width"/>
    <meta content="512" property="og:image:height"/>
    <meta content="image/png" property="og:image:type"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" property="og:image:alt"/>

    <meta content="summary_large_image" name="twitter:card"/>
    <meta content="@wallexy_info" name="twitter:site"/>
    <meta content="@wallexy_info" name="twitter:creator"/>
    <meta content="تماس با ما | والکسی" name="twitter:title"/>
    <meta content="راه‌های ارتباط با فروشگاه اینترنتی والکسی؛ شماره تماس پشتیبانی فروش و همکاران، ایمیل، آدرس دفتر مرکزی و سوالات متداول." name="twitter:description"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" name="twitter:image"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" name="twitter:image:alt"/>

    <link href="https://www.openstreetmap.org" rel="preconnect"/>
    <link href="https://tile.openstreetmap.org" rel="preconnect"/>

    <component is="script" type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ContactPage",
            "@id": "https://wallexy.ir/contact#webpage",
            "url": "https://wallexy.ir/contact",
            "name": "تماس با ما | والکسی",
            "description": "راه‌های ارتباط با فروشگاه اینترنتی والکسی؛ شماره تماس پشتیبانی فروش و همکاران، ایمیل، آدرس دفتر مرکزی و سوالات متداول.",
            "inLanguage": "fa-IR",
            "dateModified": "2026-11-02",
            "isPartOf": {"@id": "https://wallexy.ir/#website"},
            "about": {"@id": "https://wallexy.ir/#organization"},
            "mainEntity": {"@id": "https://wallexy.ir/contact#faq"},
            "breadcrumb": {"@id": "https://wallexy.ir/contact#breadcrumb"},
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://wallexy.ir/icons/icon_512x512.177439.png",
              "width": 512,
              "height": 512
            }
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://wallexy.ir/#organization",
            "name": "والکسی",
            "alternateName": "Wallexy",
            "url": "https://wallexy.ir/",
            "logo": "https://wallexy.ir/logo/logo.png",
            "image": "https://wallexy.ir/icons/icon_512x512.177439.png",
            "description": "فروشگاه اینترنتی والکسی، فروش آنلاین کاغذ دیواری و پوستر با تضمین اصالت کالا و قیمت مناسب.",
            "email": "info@wallexy.ir",
            "telephone": "+989904283848",
            "priceRange": "IRR",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "خیابان عطایی، مجتمع شورا سنتر، پلاک M74",
              "addressLocality": "اردبیل",
              "addressRegion": "اردبیل",
              "addressCountry": "IR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.22185,
              "longitude": 48.28674
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                "opens": "09:00",
                "closes": "21:00"
              }
            ],
            "sameAs": [
              "https://t.me/wallexy_info",
              "https://www.instagram.com/wallexy_info/",
              "https://twitter.com/wallexy_info"
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+989904283848",
                "contactType": "sales",
                "areaServed": "IR",
                "availableLanguage": ["fa"]
              },
              {
                "@type": "ContactPoint",
                "telephone": "+989015656733",
                "contactType": "customer support",
                "areaServed": "IR",
                "availableLanguage": ["fa"]
              }
            ]
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://wallexy.ir/contact#breadcrumb",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "خانه", "item": "https://wallexy.ir/"},
              {"@type": "ListItem", "position": 2, "name": "تماس با ما", "item": "https://wallexy.ir/contact"}
            ]
          },
          {
            "@type": "FAQPage",
            "@id": "https://wallexy.ir/contact#faq",
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
                "name": "آیا موجودی و قیمت محصولات سایت به‌روز است؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "موجودی و قیمت کاغذدیواری‌ها ممکن است تغییر کند. به همین دلیل، پیش از هرگونه پرداخت، موجودی و قیمت روز محصول را از والکسی استعلام بگیرید."
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
                "name": "آیا اصالت کاغذدیواری‌های والکسی تضمین می‌شود؟",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "بله، اصالت کالاهای عرضه‌شده در والکسی تضمین می‌شود. محصولات از شرکت مرجع تأمین می‌شوند و پایین‌تر بودن قیمت به معنای تقلبی‌بودن یا درجه کیفی پایین‌تر کالا نیست."
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
  mdiAccountGroup,
  mdiCellphone,
  mdiEmailOutline,
  mdiHeadset,
  mdiInstagram,
  mdiMapMarker,
  mdiMessageTextOutline,
  mdiOpenInNew,
  mdiSend,
  mdiTwitter
} from '@mdi/js'

export default {
  data() {
    return {
      openFaq: null,
      map: 'https://www.openstreetmap.org/export/embed.html?bbox=48.27835%2C38.2125%2C48.29835%2C38.2225&layer=mapnik&marker=38.22185%2C48.28674',
      mapLink: 'https://www.openstreetmap.org/?mlat=38.22185&mlon=48.28674#map=16/38.22185/48.28674',
      contacts: [
        {
          title: 'پشتیبانی فروش',
          value: '۰۹۹۰ ۴۲۸ ۳۸۴۸',
          subtext: 'شنبه تا پنجشنبه ۹ صبح تا ۹ شب',
          href: 'tel:+989904283848',
          icon: mdiCellphone,
          ltr: true
        },
        {
          title: 'پشتیبانی همکار',
          value: '۰۹۰۱ ۵۶۵ ۶۷۳۳',
          subtext: 'پیگیری سفارش همکاران',
          href: 'tel:+989015656733',
          icon: mdiAccountGroup,
          ltr: true
        },
        {
          title: 'ایمیل ارتباطی',
          value: 'info@wallexy.ir',
          subtext: 'پاسخگویی تا ۲۴ ساعت کاری',
          href: 'mailto:info@wallexy.ir',
          icon: mdiEmailOutline,
          ltr: true
        }
      ],
      socials: [
        {
          name: 'اینستاگرام',
          handle: '@wallexy_info',
          href: 'https://www.instagram.com/wallexy_info/',
          icon: mdiInstagram
        },
        {
          name: 'کانال تلگرام',
          handle: 'اطلاعیه‌ها و آموزش‌ها',
          href: 'https://t.me/wallexy_info',
          icon: mdiSend
        },
        {
          name: 'توییتر (X)',
          handle: 'خبرهای والکسی',
          href: 'https://twitter.com/wallexy_info/',
          icon: mdiTwitter
        }
      ],
      faqs: [
        {
          question: 'آیا والکسی فروش حضوری دارد؟',
          answer: 'خیر، سفارش‌ها به‌صورت آنلاین ثبت و برای مشتریان ارسال می‌شوند.'
        },
        {
          question: 'آیا موجودی و قیمت محصولات سایت به‌روز است؟',
          answer: 'موجودی و قیمت کاغذدیواری‌ها ممکن است تغییر کند. به همین دلیل، پیش از هرگونه پرداخت، موجودی و قیمت روز محصول را از والکسی استعلام بگیرید.'
        },
        {
          question: 'تا چند روز امکان مرجوع‌کردن کالا وجود دارد؟',
          answer: 'طبق شرایط والکسی، مهلت مرجوعی ۱۰ روز از زمان ثبت سفارش است. کالا باید پلمب و بسته‌بندی کارخانه سالم داشته باشد و باز یا نصب نشده باشد.'
        },
        {
          question: 'آیا اصالت کاغذدیواری‌های والکسی تضمین می‌شود؟',
          answer: 'بله، اصالت کالاهای عرضه‌شده در والکسی تضمین می‌شود. محصولات از شرکت مرجع تأمین می‌شوند و پایین‌تر بودن قیمت به معنای تقلبی‌بودن یا درجه کیفی پایین‌تر کالا نیست.'
        },
        {
          question: 'اگر رول‌های کاغذدیواری کم بیاید، می‌توانم دوباره سفارش بدهم؟',
          answer: 'بله، در صورت موجودبودن محصول و امکان تأمین همان لت‌نامبر، می‌توانید رول تکمیلی سفارش دهید.'
        }
      ],
      icons: {
        support: mdiMessageTextOutline,
        partner: mdiAccountGroup,
        users: mdiAccountGroup,
        headset: mdiHeadset,
        send: mdiSend,
        location: mdiMapMarker,
        open: mdiOpenInNew
      }
    }
  },
  methods: {
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index
    }
  }
}
</script>
