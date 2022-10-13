<script setup lang="ts">import { ref } from 'vue';


const email = ref("");
const password = ref("");

function login(){
    alert("Oh, hi Mark!\n\n"+email.value+" "+password.value);
}

</script>

<template>
    <main class="flex min-h-screen">
        <div class="border shadow-lg m-auto p-10">
            <h1 class="text-4xl">Login</h1>
            <form @submit.prevent="login" class="border-t mt-2 pt-2 flex flex-col gap-2">
                <input :value="email" type="email" placeholder="Email"/>
                <input :value="password" type="password" placeholder="Password"/>
                <button class="btn success">Login</button>
            </form>
        </div>
    </main>
</template>