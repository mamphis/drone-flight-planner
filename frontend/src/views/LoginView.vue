<script lang="ts">
import { userStore } from "@/stores/user";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        onSubmit() {
            const user = userStore();
            this.error = "";
            if (this.email === "") {
                this.error = "Email is required";
                return;
            }
            if (this.password === "") {
                this.error = "Password is required";
                return;
            }
            user.login(this.email, this.password).catch((err) => {
                this.error = err.message;
            });
        },
    },
});
</script>


<template>
    <div class="container">
        <h1>Login</h1>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" />
            </div>
            <div v-if="!!error" class="form-group error">
                <small>{{ error }}</small>
            </div>
            <div class="spread">
                <button type="submit" class="btn btn-primary">Submit</button>
                <router-link to="/register" class="link">Register</router-link>
            </div>
        </form>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    display:flex;
    justify-content: space-between;
    align-items: center;
}
</style>