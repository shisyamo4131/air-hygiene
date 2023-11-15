<script>
/**
 * ### HInputCollectionResultDetail
 *
 * @author shisyamo4131
 */
import AAutocompleteCollectItem from '../../atoms/inputs/AAutocompleteCollectItem.vue'
import AAutocompleteUnit from '../../atoms/inputs/AAutocompleteUnit.vue'
import HNumericUnitPrice from './HNumericUnitPrice.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    AAutocompleteCollectItem,
    AAutocompleteUnit,
    ANumeric,
    HNumericUnitPrice,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [Mixin],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    /* data-model */
    collectItemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    amount: { type: Number, default: null, required: false },
    unitPrice: { type: Number, default: null, required: false },
    /* for loading unit-price. */
    siteId: { type: String, default: '', required: false },
    date: { type: String, default: '', required: false },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async fetchUnitPrice() {
      if (!this.collectItemId || !this.unitId) return
      if (!this.siteId || !this.date) return
      await this.$refs['unit-price'].fetch(
        this.siteId,
        this.date,
        `${this.collectItemId}-${this.unitId}`
      )
    },
  },
}
</script>

<template>
  <div>
    <a-autocomplete-collect-item
      label="回収品目"
      :value="collectItemId"
      required
      :disabled="editMode !== 'REGIST'"
      @change="fetchUnitPrice"
      @input="$emit('update:collectItemId', $event)"
    />
    <a-numeric
      label="数量"
      :value="amount"
      class="right-input"
      required
      decimal-places="2"
      @input="$emit('update:amount', $event)"
    />
    <a-autocomplete-unit
      label="単位"
      :value="unitId"
      required
      :disabled="editMode !== 'REGIST'"
      @change="fetchUnitPrice"
      @input="$emit('update:unitId', $event)"
    />
    <h-numeric-unit-price
      ref="unit-price"
      label="単価（税抜）"
      :value="unitPrice"
      required
      @input="$emit('update:unitPrice', $event)"
    />
  </div>
</template>

<style></style>
