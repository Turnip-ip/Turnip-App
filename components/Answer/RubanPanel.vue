<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div class="bg-[#EAE2DD]">
    <slot>
      <div style="display: flex; column-gap: 10px">
        <DynTape
          :gramm-ver="grammVer"
          :initial-text="initialTextTapeIn"
          :initial-pos="initialPosTapeIn"
        ></DynTape>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { LevelsData } from "~/lib/levels_data";
import { find_group_of_lvl } from "~/lib/tools";

const route = useRoute();
const currentLevelId: string = route.params.id as string;

// add tapes
const grammVer = find_group_of_lvl(currentLevelId, LevelsData).grammar_version;
let initialTextTapeIn = LevelsData.levels[currentLevelId].ex_in;
let initialPosTapeIn;
if (grammVer == 0) {
  initialPosTapeIn = initialTextTapeIn.lastIndexOf(".");
  initialTextTapeIn = initialTextTapeIn.replace(/\./g, ""); //remove the "."
}
</script>
