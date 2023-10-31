<script>
/**
 * @author shisyamo4131
 */
import HSimpleTableUnit from '~/components/atoms/tables/HSimpleTableUnit.vue'
export default {
  components: { HSimpleTableUnit },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    model: { type: Object, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      tabs: ['登録情報'],
    }
  },
}
</script>

<template>
  <air-template-tabs
    :label="model.abbr"
    :tabs="tabs"
    :tabs-props="{ grow: true }"
  >
    <template #prepend-label>
      <v-btn icon @click="$router.push(`/units`)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <template #append-label>
      <v-btn icon @click="$router.push(`/units/${model.docId}/edit`)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template #tab-0>
      <v-container>
        <v-card outlined>
          <h-simple-table-unit v-bind="model" />
        </v-card>
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
