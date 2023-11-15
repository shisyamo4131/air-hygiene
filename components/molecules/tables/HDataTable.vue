<script>
/**
 * ### HDataTable
 *
 * @author shisyamo4131
 */
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import ATextFieldSearch from '~/components/atoms/inputs/ATextFieldSearch.vue'
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ADataTable, ATextFieldSearch, ASelect },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    disableRegist: { type: Boolean, default: false, required: false },
    height: { type: [String, Number], default: undefined, required: false },
    hideToolbar: { type: Boolean, default: false, required: false },
    hidePagination: { type: Boolean, default: false, required: false },
    itemsPerPage: { type: Number, default: 10, required: false },
    itemsPerPages: {
      type: Array,
      default: () => {
        return [
          { text: '10件', value: 10 },
          { text: '15件', value: 15 },
          { text: '20件', value: 20 },
          { text: '全件', value: -1 },
        ]
      },
      required: false,
    },
    showRegistBtn: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      lazyItemsPerPage: 10,
      page: 1,
      pageCount: 0,
      search: null,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalHeight() {
      if (!this.height) return undefined
      return parseInt(this.height) - this.toolbarHeight - this.paginationHeight
    },
    internalItemsPerPage: {
      get() {
        return this.lazyItemsPerPage
      },
      set(v) {
        this.lazyItemsPerPage = v
        this.$emit('update:itemsPerPage', v)
      },
    },
    paginationHeight() {
      if (this.hidePagination) return 0
      return 48
    },
    toolbarHeight() {
      if (this.hideToolbar) return 0
      if (this.$vuetify.breakpoint.smAndDown) return 56
      return 64
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    itemsPerPage: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.internalItemsPerPage = newVal
        }
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <div>
    <a-data-table
      v-bind="$attrs"
      :height="internalHeight"
      hide-default-footer
      :items-per-page.sync="internalItemsPerPage"
      :page.sync="page"
      :search="search"
      @page-count="pageCount = $event"
      v-on="$listeners"
    >
      <template v-if="!hideToolbar" #top>
        <v-toolbar flat>
          <slot name="prepend-search" />
          <slot name="search" v-bind="{ search }">
            <a-text-field-search v-model="search" />
          </slot>
          <slot name="append-search" />
          <div class="ml-4" style="width: 120px">
            <a-select
              v-model="internalItemsPerPage"
              dense
              hide-details
              :items="itemsPerPages"
              :outlined="false"
              solo-inverted
            />
          </div>
          <v-btn
            v-if="showRegistBtn"
            class="ml-4"
            :disabled="disableRegist"
            icon
            @click="$emit('click:regist')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template
        v-for="(_, scopedSlotName) in $scopedSlots"
        #[scopedSlotName]="slotData"
      >
        <slot :name="scopedSlotName" v-bind="slotData" />
      </template>
      <template v-for="(_, slotName) in $slots" #[slotName]>
        <slot :name="slotName" />
      </template>
    </a-data-table>
    <div
      v-if="!hidePagination"
      class="d-flex justify-center align-center"
      style="height: 48px"
    >
      <v-pagination v-model="page" color="primary" :length="pageCount" />
    </div>
  </div>
</template>

<style></style>
