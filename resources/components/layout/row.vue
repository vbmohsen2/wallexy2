<template>
  <div :class="{'flex-wrap' : !nowrap}" class="flex">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    nowrap: {
      type : Boolean,
      default: false
    }
  }
}
</script>
