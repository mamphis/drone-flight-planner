import { defineStore } from "pinia";
import { mainStore } from './main';
import { TeamOverview, User } from "./models";
import { get } from "@/components/request/http";

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
        }
    },
    persist: {
        enabled: true,
    }
});
