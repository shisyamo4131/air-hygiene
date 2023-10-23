<script>
/**
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {},
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    items: { type: Array, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '回収品目名', value: 'name' },
        { text: '略称', value: 'abbr' },
        { text: '廃棄物区分', value: 'wasteDiv' },
        { text: 'actions', value: 'actions', align: 'center', sortable: false },
      ],
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    filteredItems() {
      const result = this.items.map((item) => item)
      return result
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onClickDetail(item) {
      this.$router.push(`/collect-items/${item.docId}/edit`)
    },
  },
}
</script>

<template>
  <air-template-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="filteredItems"
    label="回収品目一覧"
    :data-table-props="{ sortBy: 'code' }"
  >
    <template #append-label>
      <v-btn icon @click="$router.push(`/collect-items/regist`)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template #[`item.wasteDiv`]="{ item }">
      {{ $WASTE_DIV[item.wasteDiv] }}
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon @click="onClickDetail(item)">mdi-chevron-right</v-icon>
    </template>
  </air-template-data-table>
</template>

<style></style>
