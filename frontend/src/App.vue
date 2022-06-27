<script setup lang="ts">
import { userStore } from './stores/user';
import sidebar from '@/components/sidebar/sidebarContainer.vue'
import { sidebarWidth } from '@/components/sidebar/state'

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
    <sidebar v-if="loggedIn" />
    <div :style="{ 'margin-left': loggedIn ? sidebarWidth : 0, width: '100%' }">
        <router-view />
    </div>
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
    /* justify-content: center; */
    text-align: center;
}

.navbar {
    flex: 1;
}

.content {
    flex: 1;
}
</style>
