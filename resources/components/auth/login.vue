<template>
  <div class="overflow-hidden rounded-xl bg-white text-neutral-600 max-w-screen-xs w-[calc(100vw-32px)]">
    <row class="px-3 py-4 special">
      <div class="w-full flex">
        <span>
          ورود / ثبت نام
        </span>
        <space/>
      </div>
    </row>
    <row class="p-4 pb-0 md:p-6 md:pb-0 w-full overflow-hidden">
      <w :class="{'opacity-70' : showToken}" class="transform transition mb-6">
        <xinput id="number" v-model="number" :disabled="showToken" :prepend-icon="icons.account" :rule="!error" maxlength="11" name="شماره همراه" type="number" @keyup.enter="login"/>
      </w>
      <Expand>
        <w v-if="showToken">
          <div class="flex justify-center">
            <icon :name="icons.alert" class="ml-2 text-neutral-500" size="16"></icon>
            <span class="mt-1 text-sm">لطفا کد چهار رقمی ارسال شده به شماره همراه خود را وارد کنید</span>
          </div>
          <row class="justify-center mt-3 ltr">
            <input id="code1" :value="code1" @input="code1 = $event.target.value" :class="tokenIsValid ? 'border-neutral-200' : 'border-neutral-600'" autocomplete="off"
                   class="border bg-neutral-100 rounded-full focus:outline-none mx-2 px-2 py-1.5 w-12 h-12 text-center text-lg"
                   max="9"
                   type="number" @focus="code1 = ''">
            <input id="code2" :value="code2" @input="code2 = $event.target.value" :class="tokenIsValid ? 'border-neutral-200' : 'border-neutral-600'" autocomplete="off"
                   class="border bg-neutral-100 rounded-full focus:outline-none mx-2 px-2 py-1.5 w-12 h-12 text-center text-lg"
                   max="9"
                   type="number" @focus="code2 = ''" @keyup.delete.exact="reset">
            <input id="code3" :value="code3" @input="code3 = $event.target.value" :class="tokenIsValid ? 'border-neutral-200' : 'border-neutral-600'" autocomplete="off"
                   class="border bg-neutral-100 rounded-full focus:outline-none mx-2 px-2 py-1.5 w-12 h-12 text-center text-lg"
                   max="9"
                   type="number" @focus="code3 = ''" @keyup.delete.exact="reset">
            <input id="code4" :value="code4" @input="code4 = $event.target.value" :class="tokenIsValid ? 'border-neutral-200' : 'border-neutral-600'" autocomplete="off"
                   class="border bg-neutral-100 rounded-full focus:outline-none mx-2 px-2 py-1.5 w-12 h-12 text-center text-lg"
                   max="9"
                   type="number"
                   @focus="code4 = ''">
          </row>
          <row class="px-3 my-2 justify-center">
            <span class="py-2 w-16" v-text="counter"></span>
            <btn :aria-disabled="!resend" :class="{ 'text-neutral-400' : !resend}" :disabled="!resend" class="text-sm -mx-3" @click.native="login">
              ارسال مجدد کد
            </btn>
          </row>
        </w>
      </Expand>
    </row>
    <row class="py-2 px-2 ">
      <btn @click.native="close">
        بستن
      </btn>
      <div class="relative">
        <transition name="fade">
          <btn v-if="!showToken" @click.native="login">
            ورود
          </btn>
        </transition>
        <transition name="fade">
          <btn v-if="showToken" @click.native="verify">
            تایید
          </btn>
        </transition>
      </div>
      <space/>
      <transition name="number">
        <btn v-if="showToken" @click.native="edit">
          ویرایش شماره
        </btn>
      </transition>
    </row>
  </div>
</template>
<script>
import {mdiCellphone, mdiEye, mdiEyeOff, mdiAlertCircleOutline, mdiPencil} from '@mdi/js';
import Expand from "@/transitions/expand"

export default {
  components: {Expand},
  data() {
    return {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      number: '',
      counter: '۰۴:۰۰',
      eye: false,
      password: '',
      path: '/',
      icons: {
        eyeOn: mdiEye,
        eyeOff: mdiEyeOff,
        account: mdiCellphone,
        alert: mdiAlertCircleOutline,
        edit: mdiPencil,
      },
    }
  },
  emits: ['close'],
  methods: {
    login() {
      if (this.number.length < 11) return this.$store.dispatch('alerts/update', {message: 'شماره همراه باید ۱۱ رقمی باید', type: 'error'});
      this.$store.dispatch('authentication/login', {number: this.number})
      clearInterval(this.timerCache)
      this.counter = '۰۴:۰۰'
      this.timer()
    },
    verify() {
      if (this.token.length < 4) return this.$store.dispatch('alerts/update', {message: 'لطفا کد چهار رقمی را وارد کنید', type: 'error'});
      this.$store.dispatch('authentication/verify', {number: this.number, token: this.token});
    },
    edit() {
      this.$store.commit('authentication/showToken', false)
      clearInterval(this.timerCache)
    },
    close() {
      this.$store.commit('authentication/showToken', false)
      clearInterval(this.timerCache)
      this.$emit('close')
    },
    reset() {
      this.code1 = ''
      this.code2 = ''
      this.code3 = ''
      this.code4 = ''
      document.getElementById('code1').focus()
      if (!this.tokenIsValid) this.$store.commit('authentication/tokenIsValid', true)
    },
    timer() {
      let totalTime = 239000
      let seconds = 0
      let min = 0
      let sec = 0
      this.timerCache = setInterval(() => {
        seconds = Math.floor(totalTime / 1000)
        min = Math.floor(totalTime / 60000)
        sec = seconds % 60
        totalTime = totalTime - 1000
        if (sec < 10) {
          sec = '۰' + sec
        }
        this.counter = this.getNumber(sec + ' : ۰' + min)
        if (seconds === 0) {
          clearInterval(this.timerCache)
        }
      }, 1000)
    }
  },
  computed: {
    token() {
      return '' + this.code1 + this.code2 + this.code3 + this.code4
    },
    error() {
      return /(09[01239][0-9]{8}$)/.test(this.number.toString()) || this.number.toString() === ''
    },
    showToken() {
      return this.$store.state.authentication.showToken
    },
    tokenIsValid() {
      return this.$store.state.authentication.tokenIsValid
    },
    resend() {
      return this.counter === '۰۰ : ۰۰'
    },
  },
  watch: {
    token(value) {
      if (value.length === 4 && this.tokenIsValid) {
        this.verify()
      }
    },
    tokenIsValid(value) {
      !value && setTimeout(() => {
        this.reset()
      }, 1000)
    },
    showToken(value) {
      if (value) setTimeout(() => document.getElementById('code1').focus(), 500)
    },
    number(value) {
      if (value.length > 11) {
        this.number = this.number.substring(0, 11)
      }
    },
    code1(value) {
      if (value.toString().length === 1) {
        document.getElementById('code2').focus()
      }
    },
    code2(value) {
      if (value.toString().length === 1) {
        document.getElementById('code3').focus()
      }
    },
    code3(value) {
      if (value.toString().length === 1) {
        document.getElementById('code4').focus()
      }
    },
    code4(value) {
      if (value.toString().length > 1) {
        this.code4 = parseInt(value.toString().substring(0, 1))
      }
    }
  },
  mounted() {
    document.querySelector('[maxlength="11"]').focus()
  }
}
</script>
