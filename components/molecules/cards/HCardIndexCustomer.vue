<script>
/**
 * @create 2023-09-27
 * @author shisyamo4131
 */
import HChipCustomerCondition from '../chips/HChipCustomerCondition.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HChipCustomerCondition,
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
        <h-chip-customer-condition :value="model.condition" small />
      </div>
    </div>
  </v-card>
</template>

<style></style>
