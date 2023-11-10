<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import AAutocompletePrefecture from '../../atoms/inputs/AAutocompletePrefecture.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import ARadioGroup from '~/components/atoms/inputs/ARadioGroup.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    ASwitch,
    ARadioGroup,
    AAutocompletePrefecture,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    prefecture: { type: Object, default: null, required: false },
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
    <a-autocomplete-prefecture
      label="都道府県"
      :value="prefecture"
      required
      return-object
      @input="$emit('update:prefecture', $event)"
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
      @input="$emit('update:processingDiv', $event)"
    >
      <v-radio
        v-for="(item, index) of $PROCESSING_DIV_ARRAY"
        :key="index"
        :label="item.text"
        :value="item.value"
      />
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
