<script setup lang="ts">
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import type { User } from '@ovc/common';
import { onMounted, ref } from 'vue';
import UserViewer from '../components/User/Viewer.vue';
import GroupViewer from '../components/Group/Viewer.vue';
import EmailControlPanel from '@/components/Email/ControlPanel.vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();

const allUsers = ref<User[]>([]);

onMounted(async ()=>{
  if(!userStore.isLoggedIn()){
    useRouter().push("/login");
  }
  await getAll();
})

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
    <div class="flex flex-wrap justify-around" v-if="userStore.isLoggedIn()">
      <!-- Logged In Info -->
      <UserViewer />
      <GroupViewer />
      <EmailControlPanel />
    </div>
  </main>
</template>
