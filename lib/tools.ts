import type { Data } from "./types";

function find_group_of_lvl(name: string, LevelsData: Data) {
  //find the group level name belongs to
  for (const e in LevelsData.groups) {
    if (LevelsData.groups[e].levels.includes(name)) {
      return LevelsData.groups[e];
    }
  }
  throw new Error("Group not found");
}

export { find_group_of_lvl };
