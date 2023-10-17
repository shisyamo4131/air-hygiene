<script>
/**
 * @create 2023-09-25
 * @author shisyamo4131
 */
import HTextFieldZipcode from './HTextFieldZipcode.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ATextField, HTextFieldZipcode, ASelect, ANumeric, ATextarea },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    code: { type: String, default: '', required: false },
    name1: { type: String, default: '', required: false },
    name2: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    abbrKana: { type: String, default: '', required: false },
    zipcode: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    address2: { type: String, default: '', required: false },
    tel: { type: String, default: '', required: false },
    fax: { type: String, default: '', required: false },
    url: { type: String, default: '', required: false },
    staffName: { type: String, default: '', required: false },
    staffEmail: { type: String, default: '', required: false },
    honor: { type: String, default: '', required: false },
    deadline: { type: String, default: '', required: false },
    depositMonth: { type: Number, default: null, required: false },
    depositDay: { type: String, default: '', required: false },
    rounding: { type: String, default: '', required: false },
    condition: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
</script>

<template>
  <div>
    <a-text-field
      v-if="editMode !== 'REGIST'"
      label="CODE"
      :value="code"
      readonly
    />
    <a-text-field
      label="取引先名1"
      :value="name1"
      required
      @input="$emit('update:name1', $event)"
    />
    <a-text-field
      label="取引先名2"
      :value="name2"
      @input="$emit('update:name2', $event)"
    />
    <a-text-field
      label="略称"
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
    <a-text-field
      label="略称カナ"
      :value="abbrKana"
      required
      input-type="katakana"
      @input="$emit('update:abbrKana', $event)"
    />
    <h-text-field-zipcode
      label="郵便番号"
      :value="zipcode"
      @input="$emit('update:zipcode', $event)"
      @loaded="$emit('update:address1', $event.full)"
    />
    <a-text-field
      label="住所1"
      :value="address1"
      required
      @input="$emit('update:address1', $event)"
    />
    <a-text-field
      label="住所2"
      :value="address2"
      @input="$emit('update:address2', $event)"
    />
    <a-text-field
      label="電話番号"
      :value="tel"
      input-type="tel"
      @input="$emit('update:tel', $event)"
    />
    <a-text-field
      label="FAX番号"
      :value="fax"
      input-type="tel"
      @input="$emit('update:fax', $event)"
    />
    <a-text-field
      label="URL"
      :value="url"
      input-type="url"
      @input="$emit('update:url', $event)"
    />
    <a-text-field
      label="担当者名"
      :value="staffName"
      @input="$emit('update:staffName', $event)"
    />
    <a-text-field
      label="担当者メールアドレス"
      :value="staffEmail"
      input-type="email"
      @input="$emit('update:staffEmail', $event)"
    />
    <a-text-field
      label="敬称"
      :value="honor"
      required
      hint="請求書の宛名に印字されます。"
      persistent-hint
      @input="$emit('update:honor', $event)"
    />
    <a-select
      label="締日"
      :value="deadline"
      :items="$DEADLINE_ARRAY"
      required
      @input="$emit('update:deadline', $event)"
    />
    <a-numeric
      label="入金日"
      :value="depositMonth"
      required
      suffix="ヶ月後"
      @input="$emit('update:depositMonth', $event)"
    />
    <a-select
      label="入金日"
      :value="depositDay"
      :items="$DEADLINE_ARRAY"
      required
      @input="$emit('update:depositDay', $event)"
    />
    <a-select
      label="端数処理"
      :value="rounding"
      :items="$ROUNDING_ARRAY"
      required
      @input="$emit('update:rounding', $event)"
    />
    <a-select
      label="状態"
      :value="condition"
      :items="$CUSTOMER_CONDITION_ARRAY"
      required
      @input="$emit('update:condition', $event)"
    />
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
