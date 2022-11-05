<script lang="ts" setup>
import { EmailService } from '@/services/EmailService';
import { ref } from 'vue';

const email = ref("");

const error_msg = ref("");

async function sendTestEmail(evt:Event){
    // error_msg.value = email.value;
    const result = await EmailService.SendTestEmail(email.value);
    if(typeof(result) === "string"){
        error_msg.value = result;
    }
}
</script>

<template>
    <div class="border rounded-md p-4">
        <p class="text-2xl">Email Control Panel</p>
        <p class="font-bold text-red-500 underline">{{error_msg}}</p>
        <label>Send Test Email</label>
        <form @submit.prevent="sendTestEmail" class="flex">
            <input type="email" v-model="email" placeholder="email address" required/>
            <button class="btn success">Send</button>
        </form>
    </div>
</template>