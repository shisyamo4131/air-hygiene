<script>
/**
 * @create 2023-10-06
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
        { text: '単位', value: 'name' },
        { text: '略称', value: 'abbr' },
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
      this.$router.push(`/units/${item.docId}/edit`)
    },
  },
}
</script>

<template>
  <air-template-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="filteredItems"
    label="単位一覧"
    :data-table-props="{ sortBy: 'code' }"
  >
    <template #append-label>
      <v-btn icon @click="$router.push(`/units/regist`)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon @click="onClickDetail(item)">mdi-chevron-right</v-icon>
    </template>
  </air-template-data-table>
</template>

<style></style>
