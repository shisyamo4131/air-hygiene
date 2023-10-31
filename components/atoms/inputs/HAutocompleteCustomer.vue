<script>
/**
 * @author shisyamo4131
 */
import HAutocompleteApi from '~/components/atoms/inputs/HAutocompleteApi.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { HAutocompleteApi },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    label: { type: String, default: '取引先', required: false },
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        if (item.code.includes(queryText)) return true
        if (item.name1.includes(queryText)) return true
        if (item.abbr.includes(queryText)) return true
        if (item.abbrKana.includes(queryText)) return true
        return false
      },
    },
  },
}
</script>

<template>
  <h-autocomplete-api
    v-bind="{ ...$props, ...$attrs }"
    collection="Customers"
    item-text="abbr"
    v-on="$listeners"
  >
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>
            {{ `[${item.code}] ${item.abbr}` }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.address1 }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </h-autocomplete-api>
</template>

<style></style>
