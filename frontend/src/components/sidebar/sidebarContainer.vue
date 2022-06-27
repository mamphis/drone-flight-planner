<script setup lang="ts">
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import sidebarLink from './sidebarLink.vue';
import { inject } from 'vue';
import { Translator } from '@/libs/localization/localizator';
import { userStore } from '@/stores/user';

const $l = inject<Translator>('$l')!;
const user = userStore();

</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <!--<div>V</div>
        <div>S</div>-->
      </span>
      <span v-else v-text="$l('sidebar.title')"/>
    </h1>

    <sidebarLink to="/" icon="fas fa-home" :text="$l('sidebar.labels.home')"/>
    <sidebarLink to="/teams" icon="fas fa-people-group" :text="$l('sidebar.labels.teams')"/>
    <sidebarLink to="/missions" icon="fas fa-earth-europe" :text="$l('sidebar.labels.missions')"/>
    <sidebarLink to="/flights" icon="fas fa-plane-departure" :text="$l('sidebar.labels.flights')"/>
    <sidebarLink to="/profile" icon="fas fa-user" :text="$l('sidebar.labels.profile')" />
    <sidebarLink to="/logout" @click="user.logout()" icon="fas fa-person-walking-arrow-right" :text="$l('sidebar.labels.logout')"/>
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
  margin-bottom: 0.5em;
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