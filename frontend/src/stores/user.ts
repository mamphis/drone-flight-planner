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
                const { code } = await response.json();
                if (code === 'P2002') { // TODO: maybe the error code will change depending on the backend
                    throw new Error('Registration failed: Either Username or Email is already taken.');
                }
                throw new Error(`Registration failed: ${response.status}`);
            }
        },
        async logout() {
            this.$patch({
                user: undefined,
                token: undefined
            });
            router.push('/login');
        },
        async updatePassword(password: string, newPassword: string): Promise<boolean> {
            if (!password) {
                return false;
            }
            if (!newPassword) {
                return false;
            }

            const main = mainStore();
            const url = `${main.apiUrl}/users/changePassword`;
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ password, newPassword }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.status === 200) {
                return true;
            } else {
                if (response.status == 401) {
                    this.logout();
                }
                const content = await response.json();
                console.warn(content);
                return false;
            }
        },
        async updateUser(user: User): Promise<boolean> {
            const main = mainStore();
            const url = `${main.apiUrl}/users/${this.user?.id}`;
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.status === 200) {
                const newUser = await response.json() as User;
                this.$patch({
                    user: newUser,
                });
                return true;
            } else {
                if (response.status == 401) {
                    this.logout();
                }
                const content = await response.json();
                console.warn(content);
                return false;
            }
        }
    },
    persist: {
        enabled: true,
    }
});