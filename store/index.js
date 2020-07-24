// import Vue from 'vue';
// import Vuex from 'vuex';
// import { vuexfireMutations } from 'vuexfire';

// Vue.use(Vuex);


// export const state = () => ({
//   auth: {
//       loggedIn: false,
//       user: null,
//   },
// })

// export const mutations = {
//   ...vuexfireMutations,
//   setLoggedIn(state, value) {
//       console.log(value)
//       state.auth.loggedIn = value;
//   },
//   setUser(state, data) {
//       state.auth.user = data;
//   },
// }

export const state = () => ({
  barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
  barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
  drawer: null,
})

export const mutations = {
  SET_BAR_IMAGE (state, payload) {
    state.barImage = payload
  },
  SET_DRAWER (state, payload) {
    state.drawer = payload
  },
}

export const actions = {
  nuxtServerInit({ commit }, {req}) {
    // if (req.uid != undefined && req.email != undefined) {
      commit('users/SET_USER', {
        uid: req.uid,
        email: req.email
      })
    // }
  },
  // fetchUser({ commit }, user) {
  //   commit('setLoggedIn', user !== null);
  //   if (user) {
  //       commit('setUser', user);
  //   } else {
  //       commit('setUser', null);
  //   }
  // },
}
