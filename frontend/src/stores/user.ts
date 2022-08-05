import router from "@/router";
import { defineStore } from "pinia";
import { mainStore } from './main';
import { translate } from '@/libs/localization/localizator';
import { User } from "./models";
import { post, put } from "@/libs/request/http";

export const userStore = defineStore({
    id: "user",
    state: () => ({
        user: undefined as User | undefined,
        token: undefined,
    }),
    getters: {
        isLoggedIn(state) {
            return !!state.user?.username;
        },

        getUser(state) {
            return state.user;
        }
    },
    actions: {
        async login(username: string, password: string) {
            const main = mainStore();
            const url = `${main.apiUrl}/users/login`;
            const response = await post(url, { username, password });

            if (response.status === 200) {
                const { token } = await response.json();

                this.$patch({
                    token,
                    user: JSON.parse(atob(token.split('.')[1].replace('_', '/').replace('-', '+'))) as User
                });
                router.push('/');
                return;
            } else {
                if (response.status === 401) {
                    throw new Error(translate('login.messages.invalidCredentials'));
                }
                throw new Error(translate('login.messages.loginFailed', `${response.status}`));
            }
        },
        async register({ username, password, email, name }: Omit<User, 'id' | 'profilePictureUri'> & { password: string }) {
            const main = mainStore();
            const url = `${main.apiUrl}/users/register`;
            const response = await post(url, { username, password, email, name });

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
                    throw new Error(translate('register.messages.usernameAlreadyTaken'));
                }
                throw new Error(translate('register.messages.registerFailed', response.status));
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
            const response = await post(url, { password, newPassword });

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
            const response = await put(url, user);

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
        strategies: [
            {
                paths: ['token'],
                storage: localStorage,
            },
            {
                paths: ['user'],
                storage: sessionStorage,
            },
        ],
    }
});