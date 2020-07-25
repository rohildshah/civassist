<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
import DashboardCoreAppBar from '@/components/AppBar'
import DashboardCoreView from '@/components/View'
  export default {
    components: {
      DashboardCoreAppBar,
      DashboardCoreDrawer: () => import('@/components/Drawer'),
      DashboardCoreView
      // DashboardCoreView: () => import('@/components/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
