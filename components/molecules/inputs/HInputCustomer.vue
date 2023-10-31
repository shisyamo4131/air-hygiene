<script>
/**
 * @author shisyamo4131
 */
import HTextFieldZipcode from '../../atoms/inputs/HTextFieldZipcode.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import HTextFieldCustomerCode from '~/components/atoms/inputs/HTextFieldCustomerCode.vue'
import HTextFieldCustomerName from '~/components/atoms/inputs/HTextFieldCustomerName.vue'
import HTextFieldCustomerAbbr from '~/components/atoms/inputs/HTextFieldCustomerAbbr.vue'
import HTextFieldCustomerAbbrKana from '~/components/atoms/inputs/HTextFieldCustomerAbbrKana.vue'
import HTextFieldAddress from '~/components/atoms/inputs/HTextFieldAddress.vue'
import HTextFieldTel from '~/components/atoms/inputs/HTextFieldTel.vue'
import HTextFieldUrl from '~/components/atoms/inputs/HTextFieldUrl.vue'
import HTextFieldStaffName from '~/components/atoms/inputs/HTextFieldStaffName.vue'
import HTextFieldEmail from '~/components/atoms/inputs/HTextFieldEmail.vue'
import HTextFieldHonor from '~/components/atoms/inputs/HTextFieldHonor.vue'
import HSelectDeadline from '~/components/atoms/inputs/HSelectDeadline.vue'
import HNumericDepositMonth from '~/components/atoms/inputs/HNumericDepositMonth.vue'
import HSelectRounding from '~/components/atoms/inputs/HSelectRounding.vue'
import HRadioGroupCustomerCondition from '~/components/atoms/inputs/HRadioGroupCustomerCondition.vue'
import HTextFieldDate from '~/components/atoms/inputs/HTextFieldDate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTextFieldZipcode,
    ATextarea,
    HTextFieldCustomerCode,
    HTextFieldCustomerName,
    HTextFieldCustomerAbbr,
    HTextFieldCustomerAbbrKana,
    HTextFieldAddress,
    HTextFieldTel,
    HTextFieldUrl,
    HTextFieldStaffName,
    HTextFieldEmail,
    HTextFieldHonor,
    HSelectDeadline,
    HNumericDepositMonth,
    HSelectRounding,
    HRadioGroupCustomerCondition,
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
    dateExpired: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
</script>

<template>
  <div>
    <h-text-field-customer-code
      v-if="editMode !== 'REGIST'"
      :value="code"
      readonly
    />
    <h-text-field-customer-name
      label="取引先名1"
      :value="name1"
      required
      @input="$emit('update:name1', $event)"
    />
    <h-text-field-customer-name
      label="取引先名2"
      :value="name2"
      @input="$emit('update:name2', $event)"
    />
    <h-text-field-customer-abbr
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
    <h-text-field-customer-abbr-kana
      :value="abbrKana"
      required
      @input="$emit('update:abbrKana', $event)"
    />
    <h-text-field-zipcode
      label="郵便番号"
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
    <h-text-field-honor
      :value="honor"
      required
      @input="$emit('update:honor', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6" md="3">
        <h-select-deadline
          :value="deadline"
          required
          @input="$emit('update:deadline', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <h-numeric-deposit-month
          :value="depositMonth"
          required
          suffix="ヶ月後"
          @input="$emit('update:depositMonth', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <h-select-deadline
          label="入金日"
          :value="depositDay"
          required
          @input="$emit('update:depositDay', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <h-select-rounding
          :value="rounding"
          required
          @input="$emit('update:rounding', $event)"
        />
      </v-col>
    </v-row>
    <h-radio-group-customer-condition
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
