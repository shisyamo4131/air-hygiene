<script>
/**
 * ### ACardSiteOutline
 *
 * A card component for displaying site outline.
 *
 * #### PROPERTIES
 *
 * | name     | type   | default | required | description             |
 * | -------- | ------ | ------- | -------- | ----------------------- |
 * | code     | string |         | true     |                         |
 * | abbr     | string |         | true     |                         |
 * | abbrKana | string |         | true     |                         |
 * | address1 | string |         | true     |                         |
 * | status   | string |         | true     | [ 'active', 'expired' ] |
 *
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
    code: { type: String, required: true },
    abbr: { type: String, required: true },
    abbrKana: { type: String, required: true },
    address1: { type: String, required: true },
    status: {
      type: String,
      validator: (v) => ['active', 'expired'].includes(v),
      required: true,
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
