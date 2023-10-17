<script>
import HInputItemUnitPrice from '../inputs/HInputItemUnitPrice.vue'
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
export default {
  components: { ADataTable, HInputItemUnitPrice },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    itemsPerPage: { type: Number, default: -1, required: false },
    hideDefaultFooter: { type: Boolean, default: true, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editor: false,
      editItem: { itemId: '', unitId: '', price: null },
      headers: [
        { text: '回収品目', value: 'itemId' },
        { text: '金額', value: 'price', align: 'right' },
      ],
    }
  },
}
</script>

<template>
  <a-data-table
    v-bind="{ ...$props, ...$attrs }"
    :headers="headers"
    v-on="$listeners"
  >
    <template #top>
      <v-toolbar dense flat>
        <v-toolbar-title>請求単価</v-toolbar-title>
        <v-spacer />
        <v-dialog v-model="editor" max-width="480" persistent>
          <template #activator="{ attrs, on }">
            <v-icon v-bind="attrs" v-on="on">mdi-plus</v-icon>
          </template>
          <air-card-form-input @click:cancel="editor = false">
            <v-card-text>
              <h-input-item-unit-price v-bind.sync="editItem" />
            </v-card-text>
          </air-card-form-input>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #[`item.itemId`]="{ item }">
      {{ $store.getters['masters/Item'](item.itemId).abbr }}
    </template>
    <template #[`item.price`]="{ item }">
      {{
        `${item.price.toFixed(2)}円/${
          $store.getters['masters/Unit'](item.unitId).name
        }`
      }}
    </template>
  </a-data-table>
</template>

<style></style>
