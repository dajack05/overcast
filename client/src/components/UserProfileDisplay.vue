<script setup lang="ts">
import { UserService } from '@/services/user';
import { useUserStore } from '@/stores/user';
import type { User } from '@ovc/common';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

export interface UserProfileProps {
    user: User
}

const props = defineProps<UserProfileProps>();

const loading = ref(true);
const error_msg = ref("");
const disabled = ref(true);

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isAdmin());

function edit() {
    if (isAdmin) {
        disabled.value = false;
    }
}

async function save() {
    if (isAdmin) {
        disabled.value = true;

        loading.value = true;
        error_msg.value = "";
        const result = await UserService.Update(props.user);
        if(result.error){
            error_msg.value = result.error;
        }

        loading.value = false;
    }
}

</script>

<template>
    <div class="border m-2 p-2 rounded-lg">
        <p class="text-lg text-red-500">{{error_msg}}</p>
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
        <button v-if="isAdmin && disabled" @click="edit" class="btn warning">Edit</button>
        <button v-if="isAdmin && !disabled" @click="save" class="btn success">Save Changes</button>
    </div>
</template>