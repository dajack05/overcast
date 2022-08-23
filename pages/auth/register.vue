<script setup lang="ts">
import { AddUserParams } from '~~/server/src/User';

const email = ref("");
const password = ref("");
const confirm_password = ref("");
const first_name = ref("");
const last_name = ref("");
const phone = ref("");
const dob = ref("");

const button_enabled = ref(true);
const error_message = ref("");

async function register() {
    button_enabled.value = false;

    const { response, error } = await $fetch('/api/register', {
        method: "POST",
        body: {
            email: email.value,
            password: password.value,
            confirmPassword: confirm_password.value,
            first_name: first_name.value,
            last_name: last_name.value,
            dob: new Date(dob.value),
            phone: phone.value,
        } as AddUserParams
    });

    if (error) {
        error_message.value = error;
    } else {
        useRouter().push("/");
    }

    button_enabled.value = true;
}
</script>

<template>
    <div class="w-full h-screen bg-slate-200 flex flex-col justify-center items-center">
        <form @submit.prevent class="p-4 rounded bg-slate-100 shadow w-1/2 min-w-[400px] flex flex-col gap-2">
            <h1 class="text-4xl">Register</h1>
            <hr />

            <TextField type="email" title="Email" v-model="email" />
            <TextField type="password" title="Password" v-model="password" />
            <TextField type="password" title="Confirm Password" v-model="confirm_password" />

            <div class="flex gap-2 max-w-full">
                <TextField type="text" title="First Name" v-model="first_name" />
                <TextField type="text" title="Last Name" v-model="last_name" />
            </div>

            <div class="flex gap-2 max-w-full">
                <TextField type="date" title="Date of Birth" v-model="dob" />
                <TextField type="tel" title="Phone Number" v-model="phone" />
            </div>

            <button @click="() => register()" :disabled="!button_enabled" :class="{
                'bg-slate-200': !button_enabled,
                'bg-lime-200 hover:bg-lime-100 active:bg-lime-300': button_enabled,
            }" class="shadow rounded transition-all px-4 py-2 ">
                Register
            </button>
            <p v-if="error_message"
                class="bg-red-50 p-2 border rounded text-center border-red-200 text-red-500 font-extrabold">
                {{ error_message }}
            </p>
            <NuxtLink class="underline" to="/auth">Back to Login</NuxtLink>
        </form>
    </div>
</template>

<style>
input {
    @apply w-full shadow rounded px-4 py-2 transition-all focus:outline-lime-300 active:outline-lime-400 hover:outline-lime-500;
}
</style>