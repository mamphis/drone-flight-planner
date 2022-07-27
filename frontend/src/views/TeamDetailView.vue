<script lang="ts" setup>
import { teamStore } from '@/stores/team';
import { userStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const id = router.currentRoute.value.params.id as string;

const teamDb = teamStore();
const userDb = userStore();
const team = await teamDb.getTeam(id);
const editable = team.owner.id === userDb.user?.id;
</script>


<template>
    <div class="container">
        <div class="team">
            <div class="team-name">
                <h1>{{ team.name }}</h1>
            </div>
            <div class="team-members">
                <div class="team-member" v-for="member in team.members" :key="member.id">
                    <div class="team-member-name">
                        {{ member.name }}
                    </div>
                    <div class="team-member-email">
                        {{ member.email }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>