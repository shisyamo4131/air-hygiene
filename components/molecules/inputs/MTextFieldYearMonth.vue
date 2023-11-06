<script>
import ADatePicker from '~/components/atoms/pickers/ADatePicker.vue'
export default {
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  components: { ADatePicker },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    calendarIcon: { type: String, default: 'mdi-calendar', required: false },
    nextIcon: { type: String, default: 'mdi-chevron-right', required: false },
    prevIcon: { type: String, default: 'mdi-chevron-left', required: false },
    todayIcon: { type: String, default: 'mdi-circle-medium', required: false },
    todayLabel: { type: String, default: '今月', required: false },
    width: { type: [String, Number], default: '120', required: false },
    value: {
      type: String,
      default: '',
      validator: (v) => {
        const date = new Date(`${v}-01`)
        const [year, month] = v.split('-')
        return (
          parseInt(year) === date.getFullYear() &&
          parseInt(month) === date.getMonth() + 1
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
      dialog: false,
      pickerDate: '',
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    dialog(v) {
      if (v) this.pickerDate = this.value
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    prev() {
      this.$emit(
        'input',
        this.$dayjs(this.value).subtract(1, 'month').format('YYYY-MM')
      )
    },
    current() {
      this.$emit('input', this.$dayjs().format('YYYY-MM'))
    },
    next() {
      this.$emit(
        'input',
        this.$dayjs(this.value).add(1, 'month').format('YYYY-MM')
      )
    },
    onClickSubmit() {
      this.$emit('input', this.pickerDate)
      this.dialog = false
    },
  },
}
</script>

<template>
  <div class="d-flex align-center">
    <div :style="{ width: `${parseInt(width)}px` }">
      <air-text-field
        class="center-input mr-2"
        v-bind="$attrs"
        readonly
        :value="value"
        @click.stop="dialog = true"
        v-on="$listeners"
      >
        <template #prepend>
          <v-dialog
            v-model="dialog"
            :close-on-content-click="false"
            offset-y
            max-width="290"
            transition="scale-transition"
          >
            <template #activator="{ attrs, on }">
              <v-icon v-bind="attrs" v-on="on">{{ calendarIcon }}</v-icon>
            </template>
            <a-date-picker v-model="pickerDate" type="month" no-title>
              <v-btn text color="primary" @click="dialog = false">
                Cancel
              </v-btn>
              <v-spacer />
              <v-btn text color="primary" @click="onClickSubmit">
                Submit
              </v-btn>
            </a-date-picker>
          </v-dialog>
        </template>
      </air-text-field>
    </div>
    <v-btn icon class="mr-2" @click="prev">
      <v-icon>{{ prevIcon }}</v-icon>
    </v-btn>
    <v-btn class="mr-2" outlined small @click="current">{{ todayLabel }}</v-btn>
    <v-btn icon @click="next">
      <v-icon>{{ nextIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<style></style>
