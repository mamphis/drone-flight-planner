<script lang="ts">
import { userStore } from "@/stores/user";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            email: "",
            password: "",
            username: "",
            displayName: "",
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

            if (this.username === "") {
                this.error = "Username is required";
                return;
            }

            if (this.displayName === "") {
                this.error = "Display name is required";
                return;
            }

            user.register({ email: this.email, name: this.displayName, password: this.password, username: this.username }).catch((err) => {
                this.error = err.message;

                console.log(err);
            });
        },
    },
});
</script>


<template>
    <div class="container">
        <h1>Register</h1>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" />
            </div>
            <div class="form-group">
                <label for="password">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" placeholder="Username" />
            </div>
            <div class="form-group">
                <label for="password">Displayname</label>
                <input type="text" class="form-control" id="displayName" v-model="displayName"
                    placeholder="Displayname" />
            </div>
            <div v-if="!!error" class="form-group error">
                <small>{{ error }}</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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
</style>