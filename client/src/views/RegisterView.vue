<script setup lang="ts">
import { UserService } from '@/services/user';
import { ref } from 'vue';


const loading = ref(false);
const error_msg = ref("");

const email = ref("");
const password = ref("");
const password_confirm = ref("");
const dob = ref("");

async function register() {
    loading.value = true;

    if (password.value !== password_confirm.value) {
        error_msg.value = "Passwords must match";
    } else {
        const result = await UserService.Register(email.value, password.value, dob.value);
    }

    loading.value = false;
}

</script>

<template>
    <main class="flex">
        <div class="border shadow-lg m-auto p-10">
            <h1 class="text-4xl">Register</h1>
            <p v-if="loading" class="text-center text-red-500 text-xl animate-bounce">Loading...</p>
            <form @submit.prevent="register" class="border-t mt-2 pt-2 flex flex-col gap-2">
                <div class="flex gap-2">
                    <div class="w-1/2">
                        <label>Email</label>
                        <input :disabled="loading" v-model="email" type="email" placeholder="Email" required />
                    </div>
                    <div class="w-1/2">
                        <label>Date of birth</label>
                        <input :disabled="loading" v-model="dob" type="date" required />
                    </div>
                </div>

                <label>Password</label>
                <input :disabled="loading" v-model="password" type="password" placeholder="Password" required />

                <label>Confirm Password</label>
                <input :disabled="loading" v-model="password_confirm" type="password" placeholder="Confirm Password"
                    required />
                <button :disabled="loading" class="btn success">Login</button>
                <p class="text-red-500 font-bold text-center text-2xl transition-all">{{error_msg}}</p>
            </form>
        </div>
    </main>
</template>