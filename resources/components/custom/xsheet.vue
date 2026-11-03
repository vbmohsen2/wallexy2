<template>
  <div>
    <slot :active="active" name="active"></slot>
    <Teleport to="#teleport">
      <transition name="sheet">
        <div v-if="modelValue" class="fixed w-full max-h-[50vh] left-0 top-[92px] md:top-[108px] z-50">
          <container>
            <slot></slot>
          </container>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    active() {
      this.$emit('update:modelValue', !this.modelValue)
    }
  }
}
</script>
