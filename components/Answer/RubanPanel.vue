<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div class="bg-[#EAE2DD]">
    <div class="title">TAPE</div>
    <div class="popup">
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

<style>
.title {
  position: relative;
  font-family: "Press Start 2P", sans-serif;
  left: 3%;
  color: rgb(8, 8, 10);
  font-size: clamp(10px, 2vw, 25px);
}

.popup {
  position: relative;
  z-index: 1000;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 18vh;
  width: 45vw;
  background-color: rgb(243, 208, 161);
  border: 5px solid black;
  border-radius: 15px;
  text-align: center;
}
</style>
