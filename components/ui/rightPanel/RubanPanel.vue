<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div :style="{ backgroundColor: bgColor, padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
    <slot>
      <div style="display: flex;column-gap: 10px;">
        <DynTape :grammVer="grammVer" :initialText="initialTextTapeIn" :initialPos="initialPosTapeIn"></DynTape>
      </div>
    </slot>
  </div>

</template>

<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    default: ' #EAE2DD'
  }
})

const route = useRoute()
import { LevelsData } from '~/lib/levels_data';
const currentLevelId: string = route.params.id as string;

// add tapes
let grammVer = find_group_of_lvl(currentLevelId).grammar_version;
let initialTextTapeIn = LevelsData.levels[currentLevelId].ex_in;
let initialPosTapeIn;
if (grammVer == 0) {
  initialPosTapeIn = initialTextTapeIn.lastIndexOf(".");
  initialTextTapeIn = initialTextTapeIn.replace(/\./g, ''); //remove the "."
}
function find_group_of_lvl(name: string) {
  //find the group level name belongs to
  for (const e in LevelsData.groups) {
    if (LevelsData.groups[e].levels.includes(name)) { return LevelsData.groups[e]; }
  }
}
</script>

<style scoped>
.TapeComingSoon {
  position: absolute;
  font-family: "Press Start 2P", sans-serif;
  right: 560px;
  top: 446px
}

.imgTurnip {
  position: absolute;
  width: 80px;
  top: 440px;
  right: 850px;
}

.bubbleImg {
  position: absolute;
  width: 300px;
  top: 39.5%;
  right: 30%;
}
</style>
