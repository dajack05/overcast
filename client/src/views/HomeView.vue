<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import UserProfileDisplay from '../components/UserProfileDisplay.vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);

</script>

<template>
  <main class="text-center m-10">
    <RouterLink v-if="!userStore.isLoggedIn()" class="btn text-2xl" to="/login">Login</RouterLink>
    <div v-if="userStore.isLoggedIn() && user">
      <!-- Logged In Info -->
      <UserProfileDisplay :user="user" />
    </div>
  </main>
</template>
