<template>
  <div class="layoff-page">
    <!-- Layoff Process -->
    <div class="layoff-container">
      <h2>Layoff Page</h2>

      <!-- Select Size for Layoff -->
        <div class="layoff-selection">
          <label for="layoff-size">Select Number of Layoffs: </label>
          <input
              type="number"
              v-model="layoffSize"
              id="layoff-size"
              min="1"
              :max="users.length"
              class="layoff-input"
          />
          <button @click="selectRandomUsers" class="layoff-button">Select Users</button>
          
      </div>

      <!-- Selected Users Table -->
      <div v-if="selectedUsers.length > 0">
        <h3>Selected Users for Layoff</h3>
        <table class="selected-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Frontend</th>
              <th>Backend</th>
              <th>Test</th>
              <th>DevOps</th>
              <th>Monthly Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in selectedUsers" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.frontend }}</td>
              <td>{{ user.backend }}</td>
              <td>{{ user.test }}</td>
              <td>{{ user.devops }}</td>
              <td>{{ user.salary }} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Radar Charts for Before and After Layoff -->
      <div class="graphs-container">
        <div class="graph">
          <h3>Before Layoff</h3>
          <svg id="before-layoff-graph" viewBox="0 0 200 200"></svg>
        </div>

        
        <div>
          <h3>Avg. Salary Before Layoff</h3>
          <p>{{ users?.length > 0 ? calculateAvarageSalary(users) : 0 }} €</p>
        </div>
        <div>
          <h3>Avg. Salary After Layoff</h3>
          <p>{{ users?.length > 0 ? calculateAvarageSalary(users.filter(user => !selectedUsers.includes(user))) : 0}} €</p>
        </div>

        <div class="graph">
          <h3>After Layoff</h3>
          <svg id="after-layoff-graph" viewBox="0 0 200 200"></svg>
        </div>
      </div>

      

      <!-- Confirm Button -->
      <div v-if="selectedUsers.length > 0" class="confirm-container">
        <button @click="confirmLayoff" class="confirm-button">Confirm Layoff</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedUsers: [],
      layoffSize: 1
    };
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  methods: {
    selectRandomUsers() {
      if(this.users.length === 0) {
        alert('Please go to users tab and add at least one user for layoff');
        return;
      }
      const randomUsers = [...this.users]
        .sort(() => 0.5 - Math.random())
        .slice(0, this.layoffSize);
      this.selectedUsers = randomUsers;
      this.drawGraphs();
    },
    drawGraphs() {
      this.drawRadarChart('before-layoff-graph', this.calculateAverageCapabilities(this.users));
      this.drawRadarChart('after-layoff-graph', this.calculateAverageCapabilities(this.users.filter(user => !this.selectedUsers.includes(user))));
    },
    calculateAverageCapabilities(users) {
      const totals = users.reduce(
        (acc, user) => {
          acc.frontend += Number(user.frontend);
          acc.backend += Number(user.backend);
          acc.test += Number(user.test);
          acc.devops += Number(user.devops);
          return acc;
        },
        { frontend: 0, backend: 0, test: 0, devops: 0 }
      );
      
      const count = users.length;
      return {
        frontend: totals.frontend / count,
        backend: totals.backend / count,
        test: totals.test / count,
        devops: totals.devops / count,
      };
    },
    calculateTotalSalary(users) {
      return users.reduce((acc, user) => acc + Number(user.salary), 0);
    },
    calculateAvarageSalary(users) {
      return (this.calculateTotalSalary(users) / users.length).toFixed(2);
    },
    drawRadarChart(svgId, data) {
      const svg = document.getElementById(svgId);
      svg.innerHTML = ''; // Clear existing SVG

      const capabilities = ['frontend', 'backend', 'test', 'devops'];
      const maxValue = 10;
      const radius = 80;
      const center = 100;
      const angleStep = (2 * Math.PI) / capabilities.length;

      // Draw lines and text for each capability
      capabilities.forEach((cap, i) => {
        const angle = i * angleStep;
        const x = center + radius * Math.cos(angle);
        const y = center - radius * Math.sin(angle);

        // Draw capability line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', center);
        line.setAttribute('y1', center);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#ccc');
        svg.appendChild(line);

        // Draw capability label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('fill', '#fff');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = cap;
        svg.appendChild(text);
      });

      // Draw radar polygon
      const points = capabilities.map((cap, i) => {
        const value = data[cap];
        const angle = i * angleStep;
        const x = center + (radius * value) / maxValue * Math.cos(angle);
        const y = center - (radius * value) / maxValue * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');

      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', points);
      polygon.setAttribute('fill', '#646cff');
      polygon.setAttribute('opacity', '0.7');
      svg.appendChild(polygon);
    },
    confirmLayoff() {
      // Remove selected users from the Vuex store users state
      this.selectedUsers.forEach(user => {
        this.$store.commit('REMOVE_USER', user.id);
      });
      this.selectedUsers = [];
      this.drawGraphs();
    }
  },
  mounted() {
    this.drawGraphs();
  }
};
</script>

<style scoped>

h2 {
  color: #646cff;
  text-align: center;
}
.layoff-page {
  color: white;
  padding: 20px;
  overflow-y: auto; 
}

.layoff-container {
  margin: 0 auto;
  text-align: center;
  
}

.layoff-button {
  background-color: #646cff;
  color: white;
  margin: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.layoff-selection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.layoff-input {
  width: 50px;
  margin-left: 10px;
}

.selected-users-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.selected-users-table th,
.selected-users-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.graphs-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
}

.graph {
  text-align: center;
}

svg {
  width: 200px;
  height: 200px;
}

.confirm-container {
  margin-top: 20px;
}

.confirm-button {
  background-color: #646cff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.confirm-button:hover {
  background-color: #5353e8;
}
</style>
