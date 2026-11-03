<template>
   <span :class="inline ? 'inline-flex' : 'flex'" class=" justify-center items-center">
    <svg :aria-hidden="label ? undefined : 'true'" :aria-label="label" :height="size+'px'" :width="size+'px'" fill="currentColor" focusable="false"
         role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path :d="name"></path>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "24"
    },
    name: {
      type: String,
    },
    label: {
      type: String,
      default: undefined
    },
    inline: {
      type: Boolean,
      default: false
    },
  },
  
}
</script>
