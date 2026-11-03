<template>
  <div class="flex relative">
    <slot :active="active" name="active"></slot>
    <transition name="menu">
      <div v-if="modelValue" v-click-outside="outside" :class="[right ? 'right-0' : 'left-0' , {'w-full' : full}]" class="absolute z-20 top-[calc(100%+4px)]" @click="close">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    keep: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      allow: true
    }
  },
  methods: {
    close() {
      if (!this.keep) {
        this.$emit('update:modelValue', false)
      }
    },
    active() {
      if (this.allow) this.$emit('update:modelValue', !this.modelValue)
    },
    outside() {
      this.$emit('update:modelValue', false)
      this.allow = false
      setTimeout(() => this.allow = true , 100)
    }
  }
}
</script>
