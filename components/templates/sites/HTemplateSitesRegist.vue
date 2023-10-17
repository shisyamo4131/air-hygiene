<script>
/**
 * @author shisyamo4131
 */
import HInputSite from '~/components/molecules/inputs/HInputSite.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HInputSite },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {},
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$Site(this.customerId),
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    afterSubmit(mode) {
      return new Promise((resolve) => {
        if (mode === 'REGIST' || mode === 'UPDATE') {
          this.$router.replace(`/sites/${this.editModel.docId}`)
        } else {
          this.$router.replace(`/sites`)
        }
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="排出場所追加"
    edit-mode="REGIST"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-site v-bind.sync="editModel" :edit-mode="editMode" />
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
