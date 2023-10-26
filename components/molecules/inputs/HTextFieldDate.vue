<script>
/**
 * ### HTextFieldDate
 * 日付選択入力用コンポーネント
 * #### NOTE
 * - 日付選択中のvalidationが煩わしいため、DatePickerが起動している間はprops.requiredを無視します。
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import ADatePicker from '~/components/atoms/pickers/ADatePicker.vue'
export default {
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  components: { ADatePicker, ATextField },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    calendarIcon: { type: String, default: 'mdi-calendar', required: false },
    required: { type: Boolean, default: false, required: false },
    value: {
      type: String,
      default: '',
      validator: (v) => {
        if (!v) return true
        const date = new Date(v)
        const [year, month, day] = v.split('-')
        return (
          parseInt(year) === date.getFullYear() &&
          parseInt(month) === date.getMonth() + 1 &&
          parseInt(day) === date.getDate()
        )
      },
      required: false,
    },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      menu: false,
      pickerDate: '',
      internalRequired: false,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    menu(v) {
      if (v) {
        this.pickerDate = this.value
        this.internalRequired = false
      } else {
        this.internalRequired = this.required
      }
    },
    required: {
      handler(v) {
        this.internalRequired = v
      },
      immediate: true,
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onClickSubmit() {
      this.$emit('input', this.pickerDate)
      this.menu = false
      // ユーザーの操作として判断されないため、強制的にchangeイベントをemit
      this.$nextTick(() => {
        this.$emit('change', this.pickerDate)
      })
    },
  },
}
</script>

<template>
  <a-text-field
    v-bind="$attrs"
    readonly
    :value="value"
    :required="internalRequired"
    @click.stop="menu = true"
    v-on="$listeners"
  >
    <template #prepend>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        offset-y
        max-width="290"
        transition="scale-transition"
      >
        <template #activator="{ attrs, on }">
          <v-icon v-bind="attrs" v-on="on">{{ calendarIcon }}</v-icon>
        </template>
        <a-date-picker v-model="pickerDate" no-title>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="onClickSubmit"> Submit </v-btn>
        </a-date-picker>
      </v-menu>
    </template>
  </a-text-field>
</template>

<style></style>
