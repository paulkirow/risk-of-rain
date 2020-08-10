<template>
  <b-row>
    <b-col cols="6" class="line-height-1 mb-1">
      <small>
        <var>{{ value }}</var>
        <text-highlight :queries="search">{{ stat }}</text-highlight>
      </small>
    </b-col>
    <b-col cols="6" class="line-height-1 mb-1">
      <small>
        <text-highlight :queries="search">{{ stack }}</text-highlight>
        <var>{{ add }}</var>
      </small>
    </b-col>
  </b-row>
</template>

<script>
import TextHighlight from 'vue-text-highlight'
import { mapState } from 'vuex'

export default {
  components: { TextHighlight },
  props: {
    //   add: '+2.25%',
    add: {
      type: String,
      default: ''
    },
    //   stack: 'Exponential|Linear|Hyperbolic||None|Special',
    stack: {
      type: String,
      default: ''
    },
    //   stat: 'Luck|Healing Converted|Cooldown|Damage|...',
    stat: {
      type: String,
      default: ''
    },
    //   value: -1
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      search: state => state.search
    })
  }
}
</script>
