
<script lang="ts" setup>
import { userStore } from '@/stores/user';
import { ref } from 'vue';
const db = userStore();
let user = ref({ ...db.user! });
let password = ref('');
let newPassword = ref('');

async function updatePassword() {
    if (password.value !== newPassword.value) {
        await db.updatePassword(password.value, newPassword.value);
        password.value = newPassword.value = '';
    }
}

async function updateUser() {
    await db.updateUser(user.value);
    user.value = db.user!;
}
</script>
<template>
    <h1>Profile</h1>
    <div class="container">
        <div class="details">
            <div class="field">
                <div class="label" for="username">Username</div>
                <input type="text" id="username" v-model="user.username">
            </div>
            <div class="field">
                <div class="label" for="name">Name</div>
                <input type="text" id="name" v-model="user.name">
            </div>
            <div class="field">
                <div class="label" for="mail">E-Mail</div>
                <input type="email" id="mail" v-model="user.email">
            </div>

            <div class="field">
                <div class="label" for="oldPassword">Old Password</div>
                <input type="password" id="oldPassword" v-model="password">
            </div>
            <div class="field">
                <div class="label" for="newPassword">New Password</div>
                <input type="password" id="newPassword" v-model="newPassword">
            </div>
            <div class="field">
                <div class="buttons">
                    <button @click="updatePassword()">Change Password</button>
                    <button @click="updateUser()">Update Profile</button>
                </div>
            </div>
        </div>
        <div class="profile-picture">
            <img src="http://gravatar.com/avatar/1231112322131312312?d=identicon" alt="" />
            <button>Change Profile Picture</button>
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