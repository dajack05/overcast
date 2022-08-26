<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuth';

const auth = useAuthStore();

</script>
<template>
    <div class="bg-slate-600 p-4 text-center text-slate-200 shadow-lg flex w-full">
        <div class="w-1/3"></div>
        <div class="w-1/3">
            <h1 class="text-4xl">Welcome {{ auth.user.first_name }}!</h1>
        </div>
        <div class="w-1/3 flex justify-end">
            <button @click="()=>auth.logout()" class="button bg-red-400">Log Out</button>
        </div>
    </div>
</template>