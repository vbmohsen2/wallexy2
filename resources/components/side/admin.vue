<template>
  <container class="mt-4">
    <div class="bg-neutral-100 rounded-xl">
      <div>
        <xmenu v-model="menu" class="md:hidden" full>
          <template #active="{active}">
            <div class="w-full">
              <div class="rounded-t-xl flex px-4 py-4 w-full special-x cursor-pointer" @click="active">
                <icon :name="getIcon($page.component)" class="pl-2 -mt-0.5" size="18"/>
                <span v-text="getPage($page.component)"></span>
                <space/>
                <icon :class="{'rotate-180' : menu}" :name="icons.menu" class="-mt-1 transition" size="20"/>
              </div>
            </div>
          </template>
          <div class="bg-white rounded-b-xl shadow-xl -mt-2.5">
            <inertia-link href="/admin/slides">
              <div :class="{'special-x cursor-pointer': $page.component === 'admin/slides' }" class="flex px-4 py-2.5">
                <icon :name="icons.home" class="pl-2 -mt-0.5" size="18"/>
                <span>صفحه اصلی</span>
              </div>
            </inertia-link>
            <inertia-link href="/admin/orders">
              <div :class="{'special-x cursor-pointer': $page.component.startsWith('admin/orders') }" class="flex px-4 py-2.5">
                <icon :name="icons.basket" class="pl-2 -mt-0.5" size="18"/>
                <span>سفارشات</span>
              </div>
            </inertia-link>
            <inertia-link href="/admin/categories">
              <div :class="{'special-x cursor-pointer': $page.component === 'admin/categories' }" class="flex px-4 py-2.5">
                <icon :name="icons.shape" class="pl-2 -mt-0.5" size="18"/>
                <span>دسته بندی ها</span>
              </div>
            </inertia-link>
            <inertia-link href="/admin/products">
              <div :class="{'special-x cursor-pointer': $page.component === 'admin/products' }" class="flex px-4 py-2.5">
                <icon :name="icons.product" class="pl-2 -mt-0.5" size="18"/>
                <span>محصولات</span>
              </div>
            </inertia-link>
            <inertia-link href="/admin/comments">
              <div :class="{'special-x cursor-pointer': $page.component === 'admin/comments' }" class="flex px-4 py-2.5">
                <icon :name="icons.comment" class="pl-2 -mt-0.5" size="18"/>
                <span>نظرات</span>
              </div>
            </inertia-link>
            <inertia-link href="/admin/partners">
              <div :class="{'special-x cursor-pointer': $page.component === 'admin/partners' }" class="flex px-4 py-2.5">
                <icon :name="icons.partner" class="pl-2 -mt-0.5" size="18"/>
                <span>درخواست همکاری</span>
              </div>
            </inertia-link>
          </div>
        </xmenu>
      </div>
      <row>
        <w class="md:w-[140px] rounded-r-xl overflow-hidden border-l border-gray-200 hidden md:block">
          <inertia-link href="/admin/slides">
            <div :class="{'special-x cursor-pointer': $page.component === 'admin/slides' }" class="flex px-4 py-2.5">
              <icon :name="icons.home" class="pl-2 -mt-0.5" size="18"/>
              <span>صفحه اصلی</span>
            </div>
          </inertia-link>
          <inertia-link href="/admin/orders">
            <div :class="{'special-x cursor-pointer': $page.component.startsWith('admin/orders') }" class="flex px-4 py-2.5">
              <icon :name="icons.basket" class="pl-2 -mt-0.5" size="18"/>
              <span>سفارشات</span>
            </div>
          </inertia-link>
          <inertia-link href="/admin/categories">
            <div :class="{'special-x cursor-pointer': $page.component === 'admin/categories' }" class="flex px-4 py-2.5">
              <icon :name="icons.shape" class="pl-2 -mt-0.5" size="18"/>
              <span>دسته بندی ها</span>
            </div>
          </inertia-link>
          <inertia-link href="/admin/products">
            <div :class="{'special-x cursor-pointer': $page.component === 'admin/products' }" class="flex px-4 py-2.5">
              <icon :name="icons.product" class="pl-2 -mt-0.5" size="18"/>
              <span>محصولات</span>
            </div>
          </inertia-link>
          <inertia-link href="/admin/comments">
            <div :class="{'special-x cursor-pointer': $page.component === 'admin/comments' }" class="flex px-4 py-2.5">
              <icon :name="icons.comment" class="pl-2 -mt-0.5" size="18"/>
              <span>نظرات</span>
            </div>
          </inertia-link>
          <inertia-link href="/admin/partners">
            <div :class="{'special-x cursor-pointer': $page.component === 'admin/partners' }" class="flex px-4 py-2.5">
              <icon :name="icons.partner" class="pl-2 -mt-0.5" size="18"/>
              <span>درخواست همکاری</span>
            </div>
          </inertia-link>
        </w>
        <w class="md:w-[calc(100%-140px)] p-4">
          <slot/>
        </w>
      </row>
    </div>
  </container>
</template>

<script>
import {
  mdiHomeOutline,
  mdiShape,
  mdiCommentTextOutline,
  mdiCubeOutline,
  mdiShoppingOutline, mdiMenuDownOutline,
  mdiAccountGroupOutline
} from '@mdi/js';


export default {
  data() {
    return {
      icons: {
        home: mdiHomeOutline,
        product: mdiCubeOutline,
        shape: mdiShape,
        basket: mdiShoppingOutline,
        comment: mdiCommentTextOutline,
        partner: mdiAccountGroupOutline,
        menu: mdiMenuDownOutline,
      },
      menu: false,
    }
  },
  methods: {
    getPage(value) {
      if (value.includes('admin/slides')) return 'صفحه اصلی';
      if (value.includes('admin/orders')) return 'سفارشات';
      if (value.includes('admin/comments')) return 'نظرات';
      if (value.includes('admin/products')) return 'محصولات';
      if (value.includes('admin/categories')) return 'دسته بندی ها';
      if (value.includes('admin/partners')) return 'درخواست همکاری';
    },
    getIcon(value) {
      if (value.includes('admin/slides')) return this.icons.home;
      if (value.includes('admin/orders')) return this.icons.basket;
      if (value.includes('admin/products')) return this.icons.product;
      if (value.includes('admin/comments')) return this.icons.comment;
      if (value.includes('admin/categories')) return this.icons.shape;
      if (value.includes('admin/partners')) return this.icons.partner;
    }
  }
}
</script>
