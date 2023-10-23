<script>
/**
 * @author shisyamo4131
 */
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AAutocomplete },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        if (item.code.includes(queryText)) return true
        if (item.name.includes(queryText)) return true
        if (item.nameKana.includes(queryText)) return true
        if (item.abbr.includes(queryText)) return true
        return false
      },
    },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {}
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    items() {
      return this.$store.state.masters.CollectItems.map((item) => item).sort(
        (a, b) => {
          if (a.code < b.code) return -1
          if (a.code > b.code) return 1
          return 0
        }
      )
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    itemText(item) {
      return `${item.code}: ${item.abbr}`
    },
  },
}
</script>

<template>
  <a-autocomplete
    v-bind="$attrs"
    :items="items"
    :item-text="itemText"
    item-value="docId"
    :filter="filter"
    v-on="$listeners"
  >
  </a-autocomplete>
</template>

<style></style>
