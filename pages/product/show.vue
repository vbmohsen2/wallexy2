<template>
  <div>
    <information :category="category" :product="product" @update-product="updateProduct"/>
    <tabs :product="product"/>
  </div>
  <inertia-head>
    <title>{{'مشخصات و قیمت ' + product.name}}</title>
    <meta
      :content="'خرید اینترنتی ' + product.name + ' و قیمت انواع محصولات ' + product.category.name + ' در فروشگاه آنلاین والکسی. بهترین و با کیفیت ترین محصولات ' + product.category.name + ' در فروشگاه آنلاین والکسی'"
      name="description"/>
    <link :href="'https://wallexy.ir/product/' + product.id + '/' + product.name.replace(/\s/g , '-')" rel="canonical"/>
    <link v-for="photo in product.photos" :key="photo.id" :href="photo.large" as="image" fetchpriority="high" rel="preload">
    <meta content="wallexy" name="twitter:creator">
    <meta content="product" property="og:type">
    <meta content="200" property="og:image:width">
    <meta content="200" property="og:image:height">
    <meta property="og:site_name" content="Wallexy" />
    <meta :content="'مشخصات و قیمت ' + product.name" property="og:title">
    <meta :content="'https://wallexy.ir/product/' + product.id + '/' + product.name.replace(/\s/g , '-')" property="og:url">
    <meta :content="product.photos.length === 0 ? 'https://wallexy.ir/logo/logo.svg' : product.photos[0].normal" property="og:image">
    <meta
      :content="'خرید اینترنتی ' + product.name + ' و قیمت انواع محصولات ' + product.category.name + ' در فروشگاه آنلاین والکسی. بهترین و با کیفیت ترین محصولات ' + product.category.name + ' در فروشگاه آنلاین والکسی'"
      property="og:description">
    <meta name="twitter:card" content="summary_large_image">
    <meta :content="'مشخصات و قیمت ' + product.name" name="twitter:title">
    <meta :content="'https://wallexy.ir/product/' + product.id + '/' + product.name.replace(/\s/g , '-')" name="twitter:site">
    <meta :content="product.photos.length === 0 ? 'https://wallexy.ir/logo/logo.svg' : product.photos[0].normal" name="twitter:image">
    <meta
      :content="'خرید اینترنتی ' + product.name + ' و قیمت انواع محصولات ' + product.category.name + ' در فروشگاه آنلاین والکسی. بهترین و با کیفیت ترین محصولات ' + product.category.name + ' در فروشگاه آنلاین والکسی'"
      name="twitter:description">
    <meta content="new" property="product:condition">
    <meta content="in stock" property="product:availability">
    <meta :content="this.product.models[0].calculated" property="product:price:amount">
    <meta content="IRR" property="product:price:currency">
    <meta name="product_id" :content="product.id">
    <meta name="product_name" :content="product.name">
    <meta name="product_price" :content="product.models[0].calculated">
    <meta name="product_old_price" :content="product.models[0].price">
    <meta name="availability" content="instock">
    <component is="script" type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "{{ 'مشخصات و قیمت ' + product.name }}",
        "image": [
          "{{ product.photos.length === 0 ? 'https://wallexy.ir/logo/logo.svg' : product.photos[0].normal }}"
        ],
        "description": "{{ 'خرید اینترنتی ' + product.name + ' و قیمت انواع ' + product.category.name + ' ' + product.headers[0].values[0].value + ' از فروشگاه آنلاین والکسی. بهترین و با کیفیت ترین محصولات ' + product.category.name + ' ' + product.headers[0].values[0].value + ' در فروشگاه آنلاین والکسی' }}",
        "sku": 68,
        "brand": {
          "@type": "Thing",
          "name": "{{ product.headers[0].values[0].value }}"
        },
        "offers": {
          "@type": "Offer",
          "url": "{{ 'https://wallexy.ir/product/' + product.id + '/' + product.name.replace(/\s/, '-') }}",
          "priceCurrency": "IRR",
          "price": "{{ product.models[0].calculated }}",
          "availability": "{{ this.product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" }}",
          "priceValidUntil": "{{ new Date(new Date().setDate(new Date().getMonth() + 180)).toISOString().substr(0, 10) }}",
          "seller": {
            "@type": "Organization",
            "name": "wallexy"
          }
        }
      }
    </component>
  </inertia-head>
</template>
<script>

import Information from "@/components/product/information";
import Tabs from "@/components/product/tabs";

export default {
  components: {Information, Tabs},
  data() {
    return {
      category: this.$page.props.product.flag,
      product: JSON.parse(JSON.stringify(this.$page.props.product))
    }
  },
  methods: {
    async updateProduct() {
      this.product = await this.axios.get('/xproduct/' + this.product.name.replace(/\s/g, ' ')).then(res => res.data)
    }
  }
}
</script>

