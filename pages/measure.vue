<template>
  <container class="mt-4">
    <!-- هدر صفحه -->
    <header class="text-center py-4 md:py-6">
      <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 mb-4">
        <icon :name="icons.ruler" size="16"/>
        <span class="pt-0.5">راهنمای اندازه‌گیری</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3">
        نحوه <span class="text-emerald-600">اندازه‌گیری</span> کاغذدیواری
      </h1>
      <p class="text-sm text-neutral-500 max-w-2xl mx-auto leading-7">
        با یک اندازه‌گیری ساده می‌توانید مقدار تقریبی کاغذدیواری موردنیازتان را مشخص کنید.
        در این راهنما ۴ روش کاربردی را آموزش داده‌ایم؛ از ترسیم یک کروکی ساده تا دریافت راهنمایی از کارشناسان والکسی.
      </p>
    </header>

    <!-- معرفی -->
    <section class="bg-emerald-600 text-white rounded-xl p-5 md:p-7 mb-4 shadow-md overflow-hidden">
      <row class="items-center -mx-3">
        <w class="px-3 mb-5 md:mb-0" md="3/5">
          <div class="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
            <icon :name="icons.tape" size="14"/>
            <span class="pt-0.5">از اندازه‌گیری دیوار تا محاسبه تعداد رول</span>
          </div>
          <h2 class="text-lg md:text-xl font-bold mb-2">راهنمای محاسبه تعداد رول موردنیاز کاغذدیواری</h2>
          <p class="text-sm text-emerald-50 leading-7 mb-5">
            ساده‌ترین روش، ترسیم کروکی است. اگر امکان تهیه کروکی ندارید، می‌توانید از محاسبه‌گرهای قد رول و مساحت
            استفاده کنید یا اندازه‌ها را برای کارشناسان والکسی بفرستید تا تعداد رول را برای شما بررسی کنند.
          </p>
          <div class="flex flex-wrap gap-2">
            <a class="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
               href="#methods" title="مشاهده روش‌های اندازه‌گیری">
              <icon :name="icons.list" size="18"/>
              <span>مشاهده روش‌های اندازه‌گیری</span>
            </a>
            <a class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/40 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
               href="tel:+989904283848" title="تماس با کارشناسان والکسی">
              <icon :name="icons.phone" size="18"/>
              <span>تماس با کارشناسان</span>
            </a>
          </div>
          <div class="flex items-center gap-2 text-xs text-emerald-50 mt-4">
            <icon :name="icons.check" size="16"/>
            <span>پیشنهاد والکسی: روش ارسال کروکی انتخاب مطمئن‌تری است.</span>
          </div>
        </w>
        <w class="px-3" md="2/5">
          <div class="bg-white rounded-xl p-3 shadow-sm">
            <svg aria-label="تصویر شماتیک اندازه‌گیری دیوار" class="w-full h-auto" role="img" viewBox="0 0 460 330">
              <defs>
                <pattern id="wallpaper" width="26" height="26" patternUnits="userSpaceOnUse">
                  <path d="M13 3 C4 10 4 16 13 23 C22 16 22 10 13 3Z" fill="none" stroke="#9bb4a4" stroke-width="1.2"/>
                </pattern>
              </defs>
              <path d="M82 62 L304 32 L392 83 L170 115Z" fill="#f9f7ef" stroke="#315d4d" stroke-width="2"/>
              <path d="M82 62 L170 115 L170 285 L82 231Z" fill="#e3e9df" stroke="#315d4d" stroke-width="2"/>
              <path d="M170 115 L392 83 L392 252 L170 285Z" fill="url(#wallpaper)" stroke="#315d4d" stroke-width="2"/>
              <path d="M170 115 L392 83 L392 252 L170 285Z" fill="rgba(255,255,255,.22)"/>
              <path d="M248 104 L248 274 M326 93 L326 263" stroke="#b99a63" stroke-width="1.6" stroke-dasharray="5 5"/>
              <path d="M190 290 L390 261" stroke="#315d4d" stroke-width="1.5"/>
              <path d="M190 285 L190 295 M390 256 L390 266" stroke="#315d4d" stroke-width="1.5"/>
              <text fill="#315d4d" font-family="Vazirmatn" font-size="13" text-anchor="middle" x="286" y="312">عرض دیوار</text>
              <path d="M405 86 L405 250" stroke="#315d4d" stroke-width="1.5"/>
              <path d="M400 92 L410 92 M400 245 L410 245" stroke="#315d4d" stroke-width="1.5"/>
              <text fill="#315d4d" font-family="Vazirmatn" font-size="12" text-anchor="middle" transform="rotate(90 425 172)" x="425" y="172">ارتفاع</text>
              <rect fill="#f7f5ef" height="76" rx="2" stroke="#315d4d" stroke-width="1.5" width="42" x="104" y="155"/>
              <path d="M125 155 V231 M104 193 H146" stroke="#9aab9d" stroke-width="1"/>
              <circle cx="137" cy="194" fill="#b99a63" r="2"/>
              <rect fill="#183f35" height="32" rx="16" width="118" x="211" y="12"/>
              <text fill="white" font-family="Vazirmatn" font-size="12" text-anchor="middle" x="270" y="33">اندازه‌گیری دقیق</text>
            </svg>
          </div>
        </w>
      </row>
    </section>

    <!-- روش‌های اندازه‌گیری -->
    <section id="methods" class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-6 mb-4">
      <h2 class="flex items-center gap-2 text-md font-bold text-neutral-900 mb-1">
        <icon :name="icons.list" class="text-emerald-600" size="20"/>
        <span>کدام روش برای شما مناسب‌تر است؟</span>
      </h2>
      <p class="text-sm text-neutral-500 leading-7 mb-4">
        با توجه به زمانی که دارید و میزان آشنایی‌تان با اندازه‌گیری، یکی از روش‌های زیر را انتخاب کنید.
      </p>
      <row class="-mx-2">
        <w v-for="method in methodCards" :key="method.href" class="px-2 mb-3" lg="1/4" sm="1/2">
          <a :href="method.href" :title="method.title"
             class="block h-full bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-200 rounded-xl p-4 transition-colors">
            <div class="flex items-center justify-between gap-2 mb-3">
              <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <icon :name="method.icon" size="20"/>
              </div>
              <span class="text-xs font-bold text-emerald-600" v-text="method.number"></span>
            </div>
            <h3 class="text-sm font-bold text-neutral-900 mb-1" v-text="method.title"></h3>
            <p class="text-xs text-neutral-500 leading-6" v-text="method.desc"></p>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-3">
              <span>آموزش این روش</span>
              <icon :name="icons.arrow" size="14"/>
            </span>
          </a>
        </w>
      </row>
    </section>

    <!-- روش اول: کروکی -->
    <section id="method-kroki" class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <div class="flex items-start gap-3 mb-4">
        <div class="w-10 h-10 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <icon :name="icons.pencil" size="22"/>
        </div>
        <div>
          <div class="text-xs text-emerald-600 font-semibold mb-1">روش اول</div>
          <h2 class="text-lg md:text-xl font-bold text-neutral-900 leading-8">ارسال کروکی</h2>
        </div>
      </div>

      <row class="-mx-3">
        <w class="px-3 mb-5 lg:mb-0" lg="5/12" xl="2/5">
          <p class="text-sm text-neutral-600 leading-7 mb-4">
            <strong class="text-neutral-800">نقاشی حرفه‌ای لازم نیست؛ یک طرح ساده و خوانا کافی است.</strong>
          </p>
          <div class="space-y-2">
            <div v-for="(step, index) in krokiSteps" :key="step.title"
                 class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <span class="w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center" v-text="toPersian(index + 1)"></span>
              <div class="pt-0.5">
                <div class="text-sm font-semibold text-neutral-800 leading-7" v-text="step.title"></div>
                <div class="text-sm text-neutral-500 leading-7" v-text="step.text"></div>
              </div>
            </div>
          </div>
          <div class="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 text-sm leading-7 mt-4">
            <icon :name="icons.alert" class="shrink-0 mt-1" size="18"/>
            <div>
              <strong class="block mb-1">چند نکته مهم:</strong>
              <ul class="list-disc pr-5 space-y-1">
                <li>تمام اندازه‌ها را به سانتی‌متر بنویسید.</li>
                <li>ابعاد درها و پنجره‌ها را جداگانه اندازه بگیرید و در پاورقی کروکی بنویسید.</li>
              </ul>
            </div>
          </div>
        </w>
        <w class="px-3" lg="7/12" xl="3/5">
          <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 lg:sticky lg:top-40">
            <h3 class="text-sm font-bold text-neutral-900 mb-3">نمونه ساده از یک کروکی</h3>
            <button :aria-label="'بزرگنمایی نمونه کروکی'" class="group relative block w-full" type="button"
                    @click="openZoom('/images/measure/kroki.jpg', 'نمونه کروکی اتاق با کدگذاری دیوارها، پنجره‌ها و ابعاد موردنیاز')">
              <img alt="نمونه کروکی اتاق با کدگذاری دیوارها، پنجره‌ها و ابعاد موردنیاز" class="w-full h-auto rounded-lg border border-neutral-200 bg-white" decoding="async" loading="lazy" src="/images/measure/kroki.jpg"/>
              <span class="absolute bottom-2 left-2 inline-flex items-center gap-1 bg-neutral-900/80 hover:bg-neutral-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors">
                <icon :name="icons.zoom" size="14"/>
                <span>بزرگنمایی</span>
              </span>
            </button>
            <p class="text-xs text-neutral-500 leading-6 mt-3">
              برای هر اتاق یک نقشه جداگانه بکشید و کد هر طرح را کنار دیوار مربوط به آن بنویسید.
            </p>
          </div>
        </w>
      </row>
    </section>

    <!-- روش دوم: قد رول -->
    <section id="method-roll" class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <div class="flex items-start gap-3 mb-4">
        <div class="w-10 h-10 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <icon :name="icons.tape" size="22"/>
        </div>
        <div>
          <div class="text-xs text-emerald-600 font-semibold mb-1">روش دوم</div>
          <h2 class="text-lg md:text-xl font-bold text-neutral-900 leading-8">محاسبه بر اساس قد رول</h2>
        </div>
      </div>

      <row class="-mx-3">
        <w class="px-3 mb-5 lg:mb-0" lg="5/12" xl="2/5">
          <p class="text-sm text-neutral-600 leading-7 mb-4">
            در این روش بررسی می‌کنیم از هر رول چند قد با ارتفاع موردنیاز دیوار به دست می‌آید.
          </p>
          <div class="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <div class="w-9 h-9 shrink-0 rounded-lg bg-white text-emerald-600 flex items-center justify-center">
              <icon :name="icons.info" size="18"/>
            </div>
            <div>
              <div class="text-xs text-emerald-700 font-bold mb-0.5">مثال آموزشی</div>
              <div class="text-sm font-bold text-emerald-800">رول ۱۰ متری با عرض ۵۳ سانتی‌متر</div>
              <div class="text-xs text-emerald-700 mt-1">ارتفاع دیوار در این مثال: ۲۸۰ سانتی‌متر</div>
            </div>
          </div>
          <div class="space-y-2">
            <div v-for="(step, index) in rollSteps" :key="step.title"
                 class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <span class="w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center" v-text="toPersian(index + 1)"></span>
              <div class="pt-0.5 min-w-0">
                <div class="text-sm font-semibold text-neutral-800 leading-7" v-text="step.title"></div>
                <div class="text-sm text-neutral-500 leading-7" v-text="step.text"></div>
                <div v-if="step.formula" dir="ltr"
                     class="mt-2 text-center bg-white border border-dashed border-emerald-300 rounded-lg px-3 py-1.5 text-sm font-bold text-emerald-700"
                     v-text="step.formula"></div>
              </div>
            </div>
          </div>

          <div class="bg-emerald-600 text-white rounded-xl p-5 mt-4">
            <h3 class="text-md font-bold mb-1">محاسبه‌گر ساده تعداد رول</h3>
            <p class="text-xs text-emerald-50 mb-4">برای یک برآورد اولیه، ابعاد یک دیوار و مشخصات رول را وارد کنید.</p>
            <row class="-mx-1.5">
              <w v-for="field in rollFields" :key="field.key" class="px-1.5 mb-3" sm="1/2">
                <label :for="'roll-' + field.key" class="block text-xs text-emerald-50 mb-1.5" v-text="field.label"></label>
                <input :id="'roll-' + field.key" v-model.number="rollCalc[field.key]" :min="field.min" :step="field.step"
                       class="w-full bg-white/10 border border-white/25 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white"
                       type="number"/>
              </w>
            </row>
            <div class="bg-white/10 border border-white/15 rounded-lg p-3 text-sm leading-7">
              <template v-if="rollResult && !rollResult.error">
                از هر رول: <strong class="text-white" v-text="toPersian(rollResult.cuts) + ' قد'"></strong> قابل استفاده
                <span class="mx-1 text-white/40">|</span>
                تعداد قد موردنیاز: <strong class="text-white" v-text="toPersian(rollResult.strips)"></strong>
                <br>
                برآورد برای این دیوار: <strong class="text-lg text-white" v-text="toPersian(rollResult.rolls) + ' رول'"></strong>
                <div class="text-xs text-emerald-100 mt-1">این محاسبه برای یک دیوار و بدون لحاظ تکرار طرح و پرت احتمالی است.</div>
              </template>
              <span v-else-if="rollResult && rollResult.error">ارتفاع دیوار از طول رول بیشتر است؛ لطفاً ابعاد را بررسی کنید.</span>
              <span v-else>لطفاً همه اندازه‌ها را به‌درستی وارد کنید.</span>
            </div>
          </div>

          <div class="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 text-sm leading-7 mt-4">
            <icon :name="icons.alert" class="shrink-0 mt-1" size="18"/>
            <div>
              <strong class="block mb-1">توجه درباره طرح‌دارها:</strong>
              در طرح‌های دارای تکرار نقش (Repeat)، مقدار پرت ناشی از تطبیق طرح را نیز در محاسبه تعداد رول در نظر بگیرید.
            </div>
          </div>
        </w>
        <w class="px-3" lg="7/12" xl="3/5">
          <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 lg:sticky lg:top-40">
            <h3 class="text-sm font-bold text-neutral-900 mb-3">از یک رول چند قد به دست می‌آید؟</h3>
            <button :aria-label="'بزرگنمایی مراحل تقسیم رول'" class="group relative block w-full" type="button"
                    @click="openZoom('/images/measure/roll.jpg', 'مراحل تقسیم رول کاغذدیواری به قد و محاسبه مقدار پرتی')">
              <img alt="مراحل تقسیم رول کاغذدیواری به قد و محاسبه مقدار پرتی" class="w-full h-auto rounded-lg border border-neutral-200 bg-white" decoding="async" loading="lazy" src="/images/measure/roll.jpg"/>
              <span class="absolute bottom-2 left-2 inline-flex items-center gap-1 bg-neutral-900/80 hover:bg-neutral-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors">
                <icon :name="icons.zoom" size="14"/>
                <span>بزرگنمایی</span>
              </span>
            </button>
            <p class="text-xs text-neutral-500 leading-6 mt-3">
              در مثال رول ۱۰ متری و ارتفاع ۲۸۰ سانتی‌متر، حداکثر ۳ قد کامل به دست می‌آید.
            </p>
          </div>
        </w>
      </row>
    </section>

    <!-- روش سوم: مساحت -->
    <section id="method-area" class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <div class="flex items-start gap-3 mb-4">
        <div class="w-10 h-10 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <icon :name="icons.area" size="22"/>
        </div>
        <div>
          <div class="text-xs text-emerald-600 font-semibold mb-1">روش سوم</div>
          <h2 class="text-lg md:text-xl font-bold text-neutral-900 leading-8">محاسبه بر اساس مساحت</h2>
        </div>
      </div>

      <row class="-mx-3">
        <w class="px-3 mb-5 lg:mb-0" lg="5/12" xl="2/5">
          <p class="text-sm text-neutral-600 leading-7 mb-4">
            اگر فقط به یک برآورد اولیه از تعداد رول نیاز دارید، می‌توانید مساحت دیوارها را محاسبه و بر مساحت هر رول تقسیم کنید.
          </p>
          <div class="space-y-2">
            <div v-for="(step, index) in areaSteps" :key="step.title"
                 class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <span class="w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center" v-text="toPersian(index + 1)"></span>
              <div class="pt-0.5 min-w-0">
                <div class="text-sm font-semibold text-neutral-800 leading-7" v-text="step.title"></div>
                <div class="text-sm text-neutral-500 leading-7" v-text="step.text"></div>
                <div v-if="step.formula" dir="ltr"
                     class="mt-2 text-center bg-white border border-dashed border-emerald-300 rounded-lg px-3 py-1.5 text-sm font-bold text-emerald-700"
                     v-text="step.formula"></div>
              </div>
            </div>
          </div>

          <div class="bg-emerald-600 text-white rounded-xl p-5 mt-4">
            <h3 class="text-md font-bold mb-1">برآورد تعداد رول بر اساس مساحت</h3>
            <p class="text-xs text-emerald-50 mb-4">این محاسبه صرفاً برای تخمین اولیه است.</p>
            <row class="-mx-1.5">
              <w v-for="field in areaFields" :key="field.key" class="px-1.5 mb-3" sm="1/2">
                <label :for="'area-' + field.key" class="block text-xs text-emerald-50 mb-1.5" v-text="field.label"></label>
                <input :id="'area-' + field.key" v-model.number="areaCalc[field.key]" :min="field.min" :step="field.step"
                       class="w-full bg-white/10 border border-white/25 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white"
                       type="number"/>
              </w>
            </row>
            <div class="bg-white/10 border border-white/15 rounded-lg p-3 text-sm leading-7">
              <template v-if="areaResult">
                مساحت دیوارها: <strong class="text-white" v-text="formatNumber(areaResult.area) + ' مترمربع'"></strong>
                <span class="mx-1 text-white/40">|</span>
                مساحت رول: <strong class="text-white" v-text="formatNumber(areaResult.rollArea) + ' مترمربع'"></strong>
                <br>
                برآورد مساحتی: <strong class="text-lg text-white" v-text="toPersian(areaResult.count) + ' رول'"></strong>
                <div class="text-xs text-emerald-100 mt-1">این عدد تخمینی است و تعداد رول نهایی ممکن است متفاوت باشد.</div>
              </template>
              <span v-else>لطفاً همه اندازه‌ها را به‌درستی وارد کنید.</span>
            </div>
          </div>

          <div class="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 text-sm leading-7 mt-4">
            <icon :name="icons.alert" class="shrink-0 mt-1" size="18"/>
            <div>
              <strong class="block mb-1">مهم:</strong>
              محاسبه مساحت، باقی‌مانده‌های غیرقابل استفاده، تعداد قدهای قابل برش، تکرار طرح، اختلاف ارتفاع دیوارها و محل بازشوها را
              به‌درستی لحاظ نمی‌کند. بنابراین نتیجه آن لزوماً تعداد رول واقعی نیست.
            </div>
          </div>
        </w>
        <w class="px-3" lg="7/12" xl="3/5">
          <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 lg:sticky lg:top-40">
            <h3 class="text-sm font-bold text-neutral-900 mb-3">محاسبه مساحت یک دیوار</h3>
            <svg aria-label="نمودار محاسبه مساحت دیوار" class="w-full h-auto" role="img" viewBox="0 0 420 300">
              <rect fill="#fffefa" height="210" rx="13" stroke="#d5dfd5" width="310" x="55" y="38"/>
              <rect fill="#e7eee6" height="138" stroke="#315d4d" stroke-width="2" width="205" x="112" y="70"/>
              <path d="M112 58 H317 M112 53 V63 M317 53 V63" stroke="#b99a63" stroke-width="1.5"/>
              <text fill="#315d4d" font-family="Vazirmatn" font-size="12" text-anchor="middle" x="214" y="47">عرض: ۴٫۸ متر</text>
              <path d="M331 70 V208 M326 70 H336 M326 208 H336" stroke="#b99a63" stroke-width="1.5"/>
              <text fill="#315d4d" font-family="Vazirmatn" font-size="11" text-anchor="middle" transform="rotate(90 350 142)" x="350" y="142">ارتفاع: ۲٫۸ متر</text>
              <text fill="#315d4d" font-family="Vazirmatn" font-size="18" font-weight="700" text-anchor="middle" x="214" y="143">۱۳٫۴۴ m²</text>
              <text fill="#69766d" font-family="Vazirmatn" font-size="12" text-anchor="middle" x="214" y="272">مساحت = ارتفاع × عرض</text>
            </svg>
            <p class="text-xs text-neutral-500 leading-6 mt-3">
              مساحت دیوار فقط یکی از عوامل محاسبه تعداد رول است؛ نحوه برش و تکرار طرح نیز اهمیت دارد.
            </p>
          </div>
        </w>
      </row>
    </section>

    <!-- روش چهارم: کارشناس -->
    <section id="expert" class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <div class="flex items-start gap-3 mb-4">
        <div class="w-10 h-10 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <icon :name="icons.expert" size="22"/>
        </div>
        <div>
          <div class="text-xs text-emerald-600 font-semibold mb-1">روش چهارم</div>
          <h2 class="text-lg md:text-xl font-bold text-neutral-900 leading-8">محاسبه توسط کارشناس والکسی</h2>
        </div>
      </div>

      <row class="-mx-3">
        <w class="px-3 mb-5 lg:mb-0" lg="5/12" xl="2/5">
          <p class="text-sm text-neutral-600 leading-7 mb-4">
            اگر نمی‌خواهید خودتان درگیر محاسبات شوید یا امکان تهیه کروکی ندارید، اندازه دیوارها را در جدول زیر وارد کنید.
            کارشناسان والکسی با توجه به ابعاد دیوارها، مشخصات رول، نوع طرح و میزان تکرار نقش، تعداد رول موردنیاز را بررسی می‌کنند.
          </p>
          <div class="space-y-2">
            <div v-for="(step, index) in expertSteps" :key="step.title"
                 class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <span class="w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center" v-text="toPersian(index + 1)"></span>
              <div class="pt-0.5">
                <div class="text-sm font-semibold text-neutral-800 leading-7" v-text="step.title"></div>
                <div class="text-sm text-neutral-500 leading-7" v-text="step.text"></div>
              </div>
            </div>
          </div>
        </w>
        <w class="px-3" lg="7/12" xl="3/5">
          <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 h-full">
            <h3 class="text-sm font-bold text-neutral-900 mb-3">چه اطلاعاتی لازم است؟</h3>
            <svg aria-label="نمونه جدول اندازه‌گیری" class="w-full h-auto" role="img" viewBox="0 0 420 240">
              <rect fill="#fffefa" height="195" rx="14" stroke="#cbd8ce" width="310" x="55" y="20"/>
              <rect fill="#e8f0eb" height="28" rx="5" width="264" x="78" y="44"/>
              <text fill="#315d4d" font-family="Vazirmatn" font-size="11" text-anchor="middle" x="210" y="63">فضا | کد کاغذ | ارتفاع | عرض</text>
              <g fill="#f5f6f1" stroke="#e1e7df">
                <rect height="25" rx="4" width="264" x="78" y="83"/>
                <rect height="25" rx="4" width="264" x="78" y="116"/>
                <rect height="25" rx="4" width="264" x="78" y="149"/>
              </g>
              <g fill="#789082">
                <circle cx="92" cy="95" r="4"/>
                <circle cx="92" cy="128" r="4"/>
                <circle cx="92" cy="161" r="4"/>
              </g>
              <g fill="#315d4d" font-family="Vazirmatn" font-size="10">
                <text text-anchor="middle" x="210" y="100">پذیرایی | A | ۲۸۰ | ۴۸۰</text>
                <text text-anchor="middle" x="210" y="133">پذیرایی | A | ۲۸۰ | ۳۲۰</text>
                <text text-anchor="middle" x="210" y="166">اتاق خواب | B | ۲۸۰ | ۳۶۰</text>
              </g>
            </svg>
            <p class="text-xs text-neutral-500 leading-6 mt-3">برای تعداد بیشتر دیوارها، از دکمه افزودن ردیف استفاده کنید.</p>
          </div>
        </w>
      </row>

      <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 md:p-5 mt-5">
        <h3 class="text-md font-bold text-neutral-900 mb-1">جدول اندازه‌گیری دیوارها</h3>
        <p class="text-xs text-neutral-500 leading-6 mb-4">
          اندازه‌ها را به سانتی‌متر وارد کنید. هر دیوار یا بخش با ارتفاع متفاوت، یک ردیف جداگانه است.
        </p>
        <div class="space-y-2">
          <div v-for="(row, index) in wallRows" :key="index" class="grid grid-cols-2 gap-2 md:grid-cols-12">
            <input v-model="row.space" aria-label="فضای موردنظر" class="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-400 md:col-span-3"
                   placeholder="فضا؛ مثال: پذیرایی" type="text"/>
            <input v-model="row.code" aria-label="کد کاغذ" class="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-400 md:col-span-2"
                   placeholder="کد؛ مثال: A" type="text"/>
            <input v-model.number="row.height" aria-label="ارتفاع به سانتی‌متر" class="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-400 md:col-span-3"
                   placeholder="ارتفاع cm" type="number"/>
            <input v-model.number="row.width" aria-label="عرض به سانتی‌متر" class="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-400 md:col-span-3"
                   placeholder="عرض cm" type="number"/>
            <button :disabled="wallRows.length === 1" aria-label="حذف ردیف"
                    class="h-9 md:h-auto md:col-span-1 rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed text-red-600 flex items-center justify-center transition-colors"
                    type="button" @click="removeRow(index)">
              <icon :name="icons.close" size="18"/>
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <button class="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  type="button" @click="addRow">
            <icon :name="icons.plus" size="18"/>
            <span>افزودن دیوار</span>
          </button>
          <button class="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  type="button" @click="copyMeasurements">
            <icon :name="icons.copy" size="18"/>
            <span>کپی اطلاعات برای ارسال</span>
          </button>
        </div>
        <textarea v-model="notes" aria-label="توضیحات تکمیلی"
                  class="w-full min-h-[80px] bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm mt-3 focus:outline-none focus:border-emerald-400"
                  placeholder="توضیحات تکمیلی: محل درها و پنجره‌ها، ستون‌ها، فرورفتگی‌ها، اختلاف ارتفاع و ..."></textarea>
        <p aria-live="polite" class="text-xs text-emerald-700 mt-2" v-text="copyStatus"></p>
        <div class="flex flex-wrap gap-2 mt-3">
          <a class="inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
             href="https://t.me/wallexy_info" rel="noopener" target="_blank" title="ارسال اندازه‌ها در تلگرام">
            <icon :name="icons.send" size="18"/>
            <span>ارسال در تلگرام</span>
          </a>
          <a class="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
             href="tel:+989904283848" title="تماس با کارشناسان والکسی">
            <icon :name="icons.phone" size="18"/>
            <span>تماس با کارشناسان</span>
          </a>
        </div>
      </div>

      <div class="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4 text-sm text-emerald-900 leading-7">
        <div class="w-8 h-8 shrink-0 rounded-lg bg-white text-emerald-600 flex items-center justify-center">
          <icon :name="icons.info" size="18"/>
        </div>
        <div>
          <strong class="block mb-1">پس از ارسال اطلاعات چه می‌شود؟</strong>
          کارشناسان والکسی اندازه‌ها را بررسی می‌کنند و با توجه به مشخصات محصول و نوع طرح، تعداد رول موردنیاز را برآورد می‌کنند.
          در صورت وجود ابهام، برای دریافت اطلاعات بیشتر با شما هماهنگ خواهد شد. محاسبه اولیه بر اساس اندازه‌های ارسالی است؛
          پس دقت در اندازه‌گیری اهمیت زیادی دارد.
        </div>
      </div>
    </section>

    <!-- نکات مهم / سوالات متداول -->
    <section id="faq" class="scroll-mt-40 bg-white border border-neutral-200 rounded-xl p-5 md:p-8 mb-4">
      <div class="flex items-center gap-2 mb-1">
        <icon :name="icons.question" class="text-emerald-600" size="20"/>
        <h2 class="text-lg font-bold text-neutral-900">نکاتی که بهتر است بدانید</h2>
      </div>
      <p class="text-sm text-neutral-500 leading-7 mb-3">
        چند نکته ساده می‌تواند از خطا در اندازه‌گیری و برآورد تعداد رول جلوگیری کند.
      </p>
      <div v-for="(item, index) in faqs" :key="index" class="border-b border-neutral-200 last:border-b-0">
        <button :aria-expanded="openFaq === index"
                class="w-full flex items-center justify-between gap-4 py-4 text-right text-sm font-bold text-neutral-900"
                type="button" @click="toggleFaq(index)">
          <span v-text="item.question"></span>
          <span :class="{'rotate-45': openFaq === index}" class="shrink-0 text-xl text-neutral-400 transition-transform duration-200">+</span>
        </button>
        <div v-show="openFaq === index" class="pb-4 text-sm text-neutral-500 leading-7" v-text="item.answer"></div>
      </div>
    </section>

    <!-- دعوت پایانی -->
    <section class="bg-neutral-900 text-white rounded-xl p-6 md:p-8 mb-4 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
        <icon :name="icons.tape" size="24"/>
      </div>
      <h2 class="text-xl md:text-2xl font-extrabold mb-3">برای محاسبه تعداد رول، از والکسی کمک بگیرید</h2>
      <p class="text-sm text-neutral-300 max-w-xl mx-auto leading-7 mb-5">
        عکس کروکی یا جدول اندازه‌گیری را برای کارشناسان ارسال کنید تا تعداد رول موردنیازتان بررسی شود.
        پیش از ثبت سفارش نیز می‌توانید موجودی و قیمت روز محصول را استعلام بگیرید.
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <a class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
           href="tel:+989904283848" title="تماس با کارشناسان والکسی">
          <icon :name="icons.phone" size="18"/>
          <span>تماس با کارشناسان</span>
        </a>
        <inertia-link class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                      href="/before-buy" title="قبل از خرید بدانید">
          <icon :name="icons.checklist" size="18"/>
          <span>راهنمای قبل از خرید</span>
        </inertia-link>
      </div>
      <p class="text-xs text-neutral-400 mt-5">والکسی؛ انتخاب آگاهانه، خرید مطمئن‌تر.</p>
    </section>
  </container>

  <!-- نمایش بزرگ تصاویر -->
  <teleport to="body">
    <div v-if="zoom" aria-modal="true" class="fixed inset-0 z-[100] bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center p-3 md:p-8"
         role="dialog" @click.self="closeZoom">
      <div class="relative w-full max-w-6xl">
        <button class="absolute -top-12 left-0 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                type="button" @click="closeZoom">
          <icon :name="icons.close" size="16"/>
          <span>بستن</span>
        </button>
        <img :alt="zoom.alt" :src="zoom.src" class="w-full max-h-[85vh] object-contain rounded-lg bg-white shadow-2xl"/>
        <div class="text-center text-xs text-neutral-300 mt-3">برای بستن، روی فضای خالی کلیک کنید یا کلید Esc را بزنید.</div>
      </div>
    </div>
  </teleport>

  <inertia-head>
    <title>نحوه اندازه‌گیری کاغذدیواری</title>
    <meta content="راهنمای اندازه‌گیری کاغذدیواری در والکسی؛ چهار روش ساده برای محاسبه تعداد رول موردنیاز، از تهیه کروکی تا محاسبه توسط کارشناس." name="description"/>
    <link href="https://wallexy.ir/measure" rel="canonical"/>
    <link href="https://wallexy.ir/measure" hreflang="fa-IR" rel="alternate"/>
    <link href="https://wallexy.ir/measure" hreflang="x-default" rel="alternate"/>
    <meta content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" name="robots"/>
    <meta content="والکسی" name="author"/>
    <meta content="والکسی" name="publisher"/>
    <meta content="نحوه اندازه گیری کاغذ دیواری, محاسبه تعداد رول کاغذ دیواری, اندازه گیری دیوار برای کاغذ دیواری, کروکی کاغذ دیواری, محاسبه گر رول کاغذ دیواری, راهنمای خرید کاغذ دیواری" name="keywords"/>

    <meta content="fa_IR" property="og:locale"/>
    <meta content="website" property="og:type"/>
    <meta content="والکسی" property="og:site_name"/>
    <meta content="نحوه اندازه‌گیری کاغذدیواری | والکسی" property="og:title"/>
    <meta content="چهار روش ساده برای اندازه‌گیری کاغذدیواری و محاسبه تعداد رول موردنیاز؛ از ترسیم کروکی تا محاسبه توسط کارشناسان والکسی." property="og:description"/>
    <meta content="https://wallexy.ir/measure" property="og:url"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" property="og:image:secure_url"/>
    <meta content="512" property="og:image:width"/>
    <meta content="512" property="og:image:height"/>
    <meta content="image/png" property="og:image:type"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" property="og:image:alt"/>

    <meta content="summary_large_image" name="twitter:card"/>
    <meta content="@wallexy_info" name="twitter:site"/>
    <meta content="@wallexy_info" name="twitter:creator"/>
    <meta content="نحوه اندازه‌گیری کاغذدیواری | والکسی" name="twitter:title"/>
    <meta content="چهار روش ساده برای اندازه‌گیری کاغذدیواری و محاسبه تعداد رول موردنیاز؛ از ترسیم کروکی تا محاسبه توسط کارشناسان والکسی." name="twitter:description"/>
    <meta content="https://wallexy.ir/icons/icon_512x512.177439.png" name="twitter:image"/>
    <meta content="لوگوی فروشگاه اینترنتی والکسی" name="twitter:image:alt"/>

    <component is="script" type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://wallexy.ir/measure#webpage",
            "url": "https://wallexy.ir/measure",
            "name": "نحوه اندازه‌گیری کاغذدیواری | والکسی",
            "description": "راهنمای اندازه‌گیری کاغذدیواری در والکسی؛ چهار روش ساده برای محاسبه تعداد رول موردنیاز، از تهیه کروکی تا محاسبه توسط کارشناس.",
            "inLanguage": "fa-IR",
            "dateModified": "2026-11-07",
            "isPartOf": {"@id": "https://wallexy.ir/#website"},
            "about": {"@id": "https://wallexy.ir/#organization"},
            "breadcrumb": {"@id": "https://wallexy.ir/measure#breadcrumb"},
            "mainEntity": {"@id": "https://wallexy.ir/measure#faq"}
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://wallexy.ir/measure#breadcrumb",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "خانه", "item": "https://wallexy.ir/"},
              {"@type": "ListItem", "position": 2, "name": "قبل از خرید بدانید", "item": "https://wallexy.ir/before-buy"},
              {"@type": "ListItem", "position": 3, "name": "نحوه اندازه‌گیری", "item": "https://wallexy.ir/measure"}
            ]
          },
          {
            "@type": "HowTo",
            "@id": "https://wallexy.ir/measure#howto",
            "name": "نحوه اندازه‌گیری کاغذدیواری و محاسبه تعداد رول",
            "description": "چهار روش برای اندازه‌گیری دیوارها و محاسبه تعداد رول کاغذدیواری موردنیاز.",
            "inLanguage": "fa-IR",
            "totalTime": "PT10M",
            "step": [
              {"@type": "HowToStep", "position": 1, "name": "ارسال کروکی", "text": "نقشه ساده فضا را بکشید، طول دیوارها و کد هر طرح را روی آن بنویسید و برای کارشناس ارسال کنید."},
              {"@type": "HowToStep", "position": 2, "name": "محاسبه بر اساس قد رول", "text": "ارتفاع دیوار و عرض رول را اندازه بگیرید، تعداد قد قابل استفاده از هر رول و تعداد قدهای موردنیاز را حساب کنید."},
              {"@type": "HowToStep", "position": 3, "name": "محاسبه بر اساس مساحت", "text": "مساحت دیوارها را بر مساحت هر رول تقسیم کنید تا برآورد اولیه تعداد رول به دست آید."},
              {"@type": "HowToStep", "position": 4, "name": "محاسبه توسط کارشناس", "text": "اندازه دیوارها و کد محصول را در جدول اندازه‌گیری وارد کنید و برای کارشناسان والکسی ارسال کنید."}
            ]
          },
          {
            "@type": "FAQPage",
            "@id": "https://wallexy.ir/measure#faq",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "ارتفاع دیوار را از کجا اندازه بگیریم؟",
                "acceptedAnswer": {"@type": "Answer", "text": "ارتفاع دیوار را از کف تمام‌شده تا سقف اندازه بگیرید. اگر کف‌پوش یا سقف کاذب هنوز اجرا نشده است، این موضوع را به کارشناس اعلام کنید."}
              },
              {
                "@type": "Question",
                "name": "آیا مساحت درها و پنجره‌ها را کم کنیم؟",
                "acceptedAnswer": {"@type": "Answer", "text": "برای محاسبه اولیه می‌توانید مساحت بازشوهای بزرگ را جداگانه یادداشت کنید؛ اما در محاسبه تعداد رول نمی‌توان همیشه مساحت در و پنجره را به‌طور کامل از مساحت دیوار کم کرد. محل و ابعاد آن‌ها را اعلام کنید."}
              },
              {
                "@type": "Question",
                "name": "اگر ارتفاع دیوارها متفاوت باشد چه کنیم؟",
                "acceptedAnswer": {"@type": "Answer", "text": "هر دیوار یا بخش دارای ارتفاع متفاوت را جداگانه اندازه‌گیری کنید. محاسبه مشترک ممکن است تعداد قدهای قابل استفاده از رول را اشتباه نشان دهد."}
              },
              {
                "@type": "Question",
                "name": "آیا برای طرح‌های ساده هم پرتی وجود دارد؟",
                "acceptedAnswer": {"@type": "Answer", "text": "بله. حتی در طرح‌های ساده نیز به دلیل برش، تنظیم لبه‌ها و شرایط نصب مقداری پرت ایجاد می‌شود. میزان آن به ابعاد دیوارها، نحوه برش و مهارت نصاب بستگی دارد."}
              },
              {
                "@type": "Question",
                "name": "آیا می‌توان از باقی‌مانده یک رول برای دیوار دیگر استفاده کرد؟",
                "acceptedAnswer": {"@type": "Answer", "text": "در بعضی شرایط بله؛ اما این موضوع به ارتفاع دیوار، طول باقی‌مانده، نوع طرح و امکان تطبیق نقش بستگی دارد."}
              },
              {
                "@type": "Question",
                "name": "چرا باید کد کاغذ هر دیوار را مشخص کنیم؟",
                "acceptedAnswer": {"@type": "Answer", "text": "چون ممکن است برای هر دیوار از طرح یا کد متفاوتی استفاده کنید. تعداد رول هر کد باید جداگانه محاسبه شود و نمی‌توان رول‌های طرح‌های مختلف را با یکدیگر جمع کرد."}
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
  mdiAccountTieOutline,
  mdiAlertCircleOutline,
  mdiArrowLeft,
  mdiCheckCircleOutline,
  mdiClipboardCheckOutline,
  mdiClose,
  mdiContentCopy,
  mdiFormatListNumbered,
  mdiInformationOutline,
  mdiMagnify,
  mdiPencilRuler,
  mdiPhone,
  mdiPlus,
  mdiRuler,
  mdiSend,
  mdiTapeMeasure,
  mdiVectorSquare
} from '@mdi/js'

export default {
  data() {
    return {
      openFaq: null,
      zoom: null,
      notes: '',
      copyStatus: 'پس از تکمیل، اطلاعات را کپی کنید و برای کارشناسان والکسی بفرستید.',
      icons: {
        ruler: mdiRuler,
        tape: mdiTapeMeasure,
        pencil: mdiPencilRuler,
        area: mdiVectorSquare,
        expert: mdiAccountTieOutline,
        list: mdiFormatListNumbered,
        check: mdiCheckCircleOutline,
        checklist: mdiClipboardCheckOutline,
        alert: mdiAlertCircleOutline,
        info: mdiInformationOutline,
        phone: mdiPhone,
        send: mdiSend,
        copy: mdiContentCopy,
        plus: mdiPlus,
        close: mdiClose,
        zoom: mdiMagnify,
        arrow: mdiArrowLeft
      },
      methodCards: [
        {
          href: '#method-kroki',
          number: '۰۱',
          icon: mdiPencilRuler,
          title: 'ارسال کروکی',
          desc: 'یک نقشه ساده بکشید، اندازه‌ها و کد طرح‌ها را روی آن بنویسید.'
        },
        {
          href: '#method-roll',
          number: '۰۲',
          icon: mdiTapeMeasure,
          title: 'محاسبه بر اساس قد رول',
          desc: 'تعداد قدهای قابل برش از هر رول را محاسبه کنید.'
        },
        {
          href: '#method-area',
          number: '۰۳',
          icon: mdiVectorSquare,
          title: 'محاسبه بر اساس مساحت',
          desc: 'برای یک برآورد اولیه، مساحت دیوارها را با مساحت رول مقایسه کنید.'
        },
        {
          href: '#expert',
          number: '۰۴',
          icon: mdiAccountTieOutline,
          title: 'محاسبه توسط کارشناس',
          desc: 'اندازه‌ها را در جدول وارد کنید تا کارشناسان والکسی بررسی کنند.'
        }
      ],
      krokiSteps: [
        {
          title: 'هر فضا را جداگانه ترسیم کنید.',
          text: 'برای مثال، پذیرایی و هر اتاق خواب را در یک کروکی جداگانه نشان دهید.'
        },
        {
          title: 'طول تمام دیوارها را اندازه بگیرید.',
          text: 'عرض هر دیوار را به سانتی‌متر اندازه بگیرید و روی نقشه بنویسید؛ مثلاً ۳۲۰ یا ۴۵۰ سانتی‌متر.'
        },
        {
          title: 'برای هر دیوار یک کد مشخص کنید.',
          text: 'مثلاً A برای دیوار اصلی پذیرایی، B برای پشت تلویزیون و C برای اتاق خواب.'
        },
        {
          title: 'درها، پنجره‌ها و قسمت‌های خاص را مشخص کنید.',
          text: 'محل درها، پنجره‌ها، ستون‌ها، فرورفتگی‌ها، بیرون‌زدگی‌ها و شکستگی‌های دیوار را روی کروکی نشان دهید.'
        },
        {
          title: 'کروکی را برای کارشناسان والکسی ارسال کنید.',
          text: 'کارشناسان با توجه به ابعاد، مشخصات آلبوم و طرح انتخابی، تعداد رول را بررسی می‌کنند.'
        }
      ],
      rollSteps: [
        {
          title: 'ارتفاع دیوار را اندازه بگیرید.',
          text: 'فاصله کف تا سقف را به سانتی‌متر ثبت کنید.'
        },
        {
          title: 'عرض دیوارها را اندازه بگیرید.',
          text: 'عرض هر دیوار را جداگانه یادداشت کنید.'
        },
        {
          title: 'تعداد قد قابل استفاده از هر رول را محاسبه کنید.',
          text: 'طول رول را بر ارتفاع هر تکه تقسیم و عدد را به پایین گرد کنید.',
          formula: '1000 ÷ 280 = 3.57 → 3 قد'
        },
        {
          title: 'تعداد قدهای موردنیاز برای دیوار را به دست آورید.',
          text: 'عرض دیوار را بر عرض رول تقسیم و به عدد صحیح بالاتر گرد کنید.',
          formula: '480 ÷ 53 = 9.05 → 10 قد'
        },
        {
          title: 'تعداد رول موردنیاز را محاسبه کنید.',
          text: 'تعداد قدهای موردنیاز را بر تعداد قد قابل استفاده از هر رول تقسیم و به بالا گرد کنید.',
          formula: '10 ÷ 3 = 3.33 → 4 رول'
        }
      ],
      areaSteps: [
        {
          title: 'مساحت هر دیوار را محاسبه کنید.',
          text: 'ارتفاع را در عرض دیوار ضرب کنید؛ اندازه‌ها را به متر تبدیل کنید.',
          formula: '2.8 × 4.8 = 13.44 m²'
        },
        {
          title: 'مساحت تمام دیوارها را جمع کنید.',
          text: 'فقط دیوارهایی را در نظر بگیرید که قرار است کاغذدیواری شوند.'
        },
        {
          title: 'مساحت هر رول را به دست آورید.',
          text: 'طول رول را در عرض آن ضرب کنید.',
          formula: '10 × 0.53 = 5.3 m²'
        },
        {
          title: 'مساحت کل را بر مساحت رول تقسیم کنید.',
          text: 'عدد به‌دست‌آمده را به عدد صحیح بالاتر گرد کنید.'
        }
      ],
      expertSteps: [
        {
          title: 'فضای موردنظر را مشخص کنید.',
          text: 'مثلاً پذیرایی، اتاق خواب، راهرو یا آشپزخانه.'
        },
        {
          title: 'کد کاغذدیواری را وارد کنید.',
          text: 'اگر از چند طرح استفاده می‌کنید، کد هر محصول را جداگانه بنویسید.'
        },
        {
          title: 'ارتفاع و عرض هر دیوار را وارد کنید.',
          text: 'اگر ارتفاع دیوارها متفاوت است، برای هرکدام یک ردیف جداگانه بسازید.'
        },
        {
          title: 'شرایط خاص را توضیح دهید.',
          text: 'ستون، پنجره، در، فرورفتگی، بیرون‌زدگی یا شکستگی دیوار را ذکر کنید.'
        }
      ],
      rollFields: [
        {key: 'height', label: 'ارتفاع دیوار (cm)', min: 1, step: 1},
        {key: 'width', label: 'عرض دیوار (cm)', min: 1, step: 1},
        {key: 'length', label: 'طول رول (متر)', min: 0.1, step: 0.1},
        {key: 'rollWidth', label: 'عرض رول (cm)', min: 1, step: 1}
      ],
      rollCalc: {
        height: 280,
        width: 480,
        length: 10,
        rollWidth: 53
      },
      areaFields: [
        {key: 'height', label: 'ارتفاع دیوار (متر)', min: 0.1, step: 0.01},
        {key: 'width', label: 'مجموع عرض دیوارها (متر)', min: 0.1, step: 0.01},
        {key: 'length', label: 'طول رول (متر)', min: 0.1, step: 0.1},
        {key: 'rollWidth', label: 'عرض رول (متر)', min: 0.1, step: 0.01}
      ],
      areaCalc: {
        height: 2.8,
        width: 4.8,
        length: 10,
        rollWidth: 0.53
      },
      wallRows: [
        {space: 'پذیرایی', code: 'A', height: 280, width: 480},
        {space: 'پذیرایی', code: 'A', height: 280, width: 320}
      ],
      faqs: [
        {
          question: 'ارتفاع دیوار را از کجا اندازه بگیریم؟',
          answer: 'ارتفاع دیوار را از کف تمام‌شده تا سقف اندازه بگیرید. اگر کف‌پوش یا سقف کاذب هنوز اجرا نشده است، این موضوع را به کارشناس اعلام کنید.'
        },
        {
          question: 'آیا مساحت درها و پنجره‌ها را کم کنیم؟',
          answer: 'برای محاسبه اولیه می‌توانید مساحت بازشوهای بزرگ را جداگانه یادداشت کنید؛ اما در محاسبه تعداد رول، نمی‌توان همیشه مساحت در و پنجره را به‌طور کامل از مساحت دیوار کم کرد. محل و ابعاد آن‌ها را اعلام کنید.'
        },
        {
          question: 'اگر ارتفاع دیوارها متفاوت باشد چه کنیم؟',
          answer: 'هر دیوار یا بخش دارای ارتفاع متفاوت را جداگانه اندازه‌گیری کنید. محاسبه مشترک ممکن است تعداد قدهای قابل استفاده از رول را اشتباه نشان دهد.'
        },
        {
          question: 'آیا برای طرح‌های ساده هم پرتی وجود دارد؟',
          answer: 'بله. حتی در طرح‌های ساده نیز به دلیل برش، تنظیم لبه‌ها و شرایط نصب مقداری پرت ایجاد می‌شود. میزان آن به ابعاد دیوارها، نحوه برش و مهارت نصاب بستگی دارد.'
        },
        {
          question: 'آیا می‌توان از باقی‌مانده یک رول برای دیوار دیگر استفاده کرد؟',
          answer: 'در بعضی شرایط بله؛ اما این موضوع به ارتفاع دیوار، طول باقی‌مانده، نوع طرح و امکان تطبیق نقش بستگی دارد.'
        },
        {
          question: 'چرا باید کد کاغذ هر دیوار را مشخص کنیم؟',
          answer: 'چون ممکن است برای هر دیوار از طرح یا کد متفاوتی استفاده کنید. تعداد رول هر کد باید جداگانه محاسبه شود و نمی‌توان رول‌های طرح‌های مختلف را با یکدیگر جمع کرد.'
        }
      ]
    }
  },
  computed: {
    rollResult() {
      const height = +this.rollCalc.height
      const width = +this.rollCalc.width
      const length = +this.rollCalc.length
      const rollWidth = +this.rollCalc.rollWidth
      if (!(height > 0 && width > 0 && length > 0 && rollWidth > 0)) return null
      const cuts = Math.floor((length * 100) / height + 1e-9)
      if (cuts < 1) return {error: true}
      const strips = Math.ceil(width / rollWidth - 1e-9)
      return {cuts, strips, rolls: Math.ceil(strips / cuts - 1e-9)}
    },
    areaResult() {
      const height = +this.areaCalc.height
      const width = +this.areaCalc.width
      const length = +this.areaCalc.length
      const rollWidth = +this.areaCalc.rollWidth
      if (!(height > 0 && width > 0 && length > 0 && rollWidth > 0)) return null
      const area = height * width
      const rollArea = length * rollWidth
      if (rollArea <= 0) return null
      return {
        area: area.toFixed(2),
        rollArea: rollArea.toFixed(2),
        count: Math.ceil(area / rollArea - 1e-9)
      }
    }
  },
  methods: {
    toPersian(value) {
      return String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit])
    },
    formatNumber(value) {
      return this.toPersian(String(value)).replace('.', '٫')
    },
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index
    },
    openZoom(src, alt) {
      this.zoom = {src, alt}
    },
    closeZoom() {
      this.zoom = null
    },
    onKeydown(event) {
      if (event.key === 'Escape') this.closeZoom()
    },
    addRow() {
      this.wallRows.push({space: '', code: '', height: '', width: ''})
    },
    removeRow(index) {
      if (this.wallRows.length > 1) this.wallRows.splice(index, 1)
    },
    copyMeasurements() {
      const rows = this.wallRows.map((row, index) => {
        const space = row.space || '—'
        const code = row.code || '—'
        const height = row.height || '—'
        const width = row.width || '—'
        return (index + 1) + '. فضا: ' + space + ' | کد کاغذ: ' + code + ' | ارتفاع: ' + height + ' cm | عرض: ' + width + ' cm'
      })
      const message = 'اطلاعات اندازه‌گیری کاغذدیواری - والکسی\n' + rows.join('\n') +
          '\nتوضیحات: ' + (this.notes || '—')
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message)
            .then(() => {
              this.copyStatus = 'اطلاعات کپی شد. می‌توانید آن را برای کارشناسان والکسی ارسال کنید.'
            })
            .catch(() => this.fallbackCopy(message))
      } else {
        this.fallbackCopy(message)
      }
    },
    fallbackCopy(text) {
      const area = document.createElement('textarea')
      area.value = text
      document.body.appendChild(area)
      area.select()
      try {
        document.execCommand('copy')
        this.copyStatus = 'اطلاعات کپی شد. می‌توانید آن را برای کارشناسان والکسی ارسال کنید.'
      } catch (e) {
        this.copyStatus = 'مرورگر اجازه کپی خودکار نداد؛ لطفاً اطلاعات را دستی انتخاب و کپی کنید.'
      }
      area.remove()
    }
  },
  watch: {
    zoom(value) {
      if (typeof document === 'undefined') return
      document.body.style.overflow = value ? 'hidden' : ''
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
    document.body.style.overflow = ''
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>
