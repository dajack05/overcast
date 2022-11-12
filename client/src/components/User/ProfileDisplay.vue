<script setup lang="ts">
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import type { User } from '@ovc/common';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';

export interface UserProfileProps {
    user: User
}

const emit = defineEmits(["change"]);

const props = defineProps<UserProfileProps>();

const is_expanded = ref(false);

const loading = ref(true);
const error_msg = ref("");
const disabled = ref(true);

const userstore = useUserStore();
const isAdmin = computed(() => userstore.isAdmin());

const localUser = ref<User>(JSON.parse(JSON.stringify(props.user)));
watch(props, (newProps) => {
    localUser.value = JSON.parse(JSON.stringify(newProps.user));
})

function edit() {
    if (isAdmin) {
        disabled.value = false;
        emit('change');
    }
}

async function save() {
    if (isAdmin) {
        disabled.value = true;

        loading.value = true;
        error_msg.value = "";
        const result = await UserService.Update(localUser.value);
        if (result.error) {
            error_msg.value = result.error;
        }

        loading.value = false;
        emit('change');
    }
}

function cancel() {
    disabled.value = true;
    error_msg.value = "";
    localUser.value = JSON.parse(JSON.stringify(props.user));
    emit('change');
}

async function remove() {
    if (isAdmin) {
        disabled.value = true;
        loading.value = true;

        error_msg.value = "";
        const result = await UserService.Remove(localUser.value);
        if (result) {
            error_msg.value = result;
        }

        emit('change');

        loading.value = false;
    }
}

</script>

<template>
    <div class="border m-2 p-2 rounded-lg">
        <div v-if="!is_expanded" class="flex">
            <button @click="is_expanded = true" class="btn">&gt;</button>
            <p class="p-2">{{ localUser.first_name }} {{ localUser.last_name }}</p>
        </div>
        <div v-if="is_expanded">
            <div class="text-left">
                <button @click="is_expanded = false" class="btn">X</button>
            </div>
            <p class="text-lg text-red-500">{{ error_msg }}</p>
            <table>
                <tr>
                    <th>Name:</th>
                    <td class="flex">
                        <input :disabled="disabled" type="text" v-model="localUser.first_name" />
                        <input :disabled="disabled" type="text" v-model="localUser.last_name" />
                    </td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>
                        <input :disabled="disabled" type="email" v-model="localUser.email" />
                    </td>
                </tr>
                <tr>
                    <th>dob</th>
                    <td>
                        <input :disabled="disabled" type="date" v-model="localUser.dob" />
                    </td>
                </tr>
                <tr>
                    <th>Permission Level</th>
                    <td>
                        <input :disabled="disabled" type="number" v-model="localUser.permission_level" />
                    </td>
                </tr>
            </table>
            <button v-if="isAdmin && disabled" @click="edit" class="btn warning">Edit</button>
            <button v-if="isAdmin && !disabled" @click="cancel" class="btn warning">Cancel</button>
            <button v-if="isAdmin && !disabled" @click="save" class="btn success">Save</button>
            <button v-if="isAdmin && !disabled" @click="remove" class="btn danger">Delete</button>
        </div>
    </div>
</template>