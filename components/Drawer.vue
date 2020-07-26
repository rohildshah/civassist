<template>
  <v-navigation-drawer
    v-model="drawer"
    :expand-on-hover="false"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <v-divider class="mb-1" />
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center">
          <v-img
            :src="require('@/static/civassist.png')"
          />
        </v-list-item-avatar>

        <!-- <v-list-item-content>
          <v-list-item-title class="display-1" />
        </v-list-item-content> -->
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <item-group v-if="item.children" :key="`group-${i}`" :item="item">
        </item-group>

        <item v-else :key="`item-${i}`" :item="item" />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",

  data() {
    return {
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/admin/Dashboard",
        },
        {
          icon: "mdi-account",
          title: "Profile",
          to: "/admin/UserProfile",
        },
        {
          title: "Maps",
          icon: "mdi-map-marker",
          to: "/admin/GoogleMaps",
        },
      ],
    };
  },

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
      };
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
      margin-right: 24px
      margin-left: 12px !important

      +rtl()
      margin-left: 24px
      margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
      padding-left: 8px

      +rtl()
      padding-right: 8px

    .v-list-group__header
      +ltr()
      padding-right: 0

      +rtl()
      padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
        margin-right: 8px

        +rtl()
        margin-left: 8px
</style>
