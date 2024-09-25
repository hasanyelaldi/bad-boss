<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>{{ editMode ? "Edit" : "Add" }} User</h2>

      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="user.name" type="text" id="name" placeholder="Enter user name" />
      </div>

      <!-- Frontend Skill Slider -->
      <div class="form-group">
        <label for="frontend">Frontend:</label>
        <input
          type="range"
          id="frontend"
          v-model="user.frontend"
          min="0"
          max="10"
        />
        <span>{{ user.frontend }}</span>
      </div>

      <!-- Backend Skill Slider -->
      <div class="form-group">
        <label for="backend">Backend:</label>
        <input
          type="range"
          id="backend"
          v-model="user.backend"
          min="0"
          max="10"
        />
        <span>{{ user.backend }}</span>
      </div>

      <!-- Test Skill Slider -->
      <div class="form-group">
        <label for="test">Test:</label>
        <input
          type="range"
          id="test"
          v-model="user.test"
          min="0"
          max="10"
        />
        <span>{{ user.test }}</span>
      </div>

      <!-- DevOps Skill Slider -->
      <div class="form-group">
        <label for="devops">DevOps:</label>
        <input
          type="range"
          id="devops"
          v-model="user.devops"
          min="0"
          max="10"
        />
        <span>{{ user.devops }}</span>
      </div>

      <!-- Submit / Save Button -->
      <div class="form-group button-group">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="submitUser" class="submit-button">{{ editMode ? "Save" : "Add" }} User</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    existingUser: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      user: {
        id: null,
        name: '',
        frontend: 0,
        backend: 0,
        test: 0,
        devops: 0
      }
    }
  },
  watch: {
    // Pre-fill the user data when in edit mode
    existingUser: {
      immediate: true,
      handler(newValue) {
        if (this.editMode && newValue) {
          this.user = { ...newValue }
        }
      }
    }
  },
  methods: {
    submitUser() {
      if (this.user.name.trim()) {
        this.$emit('submit', { ...this.user }) // Emit the user data to parent
        this.closeModal() // Close the modal after submission
      } else {
        alert('Please enter a valid name')
      }
    },
    closeModal() {
      this.$emit('close') // Emit close event to parent
      // Reset user data if not in edit mode
      if (!this.editMode) {
        this.user = { id: null, name: '', frontend: 0, backend: 0, test: 0, devops: 0 }
      }
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  background-color: #242424;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  border: 2px solid #646cff;
}

h2 {
  color: #646cff;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

label {
  margin-bottom: 5px;
  font-size: 14px;
  color: white;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #646cff;
  background-color: #1a1a1a;
  color: white;
}

input[type="text"]:focus {
  outline: none;
  border-color: #525edb;
}

input[type="range"] {
  width: 100%;
}

span {
  margin-top: 5px;
  font-size: 14px;
  color: #646cff;
  text-align: right;
}

.submit-button {
  background-color: #646cff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  margin: 4px;
}

.submit-button:hover {
  background-color: #525edb;
}

.cancel-button {
  background-color: #ff4b4b;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  margin: 4px;
}

.cancel-button:hover {
  background-color: #ff2a2a;
}
</style>
