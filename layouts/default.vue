<template>
  <v-app>
    <h-navigation-drawer v-model="drawer" />
    <v-app-bar app dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Air Guard</v-toolbar-title>
      <v-spacer />
      <a-switch
        v-model="keepAlive"
        class="mr-4"
        label="Keep Alive"
        hide-details
      />
      <a-switch v-model="fluid" hide-details />
    </v-app-bar>
    <v-main>
      <v-container :fluid="fluid">
        <Nuxt
          :keep-alive="keepAlive"
          :keep-alive-props="{ include: keepAlivePages }"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import HNavigationDrawer from '~/components/organisms/HNavigationDrawer.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'DefaultLayout',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ASwitch, HNavigationDrawer },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      drawer: false,
      fluid: false,
      keepAlive: true,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    keepAlivePages() {
      const result = ['CustomersIndex', 'SiteIndex']
      // if (this.$route.path.includes('/customers')) {
      //   return ['CustomersIndex']
      // } else if (this.$route.path.includes('/sites')) {
      //   return ['SitesIndex']
      // } else {
      //   return []
      // }
      return result
    },
  },
}
</script>

<style>
.firebase-emulator-warning {
  display: none;
}

/* 入力コンポーネントのalign用css */
.right-input input {
  text-align: right;
  padding-right: 8px;
}

.center-input input {
  text-align: center;
}

/* v-calendar */
.v-calendar-weekly__head > .v-calendar-weekly__head-weekday:nth-child(7) {
  background-color: #fce4ec;
}
.v-calendar-weekly__week > .v-calendar-weekly__day:nth-child(7) {
  background-color: #fce4ec;
}
.v-calendar-weekly__head > .v-calendar-weekly__head-weekday:nth-child(6) {
  background-color: #e3f2fd;
}
.v-calendar-weekly__week > .v-calendar-weekly__day:nth-child(6) {
  background-color: #e3f2fd;
}
</style>
