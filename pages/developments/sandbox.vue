<template>
  <air-template-default>
    <v-container>
      <h-crud-item-unit-prices v-model="value" />
      <!-- <h-data-table-item-unit-prices :items="value" show-actions /> -->
      <!-- <a-data-table show-actions :items="[{ value: 'aaa' }]" @click:edit="test">
        <template #edit-icon="{ attrs, on }">
          <v-icon v-bind="attrs" v-on="on">mdi-magnify</v-icon>
        </template>
      </a-data-table> -->
      <v-btn @click="test">aaa</v-btn>
    </v-container>
  </air-template-default>
</template>

<script>
// import ADataTable from '~/components/atoms/tables/ADataTable.vue'
// import HDataTableItemUnitPrices from '~/components/molecules/tables/HDataTableItemUnitPrices.vue'
import HCrudItemUnitPrices from '~/components/organisms/HCrudItemUnitPrices.vue'
export default {
  components: {
    // ADataTable,
    // HDataTableItemUnitPrices,
    HCrudItemUnitPrices,
  },
  data() {
    return {
      value: [
        {
          itemId: '0SecpCDjrQV1BnKy6IHN',
          unitId: '3b7uMtsBAgCWQRjFuipb',
          price: 0,
        },
      ],
    }
  },
  methods: {
    test() {
      console.log('emitted')
    },
  },
}
</script>

<style></style>
