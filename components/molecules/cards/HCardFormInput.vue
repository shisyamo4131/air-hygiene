<script>
/**
 * ### HCardFormInput
 *
 * @author shisyamo4131
 */
import HBtnCancel from '../btns/HBtnCancel.vue'
import HBtnSubmit from '../btns/HBtnSubmit.vue'
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HBtnSubmit, HBtnCancel, ASwitch },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    disableDelete: { type: Boolean, default: false, required: false },
    editMode: {
      type: String,
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
    label: { type: String, default: undefined, required: false },
    loading: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      isDelete: false,
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      this.$refs.form.resetValidation()
      this.isDelete = false
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります')
      return result
    },
  },
}
</script>

<template>
  <v-card outlined>
    <v-card-title>{{ label }}</v-card-title>
    <v-card-text class="pt-2">
      <v-form ref="form" :disabled="loading">
        <slot name="default" v-bind="{ editMode, loading }" />
        <div v-if="editMode !== 'REGIST'" class="d-flex justify-end">
          <a-switch
            v-model="isDelete"
            color="red"
            :disabled="disableDelete"
            hide-details
            label="削除する"
          />
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <h-btn-cancel :disabled="loading" @click="$emit('click:cancel')" />
      <v-spacer />
      <h-btn-submit
        :color="isDelete ? 'red' : 'primary'"
        :disabled="loading"
        :loading="loading"
        @click="$emit('click:submit', isDelete ? 'DELETE' : editMode)"
      />
    </v-card-actions>
  </v-card>
</template>

<style></style>
