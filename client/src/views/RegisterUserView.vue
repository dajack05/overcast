<script setup lang="ts">
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import { UserType } from '@ovc/common';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const loading = ref(false);
const error_msg = ref("");

const email = ref("");
const password = ref("");
const password_confirm = ref("");
const dob = ref("");
const first_name = ref("");
const last_name = ref("");

const userStore = useUserStore();

onMounted(() => {
    if (!userStore.isLoggedIn() || userStore.user.permission_level !== UserType.ADMIN) {
        // See ya!
        useRouter().push("/");
    }
});

async function register() {
    loading.value = true;

    error_msg.value = "";

    if (password.value !== password_confirm.value) {
        error_msg.value = "Passwords must match";
    } else {
        const result = await UserService.Register(email.value, password.value, dob.value, first_name.value, last_name.value);
        if (result) {
            error_msg.value = result;
        }else{
            email.value = password.value = password_confirm.value = dob.value = first_name.value = last_name.value = "";
        }
    }

    loading.value = false;
}

</script>

<template>
    <main class="flex">
        <div class="border shadow-lg m-auto p-10">
            <h1 class="text-4xl">Register User</h1>
            <p v-if="loading" class="text-center text-red-500 text-xl animate-bounce">Loading...</p>
            <form @submit.prevent="register" class="border-t mt-2 pt-2 flex flex-col gap-2">
                <div class="flex gap-2">
                    <div class="w-1/2">
                        <label>First Name</label>
                        <input :disabled="loading" v-model="first_name" type="text" placeholder="First Name" required />
                    </div>
                    <div class="w-1/2">
                        <label>Last Name</label>
                        <input :disabled="loading" v-model="last_name" type="text" placeholder="Last Name" required />
                    </div>
                </div>

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
                <button :disabled="loading" class="btn success">Register</button>
                <p class="text-red-500 font-bold text-center text-2xl transition-all">{{error_msg}}</p>
            </form>
        </div>
    </main>
</template>