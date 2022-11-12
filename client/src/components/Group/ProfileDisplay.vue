<script setup lang="ts">
import { GroupService } from '@/services/GroupService';
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import type { Group, User } from '@ovc/common';
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import MemberEditor from './MemberSelector.vue';

export interface UserProfileProps {
    group: Group
}

const emit = defineEmits(["change"]);

const props = defineProps<UserProfileProps>();

const is_expanded = ref(false);

const loading = ref(true);
const error_msg = ref("");
const disabled = ref(true);

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isAdmin());

const add_member_shown = ref(false);

const all_users = ref<User[]>([])

const localGroup = ref<Group>(JSON.parse(JSON.stringify(props.group)));
watch(props, (newProps) => {
    localGroup.value = JSON.parse(JSON.stringify(newProps.group));
})

onMounted(async () => {
    const result = await UserService.GetAll();
    if (typeof (result) === 'string') {
        error_msg.value = result;
    } else {
        all_users.value = result;
    }
});

async function showAddUser() {
    add_member_shown.value = true;
}

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
        const result = await GroupService.Update(localGroup.value);
        if (typeof (result) === "string") {
            error_msg.value = result;
        } else {
            alert("Changes Saved");
        }

        loading.value = false;
        emit('change');
    }
}

function cancel() {
    disabled.value = true;
    error_msg.value = "";
    localGroup.value = JSON.parse(JSON.stringify(props.group));
    emit('change');
}

async function remove() {
    if (isAdmin) {
        disabled.value = true;
        loading.value = true;

        error_msg.value = "";
        const result = await GroupService.Remove(localGroup.value);
        if (typeof (result) === "string") {
            error_msg.value = result;
        }

        emit('change');

        loading.value = false;
    }
}

function updateUsers(users: User[]) {
    localGroup.value.users = users;
}

</script>

<template>
    <div class="border m-2 p-2 rounded-lg">
        <div v-if="!is_expanded">
            <button @click="is_expanded = true" class="btn">&gt;</button>
            {{ localGroup.name }}
        </div>
        <div v-if="is_expanded">
            <div class="text-left">
                <button @click="is_expanded = false" class="btn">X</button>
            </div>
            <p class="text-lg text-red-500">{{ error_msg }}</p>
            <table>
                <tr>
                    <th>Group Name:</th>
                    <td class="flex">
                        <input :disabled="disabled" type="text" v-model="localGroup.name" />
                    </td>
                </tr>
                <tr>
                    <th>
                        Members
                    </th>
                    <td>
                        <button v-if="isAdmin && !disabled" @click="showAddUser" class="btn warning">Edit
                            Membership</button>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td>
                        <ul class="list-disc text-left px-2">
                            <li v-for="user, i in localGroup.users" :key="i">{{ user.first_name }}</li>
                        </ul>
                    </td>
                </tr>
            </table>
            <button v-if="isAdmin && disabled" @click="edit" class="btn warning">Edit</button>
            <button v-if="isAdmin && !disabled" @click="cancel" class="btn warning">Cancel</button>
            <button v-if="isAdmin && !disabled" @click="save" class="btn success">Save</button>
            <button v-if="isAdmin && !disabled" @click="remove" class="btn danger">Delete</button>

            <MemberEditor @submit="updateUsers" :user-pool="all_users" :pre-selected="localGroup.users"
                v-if="add_member_shown" @cancel="add_member_shown = false" />
        </div>
    </div>
</template>