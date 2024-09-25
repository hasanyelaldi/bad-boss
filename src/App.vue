<script setup>
import Users from './components/Users.vue'
</script>

<template>
  <div class="content">
    <div class="header">
      <nav class="routes">
        <RouterLink class="item" to="/users">Users</RouterLink>
        <div>
          <RouterLink to="/">
            <img src="./assets/boss.svg" class="logo" alt="Vite logo" />
          </RouterLink>
        </div>
        <RouterLink class="item" to="/layoff">Layoff</RouterLink>
      </nav>
    </div>
    <main class="main-screen">
      <RouterView />
    </main>
    
  </div>
  <!-- <Users msg="Vite + Vue" /> -->
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  display: flex;
  flex-direction: row;
  
  align-items: center;
  /* justify-content: center; */
}

.main-screen {
  width: 80%;
}

.routes {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.item {
  font-size: large;
  will-change: filter;
  transition: filter 400ms;
  padding: 1.5em;
}

.item:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  color: white;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 400ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
