<script lang="ts" setup>
import { EmailService } from '@/services/EmailService';
import type { User } from '@ovc/common';
import { ref } from 'vue';

const email = ref("");

const error_msg = ref("");

const recipents = ref<User[]>([]);

async function sendTestEmail(evt: Event) {
    // error_msg.value = email.value;
    const result = await EmailService.SendTestEmail(email.value);
    if (typeof (result) === "string") {
        error_msg.value = result;
    }
}

async function sendCustomEmail(evt: Event) {
    // error_msg.value = email.value;
    const result = await EmailService.SendTestEmail(email.value);
    if (typeof (result) === "string") {
        error_msg.value = result;
    }
}

</script>

<template>
    <div class="border rounded-md p-4">
        <p class="text-2xl">Email Control Panel</p>
        <p class="font-bold text-red-500 underline">{{ error_msg }}</p>
        <label>Send Test Email</label>
        
        <form @submit.prevent="sendTestEmail" class="flex">
            <input type="email" v-model="email" placeholder="email address" required />
            <button class="btn success">Send</button>
        </form>

        <br/>

        <form @submit.prevent="sendCustomEmail" class="flex flex-col gap-1">
            <div class="border rounded flex w-full justify-between">
                <label>To:</label>
                <button v-for="user, i in recipents" :key="i" class="btn">{{ user.first_name }}
                    {{ user.last_name[0] }}</button>
                <button class="btn success">+</button>
            </div>
            <button class="btn success">Send</button>
        </form>
    </div>
</template>