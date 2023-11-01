<script>
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    itemKey: { type: String, default: 'id', required: false },
    model: { type: String, required: true },
    value: { type: Array, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editIndex: -1,
      editModel: this[`$${this.model}`](),
      editor: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    editMode() {
      return this.editIndex === -1 ? 'REGIST' : 'UPDATE'
    },
    internalValue: {
      get() {
        return this.value.map((item) => item)
      },
      set(v) {
        this.$emit('input', v)
      },
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      if (v) return
      this.editIndex = -1
      this.editModel.initialize()
      this.resetValidation()
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    resetValidation() {
      const form = this.$refs?.form || undefined
      if (form) form.resetValidation()
    },
    getIndex(item) {
      const result = this.internalValue.findIndex(
        (v) => v[this.itemKey] === item[this.itemKey]
      )
      return result
    },
    onClickRegist() {
      this.editor = true
    },
    onClickEdit(item) {
      const index = this.getIndex(item)
      if (index === -1) {
        /* eslint-disable */
        console.error(
          `[AMixinArrayInput] Could not find index of specified item.`
        )
        console.table(item)
        /* eslint-enable */
        alert(`Could not find index of specified item.`)
        return
      }
      this.editIndex = index
      this.editModel.initialize(item)
      this.editor = true
    },
    onClickDelete(item) {
      const index = this.getIndex(item)
      if (index === -1) {
        /* eslint-disable */
        console.error(
          `[AMixinArrayInput] Could not find index of specified item.`
        )
        console.table(item)
        /* eslint-enable */
        alert(`Could not find index of specified item.`)
        return
      }
      this.internalValue = this.value.filter((_, i) => i !== index)
    },
    async onClickSubmit() {
      const result = this.internalValue
      const data = { ...this.editModel }
      if (this.editIndex === -1) {
        if (!(await this.beforeRegist())) return
        result.push(data)
      } else {
        if (!(await this.beforeUpdate())) return
        result.splice(this.editIndex, 1, data)
      }
      this.internalValue = result
      this.editor = false
    },
    beforeRegist() {
      return new Promise((resolve) => resolve(true))
    },
    beforeUpdate() {
      return new Promise((resolve) => resolve(true))
    },
  },
}
</script>
