<script setup lang="ts">
import { userStore } from './stores/user';
const user = userStore();

let loggedIn = false;

const updateLoginState = () => {
  loggedIn = user.isLoggedIn;
};

user.$subscribe(() => {
  updateLoginState();
});
</script>

<template>
  <nav v-if="loggedIn">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view  class="router"/>
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/inputs.css";
#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;
    height: 100vh;
    display: flex;
    justify-content: center;
}
.navbar {
    flex: 1;
}
.content {
    flex: 1;
}
</style>
