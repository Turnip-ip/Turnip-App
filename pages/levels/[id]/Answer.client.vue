<template>
  <div class="h-full">
    <!-- Resizable Panels -->
    <ResizablePanelGroup direction="horizontal" class="h-max">
      <ResizablePanel class="bg-[#8391A3]">
        <TextEditor v-model="dotArea" class="p-10" height="100%" />
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel>
        <div class="bg-[#D0D9E2]">
          <ButtonsBar :start="start" :running="running" :end="end" :previousStep="previousStep" :nextStep="nextStep"
            :allSteps="allSteps" :stop="stop" :reset="reset" :check="check" />
          <div class="h-full pb-6">
            <TuringGraphView class="h-full pb-4" :dot="dot" />
          </div>
        </div>

        <div class="h-[5px] bg-black" />

        <AnswerRubanPanel class="h-1/4" />

        <div class="h-[5px] bg-black" />

        <AnswerOutputPanel class="h-1/4" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LevelsData } from "~/lib/levels_data";

import init, { tm_string_to_dot, Simu } from "tm_parser?init";

await init();

definePageMeta({
  layout: "level",
});

const route = useRoute();
const currentLevelId: string = route.params.id as string;
const level = LevelsData.levels[currentLevelId];

const dotArea = ref<string>("");
const dot = ref<string>("");

// TODO: use level start tape
const main_tape = ref<Uint8Array>(new Uint8Array(10));
const work_tape = ref<Uint8Array>(new Uint8Array(10));


const start = ref(true);
const end = ref(false);
const running = ref(false);

let step = 0;

const defaultCode = `START
| b -> (b,R), START
| _ -> (_,L), q

q
| 1 -> (0,L), q
| 0 -> (1,L), END
`;

onMounted(() => {
  const existingCode = localStorage.getItem(`level-${currentLevelId}`);
  dotArea.value = existingCode || level.initial_code || defaultCode;
});

watch(dotArea, (newCode) => {
  localStorage.setItem(`level-${currentLevelId}`, newCode);

  // TODO: try/catch ?
  const dotCode = tm_string_to_dot(newCode, "", 0);
  dot.value = dotCode;



});


let currentSimulator: Simu | null = null;
let codeOfCurrentSimulator: string | null = null;

function getSimulator(): Simu {
  if (currentSimulator === null || codeOfCurrentSimulator !== dotArea.value) {
    console.log("Init simulator");
    codeOfCurrentSimulator = dotArea.value;

    // TODO: authorized methods
    console.log(codeOfCurrentSimulator, level.grammar_version, main_tape.value, work_tape.value, [])
    try {
      currentSimulator = Simu.new(codeOfCurrentSimulator, level.grammar_version, main_tape.value, work_tape.value, []);
    } catch (e) {
      console.log(e);
    }
  }
  return currentSimulator;
}

function previousStep() {
  console.log("previousStep");
  step -= 1;
  if (step === 0) {
    start.value = true;
  }
  end.value = false;
}

function nextStep() {
  console.log("nextStep");
  const simu = getSimulator()
  step += 1;
  if (step === 10) {
    end.value = true;
  }
  start.value = false;
}

function delay(delay: number) {
  return new Promise((r) => {
    setTimeout(r, delay);
  });
}

async function allSteps() {
  console.log("run");
  running.value = true;
  await delay(5000);
  start.value = false;
  end.value = true;
  running.value = false;
  step = 10;
}

function stop() {
  console.log("stop");
  running.value = false;
}

function reset() {
  console.log("reset");
  step = 0;
  start.value = true;
  end.value = false;
}

function check() {
  console.log("check");
  // TODO: test the TM on all input using rust
  // add current j=level to completed_lvl
  add_completed_lvl(currentLevelId);
}
</script>
