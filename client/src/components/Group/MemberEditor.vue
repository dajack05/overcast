<script setup lang="ts">
import { UserService } from '@/services/UserService';
import type { Group, User } from '@ovc/common';
import { onMounted, ref, watch } from 'vue';

defineEmits(['cancel']);

const props = defineProps<{
    group:Group,
}>();

const error_msg = ref("");
const all_users = ref<User[]>([]);

onMounted(async ()=>{
    console.log("Loading!");
    const result = await UserService.GetAll();
    if(typeof(result) === "string"){
        error_msg.value = result;
        return;
    }

    all_users.value = result;
    console.log("Done...");
});

function isUserInGroup(user:User):boolean{
    const u = props.group.users.find(_user=>_user.id === user.id);
    return u !== undefined;
}

function addUser(user:User){
    props.group.users.push(user);
}

function removeUser(user:User){
    props.group.users.splice(props.group.users.indexOf(user),1);
}
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
                    <div class="flex justify-between items-center" v-for="user, i in all_users" :key="i">
                        <strong :class="{'line-through':isUserInGroup(user)}" >{{ user.first_name }} {{ user.last_name }}</strong>
                        <button v-if="!isUserInGroup(user)" @click="addUser(user)" class="btn success">Add</button>
                        <button v-if="isUserInGroup(user)" @click="removeUser(user)" class="btn danger">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>