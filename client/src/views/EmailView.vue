<script setup lang="ts">
import { UserService } from '@/services/UserService';
import { computed } from '@vue/reactivity';

const all_users = computed(() => UserService.GetAll());

function submit() {
    alert("Bam!");
}
</script>
<template>
    <div class="flex justify-center items-center">
        <div class="p-4 rounded border">
            <h1 class="text-4xl">Email</h1>
            <form @submit.prevent="submit">
                <div>
                    <select v-if="(typeof (all_users) !== 'string')">
                        <option v-for="user, i in all_users" :key="i" :value="user.email" </option>
                    </select>
                </div>

                <input type="submit" class="btn" value="Send it!" />
            </form>
        </div>
    </div>
</template>