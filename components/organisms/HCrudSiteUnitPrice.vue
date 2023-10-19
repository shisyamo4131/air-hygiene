<script>
import ASwitch from '../atoms/inputs/ASwitch.vue'
import HInputSiteUnitPrices from '../molecules/inputs/HInputSiteUnitPrices.vue'
import HDataTableItemUnitPrices from '../molecules/tables/HDataTableItemUnitPrices.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputSiteUnitPrices,
    HDataTableItemUnitPrices,
    ASwitch,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    model: { type: Object, default: null, required: false },
    siteId: { type: String, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$SiteUnitPrice(this.siteId),
      isDelete: false,
      onboarding: 0,
    }
  },
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
      if (!this.editModel.prices.length) {
        alert('少なくとも1つ以上の単価を登録してください。')
        return false
      }
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
          <v-card-title>{{ model.date }}</v-card-title>
          <h-data-table-item-unit-prices
            :items="model.prices"
            hide-default-footer
            :items-per-page="-1"
          />
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
            <h-input-site-unit-prices v-bind.sync="editModel" />
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
