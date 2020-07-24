<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('@/components/AppBar'),
      DashboardCoreDrawer: () => import('@/components/Drawer'),
      DashboardCoreView: () => import('@/components/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
