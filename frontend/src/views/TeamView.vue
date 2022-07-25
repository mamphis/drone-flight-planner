
<script lang="ts" setup>
import { Translator } from '@/libs/localization/localizator';
import { teamStore } from '@/stores/team';
import NotificationMessage from '@/components/notification/notificationMessage.vue';
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';
const teamDb = teamStore();
const { teams } = storeToRefs(teamDb);

const $l = inject<Translator>('$l')!;
teamDb.refreshTeams();

let addTeam = ref(false);
let newTeamName = ref('');
let error = ref("");

function prepareAddTeam() {
    addTeam.value = !addTeam.value;
    if (addTeam.value == false) {
        newTeamName.value = '';
    }
}

function createTeam() {
    teamDb.createTeam(newTeamName.value).catch(err => {
        error.value = err.message;
    });
    newTeamName.value = '';
    addTeam.value = false;
}
function deleteTeam(id: string) {
    teamDb.deleteTeam(id).catch(err => {
        error.value = err.message;
    });
}
</script>
<template>
    <NotificationMessage v-if="error" :text="error" :type="'error'" @close="error = ''">
    </NotificationMessage>
    <div class="header">
        <h1 v-text="$l('teams.labels.team')" />
        <div class="buttons">
            <button @click="prepareAddTeam()"><i class="fas fa-plus" /> {{
                    $l('teams.labels.newTeam')
            }}</button>
        </div>
        <!-- Create a div, which is only visible when addTeam was clicked -->
        <div class="new-team" v-if="addTeam">
            <div class="field">
                <label for="new-team-name">{{ $l('teams.labels.newTeamName') }}</label>
                <input type="text" name="newTeamName" id="new-team-name" v-model="newTeamName"
                    @keypress.enter="createTeam()" />
            </div>

            <button @click="createTeam()"><i class="fas fa-plus" /> {{ $l('teams.labels.addTeam') }}</button>
        </div>
    </div>
    <div class="teams">
        <div class="team" v-for="(team) in teams" :key="team.id">
            <div class="team-name">
                <h3 v-text="team.name" />
            </div>
            <div class="team-info">
                <p><span class="cap" v-text="$l('teams.labels.memberCount')" />: {{ team._count.members }}</p>
                <p><span class="cap" v-text="$l('teams.labels.flightMissionCount')" />: {{ team._count.flightMissions }}
                </p>
                <p><span class="cap" v-text="$l('teams.labels.ownerName')" />: {{ team.owner.name }}</p>
            </div>
            <div class="actions">
                <button @click="deleteTeam(team.id)"><i class="fas fa-trash" /> {{ $l('teams.labels.deleteTeam')
                }}</button>
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

.new-team {
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
}

.field {
    margin: 4px 8px;
}

.teams {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.team {
    display: flex;
    width: 100%;
    cursor: pointer;
    margin-bottom: 1rem;
}

.team:hover {
    opacity: 0.8;
}

.cap {
    font-variant: small-caps;
    font-size: small;
}

.team-name {
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.team-info {
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.actions {
    flex-basis: 20%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
</style>