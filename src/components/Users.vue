<template>
  <div class="users">
    <h2>Users List</h2>

    <!-- Table to display the list of users -->
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Frontend</th>
          <th>Backend</th>
          <th>Test</th>
          <th>DevOps</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.frontend }}</td>
          <td>{{ user.backend }}</td>
          <td>{{ user.test }}</td>
          <td>{{ user.devops }}</td>
          <td>
            <!-- Edit and Delete Buttons as Icons -->
            <i class="fas fa-edit action-icon" @click="openEditUserModal(user)"></i>
            <i class="fas fa-trash action-icon" @click="removeUser(user.id)"></i>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Button to open Add User modal -->
    <button @click="openAddUserModal" class="add-button">Add User</button>

    <!-- Modal Component -->
    <Modal
      :show="showModal"
      :editMode="editMode"
      :existingUser="selectedUser"
      @submit="handleUserSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
      editMode: false,
      selectedUser: null
    }
  },
  computed: {
    // Get the list of users from Vuex store
    users() {
      return this.$store.state.users
    }
  },
  methods: {
    // Open the modal in Add mode
    openAddUserModal() {
      this.selectedUser = null
      this.editMode = false
      this.showModal = true
    },

    // Open the modal in Edit mode with the selected user's data
    openEditUserModal(user) {
      this.selectedUser = user
      this.editMode = true
      this.showModal = true
    },

    // Handle adding or updating a user when the modal form is submitted
    handleUserSubmit(user) {
      if (this.editMode) {
        this.$store.commit('EDIT_USER', user)
      } else {
        this.$store.commit('ADD_USER', user)
      }
    },

    // Remove a user from the store by their ID
    removeUser(userId) {
      this.$store.commit('REMOVE_USER', userId)
    },

    // Close the modal
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.users {
  max-width: 800px;
  margin: 40px auto;
  background-color: #242424;
  padding: 20px;
  border-radius: 10px;
  color: white;
  border: 2px solid #646cff;
}

h2 {
  color: #646cff;
  text-align: center;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 10px;
  border: 1px solid #646cff;
  text-align: center;
}

.user-table th {
  background-color: #646cff;
  color: white;
}

.user-table td {
  background-color: #242424;
  color: white;
}

.action-icon {
  color: #646cff;
  cursor: pointer;
  margin: 0 10px;
  font-size: 18px;
}

.action-icon:hover {
  color: #525edb;
}

.add-button {
  background-color: #646cff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  margin-top: 20px;
}

.add-button:hover {
  background-color: #525edb;
}
</style>
