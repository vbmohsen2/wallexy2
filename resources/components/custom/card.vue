<template>
  <div class="bg-neutral-200 overflow-hidden rounded-xl">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Boolean,
      default: false
    },
  }
}
</script>

