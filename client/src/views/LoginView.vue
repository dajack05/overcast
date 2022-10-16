<script setup lang="ts">

import { ref } from 'vue';

const email = ref("");
const password = ref("");

const loading = ref(false);

async function login(){
    loading.value = true;

    const response = await fetch(`http://localhost:8080/login?username=${email.value}&password=${password.value}`,{
        method:"GET",
    });

    const text = await response.text();
    console.log(text);

    loading.value = false;
}

</script>

<template>
    <main class="flex min-h-screen">
        <div class="border shadow-lg m-auto p-10">
            <h1 class="text-4xl">Login</h1>
            <p v-if="loading" class="text-center text-red-500 text-xl animate-bounce">Loading...</p>
            <form @submit.prevent="login" class="border-t mt-2 pt-2 flex flex-col gap-2">
                <input :disabled="loading" v-model="email" type="email" placeholder="Email"/>
                <input :disabled="loading" v-model="password" type="password" placeholder="Password"/>
                <button :disabled="loading" class="btn success">Login</button>
            </form>
        </div>
    </main>
</template>