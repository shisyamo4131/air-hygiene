<script>
/**
 * @author shisyamo4131
 */
import ATextFieldZipcode from '../../atoms/inputs/ATextFieldZipcode.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import ATextFieldCustomerCode from '~/components/atoms/inputs/ATextFieldCustomerCode.vue'
import ATextFieldCustomerName from '~/components/atoms/inputs/ATextFieldCustomerName.vue'
import ATextFieldCustomerAbbr from '~/components/atoms/inputs/ATextFieldCustomerAbbr.vue'
import ATextFieldCustomerAbbrKana from '~/components/atoms/inputs/ATextFieldCustomerAbbrKana.vue'
import ATextFieldAddress from '~/components/atoms/inputs/ATextFieldAddress.vue'
import ATextFieldTel from '~/components/atoms/inputs/ATextFieldTel.vue'
import ATextFieldUrl from '~/components/atoms/inputs/ATextFieldUrl.vue'
import ATextFieldStaffName from '~/components/atoms/inputs/ATextFieldStaffName.vue'
import ATextFieldEmail from '~/components/atoms/inputs/ATextFieldEmail.vue'
import ATextFieldHonor from '~/components/atoms/inputs/ATextFieldHonor.vue'
import ASelectDeadline from '~/components/atoms/inputs/ASelectDeadline.vue'
import ANumericDepositMonth from '~/components/atoms/inputs/ANumericDepositMonth.vue'
import ASelectRounding from '~/components/atoms/inputs/ASelectRounding.vue'
import ARadioGroupCustomerCondition from '~/components/atoms/inputs/ARadioGroupCustomerCondition.vue'
import ATextFieldDate from '~/components/atoms/inputs/ATextFieldDate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextFieldZipcode,
    ATextarea,
    ATextFieldCustomerCode,
    ATextFieldCustomerName,
    ATextFieldCustomerAbbr,
    ATextFieldCustomerAbbrKana,
    ATextFieldAddress,
    ATextFieldTel,
    ATextFieldUrl,
    ATextFieldStaffName,
    ATextFieldEmail,
    ATextFieldHonor,
    ASelectDeadline,
    ANumericDepositMonth,
    ASelectRounding,
    ARadioGroupCustomerCondition,
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
    <a-text-field-customer-code
      v-if="editMode !== 'REGIST'"
      :value="code"
      readonly
    />
    <a-text-field-customer-name
      label="取引先名1"
      :value="name1"
      required
      @input="$emit('update:name1', $event)"
    />
    <a-text-field-customer-name
      label="取引先名2"
      :value="name2"
      @input="$emit('update:name2', $event)"
    />
    <a-text-field-customer-abbr
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
    <a-text-field-customer-abbr-kana
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
    <a-text-field-honor
      :value="honor"
      required
      @input="$emit('update:honor', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6" md="3">
        <a-select-deadline
          :value="deadline"
          required
          @input="$emit('update:deadline', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-numeric-deposit-month
          :value="depositMonth"
          required
          suffix="ヶ月後"
          @input="$emit('update:depositMonth', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-select-deadline
          label="入金日"
          :value="depositDay"
          required
          @input="$emit('update:depositDay', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-select-rounding
          :value="rounding"
          required
          @input="$emit('update:rounding', $event)"
        />
      </v-col>
    </v-row>
    <a-radio-group-customer-condition
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
