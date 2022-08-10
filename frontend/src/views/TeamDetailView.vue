<script lang="ts" setup>
import { Translator } from '@/libs/localization/localizator.js';
import { teamStore } from '@/stores/team';
import { userStore } from '@/stores/user';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const $l = inject<Translator>('$l')!;

const router = useRouter();
const id = router.currentRoute.value.params.id as string;

const teamDb = teamStore();
const userDb = userStore();
const team = ref(await teamDb.getTeam(id));
const editable = team.value.owner.id === userDb.user?.id;

const linkCopied = ref(false);

async function removeMember(memberId: string) {
    await teamDb.removeMember(id, memberId);
    team.value = await teamDb.getTeam(id);
}

async function setUrl(joinCode: string) {
    const route = router.resolve({
        name: 'join-team',
        params: {
            teamId: id,
        }, query: {
            code: joinCode,
        }
    });

    if (route) {
        const url = location.origin + route.href;
        await navigator.clipboard.writeText(url);
        linkCopied.value = true;
        setTimeout(() => {
            linkCopied.value = false;
        }, 2000);
    }
}
</script>


<template>
    <div class="container">
        <div class="team">
            <div class="team-name">
                <h1>{{ team.name }}</h1>
                <sub>{{ $l('teams.labels.ownerName') }}: {{ team.owner.name }}</sub>
            </div>
            <div class="list-container">
                <div class="header">
                    <h2 v-text="$l('teams.labels.members')" />
                    <button @click="setUrl(team.joinCode)">
                        <span v-if="!linkCopied">
                            <i class="fas fa-clipboard" />
                        </span>
                        <span v-if="linkCopied">
                            <i class="fas fa-check" />
                        </span>
                        <span v-text="$l('teams.labels.copyInvite')" />
                    </button>
                </div>
                <div class="row" v-for="member in team.members" :key="member.id">
                    <div class="col">
                        {{ member.name }}
                    </div>
                    <div class="col">
                        {{ member.email }}
                    </div>
                    <div v-if="editable" class="actions">
                        <button @click="removeMember(member.id)"><i class="fas fa-trash" /> {{
                                $l('teams.labels.removeMember')
                        }}</button>
                    </div>
                </div>
            </div>
            <div class="list-container clickable">
                <h2 class="header" v-text="$l('teams.labels.flights')" />
                <div class="row" v-for="flight in team.flightMissions" :key="flight.id"
                    @click.stop="router.push({ path: `/flights/${flight.id}` })">
                    <div class="col">
                        {{ flight.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import "@/assets/lists.css";

.container,
.team {
    min-height: 100%;
    position: absolute;
    width: 100%;
}

.team {
    display: flex;
    flex-direction: column;
}

.team .list-container {
    flex-grow: 1;
    flex-basis: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
}
</style>