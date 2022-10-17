<script setup lang="ts">
import type { User } from '@ovc/common';

export interface UserProfileProps{
    user:User
}

const props = defineProps<UserProfileProps>();

</script>

<template>
    <div class="border m-2 p-2 rounded-lg">
        <table>
            <tr>
                <th>Name:</th>
                <td class="flex">
                    <input type="text" v-model="user.first_name" />
                    <input type="text" v-model="user.last_name" />
                </td>
            </tr>
            <tr>
                <th>dob</th>
                <td>
                    <input type="date" v-model="user.dob" />
                </td>
            </tr>
        </table>
    </div>
</template>