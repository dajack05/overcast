<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuth';

const auth = useAuthStore();
const user = computed(() => auth.getUser);

onMounted(async ()=>{
    const result = await auth.loadUser();
    console.log(result);
});

async function logout() {
    // auth.logout();
}
</script>

<template>
    <div v-if="user" class="w-full h-screen flex flex-col items-center bg-slate-200 text-slate-700">
        <div class="bg-slate-600 p-4 text-center text-slate-200 shadow-lg flex w-full">
            <div class="w-1/3"></div>
            <div class="w-1/3">
                <h1 class="text-4xl">Welcome {{ user.first_name }}!</h1>
            </div>
            <div class="w-1/3 flex justify-end">
                <button @click="logout" class="bg-red-400 px-4 py-2 rounded shadow">Log Out</button>
            </div>
        </div>

        <div class="flex w-full max-w-[500px]">
            <UserInfoDisplay :user="auth.user" />
        </div>
    </div>
</template>