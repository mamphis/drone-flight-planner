import { get, post } from "@/libs/request/http";
import { defineStore } from "pinia";
import { mainStore } from './main';
import { FlightMissionLean } from "./models";

export const missionStore = defineStore({
    id: "mission",
    state: () => ({
        missions: [] as FlightMissionLean[]
    }),
    getters: {

    },
    actions: {
        async refreshMissions() {
            const main = mainStore();
            const url = `${main.apiUrl}/missions`;
            const response = await get(url);
            if (response.status === 200) {
                const missions = await response.json();
                this.$patch({
                    missions,
                });
            }
        },
        async createMission(teamId: string, name: string) {
            const main = mainStore();
            const url = `${main.apiUrl}/missions`;
            const response = await post(url, { teamId, name });
            if (response.status === 200) {
                await this.refreshMissions();
            }
        }
    },
    persist: {
        enabled: true,
    }
});