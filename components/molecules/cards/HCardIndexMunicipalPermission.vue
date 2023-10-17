<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import HChipMunicipalPermissionCondition from '../chips/HChipMunicipalPermissionCondition.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HChipMunicipalPermissionCondition },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    model: { type: Object, required: true },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {},
}
</script>

<template>
  <v-card v-bind="$attrs" class="pa-4" v-on="$listeners">
    <div class="d-flex">
      <div class="text-truncate">
        <div class="text-subtitle-1 text-truncate">
          {{ `${model.area}【${$PROCESSING_DIV[model.processingDiv]}】` }}
        </div>
        <div class="text-caption grey--text text--lighten-1 text-truncate">
          {{ `有効期限: ${model.dateOfExpiration}` }}
        </div>
      </div>
      <div class="d-flex flex-grow-1 justify-end">
        <h-chip-municipal-permission-condition
          :value="model.dateOfExpiration"
          small
        />
      </div>
    </div>
  </v-card>
</template>

<style></style>
