<template>
  <h-data-table-item-unit-prices
    :items="value"
    hide-default-footer
    :items-per-page="-1"
  >
    <template #top>
      <v-toolbar dense flat>
        <v-toolbar-title>品目別請求単価</v-toolbar-title>
        <v-divider inset vertical class="mx-4" />
        <v-spacer />
        <v-dialog v-model="editor" persistent max-width="360">
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" icon v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <air-card-form-input>
            <v-card-text>
              <h-input-item-unit-price />
            </v-card-text>
          </air-card-form-input>
        </v-dialog>
      </v-toolbar>
    </template>
  </h-data-table-item-unit-prices>
</template>

<script>
import HInputItemUnitPrice from '../molecules/inputs/HInputItemUnitPrice.vue'
import HDataTableItemUnitPrices from '../molecules/tables/HDataTableItemUnitPrices.vue'
export default {
  components: { HDataTableItemUnitPrices, HInputItemUnitPrice },
  props: {
    value: { type: Array, default: () => [], required: false },
  },
  data() {
    return {
      editor: false,
    }
  },
}
</script>

<style></style>
