<!--suppress ALL -->
<template>
  <container class="border-neutral-300 border rounded-xl mt-4">
    <row class="px-2 mt-4 py-3 pt-6">
      <h2 class="text-lg w-full border-b border-neutral-300 pb-3">ایجاد محصول</h2>
    </row>
    <row class="mt-10">
      <w class="px-2" xl="4/6">
        <xinput v-model="productName" name="نام محصول"/>
      </w>
      <w class="px-2 mt-3 xl:mt-0" md="1/2" xl="1/6">
        <xinput v-model="productType" name="نوع"/>
      </w>
      <w class="px-2 mt-3 xl:mt-0" md="1/2" xl="1/6">
        <xinput v-model="productCode" name="کد"/>
      </w>
      <w class="px-2 mt-3">
        <xinput v-model="productCodes" name="مرتبط ها"/>
      </w>
    </row>
    <row class="mt-12 px-2">
      <h2 class="pt-0.5 text-lg">ویژگی ها</h2>
      <btn icon @click.native="addFeature">
        <icon :name="icons.plus" size="18"/>
      </btn>
    </row>
    <row>
      <w v-for="(feature , index) in features" :key="index+'feature'" class="px-2 mt-6" sm="1/3">
        <xinput v-model="feature.value" :append-icon="icons.minus" name="ویژگی" @append="removeFeature(index)"/>
      </w>
    </row>
    <row class="mt-12 px-2">
      <h2 class="pt-0.5 text-lg">مدل ها</h2>
      <btn icon @click.native="addType">
        <icon :name="icons.plus" size="18"/>
      </btn>
    </row>
    <row v-for="(type , index) in models" :key="index+'models'" class="relative mt-6">
      <w class="px-2 mt-3 lg:mt-0" lg="1/4" sm="1/2">
        <xinput v-model="type.name" name="مدل"></xinput>
      </w>
      <w class="px-2 mt-3 lg:mt-0" lg="1/4" sm="1/2">
        <xinput v-model="type.price" :name="type.price.length > 0 ? 'قیمت : ' + getPrice(type.price) + ' تومان': 'قیمت'"/>
      </w>
      <w class="px-2 mt-3 lg:mt-0" lg="1/4" sm="1/2">
        <xinput v-model.number="type.count" :name="type.count > 0 ? 'موجودی : ' + getNumber(type.count) + ' عدد': 'موجودی' " @appnd="removeType(index)"/>
      </w>
      <w class="px-2 mt-3 lg:mt-0" lg="1/4" sm="1/2">
        <xinput v-model.number="type.percent" :append-icon="icons.minus" :name="type.percent > 0 ? getNumber(type.percent) + ' درصد تخفیف' : 'تخفیف'" @append="removeType(index)"/>
      </w>
    </row>
    <row class="mt-12 px-2">
      <h2 class="pt-0.5 text-lg">مشخصات</h2>
      <btn icon @click.native="addHeader">
        <icon :name="icons.plus" size="18"/>
      </btn>
    </row>
    <row v-for="(header , infoId) in headers" :key="infoId+'headers'" class="px-2 mt-8">
      <w>
        <row class="relative">
          <xinput v-model="header.name" :append-icon="icons.plus" :prepend-icon="icons.minus" name="موضوع مشخصه ها" @append="addData(infoId)"
                  @prepend="removeHeader(infoId)"/>
        </row>
        <row v-for="(data , dataId) in header.values" :key="dataId+'datas'" class="-mx-2 relative mt-6">
          <w class="px-2 mt-3 lg:mt-0" sm="1/2">
            <xinput v-model="data.key" name="نام مشخصه"></xinput>
          </w>
          <w class="px-2 mt-3 lg:mt-0" sm="1/2">
            <xinput v-model="data.value" :append-icon="icons.minus" name="مقدار مشخصه" @append="removeData( infoId , dataId)"></xinput>
          </w>
        </row>
      </w>
    </row>
    <row class="mt-12 px-2">
      <h2 class="pt-0.5 text-lg">تصاویر</h2>
    </row>
    <row class="pa-10 mx-6 mb-6" justify="center">
      <div v-for="(photo , index) in product.photos" :key="photo.id" class="relative p-2 m-2 my-4">
        <btn class="text-rose-600 absolute left-3 top-3 z-10" icon @click.native="deletePhoto(photo.id , index)">
          <icon :name="icons.remove"></icon>
        </btn>
        <img :src="photo.normal" alt="Delete" class="rounded-xl" width="175px"/>
      </div>
    </row>
    <row class="px-2 mt-3">
      <w>
        <div class="bg-neutral-100 py-4 p-4 rounded-xl" @click="showUpload">
          <div ref="imgs" class="flex"></div>
        </div>
        <input ref="upload" class="transform h-0 w-0" multiple type="file" @change="upload($event)">
      </w>
    </row>
    <btn class="mb-5 border-neutral-500 border mt-3 mx-2" @click="editPorduct">ویرایش محصول</btn>
  </container>
  <inertia-head>
    <title>کپی محصول</title>
  </inertia-head>
</template>
<script>
import {mdiPlusBoxOutline, mdiMinusBoxOutline} from '@mdi/js'

export default {
  data() {
    return {
      files: [],
      productName: '',
      productType: '',
      productCode: '',
      productCodes: '',
      product: this.$page.props.product,
      features: [{value: ''}, {value: ''}, {value: ''}],
      headers: [{name: 'کلی', values: [{key: 'برند', value: ''}]}],
      models: [{name: '', price: '', count: '', percent: '0'}],
      icons: {
        plus: mdiPlusBoxOutline,
        minus: mdiMinusBoxOutline
      }
    }
  },
  methods: {
    removeFeature(index) {
      if (index === 0) return
      this.features.splice(index, 1)
    },
    addFeature() {
      this.features.push({value: ''})
    },
    addType() {
      this.models.push({name: '', price: '', count: '1000', percent: '0'})
    },
    removeType(index) {
      if (index === 0) return
      this.models.splice(index, 1)
    },
    addHeader() {
      this.headers.push({name: '', values: [{key: '', value: ''}]})
    },
    removeHeader(index) {
      if (index === 0) return
      this.headers.splice(index, 1)
    },
    addData(index) {
      this.headers[index].values.push({key: '', value: ''})
    },
    removeData(header, data) {
      if (data === 0) return
      this.headers[header].values.splice(data, 1)
    },
    editPorduct() {
      if (this.productName === '')
        return this.$store.dispatch('alerts/update', {message: 'فیلد نام نباید خالی باشد.', type: 'error'})
      if (this.headers[0].values[0].key !== 'برند')
        return this.$store.dispatch('alerts/update', {message: 'نام اولین مشخصه باید برند باشد.', type: 'error'})
      if (this.models[0].name === '' || this.models[0].count === '' || this.models[0].price === '')
        return this.$store.dispatch('alerts/update', {message: 'حداقل باید یکی از  فیلد های مدل ها کامل پر شود .', type: 'error'})
      if (this.headers[0].name === '' || this.headers[0].values[0].key === '' || this.headers[0].values[0].value === '')
        return this.$store.dispatch('alerts/update', {message: 'حداقل باید یکی از  فیلد های مشخصات کامل پر شود.', type: 'error'})
      if (this.files.length === 0) return this.$store.dispatch('alerts/update', {message: 'لطفا تعدای عکس انتخاب کنید', type: 'error'})
      window.progress.start()
      let photos = new FormData();
      Array.from(this.files).forEach(photo => photos.append('photos[]', photo))
      this.axios.post('/xproduct' , {
        models: this.models,
        headers: this.headers,
        filters: this.filters,
        type: this.productType,
        code: this.productCode,
        codes: this.productCodes,
        price: this.price.toString(),
        name: this.productName.trim(),
        category_id: this.product.category_id,
        normalized: this.productName.replace(/آ/g, 'ا'),
        features: this.features.filter(el => el.value !== '').map(filter => filter.value),
      }).then(res => {
        if (res.status === 201) {
          this.axios.post('/xproduct/' + res.data.id + '/' + 'photos', photos)
            .then(() => {
              this.productCode = ''
              this.models = [{model: '', price: '', count: '1000', percent: '0'}]
              this.features = [{value: ''}, {value: ''}, {value: ''}]
              this.headers.forEach(header => {
                header.values.forEach(data => data.value = '')
              })
              window.progress.done()
              window.open('/product/' + res.data.id + '/' + res.data.name.toString().replace(/\s/g, '-'), '_newtab')
            }).catch(err => {
            window.progress.done()
            this.axios.delete('/xproduct/' + res.data.id)
            this.$store.dispatch('alerts/update', {message: 'لطفا بعدا تلاش کنید.', type: 'error'})
          })
        }
      }).catch(err => {
        window.progress.done()
        if (err.response.status === 422) this.$store.dispatch('alerts/update', {message: err.response.data.errors[0].message, type: 'error'})
        else this.$store.dispatch('alerts/update', {message: 'لطفا بعدا تلاش کنید.', type: 'error'})
      })
    },
    showUpload() {
      this.$refs.upload.click()
    },
    upload(ev) {
      this.clearFiles()
      this.files = ev.target.files
      Array.from(this.files).forEach(file => {
        let fileReader = new FileReader()
        fileReader.onload = (ev) => {
          let image = new Image()
          image.height = 100
          image.width = 100
          image.style.marginLeft = '8px'
          image.classList.add('mt-4')
          image.classList.add('mb-3')
          image.style.borderRadius = '8px'
          image.title = file.name
          image.src = ev.target.result
          this.$refs.imgs.appendChild(image)
        }
        fileReader.readAsDataURL(file)
      })
    },
    clearFiles() {
      this.files = []
      this.$refs.imgs.innerHTML = ''
    },
    deletePhoto(id, index) {
      this.$axios.delete('/xproduct/' + this.product.id + '/photos/' + id)
        .then(res => {
          res.status === 200 && this.$store.dispatch('notifications/update', {data: ['عکس با موفقیت پاک شد.'], type: 'success'})
          this.product.photos.splice(index, 1);
        })
        .catch(() => this.$store.dispatch('notifications/update', {data: ['مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .'], type: 'error'}))
    },
  },
  mounted() {
    this.models = this.product.models;
    this.headers = this.product.headers;
    this.productName = this.product.name;
    this.productType = this.product.type;
    this.productCode = this.product.code;
    this.productCodes = this.product.codes
    this.models = this.product.models.map(model => {
      delete model.id
      return model
    })
    this.features = this.product.features.map(feature => {
      return {value: feature}
    });
  },
  computed: {
    price() {
      return Math.min(...this.models.map(model => model.price * (100 - model.percent) / 10))
    },
    filters() {
      let filters = ''
      this.headers.map(header => header.values.map(value => filters += value.key.replace(/\s/g, '-') + '_' + value.value.replace(/\s/g, '-') + ' '))
      return filters
    }
  }
}
</script>
