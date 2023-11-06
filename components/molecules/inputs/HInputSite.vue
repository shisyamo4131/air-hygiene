<script>
/**
 * @author shisyamo4131
 */
import ATextFieldZipcode from '../../atoms/inputs/ATextFieldZipcode.vue'
import AAutocompleteCustomer from '../../atoms/inputs/AAutocompleteCustomer.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import ATextFieldSiteCode from '~/components/atoms/inputs/ATextFieldSiteCode.vue'
import ATextFieldSiteName from '~/components/atoms/inputs/ATextFieldSiteName.vue'
import ATextFieldSiteAbbr from '~/components/atoms/inputs/ATextFieldSiteAbbr.vue'
import ATextFieldSiteAbbrKana from '~/components/atoms/inputs/ATextFieldSiteAbbrKana.vue'
import ATextFieldAddress from '~/components/atoms/inputs/ATextFieldAddress.vue'
import ATextFieldTel from '~/components/atoms/inputs/ATextFieldTel.vue'
import ATextFieldUrl from '~/components/atoms/inputs/ATextFieldUrl.vue'
import ATextFieldStaffName from '~/components/atoms/inputs/ATextFieldStaffName.vue'
import ATextFieldEmail from '~/components/atoms/inputs/ATextFieldEmail.vue'
import ARadioGroupSiteCondition from '~/components/atoms/inputs/ARadioGroupSiteCondition.vue'
import ATextFieldDate from '~/components/atoms/inputs/ATextFieldDate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextFieldZipcode,
    ATextarea,
    AAutocompleteCustomer,
    ATextFieldSiteCode,
    ATextFieldSiteName,
    ATextFieldSiteAbbr,
    ATextFieldSiteAbbrKana,
    ATextFieldAddress,
    ATextFieldTel,
    ATextFieldUrl,
    ATextFieldStaffName,
    ATextFieldEmail,
    ARadioGroupSiteCondition,
    ATextFieldDate,
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
    dateExpired: { type: String, default: '', required: false },
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
}
</script>

<template>
  <div>
    <a-text-field-site-code
      v-if="editMode !== 'REGIST'"
      :value="code"
      readonly
    />
    <a-autocomplete-customer
      label="取引先"
      :value="customer"
      required
      return-object
      @input="$emit('update:customer', $event)"
    />
    <a-text-field-site-name
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <a-text-field-site-abbr
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
    <a-text-field-site-abbr-kana
      :value="abbrKana"
      required
      @input="$emit('update:abbrKana', $event)"
    />
    <a-text-field-zipcode
      :value="zipcode"
      @input="$emit('update:zipcode', $event)"
      @loaded="$emit('update:address1', $event.full)"
    />
    <a-text-field-address
      label="住所1"
      :value="address1"
      required
      @input="$emit('update:address1', $event)"
    />
    <a-text-field-address
      label="住所2"
      :value="address2"
      @input="$emit('update:address2', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6">
        <a-text-field-tel :value="tel" @input="$emit('update:tel', $event)" />
      </v-col>
      <v-col cols="12" sm="6">
        <a-text-field-tel
          label="FAX番号"
          :value="fax"
          @input="$emit('update:fax', $event)"
        />
      </v-col>
    </v-row>
    <a-text-field-url :value="url" @input="$emit('update:url', $event)" />
    <a-text-field-staff-name
      :value="staffName"
      @input="$emit('update:staffName', $event)"
    />
    <a-text-field-email
      :value="staffEmail"
      @input="$emit('update:staffEmail', $event)"
    />
    <a-radio-group-site-condition
      v-if="editMode !== 'REGIST'"
      class="mt-0"
      :value="condition"
      row
      @change="$emit('update:condition', $event)"
    />
    <v-expand-transition>
      <a-text-field-date
        v-show="condition === 'expired'"
        label="契約満了日"
        :value="dateExpired"
        :required="condition === 'expired'"
        @input="$emit('update:dateExpired', $event)"
      />
    </v-expand-transition>
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
