<script setup lang="ts">
import { GroupService } from '@/services/GroupService';
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import type { Group, User } from '@ovc/common';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import MemberEditor from './MemberEditor.vue';

export interface UserProfileProps {
    group: Group
}

const emit = defineEmits(["change"]);

const props = defineProps<UserProfileProps>();

const loading = ref(true);
const error_msg = ref("");
const disabled = ref(true);

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isAdmin());

const add_member_shown = ref(false);

const localGroup = ref<Group>(JSON.parse(JSON.stringify(props.group)));
watch(props, (newProps) => {
    localGroup.value = JSON.parse(JSON.stringify(newProps.group));
})

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

</script>

<template>
    <div class="border m-2 p-2 rounded-lg">
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
                    <button v-if="isAdmin && !disabled" @click="showAddUser" class="btn warning">Add
                        Member</button>
                </th>
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

        <MemberEditor v-if="add_member_shown" @cancel="add_member_shown = false" :group="localGroup" />
    </div>
</template>