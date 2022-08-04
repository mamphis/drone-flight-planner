import { defineStore } from "pinia";
import { mainStore } from './main';
import { TeamDetail, TeamOverview } from "./models";
import { del, get, post } from "@/libs/request/http";

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
        },

        async getTeam(id: string): Promise<TeamDetail> {
            const main = mainStore();
            const url = `${main.apiUrl}/teams/${id}`;
            const response = await get(url);

            if (response.status === 200) {
                return await response.json();
            }

            throw new Error(await response.json());
        },

        async joinTeam(id: string, code: string): Promise<void> {
            const main = mainStore();
            const url = `${main.apiUrl}/teams/${id}/members?code=${code}`;
            const response = await post(url);

            if (response.status === 200) {
                return await response.json();
            }

            throw new Error(await response.json());
        },

        async removeMember(id: string, memberId: string): Promise<void> {
            const main = mainStore();
            const url = `${main.apiUrl}/teams/${id}/members/${memberId}`;
            const response = await del(url);

            if (response.status === 200) {
                return await response.json();
            }

            throw new Error(await response.json());
        }
    },
    persist: {
        enabled: true,
    }
});
