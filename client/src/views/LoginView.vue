<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookies } from "vue3-cookies";

const email = ref("");
const password = ref("");

const loading = ref(false);

const cookies = useCookies();
const jwt = cookies.cookies.get("jwt");

console.log(jwt);

onMounted(()=>{
    if(jwt){
        // Logged in
        useRouter().push("/");
    }
});

async function login(){
    loading.value = true;

    const response = await fetch(`http://localhost:8080/login?username=${email.value}&password=${password.value}`,{
        method:"GET",
    });

    const text = await response.text();
    console.log(text);

    loading.value = false;
    cookies.cookies.set("jwt", text);
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