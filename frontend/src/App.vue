<script setup lang="ts">
import { userStore } from './stores/user';
import sidebar from '@/components/sidebar/sidebarContainer.vue'
import { sidebarWidth } from '@/components/sidebar/state'
import { storeToRefs } from 'pinia';

const user = userStore();

let { isLoggedIn } = storeToRefs(user)
</script>
<script lang="ts">
export default {
}
</script>
<template>
    <sidebar v-if="isLoggedIn" />
    <div :style="{ 'margin-left': isLoggedIn ? sidebarWidth : 0, width: '100%' }" id="router-view">
        <Suspense>
            <router-view />
        </Suspense>
    </div>
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/inputs.css";

#app {
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

#router-view>* {
    min-height: 0;
}
</style>

<style scoped>
#router-view {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
