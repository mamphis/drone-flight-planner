import { defineStore } from "pinia";

export const mainStore = defineStore({
    id: 'main',
    state: () => ({
        apiUrl: 'http://localhost:3000/api/v1',
    }),
})