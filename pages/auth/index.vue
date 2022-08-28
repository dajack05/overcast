<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuth';

const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const button_enabled = ref(true);
const error_message = ref("");

definePageMeta({ layout: false });

async function login() {
    button_enabled.value = false;
    error_message.value = "";

    const error = await authStore.login(email.value, password.value);

    if (error) {
        error_message.value = error;
    } else {
        useRouter().push('/');
    }

    button_enabled.value = true;
}
</script>

<template>
    <div class="w-full h-screen bg-slate-200 flex flex-col justify-center items-center">
        <form @submit.prevent class="p-4 rounded bg-slate-100 shadow w-1/2 min-w-[400px] flex flex-col gap-2">
            <h1 class="text-4xl">Login</h1>
            <hr />
            <input v-model="email" type="text" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />

            <button @click="() => login()" :disabled="!button_enabled" class="button green">
                Login
            </button>
            <p v-if="error_message"
                class="bg-red-50 p-2 border rounded text-center border-red-200 text-red-500 font-extrabold">
                {{ error_message }}
            </p>
            <NuxtLink class="underline" to="/auth/register">Register</NuxtLink>
        </form>
    </div>
</template>