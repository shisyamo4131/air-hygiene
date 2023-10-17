<script>
/**
 * @create 2023-09-29
 * @author shisyamo4131
 */
import HChipSiteCondition from '../chips/HChipSiteCondition.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HChipSiteCondition,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    model: { type: Object, required: true },
  },
}
</script>

<template>
  <v-card v-bind="$attrs" class="pa-4" v-on="$listeners">
    <div class="d-flex">
      <div class="text-truncate">
        <div class="text-caption grey--text text--lighten-1 text-truncate">
          {{ model.abbrKana }}
        </div>
        <div class="text-subtitle-1 text-truncate">
          {{ `[${model.code}] ${model.abbr}` }}
        </div>
        <div class="text-truncate">{{ model.address1 }}</div>
      </div>
      <div class="d-flex flex-grow-1 justify-end">
        <h-chip-site-condition :value="model.condition" small />
      </div>
    </div>
  </v-card>
</template>

<style></style>
