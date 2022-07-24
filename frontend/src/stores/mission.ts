import { defineStore } from "pinia";
import { mainStore } from './main';
import { FlightMission } from "./models";

export const missionStore = defineStore({
    id: "mission",
    state: () => ({
        missions: [] as FlightMission[]
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
        }
    },
    persist: {
        enabled: true,
    }
});