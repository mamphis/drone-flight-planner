<script lang="ts">
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import sidebarLink from './sidebarLink.vue';
export default {
  name: 'sidebar-component',
  components: { sidebarLink },
  props: {},
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <!--<div>V</div>
        <div>S</div>-->
      </span>
      <span v-else>Drone Flight Planer</span>
    </h1>

    <sidebarLink to="/1" icon="fas fa-home">Home</sidebarLink>
    <sidebarLink to="/2" icon="fas fa-home">Test1</sidebarLink>
    <sidebarLink to="/3" icon="fas fa-home">Test2</sidebarLink>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>