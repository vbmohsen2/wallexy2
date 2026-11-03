<template>
  <div :class="width">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    all: String,
    sm: String,
    md: String,
    lg: String,
    xl: String,
  },
  computed: {
    width() {
      let width = "w-full"
      if (this.all !== undefined)
        width = "w-" + this.all
      if (this.sm !== undefined)
      width += "  sm:w-" + this.sm
      if (this.md !== undefined)
        width += " md:w-" + this.md
      if (this.lg !== undefined)
        width += " lg:w-" + this.lg
      if (this.xl !== undefined)
        width += " xl:w-" + this.xl
      return width
    }
  },
}
</script>
