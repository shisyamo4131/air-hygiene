<script>
/**
 * @author shisyamo4131
 */
import HDataTableCollectionResultDetails from '../../atoms/tables/HDataTableCollectionResultDetails.vue'
import HInputCollectionResultDetail from './HInputCollectionResultDetail.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HDataTableCollectionResultDetails,
    HInputCollectionResultDetail,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    siteId: { type: String, default: '', required: false },
    date: { type: String, default: '', required: false },
    value: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editor: false,
      editIndex: -1,
      editModel: this.$CollectionResultDetail(),
      loading: {
        unitPrice: false,
      },
      unwatch: false,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    siteId: {
      handler(v) {
        this.editModel.siteId = v
      },
      immediate: true,
    },
    date: {
      handler(v) {
        this.editModel.date = v
      },
    },
    'editModel.collectItemId'(v) {
      if (this.unwatch) return
      this.setUnitPrice()
    },
    'editModel.unitId'(v) {
      if (this.unwatch) return
      this.setUnitPrice()
    },
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
      this.unwatch = true
      this.editModel.initialize({ ...this.value[this.editIndex] })
      this.$nextTick(() => {
        this.unwatch = false
        this.editor = true
      })
    },
    onClickDelete(index) {
      const result = this.value.filter((_, i) => i !== index)
      this.$emit('input', result)
    },
    validate() {
      const duplicated = this.value.some(({ id }) => id === this.editModel.id)
      if (this.editIndex === -1 && duplicated) {
        alert('既に登録されている回収品目と単位の組み合わせです。')
        return false
      }
      return true
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
    async setUnitPrice() {
      try {
        this.loading.unitPrice = true
        await this.editModel.setUnitPrice()
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading.unitPrice = false
      }
    },
  },
}
</script>

<template>
  <h-data-table-collection-result-details
    :items="value"
    hide-default-footer
    :items-per-page="-1"
    show-actions
    :disable-edit="disabled"
    :disable-delete="disabled"
    @click:edit="onClickEdit($event)"
    @click:delete="onClickDelete($event)"
  >
    <template #top>
      <v-toolbar color="accent" class="rounded" dense flat>
        <v-toolbar-title class="text-subtitle-1">回収実績明細</v-toolbar-title>
        <v-divider inset vertical class="mx-4" />
        <v-spacer />
        <v-dialog v-model="editor" persistent max-width="360">
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" :disabled="disabled" icon v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <air-card-form-input
            ref="form"
            :loading="disabled"
            outlined
            @click:cancel="editor = false"
            @click:submit="submit"
          >
            <v-card-text>
              <h-input-collection-result-detail
                v-bind.sync="editModel"
                :edit-mode="editIndex === -1 ? 'REGIST' : 'UPDATE'"
                :loading-unit-price="loading.unitPrice"
              />
            </v-card-text>
          </air-card-form-input>
        </v-dialog>
      </v-toolbar>
    </template>
  </h-data-table-collection-result-details>
</template>

<style></style>
