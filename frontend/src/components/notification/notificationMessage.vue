<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    type: {
        type: String, default: 'info', validator: (v: unknown) => {
            if (typeof (v) !== 'string') return false;

            return ['info', 'warn', 'error'].includes(v);
        }
    },
    text: {
        type: String, required: true,
    },
    title: {
        type: String, required: false,
    },
});

const emits = defineEmits(['close']);

</script>
<template>
    <div class="notification" :class="type">
        <div v-if="!!title" class="title">
            {{ title }}
        </div>
        <div class="body">
            <span v-text="text"/>

            <div class="close" @click="$emit('close')">
                <i class="fas fa-xmark" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.notification {
    --color-info-main: #296fa8;
    --color-info-dimmed: #eff5fb;
    --color-warn-main: #e67e22;
    --color-warn-dimmed: #f3e8df;
    --color-error-main: #c0392b;
    --color-error-dimmed: #eedddc;
    border-style: none;
    left: 50%;
    transform: translateX(-50%);
    top: 2%;
    position: absolute;
    opacity: 0.9;
    min-width: 50%;
    z-index: 100;
}

.notification .title {
    font-size: large;
    font-weight: bold;
    color: white;
    border-radius: .375rem .375rem 0 0;
    text-align: left;
    padding: 4px 12px;
}

.notification .body {
    padding: 12px;
    text-align: center;
    border-radius: .375rem;
}

.notification .title+.body {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.notification.info .body {
    background-color: var(--color-info-dimmed);
    color: var(--color-info-main);
}

.notification.info .title {
    background-color: var(--color-info-main);
}

.notification.warn .body {
    background-color: var(--color-warn-dimmed);
    color: var(--color-warn-main);
}

.notification.warn .title {
    background-color: var(--color-warn-main);
}

.notification.error .body {
    background-color: var(--color-error-dimmed);
    color: var(--color-error-main);
}

.notification.error .title {
    background-color: var(--color-error-main);
}

.notification .close {
    position: absolute;
    right: calc(.375rem + 4px);
    top: .375rem;
    cursor: pointer;
}
</style>