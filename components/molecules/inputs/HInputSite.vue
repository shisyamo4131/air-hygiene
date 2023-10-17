<script>
/**
 * @create 2023-09-29
 * @author shisyamo4131
 * @update 2023-10-02 都道府県を文字列からオブジェクトに変更
 */
import HTextFieldZipcode from './HTextFieldZipcode.vue'
import HAutocompleteCustomer from './HAutocompleteCustomer.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    HTextFieldZipcode,
    ASelect,
    ATextarea,
    HAutocompleteCustomer,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
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
    condition: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
    customer: { type: Object, default: null, required: false },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    name(newVal, oldVal) {
      if (newVal !== oldVal) this.$emit('update:abbr', newVal)
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {},
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
    <h-autocomplete-customer
      label="取引先"
      :value="customer"
      required
      return-object
      @input="$emit('update:customer', $event)"
    />
    <a-text-field
      label="排出場所名"
      :value="name"
      required
      @input="$emit('update:name', $event)"
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
