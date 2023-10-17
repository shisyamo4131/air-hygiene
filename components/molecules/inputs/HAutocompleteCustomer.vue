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
        if (item.abbr.includes(queryText)) return true
        if (item.abbrKana.includes(queryText)) return true
        return false
      },
    },
  },
  data() {
    return {
      items: this.$store.state.masters.Customers,
    }
  },
}
</script>

<template>
  <a-autocomplete
    v-bind="$attrs"
    :items="items"
    item-text="abbr"
    item-value="docId"
    :filter="filter"
    v-on="$listeners"
  >
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ item.abbr }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.address1 }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </a-autocomplete>
</template>

<style></style>
