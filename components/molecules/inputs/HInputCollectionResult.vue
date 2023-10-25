<script>
/**
 * @author shisyamo4131
 */
import HAutocompleteSite from './HAutocompleteSite.vue'
import HAutocompleteCollectItem from './HAutocompleteCollectItem.vue'
import HAutocompleteUnit from './HAutocompleteUnit.vue'
import HNumericUnitPrice from './HNumericUnitPrice.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
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
    siteId: { type: String, default: '', required: false },
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
  watch: {
    collectItemId(v) {
      this.$emit('update:convertedWeight', null)
      this.copyAmountToWeight()
    },
    unitId(v) {
      this.$emit('update:convertedWeight', null)
      this.copyAmountToWeight()
    },
    amount(v) {
      this.copyAmountToWeight()
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    copyAmountToWeight() {
      if (!this.requiredConvert) {
        this.$emit('update:convertedWeight', null)
      } else if ((this.unit?.code || undefined) === '11') {
        this.$emit('update:convertedWeight', this.amount)
      }
    },
  },
}
</script>

<template>
  <div>
    <h-autocomplete-site
      label="排出場所"
      :value="siteId"
      required
      @input="$emit('update:siteId', $event)"
    />
    <a-text-field
      label="回収日"
      :value="date"
      required
      input-type="date"
      @input="$emit('update:date', $event)"
    />
    <v-row dense>
      <v-col>
        <h-autocomplete-collect-item
          label="回収品目"
          :value="collectItemId"
          required
          @input="$emit('update:collectItemId', $event)"
        />
      </v-col>
      <v-col>
        <a-numeric
          label="数量"
          :value="amount"
          required
          :decimal-places="2"
          @input="$emit('update:amount', $event)"
        />
      </v-col>
      <v-col>
        <h-autocomplete-unit
          label="単位"
          :value="unitId"
          required
          @input="$emit('update:unitId', $event)"
        />
      </v-col>
      <v-col>
        <h-numeric-unit-price
          label="単価（税抜）"
          :value="unitPrice"
          required
          :unit-id="unitId"
          @input="$emit('update:unitPrice', $event)"
        />
      </v-col>
    </v-row>
    <a-numeric
      label="換算重量"
      :disabled="!requiredConvert"
      :value="convertedWeight"
      :required="requiredConvert"
      decimal-places="2"
      suffix="kg"
      @input="$emit('update:convertedWeight', $event)"
    />
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
