<template>
  <div class="layoff">
    <h2>Layoff Simulation</h2>

    <!-- Input for the number of users to lay off -->
    <div class="input-container">
      <label for="layoffSize">Enter the number of users to lay off:</label>
      <input
        v-model.number="layoffSize"
        type="number"
        id="layoffSize"
        placeholder="Enter size"
        min="1"
        :max="maxLayoffSize"
        required
      />
      <button @click="selectRandomUsers" class="submit-button">Select Users</button>
    </div>

    <!-- Show table of selected users -->
    <div v-if="selectedUsers.length > 0" class="result-container">
      <h3>Selected Users</h3>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Frontend</th>
            <th>Backend</th>
            <th>Test</th>
            <th>DevOps</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in selectedUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.frontend }}</td>
            <td>{{ user.backend }}</td>
            <td>{{ user.test }}</td>
            <td>{{ user.devops }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Confirm Layoff Button -->
      <button @click="confirmLayoff" class="confirm-button">Confirm Layoff</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layoffSize: 1, // Default input value for number of users
      selectedUsers: [], // Store the randomly selected users
    }
  },
  computed: {
    // Get the list of users from the Vuex store
    users() {
      return this.$store.state.users
    },
    maxLayoffSize() {
      return this.users.length // Max layoff size should not exceed total number of users
    }
  },
  methods: {
    // Function to randomly select users based on the input size
    selectRandomUsers() {
      if (this.layoffSize > 0 && this.layoffSize <= this.users.length) {
        // Shuffle users and select the first N (layoffSize) users
        this.selectedUsers = [...this.users]
          .sort(() => Math.random() - 0.5)
          .slice(0, this.layoffSize)
      } else {
        // If the input is invalid, reset selected users and show alert
        this.selectedUsers = []
        alert("Please enter a valid number between 1 and " + this.maxLayoffSize)
      }
    },

    // Confirm layoff by removing selected users from the store
    confirmLayoff() {
      // Commit the removal of each selected user
      this.selectedUsers.forEach(user => {
        this.$store.commit('REMOVE_USER', user.id)
      })
      // Clear the selected users after confirming
      this.selectedUsers = []
      alert('Layoff confirmed and users removed!')
    }
  }
}
</script>

<style scoped>
.layoff {
  max-width: 600px;
  margin: 40px auto;
  background-color: #242424;
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
  border: 2px solid #646cff;
}

h2 {
  color: #646cff;
}

.input-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  color: white;
  margin-bottom: 10px;
  font-size: 16px;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 2px solid #646cff;
  background-color: #1a1a1a;
  color: white;
}

input:focus {
  outline: none;
  border-color: #525edb;
}

.submit-button {
  background-color: #646cff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #525edb;
}

.result-container {
  margin-top: 20px;
}

h3 {
  color: #646cff;
  margin-bottom: 10px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.user-table th, .user-table td {
  padding: 10px;
  border: 1px solid #646cff;
  text-align: left;
}

.user-table th {
  background-color: #646cff;
  color: white;
}

.user-table td {
  background-color: #242424;
  color: white;
}

.confirm-button {
  background-color: #ff4b4b;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
}

.confirm-button:hover {
  background-color: #ff2a2a;
}
</style>
