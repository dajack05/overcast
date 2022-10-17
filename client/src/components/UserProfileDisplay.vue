<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { UserPermission, type User } from '@ovc/common';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

export interface UserProfileProps {
    user: User
}

defineProps<UserProfileProps>();

const disabled = ref(true);
const userStore = useUserStore();
const permissionLevel = computed(() => userStore.user.permission_level);

function toggleEdit() {
    if (permissionLevel.value == UserPermission.ADMIN) {
        disabled.value = !disabled.value;
    }
}

</script>

<template>
    <div class="border m-2 p-2 rounded-lg">
        <table>
            <tr>
                <th>Name:</th>
                <td class="flex">
                    <input :disabled="disabled" type="text" v-model="user.first_name" />
                    <input :disabled="disabled" type="text" v-model="user.last_name" />
                </td>
            </tr>
            <tr>
                <th>dob</th>
                <td>
                    <input :disabled="disabled" type="date" v-model="user.dob" />
                </td>
            </tr>
        </table>
        <button v-if="permissionLevel == UserPermission.ADMIN" @click="toggleEdit" class="btn warning">Edit</button>
    </div>
</template>