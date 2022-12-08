<script setup lang="ts">
import { GroupService } from '@/services/GroupService';
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import { UserType } from '@ovc/common';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const loading = ref(false);
const error_msg = ref("");

const name = ref("");

const userStore = useUserStore();

onMounted(() => {
    if (!userStore.isLoggedIn() || userStore.user.permission_level !== UserType.ADMIN) {
        // See ya!
        useRouter().push("/");
    }
});

async function register() {
    loading.value = true;

    error_msg.value = "";

    const result = await GroupService.Create(name.value);
    if (result) {
        error_msg.value = result;
    }else{
        alert(`"${name.value}" Group Created`);
        name.value = "";
    }

    loading.value = false;
}

</script>

<template>
    <main class="flex">
        <div class="border shadow-lg m-auto p-10">
            <h1 class="text-4xl">Register Group</h1>
            <p v-if="loading" class="text-center text-red-500 text-xl animate-bounce">Loading...</p>
            <form @submit.prevent="register" class="border-t mt-2 pt-2 flex flex-col gap-2">
                <label>Group Name</label>
                <input :disabled="loading" v-model="name" type="text" placeholder="Group Name" required />
                <button :disabled="loading" class="btn success">Register</button>
                <p class="text-red-500 font-bold text-center text-2xl transition-all">{{ error_msg }}</p>
            </form>
        </div>
    </main>
</template>