<script setup lang="ts">
import { UserService } from '@/services/UserService';
import type { User } from '@ovc/common';
import { onMounted, ref } from "vue";
import UserProfileDisplay from "./UserProfileDisplay.vue";

const all_users = ref<User[]>();

onMounted(async ()=>{
    const new_users = await UserService.GetAll();
    if(typeof(new_users) !== 'string'){
        all_users.value = new_users;
    }
})
</script>

<template>
    <div class="border rounded-md">
        <p class="text-2xl">All Groups</p>
        <div>
            <UserProfileDisplay v-for="user,i in all_users" :key="i" :user="user" />
        </div>
    </div>
</template>