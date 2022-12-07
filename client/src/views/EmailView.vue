<script setup lang="ts">
import { EmailService } from '@/services/EmailService';
import { UserService } from '@/services/UserService';
import type { User } from '@ovc/common';
import { onMounted, ref } from 'vue';

const all_users = ref<User[]>([]);

const selected_user_email = ref<string>("");
const text_content = ref<string>("");
const subject = ref<string>("");

const is_text_mode = ref<boolean>(true);
const error_msg = ref<string>("");

onMounted(async () => {
    const users = await UserService.GetAll();
    if (Array.isArray(users)) {
        all_users.value = users;
    }
});

async function submit() {
    error_msg.value = "";
    const error = await (async (): Promise<string | undefined> => {
        if (is_text_mode.value) {
            return await EmailService.SendText(text_content.value, subject.value, selected_user_email.value);
        } else {
            return await EmailService.SendHTML(text_content.value, subject.value, selected_user_email.value);
        }
        return undefined;
    })();
    if (error) {
        error_msg.value = error;
    } else {
        error_msg.value = "All GOod!";
    }
}
</script>
<template>
    <div class="flex justify-center items-center">
        <div class="p-4 rounded border">
            <h1 class="text-4xl">Email</h1>
            <p class="text-red-500 font-bold">{{ error_msg }}</p>
            <form @submit.prevent="submit">
                <div>
                    <label>To</label>
                    <select v-model="selected_user_email" required>
                        <option v-for="user, i in all_users" :key="i" :value="user.email">{{ user.first_name }}
                            {{ user.last_name }}</option>
                    </select>
                </div>

                <div>
                    <label>Subject</label>
                    <input type="text" v-model="subject" requried />
                </div>

                <div>
                    <div class="flex justify-between items-baseline">
                        <label>Message</label>
                        <div>
                            <button type="button" @click="(is_text_mode = true)" class="btn"
                                :class="{ active: is_text_mode }">Text</button>
                            <button type="button" @click="(is_text_mode = false)" class="btn"
                                :class="{ active: !is_text_mode }">HTML</button>
                        </div>
                    </div>
                    <textarea class="transition-colors"
                        :class="{'bg-green-50':is_text_mode, 'bg-orange-50':!is_text_mode}" v-model="text_content"
                        cols="64" rows="16" required></textarea>
                </div>

                <input type="submit" class="btn" value="Send it!" />
            </form>
        </div>
    </div>
</template>