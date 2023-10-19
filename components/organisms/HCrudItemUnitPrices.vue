<script>
/**
 * @author shisyamo4131
 */
import HInputItemUnitPrice from '../molecules/inputs/HInputItemUnitPrice.vue'
import HDataTableItemUnitPrices from '../molecules/tables/HDataTableItemUnitPrices.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HDataTableItemUnitPrices, HInputItemUnitPrice },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    value: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editor: false,
      editIndex: -1,
      editModel: this.$ItemUnitPrice(),
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      if (v) return
      this.editIndex = -1
      this.editModel.initialize()
      this.$refs.form.resetValidation()
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onClickEdit(index) {
      this.editIndex = index
      this.editModel.initialize({ ...this.value[this.editIndex] })
      this.editor = true
    },
    onClickDelete(index) {
      const result = this.value.filter((_, i) => i !== index)
      this.$emit('input', result)
    },
    validate() {
      const result = !this.value.some(({ key }) => key === this.editModel.key)
      if (!result) {
        alert('既に登録されている品目と単位の組み合わせです。')
      }
      return result
    },
    submit() {
      if (!this.validate()) return
      const result = this.value.map((item) => item)
      const data = { ...this.editModel }
      if (this.editIndex === -1) {
        result.push(data)
      } else {
        result.splice(this.editIndex, 1, data)
      }
      this.$emit('input', result)
      this.editor = false
    },
  },
}
</script>

<template>
  <h-data-table-item-unit-prices
    :items="value"
    hide-default-footer
    :items-per-page="-1"
    show-actions
    @click:edit="onClickEdit($event)"
    @click:delete="onClickDelete($event)"
  >
    <template #top>
      <v-toolbar dense flat>
        <v-toolbar-title>品目別請求単価</v-toolbar-title>
        <v-divider inset vertical class="mx-4" />
        <v-spacer />
        <v-dialog v-model="editor" persistent max-width="360">
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" icon v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <air-card-form-input
            ref="form"
            @click:cancel="editor = false"
            @click:submit="submit"
          >
            <v-card-text>
              <h-input-item-unit-price v-bind.sync="editModel" />
            </v-card-text>
          </air-card-form-input>
        </v-dialog>
      </v-toolbar>
    </template>
  </h-data-table-item-unit-prices>
</template>

<style></style>
