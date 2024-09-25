<template>
  <div class="user-info">
    <!-- If the user exists, show the user details, otherwise show a message -->
    <div v-if="user">
      <h2>User Information</h2>

      <div class="user-detail">
        <strong>ID:</strong> <span>{{ user.id }}</span>
      </div>
      <div class="user-detail">
        <strong>Name:</strong> <span>{{ user.name }}</span>
      </div>
      <div class="user-detail">
        <strong>Frontend Skills:</strong> <span>{{ user.frontend }}</span>
      </div>
      <div class="user-detail">
        <strong>Backend Skills:</strong> <span>{{ user.backend }}</span>
      </div>
      <div class="user-detail">
        <strong>Test Skills:</strong> <span>{{ user.test }}</span>
      </div>
      <div class="user-detail">
        <strong>DevOps Skills:</strong> <span>{{ user.devops }}</span>
      </div>

      <!-- Edit Button -->
      <router-link :to="'/user/edit/' + user.id" class="edit-button">Edit User</router-link>
    </div>

    <!-- Show error message if user not found -->
    <div v-else>
      <h2>User Not Found</h2>
      <p>Sorry, the user you're looking for does not exist or was not found.</p>
      <router-link to="/users" class="back-button">Back to Users</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUserById']),
    user() {
      const id = Number(this.$route.params.id)
      return this.getUserById(id)
    }
  }
}
</script>

<style scoped>
/* Same styling as before */
.user-info {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #646cff;
  /* max-width: 500px; */
  width: 50%;
  margin: 20px auto;
  color: #fff;
}

h2 {
  color: #646cff;
  text-align: center;
  margin-bottom: 20px;
}

.user-detail {
  margin-bottom: 10px;
  font-size: 16px;
}

.user-detail strong {
  color: #646cff;
}

/* Buttons Styling */
.edit-button, .back-button {
  display: inline-block;
  background-color: #646cff;
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 4px;
  text-align: center;
  width: 100%;
}

.edit-button:hover, .back-button:hover {
  background-color: #525edb;
}
</style>
