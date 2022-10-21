<script setup lang="ts">
import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import { UserPermission } from '@ovc/common';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const loading = ref(false);
const error_msg = ref("");

const name = ref("");

const userStore = useUserStore();

onMounted(() => {
    if (!userStore.isLoggedIn() || userStore.user.permission_level !== UserPermission.ADMIN) {
        // See ya!
        useRouter().push("/");
    }
});

async function register() {
    loading.value = true;

    error_msg.value = "";

    if (password.value !== password_confirm.value) {
        error_msg.value = "Passwords must match";
    } else {
        const result = await UserService.Register(email.value, password.value, dob.value, first_name.value, last_name.value);
        if (result) {
            error_msg.value = result;
        }
    }

    loading.value = false;
}

</script>

<template>
    <main class="flex">
        <div class="border shadow-lg m-auto p-10">
            <h1 class="text-4xl">Register</h1>
            <p v-if="loading" class="text-center text-red-500 text-xl animate-bounce">Loading...</p>
            <form @submit.prevent="register" class="border-t mt-2 pt-2 flex flex-col gap-2">
                <label>First Name</label>
                <input :disabled="loading" v-model="name" type="text" placeholder="First Name" required />
                <button :disabled="loading" class="btn success">Register</button>
                <p class="text-red-500 font-bold text-center text-2xl transition-all">{{error_msg}}</p>
            </form>
        </div>
    </main>
</template>