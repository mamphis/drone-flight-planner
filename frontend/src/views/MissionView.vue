
<script lang="ts" setup>
import { Translator } from '@/libs/localization/localizator';
import { missionStore } from '@/stores/mission';
import { inject, ref } from 'vue';
const db = await missionStore();
const $l = inject<Translator>('$l')!;
const missions = ref(db.missions);
db.refreshMissions();


</script>
<template>

    <div class="header">
        <h1 v-text="$l('missions.labels.mission')" />
        <button @click="db.refreshMissions()">Refresh</button>
    </div>
    <div class="missions">
        <div class="flight-mission" v-for="(mission) in missions" :key="mission.id">
            <div class="mission-name">
                <h2 v-text="mission.name" />
            </div>
            <div class="mission-team">
                <p v-text="mission.team.name" />
                <small v-text="mission.team.owner.name" />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.missions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.flight-mission {
    display: flex;
    width: 100%;
}
</style>