<script>
/**
 * ### HTemplateEditor
 *
 * @author shisyamo4131
 */
import HBtnCancel from '../molecules/btns/HBtnCancel.vue'
import HBtnSubmit from '../molecules/btns/HBtnSubmit.vue'
import HTemplateDefault from './HTemplateDefault.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateDefault, HBtnCancel, HBtnSubmit },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    editMode: {
      type: String,
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
    loading: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {}
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    footerHeight() {
      return 48
      // if (this.$vuetify.breakpoint.smAndDown) return 56
      // return 64
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
  },
}
</script>

<template>
  <h-template-default
    v-bind="$attrs"
    :footer-height="footerHeight"
    v-on="$listeners"
  >
    <template #prepend-toolbar>
      <slot name="prepend-toolbar" />
    </template>
    <template #append-toolbar>
      <slot name="append-toolbar" />
    </template>
    <template #header="{ height }">
      <slot name="header" v-bind="{ height }" />
    </template>
    <template #default="{ height }">
      <v-container fluid class="pt-5">
        <v-form ref="form" :disabled="loading">
          <slot name="default" v-bind="{ editMode, height, loading }" />
        </v-form>
      </v-container>
    </template>
    <template #footer>
      <v-toolbar dense>
        <h-btn-cancel :disabled="loading" @click="$emit('click:cancel')" />
        <v-spacer />
        <h-btn-submit
          :disabled="loading"
          :loading="loading"
          @click="$emit('click:submit', editMode)"
        />
      </v-toolbar>
    </template>
  </h-template-default>
</template>

<style></style>
