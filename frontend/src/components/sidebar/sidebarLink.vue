<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { useRoute } from 'vue-router'
import { collapsed } from './state';

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  text: { type: String, required: true },
});

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="icon" :class="icon" />
    <transition name="fade">
      <span class="label" v-if="!collapsed" v-text="text" />
    </transition>
  </router-link>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 3em;
  color: white;
  text-decoration: none;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}

.link.active {
  background-color: var(--sidebar-item-active);
}

.link .icon {
  flex-shrink: 0;
}

.link .label {
  margin-left: 0.5em;
}
</style>