<script>
/**
 * ### HTemplateDefault
 *
 * A default template component.
 * It consists of a toolbar, a header, a main container and a footer.
 * The main container is scrollable and contains default slot.
 *
 * #### PROPERTIES
 *
 * | name             | type               | default   | description                       |
 * | :--------------- | :----------------- | :-------: | --------------------------------- |
 * | decrease         | [ string, number ] | undefined | Decrease main-container's height. |
 * | footerHeight     | number             | undefined | footer's height                   |
 * | headerHeight     | number             | undefined | header's height                   |
 * | label            | string             | undefined | Toolbar's label.                  |
 * | layout-x-padding | [ string, number ] | 24        | *                                 |
 * | overflow         | string             | 'auto'    | *                                 |
 *
 * ##### layout-x-padding
 *
 * The sum of the top and bottom padding of the v-container that wraps the <Nuxt /> of the layout.
 * It is used to calculate the overall height of the component.
 *
 * ##### overflow
 *
 * If set to 'auto', scrollbars in main-container will be displayed as needed.
 * If 'scroll' is selected, the scrollbar of main-container is always displayed.
 *
 * #### SLOTS
 *
 * - Each slots provides owen height as slot-property.
 *
 * ##### default
 *
 * Slot for the main content.
 *
 * | name   | description                 |
 * | ------ | --------------------------- |
 * | height | A height of main-container. |
 *
 * ##### footer
 *
 * Slot for the footer.
 * Must be specified 'decrease' property for adjust the height of main-container.
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
 * ##### append-toolbar
 *
 * Slot to replace the append-toolbar.
 *
 * | name   | description                 |
 * | ------ | --------------------------- |
 *
 * ##### prepend-toolbar
 *
 * Slot to replace the prepend-toolbar.
 *
 * | name   | description                 |
 * | ------ | --------------------------- |
 *
 * #### EVENTS
 *
 * No events on this component.
 *
 * #### FUNCTIONS
 *
 * | name      | args   | description                      |
 * | --------- | ------ | -------------------------------- |
 * | scroll    | target | Scroll main-container to target. |
 * | scrollTop |        | Scroll main-container to top.    |
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    decrease: { type: [String, Number], default: undefined, required: false },
    footerHeight: { type: Number, default: undefined, required: false },
    headerHeight: { type: Number, default: undefined, required: false },
    label: { type: String, default: undefined, required: false },
    layoutYPadding: { type: [String, Number], default: 24, required: false },
    overflow: {
      type: String,
      default: 'auto',
      validator: (v) => ['auto', 'scroll'].includes(v),
      required: false,
    },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    containerHeight() {
      const decrease = this.decrease ? parseInt(this.decrease) : 0
      const footerHeight = this.footerHeight || 0
      const headerHeight = this.headerHeight || 0
      const result =
        this.templateHeight -
        this.toolbarHeight -
        headerHeight -
        footerHeight -
        decrease
      return result
    },
    templateHeight() {
      const app = {
        top: this.$vuetify.application.top,
        bottom: this.$vuetify.application.bottom,
        height: this.$vuetify.breakpoint.height,
        padding: this.layoutYPadding,
      }
      return app.height - app.top - app.bottom - app.padding
    },
    toolbarHeight() {
      // if (this.$vuetify.breakpoint.smAndDown) return 56
      // return 64
      return 48
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async scrollToTop() {
      const container = this.$refs['scroll-container']
      await this.$vuetify.goTo(0, { container })
    },
    async scroll(target) {
      const container = this.$refs['scroll-container']
      await this.$vuetify.goTo(target, { container, duration: 600 })
    },
  },
}
</script>

<template>
  <div :style="`height: ${templateHeight}px`">
    <!-- ### TOOLBAR ### -->
    <v-toolbar color="primary" dark dense flat>
      <slot name="toolbar" v-bind="{ label, height: toolbarHeight }">
        <slot name="prepend-toolbar" />
        <v-toolbar-title>{{ label }}</v-toolbar-title>
        <v-spacer />
        <slot name="append-toolbar" />
      </slot>
    </v-toolbar>
    <slot name="header" v-bind="{ height: headerHeight }" />
    <!-- ### MAIN-CONTAINER ### -->
    <div
      :id="`main-container-${_uid}`"
      ref="scroll-container"
      :style="`height: ${containerHeight}px; overflow-y: ${overflow}`"
    >
      <!-- ### DEFAULT ### -->
      <slot name="default" v-bind="{ height: containerHeight }">
        <v-container>
          <v-card outlined>
            <v-card-title>Default slot</v-card-title>
            <v-card-text>
              Here is default slot. Must be replaced another component.
            </v-card-text>
          </v-card>
        </v-container>
      </slot>
    </div>
    <!-- ### FOOTER ### -->
    <slot name="footer" v-bind="{ height: footerHeight }" />
  </div>
</template>

<style></style>
