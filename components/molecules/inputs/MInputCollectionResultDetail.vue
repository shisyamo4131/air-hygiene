<script>
/**
 * ### MInputCollectionResultDetail
 *
 * @author shisyamo4131
 */
import AAutocompleteCollectItem from '../../atoms/inputs/AAutocompleteCollectItem.vue'
import AAutocompleteUnit from '../../atoms/inputs/AAutocompleteUnit.vue'
import Mixin from '~/components/molecules/mixins/MMixinInput.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    AAutocompleteCollectItem,
    AAutocompleteUnit,
    ANumeric,
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
    async loadUnitPrice() {
      if (!this.siteId || !this.date) return
      if (!this.collectItemId || !this.unitId) return
      const id = `${this.collectItemId}-${this.unitId}`
      const siteUnitPrice = this.$SiteUnitPrice()
      const fetchedPrice = await siteUnitPrice.fetchUnitPrice(
        this.siteId,
        this.date,
        id
      )
      this.$emit('update:unitPrice', fetchedPrice)
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
      @change="loadUnitPrice"
      @input="$emit('update:collectItemId', $event)"
    />
    <a-numeric
      label="数量"
      :value="amount"
      required
      decimal-places="2"
      @input="$emit('update:amount', $event)"
    />
    <a-autocomplete-unit
      label="単位"
      :value="unitId"
      required
      :disabled="editMode !== 'REGIST'"
      @change="loadUnitPrice"
      @input="$emit('update:unitId', $event)"
    />
    <a-numeric
      label="単価（税抜）"
      class="right-input"
      :value="unitPrice"
      required
      suffix="円"
      @input="$emit('update:unitPrice', $event)"
    />
  </div>
</template>

<style></style>
