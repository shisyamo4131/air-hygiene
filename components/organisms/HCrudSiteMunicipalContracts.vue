<script>
/**
 * ### HCrudSiteMunicipalContract
 *
 * #### PROPERTIES
 *
 * | name   | type   | default | required | remarks |
 * | :----- | :----- | ------- | :------: | :------ |
 * | siteId | string | -       | true     |         |
 * | items  | array  | []      | false    |         |
 *
 * @author shisyamo4131
 */
import ASwitch from '../atoms/inputs/ASwitch.vue'
import HSimpleTableSiteMunicipalContract from '../atoms/tables/HSimpleTableSiteMunicipalContract.vue'
import HInputSiteMunicipalContract from '../molecules/inputs/HInputSiteMunicipalContract.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputSiteMunicipalContract,
    ASwitch,
    HSimpleTableSiteMunicipalContract,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    siteId: { type: String, required: true },
    items: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editor: false,
      editMode: 'REGIST',
      editModel: this.$SiteMunicipalContract(),
      isDelete: false,
      loading: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalItems() {
      return this.items
        .map((item) => item)
        .sort((a, b) => {
          if (a.date < b.date) return 1
          if (a.date > b.date) return -1
          return 0
        })
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      if (!v) this.initialize()
    },
    siteId: {
      handler(v) {
        this.editModel.siteId = v
      },
      immediate: true,
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      const { siteId } = { ...this.editModel }
      this.editModel.initialize({ siteId })
      this.$refs.form.resetValidation()
      this.editMode = 'REGIST'
      this.isDelete = false
    },
    validate() {
      if (!this.editModel.details.length) {
        alert('少なくとも1つ以上の単価を登録してください。')
        return false
      }
      return true
    },
    async submit(mode) {
      try {
        if (mode !== 'DELETE' && !this.validate()) return
        this.loading = true
        if (mode === 'REGIST') await this.editModel.create()
        if (mode === 'UPDATE') await this.editModel.update()
        if (mode === 'DELETE') await this.editModel.delete()
        this.editor = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    async onClickSubmit() {
      const mode = this.isDelete ? 'DELETE' : this.editMode
      await this.submit(mode)
    },
    onClickCancel() {
      this.editor = false
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      this.editModel.initialize(item)
      this.editor = true
    },
  },
}
</script>

<template>
  <v-timeline align-top :dense="$vuetify.breakpoint.mobile">
    <v-timeline-item>
      <v-card outlined>
        <v-card-actions>
          <v-dialog v-model="editor" persistent max-width="480">
            <template #activator="{ attrs, on }">
              <v-btn v-bind="attrs" block color="primary" text v-on="on">
                新しい契約を追加する
              </v-btn>
            </template>
            <air-card-form-input
              ref="form"
              :disabled="loading"
              outlined
              @click:cancel="onClickCancel"
              @click:submit="onClickSubmit"
            >
              <v-card-text>
                <h-input-site-municipal-contract
                  v-bind.sync="editModel"
                  :edit-mode="editMode"
                />
                <a-switch
                  v-if="editMode !== 'REGIST'"
                  v-model="isDelete"
                  label="この契約を削除する"
                />
              </v-card-text>
            </air-card-form-input>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-timeline-item>
    <v-timeline-item v-for="(item, index) of internalItems" :key="index">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $dayjs(item.date).format('YYYY年MM月DD日') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <h-simple-table-site-municipal-contract v-bind="item" />
        <v-card-actions>
          <v-btn block color="primary" text @click="onClickEdit(item)">
            契約を編集する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<style></style>
