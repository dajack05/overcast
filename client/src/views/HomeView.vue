<script setup lang="ts">
import { UserService } from '@/services/user';
import { useUserStore } from '@/stores/user';
import type { User } from '@ovc/common';
import { computed, onMounted, ref } from 'vue';
import UserProfileDisplay from '../components/UserProfileDisplay.vue';

const userStore = useUserStore();

const allUsers = ref<User[]>([]);

onMounted(async ()=>{
  await getAll();
})

function onProfileChange(){

}

async function getAll(){
  const _allUsers = await UserService.GetAll();
  if(typeof(_allUsers) === 'string'){
    console.error(_allUsers);
  }else{
    allUsers.value = _allUsers;
  }
}

</script>

<template>
  <main class="text-center m-10">
    <RouterLink v-if="!userStore.isLoggedIn()" class="btn text-2xl" to="/login">Login</RouterLink>
    <div class="flex flex-wrap" v-if="userStore.isLoggedIn()">
      <!-- Logged In Info -->
      <UserProfileDisplay @change="onProfileChange" v-for="user,i in allUsers" :key="i" :user="user" />
    </div>
  </main>
</template>
