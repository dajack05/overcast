<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuth';

const auth = useAuthStore();

const showMenu = ref(false);

const menuItems = [
    { text: "Home", href: "/" },
    { text: "Club", href: "/club" },
    { text: "Profile", href: "/profile" },
];

</script>
<template>
    <div class="w-full">
        <div class="bg-slate-600 p-4 text-center text-slate-200 shadow flex w-full">
            <div class="w-1/4">
                <button class="block sm:hidden" @click="showMenu = true">Menu</button>
            </div>
            <div class="w-1/2">
                <h1 class="hidden sm:block text-4xl whitespace-nowrap">Welcome {{ auth.user.first_name }}!</h1>
            </div>
            <div class="w-1/4 flex justify-end items-center">
                <button @click="() => auth.logout()" class="red small whitespace-nowrap">Log Out</button>
            </div>
        </div>
        <div class="bg-slate-600 text-slate-200 text-center pb-2">
            <h1 class="block sm:hidden text-4xl whitespace-nowrap">Welcome {{ auth.user.first_name }}!</h1>
        </div>
        <div class="hidden sm:flex bg-slate-500 p-2 text-center text-slate-200 w-full gap-2 justify-end">
            <NuxtLink :href="item.href" v-for="item, i in menuItems" :key="i">{{ item.text }}</NuxtLink>
        </div>
        <div v-if="showMenu" class="flex sm:hidden flex-col fixed top-0 left-0 p-4 gap-2 bg-slate-500 text-slate-200">
            <button class="blue" @click="showMenu = false">X</button>
            <NuxtLink @click="showMenu = false" class="button" :href="item.href" v-for="item, i in menuItems" :key="i">{{ item.text }}</NuxtLink>
        </div>
    </div>
</template>