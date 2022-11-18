<script setup lang="ts">
import { UserService } from '@/services/UserService';
import type { User } from '@ovc/common';
import { onMounted, ref } from "vue";
import UserProfileDisplay from "./ProfileDisplay.vue";

const all_users = ref<User[]>();

onMounted(async ()=>{
    const new_users = await UserService.GetAll();
    if(typeof(new_users) !== 'string'){
        all_users.value = new_users;
    }
})
</script>

<template>
    <div class="border rounded-md w-5/12 min-w-[300px] max-h-[400px] overflow-auto">
        <p class="text-2xl">All Users</p>
        <div>
            <UserProfileDisplay v-for="user,i in all_users" :key="i" :user="user" />
        </div>
    </div>
</template>