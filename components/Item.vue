<template>
  <div v-if="url !== ''" :class="selected ? 'transition border-corner-lite m-1' : 'transition m-1'">
    <span><img :class="visible ? '' : 'opacity-50'" :src="'items/' + url" :alt="name"></span>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
  .transition {
    transition: 0.5s all;
  }
</style>
