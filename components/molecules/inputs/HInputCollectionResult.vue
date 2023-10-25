<script>
/**
 * @author shisyamo4131
 */
import HAutocompleteSite from './HAutocompleteSite.vue'
import HAutocompleteCollectItem from './HAutocompleteCollectItem.vue'
import HAutocompleteUnit from './HAutocompleteUnit.vue'
import HNumericUnitPrice from './HNumericUnitPrice.vue'
import HNumericConvertedWeight from './HNumericConvertedWeight.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    ATextarea,
    HAutocompleteSite,
    HAutocompleteCollectItem,
    HAutocompleteUnit,
    HNumericUnitPrice,
    ANumeric,
    AAutocomplete,
    HNumericConvertedWeight,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    date: { type: String, default: '', required: false },
    site: { type: Object, default: null, required: false },
    collectionResultDiv: { type: String, default: '', required: false },
    collectItemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    amount: { type: Number, default: null, required: false },
    unitPrice: { type: Number, default: null, required: false },
    convertedWeight: { type: Number, default: null, required: false },
    remarks: { type: String, default: '', required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    collectItem() {
      if (!this.collectItemId) return undefined
      return this.$store.getters['masters/CollectItem'](this.collectItemId)
    },
    unit() {
      if (!this.unitId) return undefined
      return this.$store.getters['masters/Unit'](this.unitId)
    },
    requiredConvert() {
      if (!this.collectItem) return false
      const wasteDiv = this.collectItem.wasteDiv
      return ['municipal', 'industrial'].includes(wasteDiv)
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {},
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    copyAmountToWeight() {
      if (!this.requiredConvert) {
        this.$emit('update:convertedWeight', null)
        return
      }
      const amount =
        (this.unit?.code || undefined) === '11' ? this.amount : null
      this.$emit('update:convertedWeight', amount)
    },
  },
}
</script>

<template>
  <div>
    <a-text-field
      label="回収日"
      :value="date"
      required
      input-type="date"
      @input="$emit('update:date', $event)"
    />
    <h-autocomplete-site
      label="排出場所"
      :value="site"
      required
      return-object
      @input="$emit('update:site', $event)"
    />
    <a-autocomplete
      label="実績区分"
      auto-select-first
      :value="collectionResultDiv"
      :items="$COLLECTION_RESULT_DIV_ARRAY"
      required
      @input="$emit('update:collectionResultDiv', $event)"
    />
    <h-autocomplete-collect-item
      label="回収品目"
      :value="collectItemId"
      required
      @change="copyAmountToWeight"
      @input="$emit('update:collectItemId', $event)"
    />
    <v-row dense>
      <v-col cols="6">
        <a-numeric
          label="数量"
          class="right-input"
          :value="amount"
          required
          :decimal-places="2"
          @input="$emit('update:amount', $event)"
        />
      </v-col>
      <v-col cols="6">
        <h-autocomplete-unit
          label="単位"
          :value="unitId"
          required
          @change="copyAmountToWeight"
          @input="$emit('update:unitId', $event)"
        />
      </v-col>
      <v-col cols="6">
        <h-numeric-unit-price
          label="単価（税抜）"
          :value="unitPrice"
          required
          :unit-id="unitId"
          @input="$emit('update:unitPrice', $event)"
        />
      </v-col>
      <v-col cols="6">
        <h-numeric-converted-weight
          :disabled="!requiredConvert || (unit?.code || undefined) === '11'"
          :value="convertedWeight"
          :required="requiredConvert"
          @input="$emit('update:convertedWeight', $event)"
        />
      </v-col>
    </v-row>
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
