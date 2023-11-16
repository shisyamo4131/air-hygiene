<script>
/**
 * ### HInputMunicipalPermission
 *
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import ARadioGroup from '~/components/atoms/inputs/ARadioGroup.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    ASwitch,
    ARadioGroup,
    AAutocomplete,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    prefCode: { type: String, default: '', required: false },
    cityCode: { type: String, default: '', required: false },
    permitNumber: { type: String, default: '', required: false },
    processingDiv: { type: String, default: '', required: false },
    includeSpeciallyControled: {
      type: Boolean,
      default: false,
      required: false,
    },
    dateOfPermission: { type: String, default: '', required: false },
    dateOfExpiration: { type: String, default: '', required: false },
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
    <v-subheader>許可エリア</v-subheader>
    <a-autocomplete
      label="都道府県"
      :value="prefCode"
      :items="$PREFECTURE_ARRAY"
      required
      @change="$emit('update:cityCode', '')"
      @input="$emit('update:prefCode', $event)"
    />
    <a-autocomplete
      label="市区町村"
      :value="cityCode"
      :items="$CITY_ARRAY(prefCode)"
      required
      item-text="name"
      item-value="code"
      @input="$emit('update:cityCode', $event)"
    />
    <a-text-field
      label="許可番号"
      :value="permitNumber"
      required
      @input="$emit('update:permitNumber', $event)"
    />
    <v-subheader>処理区分</v-subheader>
    <a-radio-group
      :value="processingDiv"
      row
      :items="$PROCESSING_DIV_ARRAY"
      @input="$emit('update:processingDiv', $event)"
    >
    </a-radio-group>
    <a-switch
      label="特別管理を含む"
      :input-value="includeSpeciallyControled"
      @change="$emit('update:includeSpeciallyControled', $event)"
    />
    <v-subheader>許可日・有効期限</v-subheader>
    <a-text-field
      label="許可日"
      :value="dateOfPermission"
      required
      input-type="date"
      @input="$emit('update:dateOfPermission', $event)"
    />
    <a-text-field
      label="有効期限"
      :value="dateOfExpiration"
      required
      input-type="date"
      @input="$emit('update:dateOfExpiration', $event)"
    />
  </div>
</template>

<style></style>
