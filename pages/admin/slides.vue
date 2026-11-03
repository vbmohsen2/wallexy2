<template>
  <sidebar>
    <row class="relative pt-2">
      <btn class="absolute left-1 top-0" icon="Bank" @click.native="bank">
        <icon :name="icons.bank" size="20"/>
      </btn>
      <w class="px-2"><span>تصویر</span></w>
      <w class="px-2 mt-3">
        <div class="border border-neutral-500 rounded-xl p-4 justify-center flex" @click="showUpload">
          <div ref="image" class="flex"></div>
        </div>
        <form ref="form">
          <input ref="upload" class="hidden" type="file" @change="upload($event)">
        </form>
      </w>
      <w class="px-2 mt-3 " md="1/3">
        <input v-model="linkModel" class="w-full h-11 border border-neutral-200 rounded-sm special focus:outline-none px-3" placeholder="لینک">
      </w>
      <w class="px-2 mt-3 " md="1/3">
        <input v-model="textModel" class="w-full h-11 border border-neutral-200 rounded-sm special focus:outline-none px-3" placeholder="توضیحات">
      </w>
      <w class="px-2 mt-3 " md="1/3">
        <xoption v-model="slideTypeModel" :items="slideTypes" @update:modelValue="alterType"/>
      </w>
      <w all="24" class="px-2 mt-3 w-full">
        <btn class="border border-neutral-500 rounded-xl w-full" @click.native="uploadPhoto()">
          آپلود
        </btn>
      </w>
    </row>
    <row v-if="slides.length > 0 && slides.filter(slideX => slideX.type === 'desktop').length > 0" class="mt-4 justify-center p-4 rounded-xl relative bg-gray-200">
      <icon :name="icons.slide" class="top-2 right-8 absolute" size="18"/>
      <icon :name="icons.desktop" class="top-2 right-2 absolute" size="18"/>
      <div v-for="slide in slides.filter(slideX => slideX.type === 'desktop')" :key="slide.id" class="relative">
        <img :alt="slide.info" :src="'https://static.wallexy.ir' + slide.path" class="w-36 rounded-xl mx-1">
        <icon :name="icons.close" class="absolute left-1.5 top-1.5 cursor-pointer text-rose-600" @click.native="deleteSlide(slide.id)"/>
      </div>
    </row>
    <row v-if="slides.length > 0 && slides.filter(slideX => slideX.type === 'mobile').length > 0" class="mt-4 justify-center p-4 rounded-xl relative bg-gray-200">
      <icon :name="icons.slide" class="top-2 right-8 absolute" size="18"/>
      <icon :name="icons.mobile" class="top-2 right-2 absolute" size="18"/>
      <div v-for="slide in slides.filter(slideX => slideX.type === 'mobile')" :key="slide.id" class="relative">
        <img :alt="slide.info" :src="'https://static.wallexy.ir' + slide.path" class="w-36 rounded-xl mx-1">
        <icon :name="icons.close" class="absolute left-1.5 top-1.5 cursor-pointer text-rose-600" @click.native="deleteSlide(slide.id)"/>
      </div>
    </row>
    <row v-if="brands.length > 0 " class="mt-4 justify-center p-4 rounded-xl relative bg-gray-200">
      <icon :name="icons.company" class="top-2 right-2 absolute" size="18"/>
      <div v-for="slide in brands" :key="slide.id" class="relative">
        <img :alt="slide.info" :src="'https://static.wallexy.ir' + slide.path" class="w-20 rounded-xl mx-1">
        <icon :name="icons.close" class="absolute left-1.5 top-1.5 cursor-pointer text-rose-600" @click.native="deleteSlide(slide.id)"/>
      </div>
    </row>
    <row v-if="banners.length > 0 && banners.filter(slideX => slideX.type === 'bannerdesktop').length > 0" class="mt-4 justify-center p-4 rounded-xl relative bg-gray-200">
      <icon :name="icons.banner" class="top-2 right-8 absolute" size="18"/>
      <icon :name="icons.desktop" class="top-2 right-2 absolute" size="18"/>
      <div v-for="slide in banners.filter(slideX => slideX.type === 'bannerdesktop')" :key="slide.id" class="relative">
        <img :alt="slide.info" :src="'https://static.wallexy.ir' + slide.path" class="w-36 rounded-xl mx-1">
        <icon :name="icons.close" class="absolute left-1.5 top-1.5 cursor-pointer text-rose-600" @click.native="deleteSlide(slide.id)"/>
      </div>
    </row>
    <row v-if="banners.length > 0 && banners.filter(slideX => slideX.type === 'bannermobile').length > 0" class="mt-4 justify-center p-4 rounded-xl relative bg-gray-200">
      <icon :name="icons.banner" class="top-2 right-8 absolute" size="18"/>
      <icon :name="icons.mobile" class="top-2 right-2 absolute" size="18"/>
      <div v-for="slide in banners.filter(slideX => slideX.type === 'bannermobile')" :key="slide.id" class="relative">
        <img :alt="slide.info" :src="'https://static.wallexy.ir' + slide.path" class="w-36 rounded-xl mx-1">
        <icon :name="icons.close" class="absolute left-1.5 top-1.5 cursor-pointer text-rose-600" @click.native="deleteSlide(slide.id)"/>
      </div>
    </row>
    <row v-if="middles.length > 0" class="mt-4 justify-center p-4 rounded-xl bg-gray-200">
      <div v-for="slide in middles" :key="slide.id" class="relative">
        <img :alt="slide.info" :src="'https://static.wallexy.ir' + slide.path" class="w-36 rounded-xl mx-1">
        <icon :name="icons.close" class="absolute left-1.5 top-1.5 cursor-pointer text-rose-600" @click.native="deleteSlide(slide.id)"/>
      </div>
    </row>
  </sidebar>
  <inertia-head>
    <title>اسلایدها</title>
  </inertia-head>
</template>
<style>
</style>
<script>
import {mdiBankOutline, mdiCloseCircle, mdiImageArea, mdiMonitor, mdiCellphone, mdiImageSizeSelectLarge, mdiStorefront} from '@mdi/js';
import Sidebar from '@/components/side/admin'

export default {
  components: {Sidebar},
  data() {
    return {
      files: [],
      linkModel: '',
      textModel: '',
      typeModel: 'desktop',
      slideTypeModel: 'اسلاید دسکتاپ',
      slideTypes: ['اسلاید دسکتاپ', 'اسلاید موبایل', 'بنر دسکتاپ', 'بنر موبایل', 'برند', 'میانی'],
      icons: {
        close: mdiCloseCircle,
        bank: mdiBankOutline,
        slide: mdiImageArea,
        desktop: mdiMonitor,
        mobile: mdiCellphone,
        banner: mdiImageSizeSelectLarge,
        company: mdiStorefront
      },
      slides: this.$page.props.slides,
      banners: this.$page.props.banners,
      middles: this.$page.props.middles,
      brands: this.$page.props.brands,
    }
  },
  methods: {
    showUpload() {
      this.$refs.upload.click()
    },
    upload(ev) {
      this.clearFiles();
      this.files = ev.target.files;
      Array.from(this.files).forEach(file => {
        let fileReader = new FileReader()
        fileReader.onload = (ev) => {
          let image = new Image();
          image.id = 'image'
          image.height = 300;
          image.width = 300;
          image.title = file.name;
          image.src = ev.target.result;
          this.$refs.image.appendChild(image);
        }
        fileReader.readAsDataURL(file)
      });
    },
    clearFiles() {
      this.files = [];
      this.$refs.image.innerHTML = ''
    },
    deleteSlide(id) {
      this.axios.delete('/admin/slide/' + id).then(res => {
        this.$store.dispatch('alerts/update', {message: 'تصویر با موفقیت حذف شد.', type: 'success'});
        this.slides = res.data.slides
        this.middles = res.data.middles
        this.banners = res.data.banners
        this.brands = res.data.brands

      }).catch(() => {
        this.$store.dispatch('alerts/update', {message: 'لطفا بعدا تلاش کنید.', type: 'error'});
      })
    },
    uploadPhoto() {
      if (this.files.length === 0) return this.$store.dispatch('alerts/update', {message: 'تصویر انتخاب نشده است.', type: 'error'})
      let formDate = new FormData()
      formDate.append('photo', this.files[0])
      formDate.append('link', this.linkModel)
      formDate.append('text', this.textModel)
      formDate.append('type', this.typeModel)
      this.axios.post('/admin/slide', formDate).then(res => {
        this.clearFiles()
        this.linkModel = ''
        this.textModel = ''
        this.slides = res.data.slides
        this.middles = res.data.middles
        this.banners = res.data.banners
        this.brands = res.data.brands
        this.$refs.form.reset()
        this.$store.dispatch('alerts/update', {message: 'تصویر با موفقیت آپلود شد.', type: 'success'})
      }).catch(() => {
        this.$store.dispatch('alerts/update', {message: 'لطفا بعدا تلاش کنید.', type: 'error'})
      })
    },
    alterType() {
      let self = this
      switch (this.slideTypeModel) {
        case 'اسلاید دسکتاپ' :
          self.typeModel = 'desktop'
          break;
        case 'اسلاید موبایل' :
          self.typeModel = 'mobile'
          break;
        case 'بنر دسکتاپ' :
          self.typeModel = 'bannerdesktop'
          break;
        case 'بنر موبایل' :
          self.typeModel = 'bannermobile'
          break;
        case 'برند' :
          self.typeModel = 'brand'
          break;
        case 'میانی' :
          self.typeModel = 'middle'
          break;
      }
    },
    bank() {
      this.axios.get('/admin/pay').then(res => {
        if (res.status === 200) document.location = 'https://www.zarinpal.com/pg/StartPay/' + res.data;
      }).catch(() => this.$store.dispatch('alerts/update', {message: 'لطفا بعدا تلاش کنید.', type: 'error'}))
    },
  }
}
</script>
