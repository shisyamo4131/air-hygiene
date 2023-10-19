<script>
/**
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
    code: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    abbrKana: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    condition: {
      type: String,
      default: 'active',
      validator: (v) => ['active', 'expired'].includes(v),
      required: false,
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs" class="pa-4" v-on="$listeners">
    <div class="d-flex">
      <div class="text-truncate">
        <div class="text-caption grey--text text--lighten-1 text-truncate">
          {{ abbrKana }}
        </div>
        <div class="text-subtitle-1 text-truncate">
          {{ `[${code}]${abbr}` }}
        </div>
        <div class="text-caption grey--text text--lighten-1 text-truncate">
          {{ address1 }}
        </div>
      </div>
      <div class="d-flex flex-grow-1 justify-end">
        <h-chip-customer-condition :value="condition" small />
      </div>
    </div>
  </v-card>
</template>

<style></style>
