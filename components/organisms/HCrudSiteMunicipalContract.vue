<script>
import HInputMunicipalContract from '../molecules/inputs/HInputMunicipalContract.vue'
import HSimpleTableMunicipalContract from '../molecules/tables/HSimpleTableMunicipalContract.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputMunicipalContract,
    HSimpleTableMunicipalContract,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    siteId: { type: String, required: true },
    model: { type: Object, default: null, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$SiteMunicipalContract(this.siteId),
      isDelete: false,
      onboarding: 0,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    editMode() {
      const docId = this.model?.docId || ''
      if (!docId) return 'REGIST'
      if (this.isDelete) return 'DELETE'
      return 'UPDATE'
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    onboarding(v) {
      if (v === 0) {
        this.editModel.initialize(this.model)
        this.isDelete = false
        this.$refs.form.resetValidation()
      }
    },
    model: {
      handler(v) {
        this.editModel.initialize(v)
      },
      immediate: true,
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    validate() {
      return true
    },
    async submit(mode) {
      try {
        if (mode === 'REGIST') await this.editModel.create()
        if (mode === 'UPDATE') await this.editModel.update()
        if (mode === 'DELETE') await this.editModel.delete()
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      }
    },
    async onClickSubmit() {
      if (!this.isDelete && !this.validate()) return
      await this.submit(this.editMode)
      this.onboarding = 0
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs">
    <v-window v-model="onboarding">
      <v-window-item>
        <v-card v-if="!model?.docId || ''" outlined>
          <v-card-actions>
            <v-btn block color="primary" text @click="onboarding = 1">
              新しい契約を追加する
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else outlined>
          <h-simple-table-municipal-contract v-bind="model" />
          <v-card-actions>
            <v-btn block color="primary" text @click="onboarding = 1">
              契約内容を編集する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item>
        <air-card-form-input
          ref="form"
          @click:cancel="onboarding = 0"
          @click:submit="onClickSubmit"
        >
          <v-card-text>
            <h-input-municipal-contract v-bind.sync="editModel" />
            <a-switch
              v-if="editMode !== 'REGIST'"
              v-model="isDelete"
              label="この契約を削除する"
            />
          </v-card-text>
        </air-card-form-input>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style></style>
