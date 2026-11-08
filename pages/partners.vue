<template>
  <container class="mt-4">
    <div class="max-w-5xl mx-auto space-y-8 pb-6">

      <!-- HERO -->
      <section class="bg-white p-6 sm:p-10 card-rounded shadow-soft border border-slate-100 text-center space-y-6">
        <div class="inline-flex flex-wrap items-center justify-center gap-3">
          <div class="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            <span class="text-base">🤝</span>
            <span>همکاران تجاری والکسی | Wallexy Partners</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-medium shadow-sm">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>ویژه همکاران تجاری</span>
          </div>
        </div>

        <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight max-w-3xl mx-auto">
          همکاری تجاری با <span class="text-rose-500">والکسی</span> را آغاز کنید
        </h1>

        <p class="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          شرایط همکاری برای فروشگاه‌های کاغذدیواری و متخصصان دکوراسیون داخلی را ببینید، با نحوه دریافت آلبوم‌ها آشنا شوید و درخواست خود را ثبت کنید.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a href="#apply" class="bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2">
            <span>ثبت درخواست همکاری</span>
            <span class="text-xs">←</span>
          </a>
          <a href="#tiers" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all">
            مشاهده سطوح همکاری
          </a>
        </div>

        <div class="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500 font-medium max-w-3xl mx-auto">
          <div class="flex items-center justify-center gap-2">
            <span class="text-emerald-500">✔</span>
            <span>ارزیابی هویت تجاری</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-emerald-500">✔</span>
            <span>توزیع قاعده‌مند آلبوم‌ها</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-emerald-500">✔</span>
            <span>پشتیبانی اختصاصی B2B</span>
          </div>
        </div>
      </section>

      <!-- BENEFITS -->
      <section id="benefits" class="space-y-4">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-xs font-semibold">
            <span>💡</span>
            <span>چرا والکسی؟</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-800">مزایای شبکه همکاران</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-white p-6 card-rounded shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col items-center text-center space-y-3 border border-slate-100">
            <div class="icon-box bg-rose-100 text-rose-500 text-xl">🗂️</div>
            <h3 class="text-base font-bold text-slate-800">دسترسی به آلبوم‌های متنوع</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              طرح‌های کاغذدیواری را متناسب با نیاز فروشگاه و سلیقه مشتریان خود انتخاب کنید.
            </p>
          </div>

          <div class="bg-white p-6 card-rounded shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col items-center text-center space-y-3 border border-slate-100">
            <div class="icon-box bg-emerald-100 text-emerald-500 text-xl">🤝</div>
            <h3 class="text-base font-bold text-slate-800">شفافیت در همکاری</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              شرایط دریافت آلبوم‌ها، ودیعه، تخفیف‌ها و ادامه همکاری به‌صورت روشن و مشخص ارائه می‌شود.
            </p>
          </div>

          <div class="bg-white p-6 card-rounded shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col items-center text-center space-y-3 border border-slate-100">
            <div class="icon-box bg-purple-100 text-purple-600 text-xl">🎧</div>
            <h3 class="text-base font-bold text-slate-800">پشتیبانی و ارتباط مستقیم</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              برای پیگیری درخواست، دریافت آلبوم‌ها و پاسخ به پرسش‌های همکاری، با تیم والکسی در ارتباط باشید.
            </p>
          </div>
        </div>
      </section>

      <!-- TIERS -->
      <section id="tiers" class="space-y-4">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-semibold">
            <span>⭐</span>
            <span>سطوح ساختاریافته</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-800">مدل سه‌سطحی همکاران والکسی</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-white p-6 card-rounded shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between space-y-4 border border-slate-100">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">سطح ۱</span>
                <span class="text-slate-400">🏅</span>
              </div>
              <h3 class="text-lg font-bold text-slate-800">همکار پایه</h3>
              <div class="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p class="flex items-start gap-2">
                  <span class="text-rose-500 mt-0.5">✓</span>
                  <span>ودیعه آلبوم: <strong class="text-slate-800">۱,۰۰۰,۰۰۰ تومان</strong></span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-rose-500 mt-0.5">✓</span>
                  <span>بازگشت ودیعه پس از فروش بیش از <strong class="text-slate-800">۱۵۰ رول</strong> از همان آلبوم</span>
                </p>
              </div>
            </div>
            <div class="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              معیار ۱۵۰ رول اختصاصاً مربوط به همان آلبوم است.
            </div>
          </div>

          <div class="bg-white p-6 card-rounded shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between space-y-4 border-2 border-rose-400 relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
              پیشنهاد تعادل تجاری
            </div>
            <div class="space-y-3 pt-1">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">سطح ۲</span>
                <span class="text-rose-500">⭐</span>
              </div>
              <h3 class="text-lg font-bold text-slate-800">همکار فعال</h3>
              <div class="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p class="flex items-start gap-2">
                  <span class="text-rose-500 mt-0.5">✓</span>
                  <span>دریافت آلبوم <strong class="text-rose-600 font-bold">بدون دریافت ودیعه</strong></span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-rose-500 mt-0.5">✓</span>
                  <span>رعایت شرایط و ضوابط سطح همکاری فعال</span>
                </p>
              </div>
            </div>
            <div class="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              نیازمند احراز هویت تجاری و بررسی سابقه فروش.
            </div>
          </div>

          <div class="bg-white p-6 card-rounded shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between space-y-4 border border-slate-100">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">سطح ۳</span>
                <span class="text-purple-500">👑</span>
              </div>
              <h3 class="text-lg font-bold text-slate-800">همکار ویژه</h3>
              <div class="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p class="flex items-start gap-2">
                  <span class="text-purple-600 mt-0.5">✓</span>
                  <span>تخفیف‌ها و شرایط اختصاصی ارسال آلبوم</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-purple-600 mt-0.5">✓</span>
                  <span>اولویت در تامین جدیدترین کالکشن‌ها</span>
                </p>
              </div>
            </div>
            <div class="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              متناسب با ضوابط همکاری ویژه والکسی.
            </div>
          </div>
        </div>
      </section>

      <!-- STEPS -->
      <section id="steps" class="bg-white p-6 sm:p-8 card-rounded shadow-soft space-y-6 border border-slate-100">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-semibold">
            <span>🚀</span>
            <span>مسیر شفاف</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-800">مراحل شروع همکاری</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span class="text-rose-500 font-black text-sm">مرحله ۱</span>
            <h4 class="text-xs sm:text-sm font-bold text-slate-800">تکمیل فرم درخواست</h4>
            <p class="text-xs text-slate-500 leading-relaxed">اطلاعات فردی و نام کسب‌وکار خود را ثبت کنید.</p>
          </div>
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span class="text-rose-500 font-black text-sm">مرحله ۲</span>
            <h4 class="text-xs sm:text-sm font-bold text-slate-800">بارگذاری مدارک</h4>
            <p class="text-xs text-slate-500 leading-relaxed">تصویر کارت ویزیت و فروشگاه را آپلود نمایید.</p>
          </div>
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span class="text-rose-500 font-black text-sm">مرحله ۳</span>
            <h4 class="text-xs sm:text-sm font-bold text-slate-800">بررسی و ارزیابی</h4>
            <p class="text-xs text-slate-500 leading-relaxed">مدارک توسط کارشناسان والکسی بررسی می‌شود.</p>
          </div>
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span class="text-rose-500 font-black text-sm">مرحله ۴</span>
            <h4 class="text-xs sm:text-sm font-bold text-slate-800">تأیید و ارسال آلبوم</h4>
            <p class="text-xs text-slate-500 leading-relaxed">هماهنگی ارسال آلبوم و شروع همکاری تجاری.</p>
          </div>
        </div>
      </section>

      <!-- REQUIREMENTS -->
      <section id="requirements" class="bg-white p-6 sm:p-8 card-rounded shadow-soft space-y-6 border border-slate-100">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold">
            <span>📋</span>
            <span>احراز هویت</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-800">مدارک موردنیاز بررسی اولیه</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
            <div class="icon-box bg-rose-100 text-rose-500 shrink-0 text-xl">🪪</div>
            <div class="space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-slate-800">کارت ویزیت یا مدرک کسب‌وکار</h4>
              <p class="text-xs text-slate-500 leading-relaxed">تصویر واضح کارت ویزیت یا مدرک شناسایی مجموعه تجاری.</p>
            </div>
          </div>

          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
            <div class="icon-box bg-emerald-100 text-emerald-500 shrink-0 text-xl">🏬</div>
            <div class="space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-slate-800">تصویر فروشگاه یا محل فعالیت</h4>
              <p class="text-xs text-slate-500 leading-relaxed">تصویر نمای داخلی یا بیرونی فروشگاه و دفتر دکوراسیون.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- APPLICATION FORM -->
      <section id="apply" class="bg-white p-6 sm:p-8 card-rounded shadow-soft space-y-6 border border-slate-100">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-xs font-semibold">
            <span>✍️</span>
            <span>ثبت‌نام همکاران</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-800">فرم ثبت درخواست همکاری</h2>
          <p class="text-xs text-slate-500">اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.</p>
        </div>

        <form ref="form" class="max-w-3xl mx-auto space-y-4 pt-2" @submit.prevent="submit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">نام و نام خانوادگی *</label>
              <input v-model="form.fullName" type="text" required placeholder="مثال: رضا کریمی" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500 transition-colors">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">شماره تماس همراه *</label>
              <input v-model="form.phoneNumber" type="tel" required placeholder="09123456789" dir="ltr" class="w-full text-right bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500 transition-colors">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">نام فروشگاه یا کسب‌وکار *</label>
              <input v-model="form.storeName" type="text" required placeholder="مثال: دکوراسیون مدرن" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500 transition-colors">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">شهر محل فعالیت *</label>
              <input v-model="form.cityName" type="text" required placeholder="مثال: تهران" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500 transition-colors">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">نوع فعالیت *</label>
              <select v-model="form.activityType" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500 transition-colors text-slate-700">
                <option value="">انتخاب کنید...</option>
                <option value="فروشگاه کاغذدیواری">فروشگاه کاغذدیواری</option>
                <option value="فروشگاه دکوراسیون داخلی">فروشگاه دکوراسیون داخلی</option>
                <option value="نصاب کاغذدیواری">نصاب کاغذدیواری</option>
                <option value="فعال بازار کاغذدیواری">فعال بازار کاغذدیواری</option>
                <option value="سایر">سایر موارد</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">سطح همکاری پیشنهادی</label>
              <select v-model="form.tierSelection" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500 transition-colors text-slate-700">
                <option value="پایه">همکار پایه (ودیعه ۱ میلیون تومان)</option>
                <option value="فعال">همکار فعال (بدون ودیعه - نیازمند احراز)</option>
                <option value="ویژه">همکار ویژه (تخفیف و شرایط اختصاصی)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">کارت ویزیت / مدرک شناسایی</label>
              <input ref="cardInput" type="file" accept="image/*" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-500 file:text-white cursor-pointer">
              <span class="block text-[10px] text-slate-400 mt-1">فرمت jpg، png یا webp — حداکثر ۵ مگابایت</span>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">تصویر فروشگاه / محل فعالیت</label>
              <input ref="storeInput" type="file" accept="image/*" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-500 file:text-white cursor-pointer">
              <span class="block text-[10px] text-slate-400 mt-1">فرمت jpg، png یا webp — حداکثر ۵ مگابایت</span>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input id="privacyAgree" v-model="form.privacyAgree" type="checkbox" required class="w-4 h-4 text-rose-500 border-slate-300 rounded focus:ring-rose-500">
            <label for="privacyAgree" class="text-xs text-slate-600">
              صحت اطلاعات وارد شده را تایید می‌کنم.
            </label>
          </div>

          <div v-if="errorMessage" class="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl px-4 py-3">
            {{ errorMessage }}
          </div>

          <div class="pt-3 text-center">
            <button type="submit" :disabled="loading" class="bg-rose-500 hover:bg-rose-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-xl transition-all shadow-sm hover:shadow">
              {{ loading ? 'در حال ارسال...' : 'ثبت نهایی درخواست همکاری' }}
            </button>
          </div>
        </form>
      </section>

      <!-- FAQ -->
      <section id="faq" class="bg-white p-6 sm:p-8 card-rounded shadow-soft space-y-6 border border-slate-100">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-semibold">
            <span>❓</span>
            <span>پاسخ به ابهامات شما</span>
          </div>
          <h3 class="text-lg sm:text-xl font-extrabold text-slate-800">سوالات متداول همکاران</h3>
        </div>

        <div class="space-y-3 max-w-3xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
            <button type="button" class="w-full p-4 text-right flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 focus:outline-none" @click="toggleFaq(index)">
              <span>{{ faq.question }}</span>
              <span :class="{'rotate-180': openFaq === index}" class="text-slate-400 transition-transform duration-300 shrink-0">⌄</span>
            </button>
            <div v-show="openFaq === index" class="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- MODAL -->
    <div v-if="modal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div class="bg-white card-rounded p-6 max-w-sm w-full shadow-hover border border-slate-100 text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-xl"
             :class="modal.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-500'">
          {{ modal.type === 'success' ? '✓' : '!' }}
        </div>
        <h3 class="text-base font-bold text-slate-800">{{ modal.title }}</h3>
        <p class="text-xs text-slate-600 leading-relaxed">{{ modal.message }}</p>
        <button type="button" class="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-xl text-xs transition-all" @click="modal.show = false">
          متوجه شدم
        </button>
      </div>
    </div>
  </container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      errorMessage: '',
      openFaq: null,
      form: {
        fullName: '',
        phoneNumber: '',
        storeName: '',
        cityName: '',
        activityType: '',
        tierSelection: 'پایه',
        privacyAgree: false
      },
      modal: {
        show: false,
        type: 'success',
        title: '',
        message: ''
      },
      faqs: [
        {
          question: '۱. چه کسانی می‌توانند درخواست همکاری با والکسی ثبت کنند؟',
          answer: 'فروشگاه‌های کاغذدیواری، فروشگاه‌های دکوراسیون داخلی، نصابان حرفه‌ای و فعالان معتبر بازار کاغذدیواری.'
        },
        {
          question: '۲. شرایط ودیعه همکار پایه و نحوه بازگشت آن چگونه است؟',
          answer: 'در همکار پایه آلبوم با ودیعه ۱ میلیون تومان تقدیم می‌شود. با فروش بیش از ۱۵۰ رول از همان آلبوم، ودیعه بازگردانده می‌شود.'
        },
        {
          question: '۳. آیا دریافت آلبوم برای همکار فعال بدون ودیعه است؟',
          answer: 'بله، در سطح همکار فعال آلبوم بدون ودیعه ارائه می‌گردد مشروط به احراز شرایط و ضوابط مربوطه.'
        }
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index
    },
    submit() {
      this.errorMessage = ''
      this.loading = true

      const data = new FormData()
      data.append('fullName', this.form.fullName)
      data.append('phoneNumber', this.form.phoneNumber)
      data.append('storeName', this.form.storeName)
      data.append('cityName', this.form.cityName)
      data.append('activityType', this.form.activityType)
      data.append('tierSelection', this.form.tierSelection)

      const card = this.$refs.cardInput && this.$refs.cardInput.files[0]
      const store = this.$refs.storeInput && this.$refs.storeInput.files[0]
      if (card) data.append('cardFile', card)
      if (store) data.append('storeFile', store)

      this.axios.post('/partners', data)
        .then(() => {
          this.modal = {
            show: true,
            type: 'success',
            title: 'درخواست ثبت شد',
            message: `جناب/سرکار ${this.form.fullName}، درخواست همکاری مجموعه «${this.form.storeName}» با موفقیت ثبت گردید. کارشناسان والکسی به‌زودی با شما تماس می‌گیرند.`
          }
          this.$refs.form.reset()
          this.form.fullName = ''
          this.form.phoneNumber = ''
          this.form.storeName = ''
          this.form.cityName = ''
          this.form.activityType = ''
          this.form.tierSelection = 'پایه'
          this.form.privacyAgree = false
        })
        .catch(err => {
          const response = err.response && err.response.data
          if (response && response.errors) {
            const first = Object.values(response.errors)[0]
            this.errorMessage = Array.isArray(first) ? first[0].message : 'اطلاعات وارد شده صحیح نیست'
          } else if (response && response.message) {
            this.errorMessage = response.message
          } else {
            this.errorMessage = 'مشکلی پیش آمده است، لطفاً دوباره تلاش کنید.'
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.card-rounded {
  border-radius: 20px;
}

.shadow-soft {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-hover:hover {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
}

.rounded-2xl {
  border-radius: 1rem;
}

.rounded {
  border-radius: 0.25rem;
}

.icon-box {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
}

input[type="file"]::file-selector-button {
  margin-left: 0.5rem;
}
</style>
