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
          <div class="bg-white rounded-b-xl shadow-x -mt-2.5">
            <inertia-link href="/profile/user">
              <div :class="{'special-x cursor-pointer': $page.component === 'profile/user' }" class="flex px-4 py-2.5">
                <icon :name="icons.user" class="pl-2 -mt-0.5" size="18"/>
                <span>پروفایل</span>
              </div>
            </inertia-link>
            <inertia-link href="/profile/orders">
              <div :class="{'special-x cursor-pointer': $page.component.startsWith('profile/orders') }" class="flex px-4 py-2.5">
                <icon :name="icons.basket" class="pl-2 -mt-0.5" size="18"/>
                <span>سفارشات</span>
              </div>
            </inertia-link>
            <inertia-link href="/profile/information">
              <div :class="{'special-x cursor-pointer': $page.component === 'profile/information' }" class="flex px-4 py-2.5">
                <icon :name="icons.edit" class="pl-2 -mt-0.5" size="18"/>
                <span>مشخصات</span>
              </div>
            </inertia-link>
            <inertia-link href="/profile/favourites">
              <div :class="{'special-x cursor-pointer': $page.component === 'profile/favourites' }" class="flex px-4 py-2.5">
                <icon :name="icons.heart" class="pl-2 -mt-0.5" size="18"/>
                <span>محبوب ها</span>
              </div>
            </inertia-link>
            <inertia-link href="/profile/comments">
              <div :class="{'special-x cursor-pointer': $page.component === 'profile/comments' }" class="flex px-4 py-2.5">
                <icon :name="icons.comment" class="pl-2 -mt-0.5" size="18"/>
                <span>نظرات</span>
              </div>
            </inertia-link>
            <inertia-link href="/profile/notifications">
              <div :class="{'special-x cursor-pointer': $page.component === 'profile/notifications' }" class="flex px-4 py-2.5">
                <icon :name="icons.message" class="pl-2 -mt-0.5" size="18"/>
                <span>پیام ها</span>
              </div>
            </inertia-link>
          </div>
        </xmenu>
      </div>
      <row>
        <w class="md:w-[140px] rounded-r-xl overflow-hidden border-l border-gray-200 hidden md:block">
          <inertia-link href="/profile/user">
            <div :class="{'special-x cursor-pointer': $page.component === 'profile/user' }" class="flex px-4 py-2.5">
              <icon :name="icons.user" class="pl-2 -mt-0.5" size="18"/>
              <span>پروفایل</span>
            </div>
          </inertia-link>
          <inertia-link href="/profile/orders">
            <div :class="{'special-x cursor-pointer': $page.component.startsWith('profile/orders') }" class="flex px-4 py-2.5">
              <icon :name="icons.basket" class="pl-2 -mt-0.5" size="18"/>
              <span>سفارشات</span>
            </div>
          </inertia-link>
          <inertia-link href="/profile/information">
            <div :class="{'special-x cursor-pointer': $page.component === 'profile/information' }" class="flex px-4 py-2.5">
              <icon :name="icons.edit" class="pl-2 -mt-0.5" size="18"/>
              <span>مشخصات</span>
            </div>
          </inertia-link>
          <inertia-link href="/profile/favourites">
            <div :class="{'special-x cursor-pointer': $page.component === 'profile/favourites' }" class="flex px-4 py-2.5">
              <icon :name="icons.heart" class="pl-2 -mt-0.5" size="18"/>
              <span>محبوب ها</span>
            </div>
          </inertia-link>
          <inertia-link href="/profile/comments">
            <div :class="{'special-x cursor-pointer': $page.component === 'profile/comments' }" class="flex px-4 py-2.5">
              <icon :name="icons.comment" class="pl-2 -mt-0.5" size="18"/>
              <span>نظرات</span>
            </div>
          </inertia-link>
          <inertia-link href="/profile/notifications">
            <div :class="{'special-x cursor-pointer': $page.component === 'profile/notifications' }" class="flex px-4 py-2.5">
              <icon :name="icons.message" class="pl-2 -mt-0.5" size="18"/>
              <span>پیام ها</span>
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
  mdiHeartOutline,
  mdiMenuDownOutline,
  mdiAccountOutline,
  mdiShoppingOutline,
  mdiShape,
  mdiTooltipTextOutline,
  mdiEmailOutline,
  mdiAccountConvert,
} from '@mdi/js';


export default {
  data() {
    return {
      icons: {
        user: mdiAccountOutline,
        basket: mdiShoppingOutline,
        heart: mdiHeartOutline,
        shape: mdiShape,
        comment: mdiTooltipTextOutline,
        message: mdiEmailOutline,
        edit: mdiAccountConvert,
        menu: mdiMenuDownOutline,
      },
      menu: false,
    }
  },
  methods: {
    getPage(value) {
      if (value.includes('profile/user')) return 'پروفایل'
      if (value.includes('profile/orders')) return 'سفارشات';
      if (value.includes('profile/information')) return 'مشخصات';
      if (value.includes('profile/favourites')) return 'محبوب ها';
      if (value.includes('profile/comments')) return 'نظرات';
      if (value.includes('profile/notifications')) return 'پیام ها';
    },
    getIcon(value) {
      if (value.includes('profile/user')) return this.icons.user;
      if (value.includes('profile/orders')) return this.icons.basket;
      if (value.includes('profile/favourites')) return this.icons.heart;
      if (value.includes('profile/information')) return this.icons.edit;
      if (value.includes('profile/comments')) return this.icons.comment;
      if (value.includes('profile/notifications')) return this.icons.message;
    }
  }
}
</script>
