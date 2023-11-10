<script>
/**
 * @author shisyamo4131
 */
import ATextFieldZipcode from '../../atoms/inputs/ATextFieldZipcode.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import ATextFieldDate from '~/components/atoms/inputs/ATextFieldDate.vue'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import ARadioGroup from '~/components/atoms/inputs/ARadioGroup.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextFieldZipcode,
    ATextarea,
    ATextFieldDate,
    ASelect,
    ARadioGroup,
    ATextField,
    ANumeric,
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
    status: { type: String, default: '', required: false },
    dateExpired: { type: String, default: '', required: false },
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
    <v-row dense>
      <v-col cols="12" sm="6">
        <a-text-field
          label="電話番号"
          :value="tel"
          input-type="tel"
          @input="$emit('update:tel', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <a-text-field
          label="FAX番号"
          :value="fax"
          input-type="tel"
          @input="$emit('update:fax', $event)"
        />
      </v-col>
    </v-row>
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
    <a-text-field
      label="敬称"
      :value="honor"
      required
      hint="請求書の宛名に印字されます。"
      persistent-hint
      @input="$emit('update:honor', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6" md="3">
        <a-select
          label="締日"
          :value="deadline"
          required
          :items="$DEADLINE_ARRAY"
          @input="$emit('update:deadline', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-numeric
          label="入金月"
          class="right-input"
          :value="depositMonth"
          required
          suffix="ヶ月後"
          @input="$emit('update:depositMonth', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-select
          label="入金日"
          :value="depositDay"
          required
          :items="$DEADLINE_ARRAY"
          @input="$emit('update:depositDay', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-select
          label="端数処理"
          :items="$ROUNDING_ARRAY"
          :value="rounding"
          required
          @input="$emit('update:rounding', $event)"
        />
      </v-col>
    </v-row>
    <a-radio-group
      v-if="editMode !== 'REGIST'"
      class="mt-0"
      :value="status"
      :items="$CUSTOMER_STATUS_ARRAY"
      row
      @change="$emit('update:status', $event)"
    />
    <v-expand-transition>
      <a-text-field-date
        v-show="status === 'expired'"
        label="契約満了日"
        :value="dateExpired"
        :required="status === 'expired'"
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
