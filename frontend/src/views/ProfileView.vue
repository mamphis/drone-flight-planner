
<script lang="ts" setup>
import { Translator } from '@/libs/localization/localizator';
import { userStore } from '@/stores/user';
import { inject, ref } from 'vue';
const db = userStore();
let user = ref({ ...db.user! });
let password = ref('');
let newPassword = ref('');

const $l = inject<Translator>('$l')!;

async function updatePassword() {
    if (password.value !== newPassword.value) {
        if (await db.updatePassword(password.value, newPassword.value)) {
            password.value = newPassword.value = '';
        }
    }
}

async function updateUser() {
    if(await db.updateUser(user.value)){
        user.value = db.user!;
    }
}
</script>
<template>
    <h1 v-text="$l('profile.labels.profile')"/>
    <div class="container">
        <div class="details">
            <div class="field">
                <div class="label" for="username" v-text="$l('profile.labels.username')" />
                <input type="text" id="username" v-model="user.username">
            </div>
            <div class="field">
                <div class="label" for="name" v-text="$l('profile.labels.name')" />
                <input type="text" id="name" v-model="user.name">
            </div>
            <div class="field">
                <div class="label" for="mail" v-text="$l('profile.labels.email')" />
                <input type="email" id="mail" v-model="user.email">
            </div>

            <div class="field">
                <div class="label" for="oldPassword" v-text="$l('profile.labels.oldPassword')" />
                <input type="password" id="oldPassword" v-model="password">
            </div>
            <div class="field">
                <div class="label" for="newPassword" v-text="$l('profile.labels.newPassword')" />
                <input type="password" id="newPassword" v-model="newPassword">
            </div>
            <div class="field">
                <div class="buttons">
                    <button @click="updatePassword()" v-text="$l('profile.labels.changePassword')" />
                    <button @click="updateUser()" v-text="$l('profile.labels.updateProfile')" />
                </div>
            </div>
        </div>
        <div class="profile-picture">
            <img src="user.profilePictureUri" alt="" />
            <button v-text="$l('profile.labels.changeProfilePicture')" />
        </div>
    </div>
</template>

<style lang="css" scoped>
.container {
    display: flex;
    flex-direction: row;
}

.details {
    width: 50%;
}

.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    text-align: left;
}

.field>.label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
}

.field>.buttons {
    display: flex;
    justify-content: space-between;
}

.profile-picture {
    width: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.profile-picture>img {
    width: 256px;
    height: 256px;
    border-radius: 50%;
    border: none;
    background-color: var(--color-background-mute);
}
</style>