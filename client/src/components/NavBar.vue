<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const loggedIn = computed(() => userStore.isLoggedIn());
const isAdmin = computed(() => userStore.isAdmin());
const router = useRouter();

const route_name = ref(router.currentRoute.value.name || "home");

let tab_number = ref(0);

watch(router.currentRoute, (newRoute) => {
    if (newRoute.name) {
        route_name.value = newRoute.name.toString();
        switch (route_name.value) {
            case "home":
                tab_number.value = 0;
                break;
            case "register":
                tab_number.value = 1;
                break;
            case "register_group":
                tab_number.value = 2;
                break;
            case "email":
                tab_number.value = 3;
                break;
        }
    }
})

function goHome() {
    router.push("/");
}

function logout() {
    userStore.Logout();
    goHome();
}

function getOffset(): number {
    const offset = 38 + 90 * tab_number.value;
    console.log(offset);
    return offset;
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
                </li>
                <li v-if="isAdmin" class="w-[90px] flex flex-col items-center">
                    <RouterLink to="register">Club</RouterLink>
                </li>
                <li v-if="isAdmin" class="w-[90px] flex flex-col items-center">
                    <RouterLink to="register_group">Aircraft</RouterLink>
                </li>
                <li v-if="isAdmin" class="w-[90px] flex flex-col items-center">
                    <RouterLink to="email">Reports</RouterLink>
                </li>
            </ul>
            <span
                :style="{ transform: `translate(${getOffset()}px, 0px)`, transitionDuration: '0.5s', transitionTimingFunction: 'cubic-bezier(.61,-0.23,.3,1.27)' }"
                class="rounded-full transition-transform w-[25%] min-h-[6px] bg-[#41A6F6]"></span>
        </div>
        <div v-if="loggedIn" class="w-1/4 flex justify-end p-4">
            <!-- Right -->
            <div>
                <button @click="logout" class="btn danger">Logout</button>
            </div>
        </div>
    </nav>
</template>