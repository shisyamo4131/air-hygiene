<script>
/**
 * ### HInputSite
 *
 * @author shisyamo4131
 */
import ATextFieldZipcode from '../../atoms/inputs/ATextFieldZipcode.vue'
import AAutocompleteCustomer from '../../atoms/inputs/AAutocompleteCustomer.vue'
import HItemGroupDays from '../itemGroups/HItemGroupDays.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextFieldZipcode,
    ATextarea,
    AAutocompleteCustomer,
    ATextField,
    HItemGroupDays,
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
    status: { type: String, default: '', required: false },
    dateExpired: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
    customerId: { type: String, default: '', required: false },
    collectDays: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    name(newVal, oldVal) {
      if (newVal !== oldVal) this.$emit('update:abbr', newVal)
    },
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
    <a-autocomplete-customer
      label="取引先"
      :value="customerId"
      :items="$store.state.masters.Customers"
      required
      @input="$emit('update:customerId', $event)"
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
    <a-text-field-zipcode
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
      label="e-mail"
      :value="staffEmail"
      input-type="email"
      @input="$emit('update:staffEmail', $event)"
    />
    <h-item-group-days
      :value="collectDays"
      multiple
      @change="$emit('update:collectDays', $event)"
    />
    <a-textarea
      label="備考"
      :value="remarks"
      hide-details
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
