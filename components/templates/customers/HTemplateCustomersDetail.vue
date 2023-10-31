<script>
/**
 * @author shisyamo4131
 */
import HSimpleTableCustomer from '~/components/atoms/tables/HSimpleTableCustomer.vue'
export default {
  components: { HSimpleTableCustomer },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    model: { type: Object, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      tabs: ['Dashboard', '登録情報'],
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    sites() {
      return []
      // return this.$store.state.masters.Sites.filter(
      //   ({ customer }) => customer.docId === this.model.docId
      // )
    },
  },
}
</script>

<template>
  <air-template-tabs
    :label="model.abbr"
    :tabs="tabs"
    :tabs-props="{ grow: true }"
  >
    <template #prepend-label>
      <v-btn icon @click="$router.push(`/customers`)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <template #append-label>
      <v-btn icon @click="$router.push(`/customers/${model.docId}/edit`)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template #tab-0>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card outlined>
              <v-card-title>{{ model.name1 }}</v-card-title>
              <v-card-subtitle>{{ model.name2 }}</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card outlined class="mt-4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-2">
                    排出場所
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-sheet
                    class="rounded d-flex justify-center"
                    width="36"
                    height="36"
                    color="primary"
                  >
                    <v-icon>mdi-truck-fast</v-icon>
                  </v-sheet>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-end">
                    <div>
                      <span class="text-h6">{{ sites.length }}</span>
                      件
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #tab-1>
      <v-container>
        <v-card outlined>
          <h-simple-table-customer v-bind="model" />
        </v-card>
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
