<script>
import HSimpleTableCollectItem from '~/components/atoms/tables/HSimpleTableCollectItem.vue'
/**
 * @author shisyamo4131
 */
export default {
  components: { HSimpleTableCollectItem },
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
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {},
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {},
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {},
}
</script>

<template>
  <air-template-tabs
    :label="model.abbr"
    :tabs="tabs"
    :tabs-props="{ grow: true }"
  >
    <template #prepend-label>
      <v-btn icon @click="$router.push(`/collect-items`)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <template #append-label>
      <v-btn icon @click="$router.push(`/collect-items/${model.docId}/edit`)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template #tab-0>
      <v-container>
        <v-card outlined>
          <h-simple-table-collect-item v-bind="model" />
        </v-card>
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
