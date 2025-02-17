<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div class="bg-[#EAE2DD]">
    <slot>
      <div style="display: flex; column-gap: 10px">
        <DynTape
          :gramm-ver="level.grammar_version"
          :initial-text="initialTextTapeIn"
          :initial-pos="initialPosTapeIn"
        >
        </DynTape>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { LevelsData } from "~/lib/levels_data";

const route = useRoute();
const currentLevelId: string = route.params.id as string;

// add tapes
const level = LevelsData.levels[currentLevelId];
const grammVer = level.grammar_version;
let initialTextTapeIn = level.ex_in;
let initialPosTapeIn: number;
if (grammVer == 0) {
  initialPosTapeIn = initialTextTapeIn.lastIndexOf(".");
  initialTextTapeIn = initialTextTapeIn.replace(/\./g, ""); //remove the "."
}
</script>
