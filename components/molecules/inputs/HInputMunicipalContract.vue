<script>
/**
 * @create 2023-10-07
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ATextField, ATextarea, ANumeric, ASelect },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    date: { type: String, default: '', required: false },
    unitPrice: { type: Number, default: null, required: false },
    average: { type: Number, default: null, required: false },
    frequency: { type: Number, default: null, required: false },
    preMethod: { type: String, default: '', required: false },
    prefCode: { type: String, default: '', required: false },
    cityCode: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    prefCode(newVal, oldVal) {
      if (newVal !== oldVal) this.$emit('update:cityCode', '')
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
      label="契約日"
      :value="date"
      required
      input-type="date"
      @input="$emit('update:date', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6">
        <a-numeric
          label="契約単価（税抜）"
          :value="unitPrice"
          required
          suffix="円/kg"
          decimal-places="2"
          class="right-input"
          @input="$emit('update:unitPrice', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <a-numeric
          label="月平均収集量"
          :value="average"
          required
          suffix="kg/月"
          class="right-input"
          @input="$emit('update:average', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <a-numeric
          label="月平均収集回数"
          :value="frequency"
          required
          suffix="回/月"
          class="right-input"
          @input="$emit('update:frequency', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <a-select
          label="契約前収集形態"
          :value="preMethod"
          required
          :items="$PRE_METHOD_ARRAY"
          @input="$emit('update:preMethod', $event)"
        />
      </v-col>
    </v-row>
    <a-select
      label="都道府県"
      :value="prefCode"
      required
      :items="$PREFECTURE_ARRAY"
      @input="$emit('update:prefCode', $event)"
    />
    <a-select
      label="市区町村"
      :value="cityCode"
      required
      :items="$CITY_ARRAY(prefCode)"
      item-text="name"
      item-value="code"
      @input="$emit('update:cityCode', $event)"
    />
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
