<template>
  <div class="d-flex flex-column h-100 w-100 px-3 pb-3">
    <div class="px-auto my-2 ml-3 ror-title-text">
      <logo /> Shrine of Order
    </div>
    <template v-if="id !== -1">
      <div class="mx-auto mt-5 mb-1 border-corner p-1">
        <span>
          <img :src="'items/' + url" width="64px" height="64px">
        </span>
      </div>
      <div class="mx-auto mb-3">
        <text-highlight :queries="search">
          {{ name }}
        </text-highlight>
      </div>
      <div class="mb-2 text-center">
        <small>
          <text-highlight :queries="search" v-html="quote" />
        </small>
      </div>
      <div>
        <small>
          <text-highlight :queries="search" v-html="desc" />
        </small>
      </div>
      <div class="mt-auto height-35">
        <b-row class="border-secondary border-top">
          <b-col cols="6">
            <small class="font-weight-bold">Rarity:</small>
          </b-col>
          <b-col cols="6">
            <small :class="'text-' + rarity.toLowerCase()">
              <text-highlight :queries="search">{{ rarity }}</text-highlight>
            </small>
          </b-col>
          <template v-if="category.length !== 0">
            <b-col cols="6">
              <small class="font-weight-bold">Category:</small>
            </b-col>
            <b-col cols="6">
              <small class="line-height-1">
                <text-highlight :queries="search">{{ category.join(', ') }}</text-highlight>
              </small>
            </b-col>
          </template>
          <template v-if="cooldown !== ''">
            <b-col cols="6">
              <small class="font-weight-bold">Cooldown:</small>
            </b-col>
            <b-col cols="6">
              <small class="line-height-1">
                {{ cooldown }}
              </small>
            </b-col>
          </template>
          <template v-if="elite !== ''">
            <b-col cols="6">
              <small class="font-weight-bold">Elite:</small>
            </b-col>
            <b-col cols="6">
              <small class="line-height-1">
                <text-highlight :queries="search">{{ elite }}</text-highlight>
              </small>
            </b-col>
          </template>
          <template v-if="unlock !== ''">
            <b-col cols="6">
              <small class="font-weight-bold">Unlock:</small>
            </b-col>
            <b-col cols="6">
              <small class="line-height-1">
                <text-highlight :queries="search">{{ unlock }}</text-highlight>
              </small>
            </b-col>
          </template>
        </b-row>
        <div v-if="stats.length > 0" class="mb-5 mt-2">
          <b-row>
            <b-col cols="6">
              <small class="font-weight-bold">Item Effect</small>
            </b-col>
            <b-col cols="6">
              <small class="font-weight-bold">Stack Behaviour</small>
            </b-col>
          </b-row>
          <ItemLeftStat v-for="stat in stats" :key="stat.stat" v-bind="stat" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextHighlight from 'vue-text-highlight'
import ItemLeftStat from '~/components/ItemLeftStat.vue'
import Logo from '~/components/Logo.vue'

export default {
  components: { TextHighlight, ItemLeftStat, Logo },
  props: {
    name: {
      type: String,
      default: ''
    },
    // Utility|Healing|Damage|AIBlacklist|OnKillEffect||Hidden|Abandoned|SprintRelated|EquipmentRelated|WorldUnique|Cleansable
    category: {
      type: Array,
      default: () => []
    },
    desc: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: -1
    },
    quote: {
      type: String,
      default: ''
    },
    // Legendary|Common|Uncommon|Lunar|NoTier|Boss
    rarity: {
      type: String,
      default: ''
    },
    // {
    //   add: '+2.25%',
    //   stack: 'Exponential|Linear|Hyperbolic||None|Special',
    //   stat: 'Luck|Healing Converted|Cooldown|Damage|...',
    //   value: -1
    // }
    stats: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: ''
    },
    unlock: {
      type: String,
      default: ''
    },
    cooldown: {
      type: String,
      default: ''
    },
    elite: {
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
<style>
  .ror-title-text {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 1.2em;
    font-weight: bold;
  }
</style>
