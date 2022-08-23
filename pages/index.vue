<script setup lang="ts">
import { COOKIE_NAME } from '~~/Globals';
import { LoginToken } from '~~/server/src/User';

const user = useCookie<LoginToken>(COOKIE_NAME);

async function logout() {
    user.value = null;
    useRouter().push('/auth');
}
</script>

<template>
    <div class="w-full h-screen bg-slate-100 text-slate-700">
        <div class="bg-slate-600 p-4 text-center text-slate-200 shadow-lg flex">
            <div class="w-1/3"></div>
            <div class="w-1/3">
                <h1 class="text-4xl">Welcome {{ user.first_name }}!</h1>
            </div>
            <div class="w-1/3 flex justify-end">
                <button @click="logout" class="bg-red-400 px-4 py-2 rounded shadow">Log Out</button>
            </div>
        </div>
    </div>
</template>