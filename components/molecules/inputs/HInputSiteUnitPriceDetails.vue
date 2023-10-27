<script>
/**
 * @author shisyamo4131
 */
import HDataTableSiteUnitPriceDetails from '../tables/HDataTableSiteUnitPriceDetails.vue'
import HInputSiteUnitPriceDetail from './HInputSiteUnitPriceDetail.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HDataTableSiteUnitPriceDetails, HInputSiteUnitPriceDetail },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
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
      editModel: this.$SiteUnitPriceDetail(),
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
    submit() {
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
  <h-data-table-site-unit-price-details
    :items="value"
    hide-default-footer
    :items-per-page="-1"
    show-actions
    @click:edit="onClickEdit($event)"
    @click:delete="onClickDelete($event)"
  >
    <template #top>
      <v-toolbar color="accent" class="rounded" dense flat>
        <v-toolbar-title class="text-subtitle-1"
          >品目別請求単価</v-toolbar-title
        >
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
            outlined
            @click:cancel="editor = false"
            @click:submit="submit"
          >
            <v-card-text>
              <h-input-site-unit-price-detail
                v-bind.sync="editModel"
                :edit-mode="editIndex === -1 ? 'REGIST' : 'UPDATE'"
              />
            </v-card-text>
          </air-card-form-input>
        </v-dialog>
      </v-toolbar>
    </template>
  </h-data-table-site-unit-price-details>
</template>

<style></style>
