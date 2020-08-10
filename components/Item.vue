<template>
  <div v-if="url !== ''" :class="selected ? 'border-corner-lite m-1' : 'm-1'">
    <span><img :class="visible ? '' : 'opacity-50'" :src="'items/' + url"></span>
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
    }
  }
}
</script>
