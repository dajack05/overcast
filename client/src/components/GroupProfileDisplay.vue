<script setup lang="ts">
import { GroupService } from '@/services/GroupService';
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import type { Group, User } from '@ovc/common';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';

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
const available_users = ref<User[]>([]);

const localGroup = ref<Group>(JSON.parse(JSON.stringify(props.group)));
watch(props, (newProps) => {
    localGroup.value = JSON.parse(JSON.stringify(newProps.group));
})

async function showAddUser() {
    add_member_shown.value = true;
    const users = await UserService.GetAll();
    if(typeof(users) !== "string"){
        available_users.value = users.filter(u=>localGroup.value.users.includes(u));
    }
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

        <!-- Add User Dialog -->
        <div v-if="add_member_shown">
            <div class="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50">
            </div>
            <div class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                <div class="bg-slate-50 rounded-md">
                    <div class="flex flex-row-reverse">
                        <button @click="add_member_shown = false" class="btn danger">X</button>
                    </div>
                    <div class="p-4">
                        <p class="text-2xl text-black opacity-100">Add Member to {{ localGroup.name }}</p>
                        <hr />
                        <div v-for="user,i in available_users" :key="i">
                            <strong>{{user.first_name}} {{user.last_name}}</strong>
                            <button class="btn success">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>