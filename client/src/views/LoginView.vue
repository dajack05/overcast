<script setup lang="ts">

import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");

const loading = ref(false);
const error_msg = ref("");

const user = useUserStore();
const router = useRouter();

onMounted(() => {
    if (user.isLoggedIn()) {
        // Logged in
        router.push("/");
    }
});

async function login() {
    loading.value = true;

    // Reset error
    error_msg.value = "";

    const error = await user.Login(email.value, password.value);
    if (error) {
        error_msg.value = error;
    } else {
        // Fly home buddy
        router.push("/");
    }

    loading.value = false;
}

</script>

<template>
    <main class="flex min-h-screen">
        <div class="border shadow-lg m-auto p-10">
            <h1 class="text-4xl">Login</h1>
            <p v-if="loading" class="text-center text-red-500 text-xl animate-bounce">Loading...</p>
            <form @submit.prevent="login" class="border-t mt-2 pt-2 flex flex-col gap-2">
                <input :disabled="loading" v-model="email" type="email" placeholder="Email" />
                <input :disabled="loading" v-model="password" type="password" placeholder="Password" />
                <button :disabled="loading" class="btn success">Login</button>
                <p class="text-red-500 font-bold text-center text-2xl transition-all">{{error_msg}}</p>
            </form>
        </div>
    </main>
</template>