<script>
/**
 * @author shisyamo4131
 */
import MInputSite from '~/components/molecules/inputs/MInputSite.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'

export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { MInputSite },
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
      editModel: this.$Site(),
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
    label="排出場所編集"
    :edit-mode="editMode"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #itembar-items> </template>
    <template #default="{ editMode }">
      <v-card-text>
        <m-input-site v-bind.sync="editModel" :edit-mode="editMode" />
        <air-dialog-confirm-delete
          v-if="editMode !== 'REGIST'"
          @click:delete="onClickDelete"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              color="error"
              :disabled="loading"
              small
              v-on="on"
              >削除する</v-btn
            >
          </template>
        </air-dialog-confirm-delete>
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
