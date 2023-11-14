<script>
/**
 * ### HTemplateArrayInput
 *
 * @author shisyamo4131
 */
import HCardFormInput from '../molecules/cards/HCardFormInput.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HCardFormInput },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    dialogProps: { type: Object, default: undefined, required: false },
    itemKey: { type: String, default: 'id', required: false },
    model: { type: String, required: true },
    value: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editIndex: -1,
      editItem: null,
      editor: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    dataTableAttrs() {
      return {
        items: this.value,
        showRegistBtn: true,
      }
    },
    dataTableOn() {
      return {
        'click:regist': () => {
          this.editor = true
        },
        'click:row': ($event) => {
          this.editItem.initialize($event)
          this.editIndex = this.value.findIndex((item) => item === $event)
          this.editor = true
        },
      }
    },
    defaultAttrs() {
      return { ...this.editItem, editMode: this.editMode }
    },
    defaultOn() {
      const result = {}
      Object.keys(this.editItem).forEach((key) => {
        result[`update:${key}`] = ($event) => {
          this.editItem[key] = $event
        }
      })
      return result
    },
    duplicated() {
      if (!(this.editItem?.[this.itemKey] || undefined)) return false
      const itemKey = this.itemKey
      if (this.editMode === 'REGIST') {
        return this.value.some(
          (item) => item[itemKey] === this.editItem[itemKey]
        )
      }
      if (this.editMode === 'UPDATE') {
        return this.value.some((item, index) => {
          return (
            item[itemKey] === this.editItem[itemKey] && index !== this.editIndex
          )
        })
      }
      return false
    },
    editMode() {
      if (this.editIndex === -1) return 'REGIST'
      return 'UPDATE'
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      v || this.initialize()
    },
    model: {
      handler(v) {
        this.editItem = this[`$${v}`]()
      },
      immediate: true,
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      this.editItem.initialize()
      this.editIndex = -1
      this.$refs.form.initialize()
    },
    onClickSubmit(mode) {
      if (mode !== 'DELETE' && !this.$refs.form.validate()) return
      if (mode !== 'DELETE' && this.duplicated) {
        alert('重複して登録することはできません。')
        return
      }
      const result = this.value.map((item) => item)
      const item = JSON.parse(JSON.stringify(this.editItem))
      if (mode === 'REGIST') result.push(item)
      if (mode === 'UPDATE') result.splice(this.editIndex, 1, item)
      if (mode === 'DELETE') result.splice(this.editIndex, 1)
      this.$emit('input', result)
      this.editor = false
    },
  },
}
</script>

<template>
  <div>
    <v-dialog v-model="editor" v-bind="dialogProps">
      <h-card-form-input
        ref="form"
        :edit-mode="editMode"
        @click:cancel="editor = false"
        @click:submit="onClickSubmit"
      >
        <slot
          name="default"
          v-bind="{ attrs: defaultAttrs, on: defaultOn, duplicated }"
        />
      </h-card-form-input>
    </v-dialog>
    <slot
      name="data-table"
      v-bind="{ attrs: dataTableAttrs, on: dataTableOn }"
    />
  </div>
</template>

<style></style>
