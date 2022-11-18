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
const remainingUsers = ref<User[]>([]);

watch(selectedUsers, newUsers=>{
    remainingUsers.value = props.userPool.filter(u=>newUsers.includes(u));
});

onMounted(() => {
    if (props.preSelected !== undefined) {
        selectedUsers.value = props.preSelected.map(u => u);
        remainingUsers.value = props.userPool.map(u=>u);
    } else {
        selectedUsers.value = [];
    }
});

function isSelected(user: User): boolean {
    for (const muser of selectedUsers.value) {
        if (muser.id === user.id) {
            return true;
        }
    }
    return false;
}

function toggle(user: User) {
    console.log(selectedUsers.value);
    if (isSelected(user))
        selectedUsers.value = selectedUsers.value.filter(u => u.id !== user.id);
    else
        selectedUsers.value.push(user);
    console.log(selectedUsers.value);
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
                <div>
                    <label v-for="user, i in selectedUsers" :key="i">{{ user.first_name }} {{ user.last_name[0] }}</label>
                </div>
                <div class="flex justify-between items-center gap-2" v-for="user, i in remainingUsers" :key="i">
                    <strong>{{ user.first_name }} {{ user.last_name}}</strong>
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