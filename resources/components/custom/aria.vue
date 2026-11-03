<template>
  <button  :aria-label="label" v-click-outside="outside" :aria-expanded="flag ? 'true' : 'false'" :class="label ? 'p-1.5' : 'px-2.5 py-1.5'" aria-haspopup="true"
          class="transform rounded-full active:scale-95"
          role="button"
          type="button"
          @click="flag = !flag">
    <span class="block">
      <slot/>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: undefined
    },
  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    outside() {
      this.flag = false
    }
  }
}
</script>
