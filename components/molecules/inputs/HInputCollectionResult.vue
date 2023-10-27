<script>
/**
 * @author shisyamo4131
 */
import HTextFieldDate from './HTextFieldDate.vue'
import HInputCollectionResultDetails from './HInputCollectionResultDetails.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextarea,
    ANumeric,
    AAutocomplete,
    HTextFieldDate,
    ATextField,
    HInputCollectionResultDetails,
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
    resultType: { type: String, default: '', required: false },
    rootId: { type: String, default: '', required: false },
    details: { type: Array, default: () => [], required: false },
    municipalWeight: { type: Number, default: null, required: false },
    industrialWeight: { type: Number, default: null, required: false },
    dateDeadline: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
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
  computed: {},
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
      :value="resultType"
      :items="$COLLECTION_RESULT_TYPE_ARRAY"
      required
      @input="$emit('update:resultType', $event)"
    />
    <a-text-field
      label="回収ルート"
      :value="rootId"
      :required="resultType === 'root'"
      :disabled="resultType !== 'root'"
      @input="$emit('update:rootId', $event)"
    />
    <h-input-collection-result-details
      :value="details"
      :site-id="site?.docId || undefined"
      :date="date || undefined"
      :disabled="disabled"
      @input="$emit('update:details', $event)"
    />
    <a-numeric
      label="一廃重量"
      class="right-input"
      :value="municipalWeight"
      required
      :decimal-places="2"
      suffix="kg"
      @input="$emit('update:municipalWeight', $event)"
    />
    <a-numeric
      label="産廃重量"
      class="right-input"
      :value="industrialWeight"
      required
      :decimal-places="2"
      suffix="kg"
      @input="$emit('update:industrialWeight', $event)"
    />
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
