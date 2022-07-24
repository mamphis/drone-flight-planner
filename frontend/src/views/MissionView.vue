
<script lang="ts" setup>
import { Translator } from '@/libs/localization/localizator';
import { missionStore } from '@/stores/mission';
import { teamStore } from '@/stores/team';
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const missionDb = missionStore();
const teamDb = teamStore();
const { missions } = storeToRefs(missionDb);
const { teams } = storeToRefs(teamDb);

const $l = inject<Translator>('$l')!;
const router = useRouter();

teamDb.refreshTeams();
missionDb.refreshMissions();

let addMission = ref(false);
let newMissionName = ref('');
let newMissionTeam = ref('');

function prepareAddMission() {
    addMission.value = !addMission.value;
    if (addMission.value == false) {
        newMissionName.value = '';
    }
}

function createMission() {
    if (newMissionName.value.length > 0 && newMissionTeam.value.length > 0) {
        missionDb.createMission(newMissionTeam.value, newMissionName.value);
        newMissionName.value = '';
        newMissionTeam.value = '';
        addMission.value = false;
    }
}
</script>
<template>

    <div class="header">
        <h1 v-text="$l('missions.labels.mission')" />
        <div class="buttons">
            <button @click="missionDb.refreshMissions()"><i class="fas fa-arrows-rotate" /> {{
                    $l('missions.labels.refresh')
            }}</button>
            <button @click="prepareAddMission()"><i class="fas fa-plus" /> {{
                    $l('missions.labels.newMission')
            }}</button>
        </div>
        <!-- Create a div, which is only visible when addMission was clicked -->
        <div class="new-mission" v-if="addMission">
            <div class="field">
                <label for="new-mission-team">{{ $l('missions.labels.newMissionTeam') }}</label>
                <select name="newMissionTeam" id="new-mission-team" v-model="newMissionTeam">
                    <option v-for=" team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
                </select>
            </div>
            <div class="field">
                <label for="new-mission-name">{{ $l('missions.labels.newMissionName') }}</label>
                <input type="text" name="newMissionName" id="new-mission-name" v-model="newMissionName"
                    @keypress.enter="createMission()" />
            </div>

            <button @click="createMission()"><i class="fas fa-plus" /> {{ $l('missions.labels.addMission') }}</button>
        </div>
    </div>
    <div class="missions">
        <div class="flight-mission" v-for="(mission) in missions" :key="mission.id"
            @click="router.push({ name: 'mission-planning', params: { id: mission.id } })">
            <div class="mission-name">
                <h3 v-text="mission.name" />
            </div>
            <div class="mission-team">
                <p><span class="cap" v-text="$l('missions.labels.teamName')" />: {{ mission.team.name }}</p>
                <p><span class="cap" v-text="$l('missions.labels.teamOwnerName')" />: {{ mission.team.owner.name }}</p>
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
    flex-wrap: wrap;
}

.new-mission {
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
}

.field {
    margin: 4px 8px;
}

.missions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.flight-mission {
    display: flex;
    width: 100%;
    cursor: pointer;
}

.flight-mission:hover {
    opacity: 0.8;
}

.cap {
    font-variant: small-caps;
    font-size: small;
}

.mission-name {
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.mission-team {
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
</style>