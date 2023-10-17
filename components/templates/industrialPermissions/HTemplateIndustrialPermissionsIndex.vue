<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import HCardIndexIndustrialPermission from '~/components/molecules/cards/HCardIndexIndustrialPermission.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HCardIndexIndustrialPermission, ASwitch },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    items: { type: Array, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      includeExpired: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    filteredItems() {
      const today = this.$dayjs().format('YYYY-MM-DD')
      const result = this.items
        .filter((item) => {
          if (this.includeExpired) return true
          return item.dateOfExpiration >= today
        })
        .sort((a, b) => {
          if (a.areaCode < b.areaCode) return -1
          if (a.areaCode > b.areaCode) return 1
          return 0
        })
      return result
    },
  },
}
</script>

<template>
  <air-template-data-iterator
    v-bind="$attrs"
    :items="filteredItems"
    label="産業廃棄物処理業許可一覧"
    show-itembar
  >
    <template #append-label>
      <v-btn icon @click="$router.push(`/industrial-permissions/regist`)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template #itembar-items>
      <a-switch v-model="includeExpired" hide-details label="失効分を含める" />
    </template>
    <template #default="props">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(item, index) of props.items"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <h-card-index-industrial-permission
              outlined
              :model="item"
              :to="`/industrial-permissions/${item.docId}`"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </air-template-data-iterator>
</template>

<style></style>
