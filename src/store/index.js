import { createStore } from 'vuex'

const localStorageKey = 'users';

function saveToLocalStorage(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state.users));
}

function getFromLocalStorage() {
  const usersData = localStorage.getItem(localStorageKey);
  return usersData ? JSON.parse(usersData) : [];
}

export default createStore({
  state: {
    users: getFromLocalStorage(),
  },
  mutations: {
    ADD_USER(state, user) {
      user.id = Date.now() // Generate a unique ID for the new user
      state.users.push(user)
      saveToLocalStorage(state);
    },
    EDIT_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser) // Update user details
        saveToLocalStorage(state);
      }
    },
    REMOVE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
      saveToLocalStorage(state);
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
