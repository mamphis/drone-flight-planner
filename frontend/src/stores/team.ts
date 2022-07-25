import { defineStore } from "pinia";
import { mainStore } from './main';
import { TeamOverview, User } from "./models";
import { get, post } from "@/components/request/http";

export const teamStore = defineStore({
    id: "team",
    state: () => ({
        teams: [] as TeamOverview[],
    }),
    getters: {
    },
    actions: {
        async refreshTeams() {
            const main = mainStore();
            const url = `${main.apiUrl}/teams`;
            const response = await get(url);

            if (response.status === 200) {
                const teams = await response.json();
                this.$patch({
                    teams,
                });
            }
        },
        async createTeam(name: string) {
            const main = mainStore();
            const url = `${main.apiUrl}/teams`;
            const response = await post(url, { name });

            if (response.status === 200) {
                const teams = await response.json();
                this.refreshTeams();
            }
        },
    },
    persist: {
        enabled: true,
    }
});
