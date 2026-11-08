<template>
  <footer class="mt-6 bg-solona shadow-x">
    <container class="py-4 px-5 md:px-3">
      <row>
        <w class="mt-6" lg="2/5" sm="1/2">
          <inertia-link href="/contact" title="تماس با ما">
            <span class="mb-6 text-md block">تماس با ما</span>
          </inertia-link>
          <a href="tel:09015656733" title="شماره همراه پشتیبانی همکار">
            <div class="flex py-2">
              <icon :name="icons.phone" class="pl-1.5" size="18"/>
              <span v-text="'شماره همراه پشتیبانی همکار : ' + getNumber('6733 565 0901')"></span>
            </div>
          </a>
          <a href="tel:09904283848" title="شماره همراه پشتیبانی فروش">
            <div class="flex py-2">
              <icon :name="icons.cellphone" class="pl-1.5" size="18"/>
              <span v-text="'شماره همراه پشتیبانی فروش : ' + getNumber('3848 428 0990')"></span>
            </div>
          </a>
          <a href="mailto:info@wallexy.ir" title="ایمیل">
            <div class="flex py-2">
              <icon :name="icons.email" class="pl-1.5" size="18"/>
              <span>ایمیل : info@wallexy.ir</span>
            </div>
          </a>
          <div class="flex py-2">
            <icon :name="icons.time" class="pl-1.5" size="18"/>
            <span>روز های کاری ساعت ۹ صبح تا ۹ شب</span>
          </div>
          <inertia-link href="/shipping-return" title="نحوه ارسال و شرایط مرجوعی">
            <div class="flex py-2">
              <icon :name="icons.truck" class="pl-1.5" size="18"/>
              <span>نحوه ارسال و شرایط مرجوعی</span>
            </div>
          </inertia-link>
          <inertia-link href="/faq" title="سؤالات متداول">
            <div class="flex py-2">
              <icon :name="icons.faq" class="pl-1.5" size="18"/>
              <span>سؤالات متداول</span>
            </div>
          </inertia-link>
        </w>
        <w class="mt-6" lg="1/5" sm="1/2">
          <span class="mb-6 text-md block">شبکه های اجتماعی</span>
          <inertia-link href="/blog" title="وبلاگ">
            <div class="flex py-2">
              <icon :name="icons.post" class="pl-1.5" size="18"/>
              <span>وبلاگ</span>
            </div>
          </inertia-link>
          <a href="https://t.me/wallexy_info" title="تلگرام">
            <div class="flex py-2">
              <icon
                  class="pl-1.5"
                  name="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"
                  size="18"/>
              <span>تلگرام</span>
            </div>
          </a>
          <a href="https://twitter.com/wallexy_info/" title="توییتر">
            <div class="flex py-2">
              <icon :name="icons.twitter" class="pl-1.5" size="18"/>
              <span>توییتر</span>
            </div>
          </a>
          <a href="https://www.instagram.com/wallexy_info/" title="اینستاگرام">
            <div class="flex py-2">
              <icon :name="icons.instagram" class="pl-1.5" size="18"/>
              <span>اینستاگرام</span>
            </div>
          </a>
        </w>
        <w class="mt-12 md:mt-6" lg="2/5">
          <row>
            <w class="relative">
              <label for="email">جهت اطلاع از جشنواره های والکسی ایمیل خود را وارد کنید</label>
              <input id="email" v-model="email" class="w-full h-10 mt-3 border-gray-200 bg-neutral-100 rounded-full border focus:outline-none pr-3 pl-10"/>
              <btn class="absolute left-2 top-8" label="ارسال ایمیل" @click="mail">
                <icon :name="icons.email" class="text-gray-600"/>
              </btn>
            </w>
            <w>
              <w class="mt-4 relative">
                <div class="bg-neutral-100 p-2 rounded-xl justify-center flex">
                  <a href='https://trustseal.enamad.ir/?id=450719&Code=Zl5OiqMQ5zEG0FXuIWbP5eg2PX3p9DW5' referrerpolicy='origin' target='_blank'>
                    <!--                    <img Code='Zl5OiqMQ5zEG0FXuIWbP5eg2PX3p9DW5'-->
                    <!--                         alt="لوگوی اینماد"-->
                    <!--                         referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=450719&Code=Zl5OiqMQ5zEG0FXuIWbP5eg2PX3p9DW5'-->
                    <!--                         style='cursor:pointer'>-->
                    <img alt="لوگوی اینماد" height="76" src="/logo/enamad.png" width="70"/>
                  </a>
                  <img  src="/logo/kasbokar.png" alt="نماد کسب و کار های مجازی" onclick="window.open('https://ecunion.ir/verify/wallexy.ir?token=9014794684fbd1e46e2c', 'Popup','toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30')" style="cursor:pointer; height: 76px; width: auto;">
                </div>
              </w>
            </w>
          </row>
        </w>
      </row>
      <row class="-mb-2 mt-6">
        <span class="pl-1">تمامی حقوق متعلق به فروشگاه اینترنتی والکسی میباشد</span>
        <icon :name="icons.copyright" size="16"/>
        <space/>
        <a href="https://ardweb.ir" title="طراحی سایت توسط ارد وب">
          <row>
            <icon :name="icons.web" size="16"/>
            <span class="pr-1">طراحی سایت توسط ارد وب</span>
          </row>
        </a>
      </row>
    </container>
  </footer>
</template>
<script>
import {
  mdiAccountCircle,
  mdiBasket,
  mdiCellphone,
  mdiCopyright,
  mdiDeskphone,
  mdiEmail,
  mdiFrequentlyAskedQuestions,
  mdiHeart,
  mdiInstagram,
  mdiMailboxOpen,
  mdiMapMarker,
  mdiStorefront,
  mdiTextBoxOutline,
  mdiTimer,
  mdiTruckDeliveryOutline,
  mdiTwitter,
  mdiWeb
} from '@mdi/js';

export default {
  data: () => ({
    email: '',
    icons: {
      web: mdiWeb,
      time: mdiTimer,
      email: mdiEmail,
      faq: mdiFrequentlyAskedQuestions,
      mail: mdiMailboxOpen,
      phone: mdiDeskphone,
      map: mdiMapMarker,
      twitter: mdiTwitter,
      heart: mdiHeart,
      telegram: mdiHeart,
      store: mdiStorefront,
      user: mdiAccountCircle,
      instagram: mdiInstagram,
      copyright: mdiCopyright,
      cellphone: mdiCellphone,
      basket: mdiBasket,
      post: mdiTextBoxOutline,
      truck: mdiTruckDeliveryOutline,
    }
  }),
  methods: {
    mail() {
      this.axios.post('/mail', {mail: this.email})
          .then(() => {
            this.email = '';
            this.$store.dispatch('alerts/update', {message: 'ایمیل با موفقیت ثبت شد.', type: 'success'})
          }).catch(err => {
        if (err.response.status === 422)
          this.$store.dispatch('alerts/update', {message: 'ایمیل صحیح نیست.', type: 'error'})
        else
          this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
      });
    }
  }
}
</script>
