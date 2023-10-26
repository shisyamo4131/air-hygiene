<script>
/**
 * @author shisyamo4131
 */
import HAutocompleteSite from './HAutocompleteSite.vue'
import HAutocompleteCollectItem from './HAutocompleteCollectItem.vue'
import HAutocompleteUnit from './HAutocompleteUnit.vue'
import HNumericUnitPrice from './HNumericUnitPrice.vue'
import HNumericConvertedWeight from './HNumericConvertedWeight.vue'
import HTextFieldDate from './HTextFieldDate.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextarea,
    HAutocompleteSite,
    HAutocompleteCollectItem,
    HAutocompleteUnit,
    HNumericUnitPrice,
    ANumeric,
    AAutocomplete,
    HNumericConvertedWeight,
    HTextFieldDate,
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
    dateDeadline: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
    loadingUnitPrice: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {}
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    requiredConvert() {
      if (!this.collectItemId) return false
      const collectItem = this.$store.getters['masters/CollectItem'](
        this.collectItemId
      )
      if (!collectItem) return false
      return ['municipal', 'industrial'].includes(collectItem.wasteDiv)
    },
    disabledConvertedWeight() {
      if (!this.unitId) return false
      const unit = this.$store.getters['masters/Unit'](this.unitId)
      if (!unit) return false
      return unit.code === '11'
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {},
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {},
}
</script>

<template>
  <div>
    <h-autocomplete-site
      label="排出場所"
      :value="site"
      required
      return-object
      clearable
      @change="$emit('change:site', $event)"
      @input="$emit('update:site', $event)"
    />
    <h-text-field-date
      label="回収日"
      :value="date"
      required
      input-type="date"
      @change="$emit('change:date', $event)"
      @input="$emit('update:date', $event)"
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
      @change="$emit('change:collectItemId', $event)"
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
          @change="$emit('change:amount', $event)"
          @input="$emit('update:amount', $event)"
        />
      </v-col>
      <v-col cols="6">
        <h-autocomplete-unit
          label="単位"
          :value="unitId"
          required
          @change="$emit('change:unitId', $event)"
          @input="$emit('update:unitId', $event)"
        />
      </v-col>
      <v-col cols="6">
        <h-numeric-unit-price
          label="単価（税抜）"
          :value="unitPrice"
          required
          :unit-id="unitId"
          :loading="loadingUnitPrice"
          @input="$emit('update:unitPrice', $event)"
        />
      </v-col>
      <v-col cols="6">
        <h-numeric-converted-weight
          :disabled="disabledConvertedWeight"
          :value="convertedWeight"
          :required="requiredConvert"
          @input="$emit('update:convertedWeight', $event)"
        />
      </v-col>
    </v-row>
    <h-text-field-date
      label="請求締日"
      :value="dateDeadline"
      required
      input-type="date"
      @input="$emit('update:dateDeadline', $event)"
    />
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
