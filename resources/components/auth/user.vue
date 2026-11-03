<template>
  <div class="flex">
    <div v-if="authenticated">
      <xmenu v-model="menu" special>
        <template #active="{active}">
          <aria label="User Menu" @click.native="active">
            <icon :name="icons.account"></icon>
          </aria>
        </template>
        <div class="py-2 text-sm w-64 bg-white rounded-xl shadow-x">
          <ul>
            <inertia-link href="/profile/user">
              <li class="py-3 px-4 hover:bg-neutral-100 cursor-pointer">
                <div class="flex">
                  <icon :name="icons.profile" class="pl-2" size="18"/>
                  <span>پروفایل</span>
                </div>
              </li>
            </inertia-link>
            <inertia-link v-if="administrator" href="/admin/slides">
              <li class="py-3 px-4 hover:bg-neutral-100 cursor-pointer">
                <div class="flex">
                  <icon :name="icons.dashboard" class="pl-2" size="18"/>
                  <span class="block pt-0.5">داشبرد</span>
                </div>
              </li>
            </inertia-link>
            <inertia-link href="/profile/orders">
              <li class="py-3 px-4 hover:bg-neutral-100 cursor-pointer">
                <div class="flex">
                  <icon :name="icons.basket" class="pl-2" size="18"/>
                  <span class="block pt-1">سفارشات</span>
                </div>
              </li>
            </inertia-link>
            <li class="py-3 px-4 hover:bg-neutral-100 cursor-pointer" @click="logout">
              <div class="flex">
                <icon :name="icons.logout" class="pl-2" size="18"/>
                <span>خروج</span>
              </div>
            </li>
          </ul>
        </div>
      </xmenu>
    </div>
    <xdialog v-else v-model="dialog">
      <template #active="{active}">
        <aria label="باز کردن صفحه ورود" @click.native="active">
          <icon :name="icons.accountAlert"></icon>
        </aria>
      </template>
      <login @close="dialog = false"/>
    </xdialog>
    <xmenu keep v-model="basket">
      <template #active="{active}">
        <aria class="mr-4 md:mr-10 xl:mr-16 relative" label="باز کردن منوی سبد خرید" @click.native="active">
          <icon :name="icons.basket"></icon>
        </aria>
        <div class="w-4 h-4 absolute left-0 bottom-0 transform translate-x-5 pointer-events-none bg-gray-800 text-white text-xs p-0.5 text-center rounded-full transform">
          <span v-text="getNumber(bagsCount)"></span>
        </div>
      </template>
      <div class="w-72 translate-x-1 transform bg-white shadow-x rounded-xl overflow-hidden">
        <div>
          <row class="py-2 shadow-x">
            <a href="/basket" title="ورود به سبد خرید" @click.prevent="goBasket()">
              <aria>ورود به سبد خرید</aria>
            </a>
            <space/>
            <span class="pl-3 pt-1" v-text="getNumber(bags.length) + ' کالا'"></span>
          </row>
          <row v-if="bags.length === 0" class="justify-center p-5">
            <w>
              <icon :name="icons.basketFill" size="36"/>
            </w>
            <span class="w-full text-center pt-2">در سبد کالا محصولی وجود ندارد</span>
          </row>
          <div class="max-h-52 overflow-y-auto scrollbar">
            <row v-for="(bag, index) in bags" :key="index" class="pr-2  my-2">
              <w all="1/5">
                <img :alt="bag.name" :src="bag.photo" class="rounded-lg">
              </w>
              <w all="4/5" class="pr-2 pt-1">
                <row>
                  <w class="max-h-5 overflow-ellipsis whitespace-nowrap overflow-hidden pl-3"><span v-text="bag.name"></span></w>
                  <w class="pt-1.5">
                    <row>
                      <span class="text-sm " v-text="getNumber(bag.count)"></span><span class="pr-1 text-sm" v-text="bag.type"></span>
                      <button aria-label="افزایش تعداد محصول" class="transform active:scale-95 pr-3 focus:outline-none" @click="decrease(index)">
                        <icon :name="icons.minus" size="22"></icon>
                      </button>
                      <button aria-label="کاهش تعداد محصول" class="transform active:scale-95 pr-3 focus:outline-none" @click="increase(index)">
                        <icon :name="icons.plus" size="22"></icon>
                      </button>
                      <icon :name="icons.line" class="pr-2" size="20"></icon>
                      <button aria-label="حذف محصول از صبد خرید" class="transform active:scale-95 pr-3 focus:outline-none" @click="deleteBag(index)">
                        <icon :name="icons.delete" size="20"></icon>
                      </button>
                    </row>
                  </w>
                </row>
              </w>
            </row>
          </div>
          <row class="py-3 px-3 shadow-x">
            <icon :name="icons.money" size="18"/>
            <span class="pr-2 pt-1" v-text="getPrice(parseInt(totalCalculated)) + ' تومان'"></span>
            <space/>
            <btn @click.prevent="goBasket()" v-if="bagsCount > 0" class="bg-neutral-900 text-white rounded-full px-2">ثبت سفارش</btn>
          </row>
        </div>
      </div>
    </xmenu>
  </div>
</template>
<script>

import {
  mdiAccount,
  mdiAccountAlert,
  mdiAccountArrowRight,
  mdiAccountCircle,
  mdiChevronDown,
  mdiChevronUp,
  mdiBasketFill,
  mdiBasketRemoveOutline,
  mdiCash,
  mdiEmoticonTongueOutline,
  mdiFaceMan,
  mdiMenu,
  mdiMenuOpen,
  mdiDragVertical,
  mdiShoppingOutline,
  mdiViewDashboard
} from '@mdi/js';
import login from '@/components/auth/login'

export default {
  components: {login},
  data() {
    return {
      menu: false,
      basket: false,
      unsubscribe: null,
      icons: {
        store: mdiShoppingOutline,
        profile: mdiAccountCircle,
        face: mdiFaceMan,
        account: mdiAccount,
        logout: mdiAccountArrowRight,
        basket: mdiShoppingOutline,
        profileAlert: mdiAccountAlert,
        basketFill: mdiBasketFill,
        delete: mdiBasketRemoveOutline,
        plus: mdiChevronUp,
        minus: mdiChevronDown,
        line: mdiDragVertical,
        emoji: mdiEmoticonTongueOutline,
        money: mdiCash,
        openMenu: mdiMenuOpen,
        closeMenu: mdiMenu,
        dashboard: mdiViewDashboard,
        accountAlert: mdiAccountAlert,
      },
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('authentication/logout')
      this.menu = false
      this.dialog = false
      this.$inertia.visit('/')
    },
    deleteBag(index) {
      if (this.authenticated) this.$store.dispatch('basket/remove', index);
      else this.$store.commit('basket/remove', index);
    },
    increase(index) {
      if (this.authenticated) this.$store.dispatch('basket/increase', index);
      else this.$store.commit('basket/increase', index);
    },
    decrease(index) {
      if (this.authenticated) this.$store.dispatch('basket/decrease', index);
      else this.$store.commit('basket/decrease', index);
    },
    async opening() {
      if (this.$cookies.get('BASKET') !== null && this.$cookies.get('BASKET').length > 0) {
        let getIDs = '';
        let cookieBags = JSON.parse(this.$cookies.get('BASKET'));
        if (this.authenticated) this.$cookies.remove('BASKET');
        let products = await this.axios.get('/xproduct?list=' + cookieBags.map(bag => getIDs += bag.pid + ',')).then(res => res.data);
        cookieBags.map(bag => {
          let selectedProduct = products.find(product => product.id === bag.pid);
          if (bag.model === 'single') {
            bag.max = selectedProduct.models[0].count;
            bag.price = selectedProduct.models[0].price;
            bag.percent = selectedProduct.models[0].percent;
          } else {
            let selectedType = selectedProduct.models.find(model => model.name === bag.model);
            bag.max = selectedType.count;
            bag.price = selectedType.price;
            bag.percent = selectedType.percent;
          }
          bag.name = selectedProduct.name;
          bag.type = selectedProduct.type;
          bag.photo = selectedProduct.photo.normal;
          bag.width = bag.w === 0 ? undefined : bag.width
          bag.height = bag.h === 0 ? undefined : bag.height
          delete bag.w
          delete bag.h
        });
        this.$store.commit('basket/update', cookieBags);
      }
    },
    watchBasket() {
      this.unsubscribe = this.$store.subscribe((mutation, _state) => {
        if (!this.authenticated && mutation.type.startsWith('basket')) {
          const mappedBags = JSON.parse(JSON.stringify(this.bags));
          mappedBags.map(bag => {
            delete bag.max;
            delete bag.name;
            delete bag.price;
            delete bag.photo;
            delete bag.type;
            delete bag.percent;
            bag.w = bag.width === undefined ? 0 : bag.width
            bag.h = bag.height === undefined ? 0 : bag.width
            delete bag.width;
            delete bag.height;
            delete bag.calculated;
            return bag;
          })
          this.$cookies.set('BASKET', JSON.stringify(mappedBags), '15d');
        }
      });
    },
    goBasket() {
      this.basket = false
      this.$inertia.visit('/basket')
    }
  },
  async mounted() {
    this.watchBasket();
    await this.opening();
    window.addEventListener("beforeunload", this.closing);
  },
  computed: {
    authenticated() {
      return this.$store.state.authentication.authenticated
    },
    administrator() {
      return this.authenticated && this.$store.state.authentication.user.type > 0
    },
    dialog: {
      get() {
        return this.$store.state.authentication.dialog
      },
      set(val) {
        this.$store.commit('authentication/dialog', val)
      }
    },
    bags() {
      return this.$store.state.basket.bags
    },
    bagsCount() {
      return this.$store.getters['basket/bagsCount']
    },
    totalCalculated() {
      return this.$store.getters['basket/totalCalculated']
    },
    sendingPrice() {
      if (this.bags.length < 1)
        return 0
      else {
        if (this.totalCalculated < 5000000) return 100000;
        else return 0;
      }
    },
  },
  watch :{
    authenticated(val) {
      if (val) this.$cookies.remove('BASKET')
    }
  }
}
</script>
