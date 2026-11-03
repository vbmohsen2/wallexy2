<template>
  <container class="mt-3 ">
    <article>
      <card class="overflow-hidden">
        <row class="relative" justify="center" style="position: relative">
          <client class="w-full">
            <img :alt="post.title" :src="'https://static.wallexy.ir' + post.photo" class="shadow-x w-full rounded-xl" height="540" width="960"/>
          </client>
          <h1 class="py-3 px-6 text-white absolute w-full bottom-0 blog-title" v-text="post.title"></h1>
        </row>
        <div class="p-5 text-justify lg:mx-4 post-class" v-html="post.content"></div>
        <row class="mx-3 pb-3 lg:mx-6">
          <space/>
          <row v-if="administrator" class="flex pl-4">
            <button class="pl-3 transform transition active:scale-95 focus:outline-none" @click="alert" @click.ctrl.exact="deletePost(post.id)">
              <icon :name="icons.delete" size="20"></icon>
            </button>
            <inertia-link :href="'/blog/' + post.id + '/edit'" class="pl-2 pt-0.5">
              <icon :name="icons.edit" size="20"></icon>
            </inertia-link>
          </row>
          <row>
            <span class="pl-1 mt-1" v-text="getNumber(post.views)"></span>
            <icon :name="icons.eye" size="20"></icon>
          </row>
          <row class="pr-2">
            <span class="pl-1 mt-1" v-text="new Date(post.created_at).toLocaleDateString('fa') "></span>
            <icon :name="icons.date" size="20"></icon>
          </row>
        </row>
      </card>
    </article>
  </container>
  <inertia-head>
    <title>{{post.title}}</title>
    <link :href="'https://wallexy.ir/blog/post/' + post.id + '/' + post.title.replace(/\s/g , '-')" rel="canonical"/>
    <link :href="'https://static.wallexy.ir/' + post.photo" as="image" fetchpriority="high" rel="preload">
    <meta :content="post.short" name="description"/>
    <meta content="aricle" property="og:type"/>
    <meta content="والکسی" property="og:site_name"/>
    <meta content="https://www.instagram.com/wallexy_info" property="article:author"/>
    <meta content="https://www.instagram.com/wallexy_info" property="article:publisher"/>
    <meta content="960" property="og:image:width"/>
    <meta content="540" property="og:image:height"/>
    <meta :content="post.title" property="og:title"/>
    <meta :content="'https://wallexy.ir/blog/post/' + post.id + '/' + post.title.replace(/\s/g , '-')" property="og:url"/>
    <meta :content="post.photo" property="og:image"/>
    <meta :content="post.short" property="og:description"/>
    <meta content="آساشو" name="twitter:creator"/>
    <meta content="summary" name="twitter:card"/>
    <meta :content="post.title" name="twitter:title"/>
    <meta content="آساشو" name="twitter:site"/>
    <meta :content="post.photo" name="twitter:image"/>
    <meta :content="post.short" name="twitter:description"/>
    <component is="script" type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "Article",
      "headline": "{{ post.title }}",
      "image": "{{ post.photo }}",
      "description": "{{ post.short }}",
      "author": "Mahdi Vatankhak",
      "editor": "Reza Javani",
      "genre": "Business",
      "keywords": "",
      "wordcount":{{ post.content.split(' ').length }},
      "publisher": {
      "@type": "Brand",
      "name": "wallexy",
      "logo": {
      "@type": "ImageObject",
      "url": "https://wallexy.ir/logo/logo.svg"
      }
      },
      "datePublished": "{{ new Date(JSON.parse(JSON.stringify(post)).created_at).toISOString().substring(0, 10) }}",
      "dateCreated": "{{ new Date(JSON.parse(JSON.stringify(post)).created_at).toISOString().substring(0, 10) }}",
      "dateModified": "{{ new Date(JSON.parse(JSON.stringify(post)).updated_at).toISOString().substring(0, 10) }}"
      }
    </component>
  </inertia-head>
</template>

<script>
import {mdiCalendar, mdiDelete, mdiEye, mdiPen} from "@mdi/js";

export default {
  props: {
    post: Object
  },
  data() {
    return {
      icons: {
        eye: mdiEye,
        date: mdiCalendar,
        edit: mdiPen,
        delete: mdiDelete,
      },
      administrator: this.$page.props.authenticated && this.$page.props.user.type > 0
    }
  },
  methods: {
    alert() {
      this.$store.dispatch('alerts/update', {message: 'لطفا دکمه کنترل را نگه دارید.', type: 'error'})
    },
    deletePost(id) {
      this.axios.delete('/blog/' + id).then(() => this.$inertia.visit('/blog'))
    }
  }
}
</script>
