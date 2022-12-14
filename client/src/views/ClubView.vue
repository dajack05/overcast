<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();

const club = ref({
    name: "Cloud Niners",
    airport_code: "2R2",
    user_count: 15,
    aircraft_count: 1,
});

</script>
<template>
    <div class="flex flex-col">
        <div class="p-4 bg-slate-50 flex justify-between">
            <div>
                <h1 class="text-4xl">{{ club.name }}</h1>
                <h2 class="text-xl underline">Based @ {{ club.airport_code }}</h2>
            </div>
            <div>
                <p>{{ club.user_count }} Members</p>
                <p>{{ club.aircraft_count }} Aircraft</p>
            </div>
        </div>
        <div class="bg-slate-200 h-full p-4">
            <div class="container mx-auto">
                Boo
            </div>
        </div>
    </div>
</template>