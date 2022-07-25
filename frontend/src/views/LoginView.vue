<script setup lang="ts">
import { userStore } from "@/stores/user";
import NotificationMessage from '@/components/notification/notificationMessage.vue';
import { reactive, inject } from "vue";
import { Translator } from "@/libs/localization/localizator";

const $l = inject<Translator>('$l')!;

const state = reactive({
    error: '',
    email: '',
    password: '',
});

function onSubmit() {
    const user = userStore();
    state.error = "";
    if (state.email === "") {
        state.error = $l('login.messages.emailRequired');
        return;
    }
    if (state.password === "") {
        state.error = $l('login.messages.passwordRequired');
        return;
    }
    user.login(state.email, state.password).catch((err) => {
        state.error = err.message;
    });
}
</script>

<template>
    <NotificationMessage v-if="!!state.error" :text="state.error" :type="'error'" @close="state.error = ''">
    </NotificationMessage>
    <div class="container">
        <h1 v-text="$l('login.labels.login')" />
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="email" v-text="$l('login.labels.email')" />
                <input type="email" class="form-control" id="email" v-model="state.email"
                    :placeholder="$l('login.labels.email.placeholder')" />
            </div>
            <div class="form-group">
                <label for="password" v-text="$l('login.labels.password')" />
                <input type="password" class="form-control" id="password" v-model="state.password"
                    :placeholder="$l('login.labels.password.placeholder')" />
            </div>
            <div class="spread">
                <button type="submit" class="btn btn-primary" v-text="$l('login.labels.submit')" />
                <router-link to="/register" class="link" v-text="$l('login.labels.register')" />
            </div>
        </form>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.container>h1 {
    margin-right: 1rem;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.form-group>label {
    margin-bottom: 0;
}

.form-group.error {
    color: red;
}

.spread {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>