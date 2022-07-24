<script setup lang="ts">
import { userStore } from './stores/user';
import sidebar from '@/components/sidebar/sidebarContainer.vue'
import { sidebarWidth } from '@/components/sidebar/state'
import { ref } from 'vue';

const user = userStore();

let loggedIn = ref(false);

const updateLoginState = () => {
    loggedIn.value = user.isLoggedIn;
    console.log("Is Logged In: " + loggedIn.value);
};

user.$subscribe(() => {
    updateLoginState();
});
updateLoginState();
</script>

<template>
    <sidebar v-if="loggedIn" />
    <div :style="{ 'margin-left': loggedIn ? sidebarWidth : 0, width: '100%' }">
        <Suspense>
            <router-view />
        </Suspense>
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
