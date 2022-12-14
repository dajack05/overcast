<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import NavBarItem from "@/components/NavBarItem.vue"

const userStore = useUserStore();
const loggedIn = computed(() => userStore.isLoggedIn());
const isAdmin = computed(() => userStore.isAdmin());
const router = useRouter();

const route_name = computed(() => router.currentRoute.value.name || "home");

function goHome() {
    router.push("/");
}

function logout() {
    userStore.Logout();
    goHome();
}
</script>

<template>
    <nav class="w-full px-8 flex bg-[#566C86] text-[#F4F4F4] shadow-md mb-4">
        <div class="w-1/4 p-4">
            <!-- Left -->
            <p class="text-3xl font-bold cursor-pointer w-fit hover:underline" @click="goHome">Overcast</p>
        </div>
        <div v-if="loggedIn" class="w-1/2 flex flex-col justify-end m-0">
            <!-- Center -->
            <div class="flex justify-center items-baseline">
                <NavBarItem title="Home" link="/" />
                <NavBarItem title="Club" link="/club" />
                <NavBarItem title="Reports" link="/reports" />
            </div>
        </div>
        <div v-if="loggedIn" class="w-1/4 flex justify-end p-4">
            <!-- Right -->
            <div>
                <button @click="logout" class="btn danger">Logout</button>
            </div>
        </div>
    </nav>
</template>