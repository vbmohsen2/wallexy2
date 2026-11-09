<template>
  <container class="mt-4">
    <div class="max-w-5xl mx-auto space-y-6 pb-6">

      <!-- HERO -->
      <section class="relative overflow-hidden bg-white p-6 sm:p-10 rounded-xl border border-neutral-200 shadow-sm text-center space-y-6">
        <div class="absolute -left-16 -top-16 w-56 h-56 rounded-full bg-emerald-50 opacity-70 pointer-events-none"/>
        <div class="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-neutral-50 opacity-80 pointer-events-none"/>

        <div class="relative inline-flex flex-wrap items-center justify-center gap-3">
          <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200">
            <icon :name="icons.handshake" size="16"/>
            <span class="pt-0.5">همکاران تجاری والکسی | Wallexy Partners</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-white text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-medium shadow-sm">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>ویژه همکاران تجاری</span>
          </div>
        </div>

        <h1 class="relative text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl mx-auto">
          همکاری تجاری با <span class="text-emerald-600">والکسی</span> را آغاز کنید
        </h1>

        <p class="relative text-neutral-500 text-sm sm:text-base max-w-2xl mx-auto leading-7">
          شرایط همکاری برای فروشگاه‌های کاغذدیواری و متخصصان دکوراسیون داخلی را ببینید، با نحوه دریافت آلبوم‌ها آشنا شوید و درخواست خود را ثبت کنید.
        </p>

        <div class="relative flex flex-wrap items-center justify-center gap-3 pt-2">
          <a href="#apply" class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
            <span>ثبت درخواست همکاری</span>
            <icon :name="icons.arrow" size="16"/>
          </a>
          <a href="#tiers" class="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold px-5 py-3 rounded-lg transition-colors">
            مشاهده سطوح همکاری
          </a>
        </div>

        <div class="relative pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-500 font-medium max-w-3xl mx-auto">
          <div class="flex items-center justify-center gap-2">
            <icon :name="icons.tick" class="text-emerald-500" size="16"/>
            <span>ارزیابی هویت تجاری</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <icon :name="icons.tick" class="text-emerald-500" size="16"/>
            <span>توزیع قاعده‌مند آلبوم‌ها</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <icon :name="icons.tick" class="text-emerald-500" size="16"/>
            <span>پشتیبانی اختصاصی B2B</span>
          </div>
        </div>
      </section>

      <!-- BENEFITS -->
      <section id="benefits" class="space-y-4">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
            <icon :name="icons.info" size="14"/>
            <span class="pt-0.5">چرا والکسی؟</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-neutral-900">مزایای شبکه همکاران</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-3">
            <div class="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <icon :name="icons.layers" size="22"/>
            </div>
            <h3 class="text-md font-bold text-neutral-900">دسترسی به آلبوم‌های متنوع</h3>
            <p class="text-sm text-neutral-500 leading-7">
              طرح‌های کاغذدیواری را متناسب با نیاز فروشگاه و سلیقه مشتریان خود انتخاب کنید.
            </p>
          </div>

          <div class="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-3">
            <div class="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <icon :name="icons.handshake" size="22"/>
            </div>
            <h3 class="text-md font-bold text-neutral-900">شفافیت در همکاری</h3>
            <p class="text-sm text-neutral-500 leading-7">
              شرایط دریافت آلبوم‌ها، ودیعه، تخفیف‌ها و ادامه همکاری به‌صورت روشن و مشخص ارائه می‌شود.
            </p>
          </div>

          <div class="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-3">
            <div class="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <icon :name="icons.headset" size="22"/>
            </div>
            <h3 class="text-md font-bold text-neutral-900">پشتیبانی و ارتباط مستقیم</h3>
            <p class="text-sm text-neutral-500 leading-7">
              برای پیگیری درخواست، دریافت آلبوم‌ها و پاسخ به پرسش‌های همکاری، با تیم والکسی در ارتباط باشید.
            </p>
          </div>
        </div>
      </section>

      <!-- TIERS -->
      <section id="tiers" class="space-y-4">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
            <icon :name="icons.star" size="14"/>
            <span class="pt-0.5">سطوح ساختاریافته</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-neutral-900">مدل سه‌سطحی همکاران والکسی</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- سطح ۱ -->
          <div class="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">سطح ۱</span>
                <icon :name="icons.award" class="text-neutral-400" size="20"/>
              </div>
              <h3 class="text-lg font-bold text-neutral-900">همکار پایه</h3>
              <div class="space-y-2 text-sm text-neutral-600 leading-7">
                <p class="flex items-start gap-2">
                  <icon :name="icons.tick" class="text-emerald-500 shrink-0 mt-1" size="16"/>
                  <span>ودیعه آلبوم: <strong class="text-neutral-900">۱,۰۰۰,۰۰۰ تومان</strong></span>
                </p>
                <p class="flex items-start gap-2">
                  <icon :name="icons.tick" class="text-emerald-500 shrink-0 mt-1" size="16"/>
                  <span>بازگشت ودیعه پس از فروش بیش از <strong class="text-neutral-900">۱۵۰ رول</strong> از همان آلبوم</span>
                </p>
              </div>
            </div>
            <div class="pt-3 border-t border-neutral-200 text-xs text-neutral-400">
              معیار ۱۵۰ رول اختصاصاً مربوط به همان آلبوم است.
            </div>
          </div>

          <!-- سطح ۲ -->
          <div class="relative bg-emerald-50/40 p-6 rounded-xl border-2 border-emerald-300 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
              پیشنهاد تعادل تجاری
            </div>
            <div class="space-y-3 pt-1">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">سطح ۲</span>
                <icon :name="icons.star" class="text-emerald-600" size="20"/>
              </div>
              <h3 class="text-lg font-bold text-neutral-900">همکار فعال</h3>
              <div class="space-y-2 text-sm text-neutral-600 leading-7">
                <p class="flex items-start gap-2">
                  <icon :name="icons.tick" class="text-emerald-600 shrink-0 mt-1" size="16"/>
                  <span>دریافت آلبوم <strong class="text-emerald-700 font-bold">بدون دریافت ودیعه</strong></span>
                </p>
                <p class="flex items-start gap-2">
                  <icon :name="icons.tick" class="text-emerald-600 shrink-0 mt-1" size="16"/>
                  <span>رعایت شرایط و ضوابط سطح همکاری فعال</span>
                </p>
              </div>
            </div>
            <div class="pt-3 border-t border-emerald-200 text-xs text-neutral-500">
              نیازمند احراز هویت تجاری و بررسی سابقه فروش.
            </div>
          </div>

          <!-- سطح ۳ -->
          <div class="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full">سطح ۳</span>
                <icon :name="icons.crown" class="text-neutral-800" size="20"/>
              </div>
              <h3 class="text-lg font-bold text-neutral-900">همکار ویژه</h3>
              <div class="space-y-2 text-sm text-neutral-600 leading-7">
                <p class="flex items-start gap-2">
                  <icon :name="icons.tick" class="text-emerald-500 shrink-0 mt-1" size="16"/>
                  <span>تخفیف‌ها و شرایط اختصاصی ارسال آلبوم</span>
                </p>
                <p class="flex items-start gap-2">
                  <icon :name="icons.tick" class="text-emerald-500 shrink-0 mt-1" size="16"/>
                  <span>اولویت در تامین جدیدترین کالکشن‌ها</span>
                </p>
              </div>
            </div>
            <div class="pt-3 border-t border-neutral-200 text-xs text-neutral-400">
              متناسب با ضوابط همکاری ویژه والکسی.
            </div>
          </div>
        </div>
      </section>

      <!-- STEPS -->
      <section id="steps" class="bg-white p-5 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-5">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-semibold border border-neutral-200">
            <icon :name="icons.steps" size="14"/>
            <span class="pt-0.5">مسیر شفاف</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-neutral-900">مراحل شروع همکاری</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-2">
            <span class="text-emerald-600 font-black text-sm">مرحله ۱</span>
            <h4 class="text-sm font-bold text-neutral-900">تکمیل فرم درخواست</h4>
            <p class="text-xs text-neutral-500 leading-6">اطلاعات فردی و نام کسب‌وکار خود را ثبت کنید.</p>
          </div>
          <div class="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-2">
            <span class="text-emerald-600 font-black text-sm">مرحله ۲</span>
            <h4 class="text-sm font-bold text-neutral-900">بارگذاری مدارک</h4>
            <p class="text-xs text-neutral-500 leading-6">تصویر کارت ویزیت و فروشگاه را آپلود نمایید.</p>
          </div>
          <div class="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-2">
            <span class="text-emerald-600 font-black text-sm">مرحله ۳</span>
            <h4 class="text-sm font-bold text-neutral-900">بررسی و ارزیابی</h4>
            <p class="text-xs text-neutral-500 leading-6">مدارک توسط کارشناسان والکسی بررسی می‌شود.</p>
          </div>
          <div class="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-2">
            <span class="text-emerald-600 font-black text-sm">مرحله ۴</span>
            <h4 class="text-sm font-bold text-neutral-900">تأیید و ارسال آلبوم</h4>
            <p class="text-xs text-neutral-500 leading-6">هماهنگی ارسال آلبوم و شروع همکاری تجاری.</p>
          </div>
        </div>
      </section>

      <!-- REQUIREMENTS -->
      <section id="requirements" class="bg-white p-5 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-5">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
            <icon :name="icons.shield" size="14"/>
            <span class="pt-0.5">احراز هویت</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-neutral-900">مدارک موردنیاز بررسی اولیه</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div class="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start gap-3">
            <div class="w-11 h-11 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <icon :name="icons.card" size="22"/>
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-neutral-900">کارت ویزیت یا مدرک کسب‌وکار</h4>
              <p class="text-xs text-neutral-500 leading-6">تصویر واضح کارت ویزیت یا مدرک شناسایی مجموعه تجاری.</p>
            </div>
          </div>

          <div class="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start gap-3">
            <div class="w-11 h-11 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <icon :name="icons.store" size="22"/>
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-neutral-900">تصویر فروشگاه یا محل فعالیت</h4>
              <p class="text-xs text-neutral-500 leading-6">تصویر نمای داخلی یا بیرونی فروشگاه و دفتر دکوراسیون.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- APPLICATION FORM -->
      <section id="apply" class="bg-white p-5 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-5">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
            <icon :name="icons.users" size="14"/>
            <span class="pt-0.5">ثبت‌نام همکاران</span>
          </div>
          <h2 class="text-lg sm:text-xl font-extrabold text-neutral-900">فرم ثبت درخواست همکاری</h2>
          <p class="text-xs text-neutral-500">اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.</p>
        </div>

        <form ref="form" class="max-w-3xl mx-auto space-y-4 pt-2" @submit.prevent="submit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">نام و نام خانوادگی *</label>
              <input v-model="form.fullName" type="text" required placeholder="مثال: رضا کریمی" class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition">
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">شماره تماس همراه *</label>
              <input v-model="form.phoneNumber" type="tel" required placeholder="09123456789" dir="ltr" class="w-full text-right bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">نام فروشگاه یا کسب‌وکار *</label>
              <input v-model="form.storeName" type="text" required placeholder="مثال: دکوراسیون مدرن" class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition">
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">شهر محل فعالیت *</label>
              <input v-model="form.cityName" type="text" required placeholder="مثال: تهران" class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">نوع فعالیت *</label>
              <select v-model="form.activityType" required class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition">
                <option value="">انتخاب کنید...</option>
                <option value="فروشگاه کاغذدیواری">فروشگاه کاغذدیواری</option>
                <option value="فروشگاه دکوراسیون داخلی">فروشگاه دکوراسیون داخلی</option>
                <option value="نصاب کاغذدیواری">نصاب کاغذدیواری</option>
                <option value="فعال بازار کاغذدیواری">فعال بازار کاغذدیواری</option>
                <option value="سایر">سایر موارد</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">سطح همکاری پیشنهادی</label>
              <select v-model="form.tierSelection" class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition">
                <option value="پایه">همکار پایه (ودیعه ۱ میلیون تومان)</option>
                <option value="فعال">همکار فعال (بدون ودیعه - نیازمند احراز)</option>
                <option value="ویژه">همکار ویژه (تخفیف و شرایط اختصاصی)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">کارت ویزیت / مدرک شناسایی</label>
              <input ref="cardInput" type="file" accept="image/*" class="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-1.5 text-xs text-neutral-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white cursor-pointer">
              <span class="block text-[10px] text-neutral-400 mt-1">فرمت jpg، png یا webp — حداکثر ۵ مگابایت</span>
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-700 mb-1">تصویر فروشگاه / محل فعالیت</label>
              <input ref="storeInput" type="file" accept="image/*" class="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-1.5 text-xs text-neutral-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white cursor-pointer">
              <span class="block text-[10px] text-neutral-400 mt-1">فرمت jpg، png یا webp — حداکثر ۵ مگابایت</span>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input id="privacyAgree" v-model="form.privacyAgree" type="checkbox" required class="w-4 h-4 text-emerald-600 border-neutral-300 rounded focus:ring-emerald-500">
            <label for="privacyAgree" class="text-xs text-neutral-600">
              صحت اطلاعات وارد شده را تایید می‌کنم.
            </label>
          </div>

          <div v-if="errorMessage" class="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg px-4 py-3">
            {{ errorMessage }}
          </div>

          <div class="pt-2 text-center">
            <button type="submit" :disabled="loading" class="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors shadow-sm">
              {{ loading ? 'در حال ارسال...' : 'ثبت نهایی درخواست همکاری' }}
            </button>
          </div>
        </form>
      </section>

      <!-- FAQ -->
      <section id="faq" class="bg-white p-5 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-5">
        <div class="text-center space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
            <icon :name="icons.info" size="14"/>
            <span class="pt-0.5">پاسخ به ابهامات شما</span>
          </div>
          <h3 class="text-lg sm:text-xl font-extrabold text-neutral-900">سوالات متداول همکاران</h3>
        </div>

        <div class="space-y-2 max-w-3xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-neutral-200 rounded-lg overflow-hidden bg-white">
            <button type="button" class="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-sm text-neutral-900 hover:text-emerald-700 transition-colors focus:outline-none" @click="toggleFaq(index)">
              <span class="flex items-start gap-2.5">
                <span class="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-neutral-100 text-neutral-500 text-xs font-bold flex items-center justify-center">{{ index + 1 }}</span>
                <span>{{ faq.question }}</span>
              </span>
              <icon :name="icons.chevron" :class="{'rotate-180 text-emerald-600': openFaq === index}" class="shrink-0 text-neutral-400 transition-transform duration-300" size="20"/>
            </button>
            <div v-show="openFaq === index" class="px-4 pb-4 pr-8 text-sm text-neutral-600 leading-7 border-t border-neutral-200 pt-3">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT CTA -->
      <section class="bg-neutral-900 text-white rounded-xl p-6 sm:p-8 text-center">
        <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
          <icon :name="icons.headset" size="24"/>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold mb-2">سوالی درباره همکاری دارید؟</h2>
        <p class="text-sm text-neutral-300 max-w-xl mx-auto leading-7 mb-5">
          کارشناسان والکسی برای پاسخ به پرسش‌های شما درباره شرایط همکاری، ودیعه و دریافت آلبوم‌ها در کنار شما هستند.
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <a class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
             href="tel:+989015656733" title="تماس با پشتیبانی همکاران">
            <icon :name="icons.phone" size="18"/>
            <span>تماس با پشتیبانی همکاران</span>
          </a>
          <a class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
             href="https://t.me/wallexy_info" rel="noopener" target="_blank" title="پشتیبانی در تلگرام">
            <icon :name="icons.send" size="18"/>
            <span>پشتیبانی در تلگرام</span>
          </a>
        </div>
      </section>
    </div>

    <!-- MODAL -->
    <div v-if="modal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm px-4">
      <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-x border border-neutral-200 text-center space-y-4">
        <div class="w-12 h-12 rounded-xl mx-auto flex items-center justify-center"
             :class="modal.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'">
          <icon :name="modal.type === 'success' ? icons.check : icons.info" size="24"/>
        </div>
        <h3 class="text-base font-bold text-neutral-900">{{ modal.title }}</h3>
        <p class="text-sm text-neutral-500 leading-7">{{ modal.message }}</p>
        <button type="button" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors" @click="modal.show = false">
          متوجه شدم
        </button>
      </div>
    </div>
  </container>
</template>

<script>
import {
  mdiAccountGroupOutline,
  mdiArrowLeft,
  mdiTrophy,
  mdiCardAccountDetailsOutline,
  mdiCheck,
  mdiCheckCircle,
  mdiChevronDown,
  mdiClipboardTextOutline,
  mdiCrownOutline,
  mdiHandshakeOutline,
  mdiHeadset,
  mdiInformationOutline,
  mdiLayersOutline,
  mdiPhone,
  mdiSend,
  mdiShieldCheckOutline,
  mdiStarOutline,
  mdiStorefrontOutline
} from '@mdi/js'

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
      icons: {
        handshake: mdiHandshakeOutline,
        info: mdiInformationOutline,
        tick: mdiCheck,
        check: mdiCheckCircle,
        layers: mdiLayersOutline,
        headset: mdiHeadset,
        star: mdiStarOutline,
        award: mdiTrophy,
        crown: mdiCrownOutline,
        steps: mdiClipboardTextOutline,
        shield: mdiShieldCheckOutline,
        card: mdiCardAccountDetailsOutline,
        store: mdiStorefrontOutline,
        users: mdiAccountGroupOutline,
        chevron: mdiChevronDown,
        arrow: mdiArrowLeft,
        phone: mdiPhone,
        send: mdiSend
      },
      faqs: [
        {
          question: 'چه کسانی می‌توانند درخواست همکاری با والکسی ثبت کنند؟',
          answer: 'فروشگاه‌های کاغذدیواری، فروشگاه‌های دکوراسیون داخلی، نصابان حرفه‌ای و فعالان معتبر بازار کاغذدیواری.'
        },
        {
          question: 'شرایط ودیعه همکار پایه و نحوه بازگشت آن چگونه است؟',
          answer: 'در همکار پایه آلبوم با ودیعه ۱ میلیون تومان تقدیم می‌شود. با فروش بیش از ۱۵۰ رول از همان آلبوم، ودیعه بازگردانده می‌شود.'
        },
        {
          question: 'آیا دریافت آلبوم برای همکار فعال بدون ودیعه است؟',
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
input[type="file"]::file-selector-button {
  margin-left: 0.5rem;
}
</style>
