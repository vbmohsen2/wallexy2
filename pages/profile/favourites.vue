<template>
  <sidebar class="mt-4">
    <div v-if="paginate.length < 1" class="pa-3">
      <div class="mb-0 py-6 body-2 text-center flex justify-center">
        <icon :name="icons.alert" class="mx-1" size="18"/>
        <span>  محصولی برای نمایش وجود ندارد.</span>
      </div>
    </div>
    <div v-else>
      <row v-for="favourite in paginate" id="favourites" :key="favourite.id" class="mb-4 relative rounded-xl overflow-hidden">
        <div class="absolute left-0 top-1 p-1 flex-col flex">
          <btn icon="پاک کردن محصول" @click="select(favourite)">
            <icon :name="icons.delete" size="18"/>
          </btn>
        </div>
        <w class="justify-center flex" lg="1/5" md="1/4" xl="1/6">
          <div class="w-full">
            <inertia-link :href="'/product/' + favourite.product.id + '/' + favourite.product.name.replace(/\s/g , '-')" :title="favourite.product.name">
              <img :alt="favourite.product.name" :src="favourite.product.photo.normal" class="w-full">
            </inertia-link>
          </div>
        </w>
        <w class="pr-3 md:pt-0 bg-neutral-200 shadow-lg" lg="4/5" md="3/4" xl="5/6">
          <inertia-link :href="'/product/' + favourite.product.id + '/' + favourite.product.name.replace(/\s/g , '-')" :title="favourite.product.name">
            <div class="w-full h-full">
              <row>
                <w class="pt-3">
                  <div class="flex">
                    <icon :name="icons.product" class="pl-2" size="16"/>
                    <h3 v-text="favourite.product.name"></h3>
                  </div>
                </w>
              </row>
            </div>
          </inertia-link>
        </w>
      </row>
      <row v-if="favouritesLength > 8" class="bg-neutral-200 shadow-lg py-2 justify-center">
        <btn icon="صفحه قبل" @click.native="page > 1 ? updatePage(--page) : updatePage(1)">
          <icon :name="icons.right" size="20"/>
        </btn>
        <span class="text-md pt-1.5 px-3" v-text="getNumber(page)"/>
        <btn icon="صفحه بعد" @click.native="page < favouritesLength ? updatePage(++page) : updatePage(favouritesLength)">
          <icon :name="icons.left" size="20"/>
        </btn>
      </row>
    </div>
    <xdialog v-model="deleteDialog">
      <div class="w-64 p-3 bg-white">
        <row class="p-3 text-md"> آیا از حذف این محصول از لیست مطمئن هستید ؟</row>
        <row>
          <div class="relative text-sm">
            <btn @click.native="deleteDialog = false">
              کنسل
            </btn>
            <btn @click="deleteFavourite()">
              تایید
            </btn>
          </div>
          <space/>
        </row>
      </div>
    </xdialog>
  </sidebar>
  <inertia-head>
    <title>محبوب ها</title>
  </inertia-head>
</template>
<script>
import {mdiHeartMinus, mdiArrowLeft, mdiArrowRight, mdiAlertCircleOutline, mdiCheckboxMultipleBlankOutline} from '@mdi/js';

import Sidebar from "@/components/side/profile";

export default {
  components: {Sidebar},
  data() {
    return {
      page: 1,
      favourite: null,
      deleteDialog: false,
      favourites: this.$page.props.favourites,
      icons: {
        product: mdiCheckboxMultipleBlankOutline,
        delete: mdiHeartMinus,
        left: mdiArrowLeft,
        right: mdiArrowRight,
        alert: mdiAlertCircleOutline,
      }
    }
  },
  computed: {
    paginate() {
      return this.favourites.slice((this.page - 1) * 8, this.page * 8)
    },
    favouritesLength() {
      return Math.ceil(this.favourites.length / 8)
    }
  },
  methods: {
    select(favourite) {
      this.favourite = favourite
      this.deleteDialog = true
    },
    deleteFavourite() {
      this.axios.post('/xproduct/' + this.favourite.product.id + '/favourite')
        .then(() => this.$inertia.visit('/profile/favourites'))
        .catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}))
    },
    updatePage(page) {
      setTimeout(function () {
        window.scrollTo({top: document.getElementById('favourites').offsetTop - 50, behavior: 'smooth'})
      }.bind(this), 1)
      this.page = page;
    },
  }
}
</script>
