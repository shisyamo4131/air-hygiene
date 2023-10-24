<template>
  <air-template-default>
    <template #default="{ height }">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-form ref="form" :disabled="loading">
              <h-input-collection-result v-bind.sync="editModel" />
            </v-form>
            <v-toolbar dense>
              <v-spacer />
              <v-btn icon :disabled="loading" @click="onClickCancel"
                ><v-icon>mdi-cancel</v-icon></v-btn
              >
              <v-btn
                icon
                :disabled="loading"
                :loading="loading"
                @click="onClickSubmit"
                ><v-icon>mdi-check</v-icon></v-btn
              >
            </v-toolbar>
          </v-col>
          <v-col cols="12">
            <h-data-table-collection-results
              :site-id="editModel.siteId"
              :height="height - 514"
              show-actions
              @click:edit="onClickEdit($event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </air-template-default>
</template>

<script>
import HInputCollectionResult from '~/components/molecules/inputs/HInputCollectionResult.vue'
import HDataTableCollectionResults from '~/components/molecules/tables/HDataTableCollectionResults.vue'
export default {
  components: { HInputCollectionResult, HDataTableCollectionResults },
  data() {
    return {
      editMode: 'REGIST',
      editModel: this.$CollectionResult(),
      loading: false,
    }
  },
  mounted() {
    this.editModel.siteId = '7gnxO7e2mGX8T02jS5cw'
  },
  methods: {
    initialize() {
      const { date, siteId } = { ...this.editModel }
      this.editModel.initialize({ date, siteId })
      this.$refs.form.resetValidation()
      this.editMode = 'REGIST'
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) {
        alert('入力に不備があります')
      }
      return result
    },
    async onClickSubmit() {
      try {
        this.loading = true
        if (!this.validate()) return
        if (this.editMode === 'REGIST') await this.editModel.create()
        if (this.editMode === 'UPDATE') await this.editModel.update()
        this.initialize()
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    onClickCancel() {
      this.initialize()
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      this.editModel.initialize(item)
    },
  },
}
</script>

<style></style>
