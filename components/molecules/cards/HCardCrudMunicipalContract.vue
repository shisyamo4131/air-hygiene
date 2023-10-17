<script>
import ACardFormInput from '../../atoms/cards/ACardFormInput.vue'
import HInputMunicipalContract from '../inputs/HInputMunicipalContract.vue'
import HSimpleTableMunicipalContract from '../tables/HSimpleTableMunicipalContract.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputMunicipalContract,
    HSimpleTableMunicipalContract,
    ACardFormInput,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    editMode: {
      type: String,
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
    model: { type: Object, default: null, required: false },
    siteId: { type: String, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      onboarding: 0,
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onSubmitted() {
      this.onboarding = 0
      this.$refs.form.initialize()
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
        <a-card-form-input
          ref="form"
          :args="[siteId]"
          collection="MunicipalContract"
          :edit-mode="editMode"
          :model="model"
          @click:cancel="onboarding = 0"
          @submitted="onSubmitted"
        >
          <template #default="{ attrs, on }">
            <h-input-municipal-contract v-bind="attrs" v-on="on" />
          </template>
        </a-card-form-input>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style></style>
