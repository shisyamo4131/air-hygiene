<script>
/**
 * @author shisyamo4131
 */
import ASimpleTableUnit from '~/components/atoms/tables/ASimpleTableUnit.vue'
export default {
  components: { ASimpleTableUnit },
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
          <a-simple-table-unit v-bind="model" />
        </v-card>
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
