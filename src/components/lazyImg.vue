<template>
  <observer v-if="origin">
    <img
        ref="img"
        src="@/assets/testImg.jpg"
        :alt="alt"
        :title="title"
        :class="classList">
  </observer>
</template>
<script>
import Observer from 'vue-intersection-observer'

export default {
  name: 'LazyImg',
  components: { Observer },
  props: {
    alt: {
      type: String,
      default: 'img'
    },
    title: {
      type: String,
      default: ''
    },
    origin: {
      type: String,
      required: true
    },
    small: {
      type: String,
      required: true
    },
    classList: {
      type: [String, Object],
      default: ''
    }
  },
  methods: {
    onChange(entry, unobserve) {
      if (entry.isIntersecting) {
        unobserve()
      }

      this.$refs.img.src = this.origin
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
