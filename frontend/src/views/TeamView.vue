
<script lang="ts" setup>
import { Translator } from '@/libs/localization/localizator';
import { teamStore } from '@/stores/team';
import { userStore } from '@/stores/user';
import NotificationMessage from '@/components/notification/notificationMessage.vue';
import { storeToRefs } from 'pinia';
import { inject, nextTick, onMounted, ref } from 'vue';
const teamDb = teamStore();
const user = userStore().user;
const { teams } = storeToRefs(teamDb);

const $l = inject<Translator>('$l')!;
teamDb.refreshTeams();

let addTeam = ref(false);
let newTeamName = ref('');
let error = ref("");
const input = ref<HTMLInputElement|null>(null);

function prepareAddTeam() {
    addTeam.value = !addTeam.value;
    if (addTeam.value == false) {
        newTeamName.value = '';
    } else {
        nextTick(() => {
            console.log(input.value);
            input.value?.focus();
        });
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
    <div class="title">
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
                <input type="text" ref="input" name="newTeamName" id="new-team-name" v-model="newTeamName"
                    @keypress.enter="createTeam()" />
            </div>

            <button @click="createTeam()"><i class="fas fa-plus" /> {{ $l('teams.labels.addTeam') }}</button>
        </div>
    </div>
    <div class="list-container clickable">
        <div class="header">
            <div class="col wide" v-text="$l('teams.labels.teamName')" />
            <div class="col" v-text="$l('teams.labels.memberCount')" />
            <div class="col" v-text="$l('teams.labels.flightMissionCount')" />
            <div class="col" v-text="$l('teams.labels.ownerName')" />
            <div class="actions" />
        </div>
        <div class="body">
            <div class="row" v-for="(team) in teams" :key="team.id"
                @click="$router.push({ name: 'team-detail', params: { id: team.id } })">
                <div class="col wide">
                    <h3 v-text="team.name" />
                </div>
                <div class="col" v-text="team._count.members"/>
                <div class="col" v-text="team._count.flightMissions"/>
                <div class="col" v-text="team.owner.name"/>
                <div class="actions">
                    <button v-if="team.owner.id === user?.id" @click.stop="deleteTeam(team.id)"><i class="fas fa-trash" /> {{
                            $l('teams.labels.deleteTeam')
                    }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/lists.css';

.title {
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

.cap {
    font-variant: small-caps;
    font-size: small;
}
</style>