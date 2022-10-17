<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const user = userStore.user;

</script>

<template>
  <main class="text-center m-10">
    <p class="text-4xl">Welcome to a server test lol</p>
    <br />
    <RouterLink v-if="!userStore.isLoggedIn()" class="btn text-2xl" to="/login">Login</RouterLink>
    <div v-if="userStore.isLoggedIn() && user">
      <!-- Logged In Info -->
      <h1 class="text-3xl">Welcome {{user.first_name}}</h1>
    </div>
  </main>
</template>
