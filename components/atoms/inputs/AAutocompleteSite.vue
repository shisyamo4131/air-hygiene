<script>
/**
 * @author shisyamo4131
 */
import AAutocompleteApi from '~/components/atoms/inputs/AAutocompleteApi.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AAutocompleteApi },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        if (item.code.includes(queryText)) return true
        if (item.name.includes(queryText)) return true
        if (item.abbr.includes(queryText)) return true
        if (item.abbrKana.includes(queryText)) return true
        return false
      },
    },
  },
}
</script>

<template>
  <a-autocomplete-api
    v-bind="$attrs"
    collection="Sites"
    :filter="filter"
    item-text="abbr"
    v-on="$listeners"
  >
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ item.abbr }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.address }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </a-autocomplete-api>
</template>

<style></style>
