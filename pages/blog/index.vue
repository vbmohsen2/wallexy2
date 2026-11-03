<template>
  <container class="mt-4">
    <row>
      <w lg="3/4" md="2/3" sm="7/12">
        <row class="-mx-2">
          <inertia-link preserve-scroll v-for="post in posts" :key="post.id" :href="'/blog/post/' + post.id + '/' + post.title.replace(/\s/g , '-')" :title="post.title"
                        class="px-2 block mb-4 lg:w-1/2 min-h-full">
            <card class="h-full">
              <article class="bg-solona shadow-lg relative pb-10 h-full">
                <row class="relative">
                  <client>
                    <img :alt="post.title" :src="'https://static.wallexy.ir' + post.photo" height="540" width="960"/>
                  </client>
                  <h1 class="py-3 px-3 absolute w-full text-white bottom-0 blog-title" v-text="post.title"></h1>
                </row>
                <div class="p-3 text-justify" v-html="post.short"></div>
                <row class="px-3 pb-3 absolute bottom-0 w-full">
                  <space/>
                  <span class="px-1 mt-1" v-text="getNumber(post.views)"></span>
                  <icon :name="icons.eye" size="20"/>
                  <span class="px-1 mt-1 mr-3" v-text="new Date(post.created_at).toLocaleDateString('fa') "></span>
                  <icon :name="icons.date" size="20"/>
                </row>
              </article>
            </card>
          </inertia-link>
        </row>
        <card class="my-4">
          <row class="p-1 text-md justify-center">
            <btn :class="{'pointer-events-none text-slate-300' : page === 1}" @click="navigate(page - 1)">
              <icon :name="icons.right" size="20"/>
            </btn>
            <inertia-link preserve-scroll v-for="index in pages" :href="'?page=' + index" :class="{'pointer-events-none text-slate-300' : page === index}">
              <span class="px-2 pt-1.5 block cursor-pointer" v-text="getNumber(index)"/>
            </inertia-link>
            <btn :class="{'pointer-events-none text-slate-300' : page === pages.length}" @click="navigate(page + 1)">
              <icon :name="icons.left" size="20"/>
            </btn>
          </row>
        </card>
      </w>
      <w class="sm:pr-4 py-0" lg="1/4" md="1/3" sm="5/12">
        <card class="p-2">
          <row class="mb-2 text-md py-1">
            <icon :name="icons.trend" class="ml-2" inline></icon>
            <span class="py-1 block">برترین پست ها</span>
          </row>
          <inertia-link preserve-scroll v-for="(post, index) in hot" :key="post + index" :href="'/blog/post/' + post.id + '/' + post.title.replace(/\s/g , '-')"
                        class="px-1.5 flex py-1">
            <icon :name="icons.post" class="ml-2" size="20"></icon>
            <span v-text="post.title"></span>
          </inertia-link>
        </card>
        <card class="mt-4 p-2">
          <row class="mb-2 text-md py-1">
            <icon :name="icons.time" class="ml-2" inline size="20"></icon>
            <span class="py-1 block">آخرین پست ها</span>
          </row>
          <inertia-link preserve-scroll v-for="(post, index) in latest" :key="post + index" :href="'/blog/post/' + post.id + '/' + post.title.replace(/\s/g , '-')"
                        class="px-1.5 flex py-1">
            <icon :name="icons.post" class="ml-2" size="20"></icon>
            <span v-text="post.title"></span>
          </inertia-link>
        </card>
        <card v-if="administrator" class="mt-4">
          <inertia-link href="/blog/create">
            <btn class="my-1">
              <icon :name="icons.plus" class="ml-1"></icon>
              <span class="pt-0.5"> ایجاد پست</span>
            </btn>
          </inertia-link>
        </card>
      </w>
    </row>
  </container>
  <inertia-head>
    <title>مجله اینترنتی والکسی</title>
    <meta content="آخرین مقالات و اطاعات درباره کاغذ دیواری و دکوراتیو منزل در مجله اینترنتی والکسی" name="description"/>
    <link href="https://wallexy.ir/blog" rel="canonical"/>
    <link v-for="post in posts" :key="post.id" :href="post.photo" as="image" fetchpriority="high" rel="preload">
  </inertia-head>
</template>
<script>
import {mdiArrowLeft, mdiArrowRight, mdiCalendar, mdiClock, mdiEye, mdiFire, mdiPlus, mdiTextBoxOutline} from "@mdi/js";

export default {
  data() {
    return {
      posts: JSON.parse(JSON.stringify(this.$page.props.posts)),
      latest: this.$page.props.latest,
      hot: this.$page.props.hot,
      page: this.$page.props.page,
      pages: this.$page.props.pages,
      administrator: this.$page.props.authenticated && this.$page.props.user.type > 0,
      icons: {
        plus: mdiPlus,
        time: mdiClock,
        trend: mdiFire,
        eye: mdiEye,
        date: mdiCalendar,
        post: mdiTextBoxOutline,
        left: mdiArrowLeft,
        right: mdiArrowRight,
      }
    }
  },
  methods: {
    navigate(page) {
      this.$inertia.visit('?page=' + page, {preserveScroll: true})
    },
  }
}
</script>
