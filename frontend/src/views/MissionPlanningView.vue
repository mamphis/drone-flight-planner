<script lang="ts" setup>
import { useRouter } from 'vue-router';


const router = useRouter();
const id = router.currentRoute.value.params.id;
</script>

<template>
    <div>
        Mission Planning for {{ id }}
    </div>
</template>