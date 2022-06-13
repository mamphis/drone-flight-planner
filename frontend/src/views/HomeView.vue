<script lang="ts">
import sidebar from '../components/sidebar/sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
    components: {
        sidebar
    },
    setup() {
        return { sidebarWidth }
    }
}
</script>

<template>
    <sidebar />
    <div :style="{ 'margin-left': sidebarWidth }">
        <router-view />
    </div>
</template>