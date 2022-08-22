<script setup lang="ts">
const email = ref("");
const password = ref("");
const confirm_password = ref("");

const button_enabled = ref(true);
const error_message = ref("");

async function register(){
    button_enabled.value = false;

    const {result, error} = await $fetch('/api/register',{
        method:"POST",
        body:{
            email:email.value,
            password:password.value,
            confirm_password:confirm_password.value,
        }
    });

    if(error){
        error_message.value = error;
    }else{
        console.log(result);
    }

    button_enabled.value = true;
}
</script>

<template>
    <div class="w-full h-screen bg-slate-200 flex flex-col justify-center items-center">
        <form @submit.prevent class="p-4 rounded bg-slate-100 shadow w-1/2 min-w-[400px] flex flex-col gap-2">
            <h1 class="text-4xl">Register</h1>
            <hr />
            <input v-model="email" type="text" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <input v-model="confirm_password" type="password" placeholder="Confirm Password" />
            <button @click="() => register()" :disabled="!button_enabled" :class="{
                'bg-slate-200': !button_enabled,
                'bg-lime-200 hover:bg-lime-100 active:bg-lime-300': button_enabled,
            }" class="shadow rounded transition-all px-4 py-2 ">
                Register
            </button>
            <p v-if="error_message" class="bg-red-50 p-2 border rounded text-center border-red-200 text-red-500 font-extrabold">
                {{ error_message }}
            </p>
            <NuxtLink class="underline" to="/auth">Back to Login</NuxtLink>
        </form>
    </div>
</template>

<style>
input {
    @apply shadow rounded px-4 py-2 transition-all focus:outline-lime-300 active:outline-lime-400 hover:outline-lime-500;
}
</style>