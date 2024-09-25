// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    users: []
  },
  mutations: {
    ADD_USER(state, user) {
      user.id = Date.now() // Generate a unique ID for the new user
      state.users.push(user)
    },
    EDIT_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser) // Update user details
      }
    },
    REMOVE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    }
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user)
    },
    editUser({ commit }, user) {
      commit('EDIT_USER', user)
    },
    removeUser({ commit }, id) {
      commit('REMOVE_USER', id)
    }
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    }
  }
})
