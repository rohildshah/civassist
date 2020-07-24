import { auth } from "@/services/firebase"
export const state = () => ({
  user: null
});

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account
  }
}

export const actions = {
  async login({ commit }, account) {
    console.log(account.password)
    console.log(account.email)
    await auth.signInWithEmailAndPassword(account.email, account.password)
    const { email, uid } = auth.currentUser

    commit('SET_USER', { email, uid })
  },
  async signup({ commit }, account) {
    console.log(account.password)
    console.log(account.email)
    await auth.createUserWithEmailAndPassword(account.email, account.password)
    const { email, uid } = auth.currentUser

    commit('SET_USER', { email, uid })
  }
}
