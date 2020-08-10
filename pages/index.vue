<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div class="d-flex align-items-center">
            <b-form-checkbox
              v-model="hide_common"
              name="check-button"
              button
              button-variant="outline-common badge my-auto"
              size="sm"
              class="mr-1 d-flex"
            >
              Common
            </b-form-checkbox>
            <b-form-checkbox
              v-model="hide_uncommon"
              name="check-button"
              button
              button-variant="outline-uncommon badge my-auto"
              size="sm"
              class="mr-1 d-flex"
            >
              Uncommon
            </b-form-checkbox>
            <b-form-checkbox
              v-model="hide_rare"
              name="check-button"
              button
              button-variant="outline-rare badge my-auto"
              size="sm"
              class="mr-1 d-flex"
            >
              Legendary
            </b-form-checkbox>
            <b-form-checkbox
              v-model="hide_boss"
              name="check-button"
              button
              button-variant="outline-boss badge my-auto"
              size="sm"
              class="mr-1 d-flex"
            >
              Boss
            </b-form-checkbox>
            <b-form-checkbox
              v-model="hide_lunar"
              name="check-button"
              button
              button-variant="outline-lunar badge my-auto"
              size="sm"
              class="mr-1 d-flex"
            >
              Lunar
            </b-form-checkbox>
            <b-form-checkbox
              v-model="hide_equipment"
              name="check-button"
              button
              button-variant="outline-equipment badge my-auto"
              size="sm"
              class="mr-3 d-flex"
            >
              Equipment
            </b-form-checkbox>
          </div>
          <b-nav-form>
            <b-form-input :value="search" size="sm" class="mr-sm-2" placeholder="Search" @input="setSearch" />
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid>
      <b-row class="mb-5">
        <div class="nav ror-sidebar col-3 bg-dark">
          <item-left v-bind="selectedItem" :name="selectedName" />
        </div>
        <b-col cols="9" offset="3" class="mt-3">
          <template
            v-for="[rarity, rarity_visible] in Object.entries(rarity_group_order)"
            class="border-bottom border-secondary my-2"
          >
            <div v-if="rarity_visible && rarity !== 'NoTier' && rarity in items_by_rarity" :key="rarity" class="border-bottom border-secondary py-4">
              <Item
                v-for="[name, data] in Object.entries(items_by_rarity[rarity])"
                :key="data.id"
                v-bind="data"
                :visible="name in filtered_items || name in filtered_equipment"
                :selected="isItemClicked && selectedName === name"
                class="d-inline-block"
                @click.native="selectedItemClick(name, data)"
                @mouseover.native="selectedItemMouseOver(name, data)"
              />
            </div>
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import ItemJson from '~/assets/items_wiki.json'
import EquipmentJson from '~/assets/equipment_wiki.json'
import Item from '~/components/Item.vue'
import ItemLeft from '~/components/ItemLeft.vue'

export default {
  components: {
    Item,
    ItemLeft
  },
  data () {
    return {
      items_data: ItemJson,
      equipment_data: EquipmentJson,
      isItemClicked: false,
      selectedName: '',
      selectedItem: {},
      hide_common: true,
      hide_uncommon: true,
      hide_rare: true,
      hide_boss: true,
      hide_lunar: true,
      hide_equipment: true
    }
  },
  computed: {
    ...mapState({
      search: state => state.search
    }),
    rarity_group_order () {
      return {
        Common: this.hide_common,
        Uncommon: this.hide_uncommon,
        Legendary: this.hide_rare,
        Boss: this.hide_boss,
        Lunar: this.hide_lunar,
        Equipment: this.hide_equipment,
        'Elite Equipment': this.hide_equipment || this.hide_boss,
        'Lunar Equipment': this.hide_equipment || this.hide_lunar
      }
    },
    filtered_items () {
      if (!this.items_data) {
        return {}
      }
      let returnList = this.items_data
      returnList = this.filterSearch(returnList, this.search)
      return returnList
    },
    filtered_equipment () {
      if (!this.equipment_data) {
        return {}
      }
      let returnList = this.equipment_data
      returnList = this.filterSearch(returnList, this.search)
      return returnList
    },
    items_by_rarity () {
      const returnList = {}
      for (const [key, obj] of Object.entries({ ...this.items_data, ...this.equipment_data })) {
        if (!(obj.rarity in returnList)) {
          returnList[obj.rarity] = {}
        }
        returnList[obj.rarity][key] = obj
      }
      return returnList
    }
  },
  methods: {
    setSearch (e) {
      this.$store.commit('setSearch', e)
    },
    toggleRarity (rarity) {
      this.rarity_group_order[rarity] = !this.rarity_group_order[rarity]
    },
    selectedItemMouseOver (name, data) {
      if (!this.isItemClicked) {
        this.selectedItem = data
        this.selectedName = name
      }
    },
    selectedItemClick (name, data) {
      this.selectedName = name
      if (this.selectedName === name) {
        // If this item is already clicked reset the variable
        this.isItemClicked = false
      }
      this.isItemClicked = !this.isItemClicked
      this.selectedItem = data
      this.selectedName = name
    },
    filterSearch (items, search) {
      if (search < 2) {
        return items
      }
      const returnList = {}
      for (const [key, obj] of Object.entries(items)) {
        const fieldsToMatch = ['desc', 'quote', 'unlock', 'elite']
        const titleIsMatch = this.stringIsMatch(key, search)
        const categoryIsMatch = 'category' in obj ? this.stringIsMatch(obj.category.join(', '), search) : false
        const statIsMatch = 'stats' in obj ? obj.stats.some(stat => this.stringIsMatch(stat.stack + stat.stack, search)) : false
        const fieldIsMatch = fieldsToMatch.some(field => this.stringIsMatch(obj[field], search))
        if (titleIsMatch || categoryIsMatch || fieldIsMatch || statIsMatch) {
          returnList[key] = obj
        }
      }
      return returnList
    },
    stringIsMatch (string, target) {
      if (!string) {
        return false
      }
      const normString = string.normalize('NFD')
        .replace(/[\u0300-\u036F\-']/g, '')
        .toLowerCase()
      const normTarget = target.normalize('NFD')
        .replace(/[\u0300-\u036F\-']/g, '')
        .toLowerCase()
      return normString.match(normTarget)
    }
  }
}
</script>
