<script>
/**
 * @author shisyamo4131
 */
import HTextFieldZipcode from '../../atoms/inputs/HTextFieldZipcode.vue'
import AAutocompleteCustomer from '../../atoms/inputs/AAutocompleteCustomer.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import HTextFieldSiteCode from '~/components/atoms/inputs/HTextFieldSiteCode.vue'
import HTextFieldSiteName from '~/components/atoms/inputs/HTextFieldSiteName.vue'
import HTextFieldSiteAbbr from '~/components/atoms/inputs/HTextFieldSiteAbbr.vue'
import HTextFieldSiteAbbrKana from '~/components/atoms/inputs/HTextFieldSiteAbbrKana.vue'
import HTextFieldAddress from '~/components/atoms/inputs/HTextFieldAddress.vue'
import HTextFieldTel from '~/components/atoms/inputs/HTextFieldTel.vue'
import HTextFieldUrl from '~/components/atoms/inputs/HTextFieldUrl.vue'
import HTextFieldStaffName from '~/components/atoms/inputs/HTextFieldStaffName.vue'
import HTextFieldEmail from '~/components/atoms/inputs/HTextFieldEmail.vue'
import HRadioGroupSiteCondition from '~/components/atoms/inputs/HRadioGroupSiteCondition.vue'
import HTextFieldDate from '~/components/atoms/inputs/HTextFieldDate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTextFieldZipcode,
    ATextarea,
    AAutocompleteCustomer,
    HTextFieldSiteCode,
    HTextFieldSiteName,
    HTextFieldSiteAbbr,
    HTextFieldSiteAbbrKana,
    HTextFieldAddress,
    HTextFieldTel,
    HTextFieldUrl,
    HTextFieldStaffName,
    HTextFieldEmail,
    HRadioGroupSiteCondition,
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
    <h-text-field-site-code
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
    <h-text-field-site-name
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <h-text-field-site-abbr
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
    <h-text-field-site-abbr-kana
      :value="abbrKana"
      required
      @input="$emit('update:abbrKana', $event)"
    />
    <h-text-field-zipcode
      :value="zipcode"
      @input="$emit('update:zipcode', $event)"
      @loaded="$emit('update:address1', $event.full)"
    />
    <h-text-field-address
      label="住所1"
      :value="address1"
      required
      @input="$emit('update:address1', $event)"
    />
    <h-text-field-address
      label="住所2"
      :value="address2"
      @input="$emit('update:address2', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6">
        <h-text-field-tel :value="tel" @input="$emit('update:tel', $event)" />
      </v-col>
      <v-col cols="12" sm="6">
        <h-text-field-tel
          label="FAX番号"
          :value="fax"
          @input="$emit('update:fax', $event)"
        />
      </v-col>
    </v-row>
    <h-text-field-url :value="url" @input="$emit('update:url', $event)" />
    <h-text-field-staff-name
      :value="staffName"
      @input="$emit('update:staffName', $event)"
    />
    <h-text-field-email
      :value="staffEmail"
      @input="$emit('update:staffEmail', $event)"
    />
    <h-radio-group-site-condition
      v-if="editMode !== 'REGIST'"
      class="mt-0"
      :value="condition"
      row
      @change="$emit('update:condition', $event)"
    />
    <v-expand-transition>
      <h-text-field-date
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
