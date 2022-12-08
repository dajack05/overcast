<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const loggedIn = computed(() => userStore.isLoggedIn());
const isAdmin = computed(() => userStore.isAdmin());
const router = useRouter();

function goHome() {
    router.push("/");
}

function logout() {
    userStore.Logout();
    goHome();
}
</script>

<template>
    <nav class="w-full p-2 px-8 flex bg-slate-100 shadow-md mb-4">
        <div class="w-1/4">
            <!-- Left -->
            <p class="text-3xl font-bold font-serif cursor-pointer w-fit hover:underline" @click="goHome">Overcast</p>
            <p class="italic text-sm">v0.1.0</p>
        </div>
        <div v-if="loggedIn" class="w-1/2 flex flex-col justify-center">
            <!-- Center -->
            <p class="text-2xl text-center">Welcome {{ userStore.user.first_name }}</p>
            <ul class="flex justify-center items-baseline">
                <li class="mr-6">
                    <RouterLink to="/" class="text-blue-500 hover:text-blue-800">Home</RouterLink>
                </li>
                <li v-if="isAdmin" class="mr-6">
                    <RouterLink to="register" class="text-blue-500 hover:text-blue-800">Register User</RouterLink>
                </li>
                <li v-if="isAdmin" class="mr-6">
                    <RouterLink to="register_group" class="text-blue-500 hover:text-blue-800">Register Group
                    </RouterLink>
                </li>
                <li v-if="isAdmin" class="mr-6">
                    <RouterLink to="email" class="text-blue-500 hover:text-blue-800">Email
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div v-if="loggedIn" class="w-1/4 flex justify-end">
            <!-- Right -->
            <div>
                <button @click="logout" class="btn danger">Logout</button>
            </div>
        </div>
    </nav>
</template>