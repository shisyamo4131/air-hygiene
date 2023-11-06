<script>
/**
 * @author shisyamo4131
 */
import AChipSiteStatus from '../../atoms/chips/AChipSiteStatus.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    AChipSiteStatus,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    code: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    abbrKana: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    status: {
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
          {{ `[${code}] ${abbr}` }}
        </div>
        <div class="text-truncate">{{ address1 }}</div>
      </div>
      <div class="d-flex flex-grow-1 justify-end">
        <a-chip-site-status :value="status" small />
      </div>
    </div>
  </v-card>
</template>

<style></style>
