import { GroupService } from "@/services/GroupService";
import { Group, User } from "@ovc/common";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./user";

export const useGroupStore = defineStore("group", () => {
  const selectedGroup = ref<Group>(new Group());
  const groups = ref<Group[]>([]);

  // STARTUP
  GetGroupByUser(useUserStore().user);

  async function GetGroupByUser(user: User) {
    const result = await GroupService.GetByEmail(user.email);
    if (result.length > 0) {
      groups.value = result;
    }
    checkSelectedGroup();
  }

  function checkSelectedGroup() {
    if (!isValidGroup(selectedGroup.value) && groups.value.length > 0) {
      selectedGroup.value = groups.value[0];
    }
  }

  function isValidGroup(group: Group): boolean {
    return group.id >= 0;
  }

  return {
    GetGroupByUser,

    groups,
    selectedGroup,
  };
});
