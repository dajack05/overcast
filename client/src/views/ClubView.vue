<script setup lang="ts">
import Container from '@/components/Container.vue';
import ProfileDisplay from '@/components/User/ProfileDisplay.vue';
import { useGroupStore } from '@/stores/group';
import { useUserStore } from '@/stores/user';
import type { User } from '@ovc/common';
import { computed, ref } from 'vue';

const userStore = useUserStore();
const groupStore = useGroupStore();

const club = computed(() => groupStore.selectedGroup);

const selected_member = ref<User | undefined>();

function selectUser(member: User) {
    if (member == selected_member.value) {
        selected_member.value = undefined;
    } else {
        selected_member.value = member;
    }
}

function updateGroup(){
    groupStore.GetGroupByUser(userStore.user);
}

</script>
<template>
    <div class="flex flex-col">
        <div class="p-4 bg-slate-50 flex justify-between">
            <div>
                <h1 class="text-4xl">{{ club.name }}</h1>
                <!-- <h2 class="text-xl underline">Based @ {{ club.airport_code }}</h2> -->
            </div>
            <div>
                <p>{{ club.users.length }} Members</p>
            </div>
        </div>
        <div class="bg-slate-200 h-full p-4">
            <div class="container mx-auto grid grid-flow-dense grid-cols-4 grid-rows-4 gap-4">
                <Container>
                    <strong>Members</strong>
                    <div class="flex flex-col">
                        <button @click="selectUser(user)" :class="{ 'scale-110 bg-slate-200': selected_member == user }"
                            class="px-2 py-1 text-left hover:scale-110 transition-transform hover:shadow"
                            v-for="user, i in club.users" :key="i">
                            {{ user.first_name }} {{ user.last_name }}
                        </button>
                    </div>
                </Container>
                <Container v-if="selected_member">
                    <strong>User Info</strong>
                    <ProfileDisplay @change="updateGroup()" :user="selected_member" />
                </Container>
            </div>
        </div>
    </div>
</template>