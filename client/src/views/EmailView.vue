<script setup lang="ts">
import { EmailService } from '@/services/EmailService';
import { UserService } from '@/services/UserService';
import type { User } from '@ovc/common';
import { onMounted, ref } from 'vue';

const all_users = ref<User[]>([]);

const selected_user = ref<User[]>([]);
const text_content = ref<string>("");
const subject = ref<string>("");

const is_text_mode = ref<boolean>(true);
const error_msg = ref<string>("");

const sent_count = ref(0);
const total_count = ref(0);

onMounted(async () => {
    const users = await UserService.GetAll();
    if (Array.isArray(users)) {
        all_users.value = users;
    }
});

function parseStringTemplate(str: string, obj: any) {
    let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/);
    let args = str.match(/[^{\}]+(?=})/g) || [];
    let parameters = args.map(argument => obj[argument] || (obj[argument] === undefined ? "" : obj[argument]));
    return String.raw({ raw: parts }, ...parameters);
}

async function submit() {
    error_msg.value = "";
    const error = await (async (): Promise<string | undefined> => {

        if (!selected_user.value) {
            return "No User Selected";
        }

        total_count.value = selected_user.value.length;
        sent_count.value = 0;

        for (const user of selected_user.value) {
            // Replace drop-ins
            const filled_content = parseStringTemplate(text_content.value, { ...user });

            if (is_text_mode.value) {
                await EmailService.SendText(filled_content, subject.value, user.email);
            } else {
                await EmailService.SendHTML(filled_content, subject.value, user.email);
            }

            sent_count.value++;
        }

        total_count.value = 0;
    })();
    if (error) {
        error_msg.value = error;
    } else {
        error_msg.value = "";
    }
}
</script>
<template>
    <div class="flex justify-center items-center">
        <div class="p-4 rounded border">
            <h1 class="text-4xl">Email</h1>
            <p class="text-red-500 font-bold">{{ error_msg }}</p>
            <form class="flex flex-col gap-2" @submit.prevent="submit">
                <div class="flex gap-2">
                    <div>
                        <label>To</label>
                        <select class="h-full w-fit" v-model="selected_user" multiple required>
                            <option v-for="user, i in all_users" :key="i" :value="user">{{ user.first_name }}
                                {{ user.last_name }}</option>
                        </select>
                    </div>

                    <div>
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
                                :class="{ 'bg-green-50': is_text_mode, 'bg-orange-50': !is_text_mode }"
                                v-model="text_content" cols="64" rows="16" required></textarea>
                        </div>
                    </div>
                </div>

                <input type="submit" class="btn" value="Send it!" />
            </form>
            <div v-if="(total_count > 0)"
                class="bg-[#00000088] absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div class="bg-white rounded border p-4 flex gap-2 flex-col justify-center text-center">
                    <p class="text-2xl">Please wait while your emails are sent.</p>
                    <i>If you close this window, not all emails will be sent.</i>
                    <label>{{ sent_count }}/{{ total_count }} {{ Math.round((sent_count / total_count) * 100) }}%</label>
                </div>
            </div>
        </div>
    </div>
</template>