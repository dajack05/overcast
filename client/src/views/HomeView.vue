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

onMounted(async () => {
  if (!userStore.isLoggedIn()) {
    useRouter().push("/login");
  }
  await getAll();
})

async function getAll() {
  const _allUsers = await UserService.GetAll();
  if (typeof (_allUsers) === 'string') {
    console.error(_allUsers);
  } else {
    allUsers.value = _allUsers;
  }
}

</script>

<template>
  <div class="container m-auto border rounded">
    <p class="text-2xl font-semibold m-2">Member Dashboard</p>
    <hr />
    <div class="max-h-[200px] overflow-y-auto">
    <table class="">
      <thead>
        <tr>
          <th>Name</th>
          <th>DOB</th>
          <th>BFR Due</th>
          <th>Medical Due</th>
        </tr>
      </thead>
      <tbody class="overflow-y-auto">
        <tr v-for="user, i in allUsers" :key="i">
          <td class="px-4 py-2 border-b">{{ user.first_name }} {{ user.last_name }}</td>
          <td class="px-4 py-2 border-b">{{ user.dob }}</td>
          <td class="px-4 py-2 border-b">BFR Date</td>
          <td class="px-4 py-2 border-b">Medical Due</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
