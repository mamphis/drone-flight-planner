import { defineStore } from "pinia";
import { mainStore } from './main';
import { TeamOverview, User } from "./models";
import { del, get, post } from "@/components/request/http";

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
                this.refreshTeams();
            } else {
                const { message } = await response.json();
                if (message) {
                    throw new Error(message);
                }
            }
        },

        async deleteTeam(id: string): Promise<void> {
            const main = mainStore();
            const url = `${main.apiUrl}/teams/${id}`;
            const response = await del(url);

            if (response.status === 204) {
                this.refreshTeams();
            } else {
                const { message } = await response.json();
                if (message) {
                    throw new Error(message);
                }
            }
        }
    },
    persist: {
        enabled: true,
    }
});
