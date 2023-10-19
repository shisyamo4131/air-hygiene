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
import ARadioGroup from '~/components/atoms/inputs/ARadioGroup.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    HTextFieldZipcode,
    ASelect,
    ANumeric,
    ATextarea,
    ARadioGroup,
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
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    condition(v) {
      if (v === 'active') this.$emit('update:dateExpired', '')
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
    <v-row dense>
      <v-col cols="12" sm="6" md="3">
        <a-select
          label="締日"
          :value="deadline"
          :items="$DEADLINE_ARRAY"
          required
          @input="$emit('update:deadline', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-numeric
          label="入金日"
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
          :items="$DEADLINE_ARRAY"
          required
          @input="$emit('update:depositDay', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <a-select
          label="端数処理"
          :value="rounding"
          :items="$ROUNDING_ARRAY"
          required
          @input="$emit('update:rounding', $event)"
        />
      </v-col>
    </v-row>
    <a-radio-group
      class="mt-0"
      :value="condition"
      row
      @change="$emit('update:condition', $event)"
    >
      <v-radio
        v-for="(item, index) of $CUSTOMER_CONDITION_ARRAY"
        :key="index"
        :label="item.text"
        :value="item.value"
      />
    </a-radio-group>
    <v-expand-transition>
      <a-text-field
        v-show="condition === 'expired'"
        label="契約満了日"
        :value="dateExpired"
        :required="condition === 'expired'"
        input-type="date"
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
