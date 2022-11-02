<script setup lang="ts">
import type { Group, User } from '@ovc/common';
import { ref } from 'vue';

defineEmits(['cancel']);

const props = defineProps<{
    group:Group,
}>();

const available_users = ref<User[]>([]);
</script>
<template>
    <div>
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50">
        </div>
        <div class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <div class="bg-slate-50 rounded-md">
                <div class="flex flex-row-reverse">
                    <button @click="$emit('cancel')" class="btn danger">X</button>
                </div>
                <div class="p-4">
                    <p class="text-2xl text-black opacity-100">Add Member to {{ group.name }}</p>
                    <hr />
                    <div v-for="user, i in available_users" :key="i">
                        <strong>{{ user.first_name }} {{ user.last_name }}</strong>
                        <button class="btn success">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>