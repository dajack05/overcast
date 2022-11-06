<script setup lang="ts">
import type { User } from '@ovc/common';
import { onMounted, ref, watch } from 'vue';

defineEmits<{
    (e: 'cancel'): void
    (e: 'submit', selectedUsers: User[]): void
}>()

const props = defineProps<{
    userPool: User[],
    preSelected?: User[],
}>();

const selectedUsers = ref<User[]>([]);

function isSelected(user: User): boolean {
    const result = selectedUsers.value.find(u => u.id === user.id);
    return result !== undefined;
}

function toggle(user: User) {
    console.log(selectedUsers.value);
    if (selectedUsers.value.includes(user))
        selectedUsers.value.splice(selectedUsers.value.indexOf(user), 1);
    else
        selectedUsers.value.push(user);
}
</script>
<template>
    <div>
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50">
        </div>
        <div class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <div class="bg-slate-50 rounded-md p-2 flex flex-col gap-2">
                <div class="flex flex-row-reverse">
                    <button @click="$emit('cancel')" class="btn danger">X</button>
                </div>
                <div class="flex justify-between items-center gap-2" v-for="user, i in userPool" :key="i">
                    <strong :class="{ 'line-through': isSelected(user) }">{{ user.first_name }} {{ user.last_name
                    }}</strong>
                    <button @click="toggle(user)" class="btn"
                        :class="{ 'success': !isSelected(user), 'danger': isSelected(user) }">{{ isSelected(user) ? "X"
                                : "+"
                        }}</button>
                </div>
                <button class="btn success" @click="$emit('submit', selectedUsers)">Save Changes</button>
            </div>
        </div>
    </div>
</template>