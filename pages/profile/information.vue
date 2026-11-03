<template>
  <sidebar>
    <row>
      <w class="px-2 mb-4" lg="1/3" md="1/2">
        <xinput v-model="first_name" :prepend-icon="icons.first_name" name="نام "/>
      </w>
      <w class="px-2 mb-4" lg="1/3" md="1/2">
        <xinput v-model="last_name" :prepend-icon="icons.last_name" name="نام خانوادگی"/>
      </w>
      <w class="px-2 mb-4" lg="1/3" md="1/2">
        <xinput v-model="number" :prepend-icon="icons.phone" name="شماره" type="number"/>
      </w>
      <w class="px-2 mb-4 " lg="1/3" md="1/2">
        <xmenu v-model="provinceMenu" full keep>
          <template #active="{active}">
            <div class="w-full">
              <span class="pb-1 block">شهر</span>
              <div class="h-[46px] special rounded-sm w-full mt-2 relative cursor-pointer border border-neutral-200" @click="active">
                <icon :name="icons.city" class="absolute top-2.5 text-neutral-600 right-1.5" size="20"/>
                <span class="py-3 pb-3.5 block pr-10" v-text="selectedProvince.name + ' - ' + city"></span>
                <icon :class="{'rotate-180' : provinceMenu}" :name="icons.up" class="absolute top-3 left-1.5 transform transition" size="20"/>
              </div>
            </div>
          </template>
          <card class="transform shadow-x -translate-y-1">
            <row class="w-full">
              <w>
                <row class="border-b border-neutral-200">
                  <w all="1/2" class="px-3 bg-neutral-100 py-2.5 border-l border-neutral-200"><span>استان</span></w>
                  <w all="1/2" class="px-3 bg-neutral-100 py-2.5"><span>شهر</span></w>
                </row>
              </w>
              <w all="1/2" class="max-scroll scrollbar border-l border-neutral-200">
                <row v-for="(province, index) in provinces" :key="index" :class="{'bg-neutral-300' : province.name === selectedProvince.name}"
                     @click.native="selectProvince(province)">
                  <span class="py-2.5 px-3 cursor-pointer w-full block" v-text="province.name"></span>
                </row>
              </w>
              <w all="1/2" class="max-scroll scrollbar">
                <row v-for="targetCity in selectedProvince.cities" :key="targetCity" :class="{'bg-neutral-300' : targetCity === city}" class=""
                     @click.native="selectCity(targetCity)">
                  <span class="py-2.5 px-3 cursor-pointer w-full block" v-text="targetCity"></span>
                </row>
              </w>
            </row>
          </card>
        </xmenu>
      </w>
      <w class="px-2 mb-4" lg="2/3">
        <xinput v-model="address" :prepend-icon="icons.map" name="آدرس"/>
      </w>
      <w class="px-2 mb-4" lg="3/12" md="1/2">
        <xinput v-model="irid" :prepend-icon="icons.irid" name="کد ملی" type="number"/>
      </w>
      <w class="px-2 mb-4" lg="3/12" md="1/2">
        <xinput v-model="post" :prepend-icon="icons.box" name="کد پستی" type="number"/>
      </w>
      <w class="px-2 mb-4" lg="3/12" md="2/4">
        <xinput v-model="plate" :prepend-icon="icons.shape" name="پلاک" type="number"/>
      </w>
      <w class="px-2 mb-4" lg="3/12" md="2/4">
        <xinput v-model="floor" :prepend-icon="icons.shape" name="واحد" type="number"/>
      </w>
    </row>
    <btn class=" border-neutral-500 border rounded-full mt-3 mx-2" @click.native="update">بروز کردن مشخصات</btn>
    <xdialog v-model="numberDialog">
      <w class="bg-white shadow-x max-w-screen-xs ">
        <row class=" pl-1 pr-3 shadow-x">
          <span class="py-4">کد تایید</span>
          <space/>
          <btn icon @click.native="numberDialog = false">
            <icon :name="icons.close"/>
          </btn>
        </row>
        <div class="p-4 pb-8">
          <div class="flex">
            <icon :name="icons.alert" class="ml-2 text-neutral-500" size="16"></icon>
            <span class="mt-1 text-sm">لطفا کد چهار رقمی ارسال شده به شماره همراه خود را وارد کنید</span>
          </div>
          <row class="justify-center mt-6 ltr">
            <input id="code1" v-model="code1" :class="tokenIsValid ? 'border-neutral-100' : 'border-neutral-500'" autocomplete="off"
                   class="border bg-neutral-200 focus:outline-none mx-2 px-2 py-1.5 w-10 text-center text-lg"
                   max="9" type="number" @focus="code1 = ''">
            <input id="code2" v-model="code2" :class="tokenIsValid ? 'border-neutral-100' : 'border-neutral-500'" autocomplete="off"
                   class="border bg-neutral-200 focus:outline-none mx-2 px-2 py-1.5 w-10 text-center text-lg"
                   max="9" type="number" @focus="code2 = ''">
            <input id="code3" v-model="code3" :class="tokenIsValid ? 'border-neutral-100' : 'border-neutral-500'" autocomplete="off"
                   class="border bg-neutral-200 focus:outline-none mx-2 px-2 py-1.5 w-10 text-center text-lg"
                   max="9" type="number" @focus="code3 = ''">
            <input id="code4" v-model="code4" :class="tokenIsValid ? 'border-neutral-100' : 'border-neutral-500'" autocomplete="off"
                   class="border bg-neutral-200 focus:outline-none mx-2 px-2 py-1.5 w-10 text-center text-lg"
                   max="9" type="number" @focus="code4 = ''">
          </row>
        </div>
      </w>
    </xdialog>
  </sidebar>
  <inertia-head>
    <title>مشخصات</title>
  </inertia-head>
</template>
<script>
import {
  mdiHome,
  mdiAccount,
  mdiAccountMultiple,
  mdiChartTree,
  mdiBasket,
  mdiCube,
  mdiPound,
  mdiCellphone,
  mdiMapMarker,
  mdiCreditCard,
  mdiClose,
  mdiMailbox, mdiNumeric,
  mdiAlertCircle, mdiChevronDown, mdiCity
} from "@mdi/js"
import Sidebar from "@/components/side/profile";

export default {
  components: {Sidebar},
  data() {
    return {
      selectedProvince: {
        name: '',
        cities: []
      },
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      provinceMenu: false,
      cityMenu: false,
      numberDialog: false,
      tokenIsValid: true,
      states: [],
      first_name: '',
      last_name: '',
      number: '',
      province: '',
      city: '',
      address: '',
      post: '',
      irid: '',
      plate: 0,
      floor: '',
      card: '',
      icons: {
        home: mdiHome,
        first_name: mdiAccount,
        last_name: mdiAccountMultiple,
        chart: mdiChartTree,
        basket: mdiBasket,
        product: mdiCube,
        shape: mdiPound,
        phone: mdiCellphone,
        map: mdiMapMarker,
        city: mdiCity,
        irid: mdiNumeric,
        card: mdiCreditCard,
        close: mdiClose,
        box: mdiMailbox,
        alert: mdiAlertCircle,
        up: mdiChevronDown,
      }
    }
  },
  methods: {
    selectProvince(province) {
      this.selectedProvince = province
      this.city = province.cities[0]
      this.province = province.name
    },
    selectCity(city) {
      this.city = city
      this.provinceMenu = false
    },
    update() {
      let data = JSON.parse(JSON.stringify(this.$data))
      delete data.icons
      delete data.provinces
      delete data.code1
      delete data.code2
      delete data.code3
      delete data.code4
      delete data.cityMenu
      delete data.provinceMenu
      delete data.numberDialog
      delete data.tokenIsValid
      delete data.selectedProvince
      this.axios.post('/profile/information/update', data).then(async res => {
        if (res.data.type === 'default') await this.$store.dispatch('alerts/update', {message: 'مشخصات با موفقیت بروز شد.', type: 'success'})
        if (this.basket) this.$inertia.visit('/basket')
        if (res.data.type === 'number') this.numberDialog = true
        const user = await this.axios.get('/profile/xuser').then(res => res.data)
        this.$store.commit('authentication/user', user)
      }).catch(err => {
        if (err.response.status === 422) this.$store.dispatch('alerts/update', {message: err.response.data.errors[0].message, type: 'error'})
        else this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
      })
    },
    verify() {
      this.axios.post('/profile/number', {number: this.number, token: this.token}).then(res => {
        this.numberDialog = false
        this.$store.dispatch('alerts/update', {message: 'شماره همراه با موفقیت بروز شد.', type: 'success'})
        if (this.basket && res.status === 200) this.$inertia.visit('/basket')
        this.reset()
      }).catch(err => {
        this.tokenIsValid = false
        this.reset()
        if (err.response.status === 422)
          this.$store.dispatch('alerts/update', {message: 'توکن منقضی شده است', type: 'error'}, {root: true});
        else if (err.response.status === 401)
          this.$store.dispatch('alerts/update', {message: 'کد تایید صحیح نیست.', type: 'error'}, {root: true});
        else if (err.response.status === 403)
          this.$store.dispatch('alerts/update', {message: 'این شماره قبلا ثبت شده است', type: 'error'}, {root: true});
        else this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
      })
    },
    reset() {
      this.code1 = ''
      this.code2 = ''
      this.code3 = ''
      this.code4 = ''
      document.getElementById('code1').focus()
      if (!this.tokenIsValid) this.tokenIsValid = true
    },
    ready() {
      this.first_name = this.user.first_name
      this.last_name = this.user.last_name
      this.number = this.user.number
      if (!this.user.information) return
      this.irid = this.user.information.irid
      this.address = this.user.information.address
      this.post = this.user.information.post
      this.plate = this.user.information.plate
      this.floor = this.user.information.floor
      this.card = this.user.information.card
    },
    addScript() {
      let script = document.createElement('script')
      script.src = '/extra/provinces.js'
      script.id = 'provinces'
      document.body.appendChild(script)
      script.addEventListener('load', () => {
        this.provinces = window.provinces
        if (!this.user.information) {
          this.selectedProvince = this.provinces[0]
          this.province = this.selectedProvince.name
          this.city = this.selectedProvince.cities[0]
        } else {
          this.selectedProvince = this.provinces.find(province => province.name === this.user.information.province)
          this.province = this.user.information.province
          this.city = this.user.information.city
        }
      })
    }
  },
  computed: {
    token() {
      return this.code1 + this.code2 + this.code3 + this.code4
    },
    user() {
      return this.$store.state.authentication.user
    },
    basket() {
      return this.$page.props.basket
    }
  },
  mounted() {
    this.addScript()
    setTimeout(() => this.ready() , 100)
  },
  unmounted() {
    document.body.removeChild(document.getElementById('provinces'))
  },
  watch: {
    token(val) {
      if (val.length === 4 && this.tokenIsValid) {
        this.verify()
      }
    },
    number(val) {
      if (val.length > 11) {
        this.number = this.number.substring(0, 11)
      }
    },
    code1(val) {
      if (val.toString().length === 1) {
        document.getElementById('code2').focus()
      }
    },
    code2(val) {
      if (val.toString().length === 1) {
        document.getElementById('code3').focus()
      }
    },
    code3(val) {
      if (val.toString().length === 1) {
        document.getElementById('code4').focus()
      }
    },
    code4(val) {
      if (val.toString().length > 1) {
        this.code4 = parseInt(val.toString().substr(0, 1))
      }
    }
  }
}
</script>
