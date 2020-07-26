<template>
  <v-app dark>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
import DashboardCoreAppBar from '@/components/AppBar'
import DashboardCoreView from '@/components/View'
import Themeable from 'vuetify/es5/mixins/themeable'
export default {
  mixins: [Themeable],
  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer: () => import('@/components/Drawer'),
    DashboardCoreView
    // DashboardCoreView: () => import('@/components/View'),
  },
}
</script>
