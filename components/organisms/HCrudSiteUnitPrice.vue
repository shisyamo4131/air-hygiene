<script>
import HInputSiteUnitPrices from '../molecules/inputs/HInputSiteUnitPrices.vue'
import HDataTableItemUnitPrices from '../molecules/tables/HDataTableItemUnitPrices.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputSiteUnitPrices,
    HDataTableItemUnitPrices,
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
      onboarding: 0,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    onboarding(v) {
      if (v === 0) {
        this.editModel.initialize(this.model)
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
    async onClickSubmit() {
      await this.editModel.create()
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
          </v-card-text>
        </air-card-form-input>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style></style>
