<template>
  <button :aria-label="label" class="transform transition active:scale-95" type="button">
    <span :class="label ? 'p-1.5 rounded-full' : 'px-3 py-1.5'" class="flex justify-center">
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
  }
}
</script>

