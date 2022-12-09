<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const loggedIn = computed(() => userStore.isLoggedIn());
const isAdmin = computed(() => userStore.isAdmin());
const router = useRouter();

const route_name = ref(router.currentRoute.value.name || "home");

watch(router.currentRoute, (newRoute) => {
    if (newRoute.name) {
        route_name.value = newRoute.name.toString();
    }
})

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
            <ul class="flex justify-center items-baseline">
                <li class="w-[90px] flex flex-col items-center">
                    <RouterLink to="/">Home</RouterLink>
                    <span :class="{'opacity-0':route_name != 'home'}"
                        class="rounded-full transition-opacity w-full min-h-[6px] bg-[#41A6F6]"></span>
                </li>
                <li v-if="isAdmin" class="w-[90px] flex flex-col items-center">
                    <RouterLink to="register">Club</RouterLink>
                    <span :class="{'opacity-0':route_name != 'register'}"
                        class="rounded-full transition-opacity w-full min-h-[6px] bg-[#41A6F6]"></span>
                </li>
                <li v-if="isAdmin" class="w-[90px] flex flex-col items-center">
                    <RouterLink to="register_group">Aircraft</RouterLink>
                    <span :class="{'opacity-0':route_name != 'register_group'}"
                        class="rounded-full transition-opacity w-full min-h-[6px] bg-[#41A6F6]"></span>
                </li>
                <li v-if="isAdmin" class="w-[90px] flex flex-col items-center">
                    <RouterLink to="email">Reports</RouterLink>
                    <span :class="{'opacity-0':route_name != 'email'}"
                        class="rounded-full transition-opacity w-full min-h-[6px] bg-[#41A6F6]"></span>
                </li>
            </ul>
        </div>
        <div v-if="loggedIn" class="w-1/4 flex justify-end p-4">
            <!-- Right -->
            <div>
                <button @click="logout" class="btn danger">Logout</button>
            </div>
        </div>
    </nav>
</template>