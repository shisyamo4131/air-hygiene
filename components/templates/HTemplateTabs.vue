<script>
/**
 * ### HTemplateTabs
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
    headerHeight: { type: Number, default: undefined, required: false },
    tabs: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      tab: 0,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalHeaderHeight() {
      const tabsHeight = 48
      const headerHeight = this.headerHeight || 0
      return headerHeight + tabsHeight
    },
  },
}
</script>

<template>
  <h-template-default
    v-bind="$attrs"
    :header-height="internalHeaderHeight"
    v-on="$listeners"
  >
    <template #prepend-toolbar>
      <slot name="prepend-toolbar" v-bind="{ tab }" />
    </template>
    <template #append-toolbar>
      <slot name="append-toolbar" v-bind="{ tab }" />
    </template>
    <template #header>
      <v-tabs v-model="tab" fixed-tabs show-arrows>
        <v-tab v-for="(item, index) of tabs" :key="index">
          {{ item }}
        </v-tab>
      </v-tabs>
      <slot name="header" v-bind="{ height: headerHeight, tab }" />
    </template>
    <template #default="{ height }">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) of tabs" :key="index">
          <v-container fluid>
            <slot :name="`tab-${index}`" v-bind="{ height, tab }">
              {{ `this is tab-${index}` }}
            </slot>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </template>
    <template #footer="{ height }">
      <slot name="footer" v-bind="{ height, tab }" />
    </template>
  </h-template-default>
</template>

<style></style>
