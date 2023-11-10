<script>
/**
 * ### HTemplateIndex
 *
 * A template component extends HTemplateDefault for index pages.
 * - Assumed that components such as v-data-table, v-data-iterator, etc. will be placed in the default slot.
 *
 * #### PROPERTIES
 *
 * | name             | type               | default   | description                       |
 * | :--------------- | :----------------- | :-------: | --------------------------------- |
 * | decrease         | [ string, number ] | undefined | Decrease main-container's height. |
 * | items            | array              | []        | Provied to default slot.          |
 * | label            | string             | undefined | Toolbar's label.                  |
 * | layout-x-padding | [ string, number ] | 24        | *                                 |
 * | minItemsPerPage  | number             | 5         | *                                 |
 * | overflow         | string             | 'auto'    | *                                 |
 * | search           | string             | null      | *
 * | showItembar      | boolean            | false     | Displays item-bar.                |
 *
 * ##### minItemsPerPage
 * The minimum number of items to be displayed on one page.
 *
 * ##### search
 * The query string. Can use .sync modifer.
 *
 * #### SLOTS
 *
 * ##### default
 *
 * Slot for the component such as v-data-table, v-data-iterator, etc.
 *
 * | name                    | description |
 * | ----------------------- | ----------- |
 * | attrs.hideDefaultFooter |             |
 * | attrs.fixedHeader       |             |
 * | attrs.items             |             |
 * | attrs.itemsPerPage      |             |
 * | attrs.page              |             |
 * | attrs.search            |             |
 * | on.click:row            |             |
 * | on.page-count           |             |
 * | on.update:page          |             |
 *
 * ##### itembar
 *
 * Slot to replace the itembar.
 *
 * | name   | description          |
 * | ------ | -------------------- |
 * | height | A height of itembar. |
 *
 * ##### toolbar
 *
 * Slot to replace the toolbar.
 *
 * | name   | description                 |
 * | ------ | --------------------------- |
 * | height | A height of main-container. |
 * | label  |                             |
 *
 * #### EVENTS
 *
 * | name         | args   | description                       |
 * | ------------ | ------ | --------------------------------- |
 * | click:regist |        | Emits when regist icon is clicke. |
 * | click:row    | item   | Emits when table row is clicked.  |
 *
 * @author shisyamo4131
 */
import HTemplateDefault from './HTemplateDefault.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateDefault },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    decrease: { type: [String, Number], default: undefined, required: false },
    items: { type: Array, default: () => [], required: false },
    minItemsPerPage: { type: Number, default: 5, required: false },
    search: { type: String, default: null, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      lazySearch: null,
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalDecrease() {
      const decrease = this.decrease ? parseInt(this.decrease) : 0
      const result = this.itembarHeight + this.paginationHeight + decrease
      return result
    },
    internalSearch: {
      get() {
        return this.lazySearch
      },
      set(v) {
        this.lazySearch = v
        this.$emit('update:search', v)
      },
    },
    itembarHeight() {
      if (!this.showItembar) return 0
      if (this.$vuetify.breakpoint.smAndDown) return 56
      return 64
    },
    itemsPerPages() {
      const result = []
      for (let i = 0; i < 4; i++) {
        result.push({
          text: `${this.minItemsPerPage * (i + 1)}件`,
          value: this.minItemsPerPage * (i + 1),
        })
      }
      result.push({ text: 'ALL', value: -1 })
      return result
    },
    paginationHeight() {
      return 48
    },
    searchbarHeight() {
      if (this.$vuetify.breakpoint.smAndDown) return 56
      return 64
    },
    attrs() {
      return {
        hideDefaultFooter: true,
        fixedHeader: true,
        items: this.items,
        itemsPerPage: this.itemsPerPage,
        page: this.page,
        search: this.internalSearch,
      }
    },
    on() {
      return {
        'click:row': ($event) => {
          this.$emit('click:row', $event)
        },
        'page-count': ($event) => {
          this.pageCount = $event
        },
        'update:page': ($event) => {
          this.page = $event
        },
      }
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    minItemsPerPage: {
      handler(v) {
        this.itemsPerPage = v
      },
      immediate: true,
    },
    search: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) this.lazySearch = newVal
      },
      immediate: true,
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {},
}
</script>

<template>
  <h-template-default
    v-bind="$attrs"
    :decrease="internalDecrease"
    show-searchbar
    v-on="$listeners"
  >
    <template #append-toolbar>
      <v-spacer />
      <v-icon @click="$emit('click:regist')">mdi-plus</v-icon>
    </template>
    <template #searchbar>
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="internalSearch"
            clearable
            dense
            hide-details
            placeholder="SEARCH"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
          >
          </v-text-field>
        </v-col>
        <v-col style="min-width: 120px" class="flex-grow-0 flex-shrink-1">
          <v-select
            v-model="itemsPerPage"
            :items="itemsPerPages"
            dense
            solo-inverted
            hide-details
          />
        </v-col>
      </v-row>
    </template>
    <template #itembar="props">
      <slot name="itembar" v-bind="props" />
    </template>
    <template #default="{ height }">
      <slot name="default" v-bind="{ attrs: { ...attrs, height }, on }">
        <v-container>
          <v-card outlined>
            <v-card-title>Default slot</v-card-title>
            <v-card-text>
              Here is default slot. Must be replaced another component...
            </v-card-text>
          </v-card>
        </v-container>
      </slot>
    </template>
    <template #footer>
      <div style="height: 48px" class="d-flex align-center justify-center">
        <v-pagination v-model="page" color="primary" :length="pageCount" />
      </div>
    </template>
  </h-template-default>
</template>

<style></style>
