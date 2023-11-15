<script>
/**
 * @author shisyamo4131
 */
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import ARadioGroup from '~/components/atoms/inputs/ARadioGroup.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    ARadioGroup,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    status: { type: String, default: '', required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      rules: {
        length: (v) => /^\d{3}$/.test(v) || '半角数字3桁で入力',
        duplicated: (v) =>
          this.editMode !== 'REGIST' ||
          !this.duplicated ||
          '既に使わているCODEです。',
      },
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    duplicated() {
      return this.$store.state.masters.Roots.some(({ code }) => {
        return code === this.code
      })
    },
  },
}
</script>

<template>
  <div>
    <a-text-field
      label="CODE"
      :value="code"
      required
      :disabled="editMode !== 'REGIST'"
      counter
      hint="3桁で入力"
      max-length="3"
      :rules="[rules.length, rules.duplicated]"
      @input="$emit('update:code', $event)"
    />
    <a-text-field
      label="回収ルート名"
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <a-radio-group
      v-if="editMode !== 'REGIST'"
      class="mt-0"
      :value="status"
      :items="$ROOT_STATUS_ARRAY"
      row
      @change="$emit('update:status', $event)"
    />
  </div>
</template>

<style></style>
