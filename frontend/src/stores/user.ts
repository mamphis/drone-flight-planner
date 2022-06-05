import router from "@/router";
import { defineStore } from "pinia";
import { mainStore } from './main';
type User = {
    username: string,
    email: string,
    id: string,
    name: string
};
export const userStore = defineStore({
    id: "user",
    state: () => ({
        user: undefined as User | undefined,
        token: undefined,
    }),
    getters: {
        isLoggedIn(state) {
            return !!state.user;
        },

        getUser(state) {
            return state.user;
        }
    },
    actions: {
        async login(username: string, password: string) {
            const main = mainStore();
            const url = `${main.apiUrl}/users/login`;
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.status === 200) {
                const { token } = await response.json();
                this.$patch({
                    token,
                    user: JSON.parse(atob(token.split('.')[1])) as User
                });
                router.push('/');
                return;
            } else {
                throw new Error(`Login failed: ${response.status}`);
            }
        },
        async register({ username, password, email, name }: Omit<User, 'id'> & { password: string }) {
            const main = mainStore();
            const url = `${main.apiUrl}/users/register`;
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ username, password, email, name }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.status === 200) {
                const { token } = await response.json();
                this.$patch({
                    token,
                    user: JSON.parse(atob(token.split('.')[1])) as User
                });
                router.push('/');
                return;
            } else {
                const {code} = await response.json();
                if (code === 'P2002') { // TODO: maybe the error code will change depending on the backend
                    throw new Error('Registration failed: Either Username or Email is already taken.');
                }
                throw new Error(`Registration failed: ${response.status}`);
            }
        }
    },
    persist: {
        enabled: true,
    }
});