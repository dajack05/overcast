<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const loggedIn = computed(() => userStore.isLoggedIn());
const isAdmin = computed(()=>userStore.isAdmin());
const router = useRouter();

function goHome(){
    router.push("/");
}

function logout(){
    userStore.Logout();
    goHome();
}
</script>

<template>
    <nav class="w-full p-2 px-8 flex bg-slate-100 shadow-md mb-4">
        <div class="w-1/4">
            <!-- Left -->
            <p class="text-3xl font-bold font-serif cursor-pointer w-fit hover:underline" @click="goHome" >Overcast</p>
            <p class="italic text-sm">v0.1.0</p>
        </div>
        <div class="w-1/2 flex flex-col">
            <!-- Center -->
            <p v-if="loggedIn" class="text-2xl text-center">Welcome {{userStore.user.first_name}} {{userStore.user.last_name}}</p>
            <p v-if="!loggedIn" class="text-2xl text-center">Welcome</p>
            <div v-if="loggedIn" class="flex justify-center gap-2">
                <RouterLink class="btn" to="/">Home</RouterLink>
                <RouterLink v-if="isAdmin" class="btn" to="/register">Register User</RouterLink>
                <RouterLink v-if="isAdmin" class="btn" to="/register_group">Register Group</RouterLink>
            </div>
        </div>
        <div class="w-1/4 flex justify-end">
            <!-- Right -->
            <button v-if="loggedIn" @click="logout" class="btn danger">Logout</button>
        </div>
    </nav>
</template>