<template>
  <div class="relative">
    <slot :active="active" name="active"></slot>
    <transition name="overlay">
      <div v-if="modelValue" class="overlay fixed w-full h-full left-0 top-0 z-40"></div>
    </transition>
    <Teleport to="#teleport">
      <transition name="dialog">
        <div v-if="modelValue" class="fixed top-0 left-0 h-full w-full z-50 backdrop-blur-sm">
          <div v-click-outside="animate" :class="{'animate-scale' : scaled , 'h-full' : fullscreen}" class="center">
            <slot></slot>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script>
export default {
  props: {
    modelValue : Boolean,
    fullscreen : {
      type : Boolean,
      default : false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      scaled: false
    }
  },
  methods: {
    active() {
      this.$emit('update:modelValue', !this.modelValue)
    },
    animate() {
      this.scaled = true
      setTimeout(() => this.scaled = false, 150)
    },
    toggleOverflow(value) {
      document.body.classList.toggle('overflow-hidden', value)
      const blur = document.getElementById('blur')
      if (blur) blur.classList.toggle('overflow-hidden', value)
    }
  },
  watch: {
    modelValue(value) {
      this.toggleOverflow(value)
    }
  },
  unmounted() {
    this.toggleOverflow(false)
  }
}
</script>
