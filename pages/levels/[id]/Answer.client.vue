<template>
  <div class="h-full">
    <!-- Resizable Panels -->
    <ResizablePanelGroup
      direction="horizontal"
      class="h-max"
    >
      <ResizablePanel class="bg-[#8391A3]">
        <div class="unlockfcts_hover">
          authorized functions &darr;
          <div class="unlockfcts_list"></div>
        </div>
        <TextEditor
          v-model="dotArea"
          class="p-10"
          height="100%"
        />
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel>
        <div class="h-1/2 bg-[#D0D9E2]">
          <div class="titleButtons">
            <div class="graphTitle">GRAPH</div>
            <ButtonsBar
              :start="start"
              :running="running"
              :end="end"
              :previous-step="previousStep"
              :next-step="nextStep"
              :all-steps="allSteps"
              :stop="stop"
              :reset="reset"
              :check="check"
            />
          </div>

          <div class="h-full pb-6">
            <TuringGraphView
              class="h-full pb-4"
              :dot="dot"
            />
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
import { Tape } from "~/lib/tapes";
import { AnswerOutputPanel } from "#components";

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

  const tape = new Tape(
    level.grammar_version,
    document.body.getElementsByTagName("tape_head")[0]
      .parentElement as HTMLDivElement,
  );
  tape.write("hello");
  tape.move(5);
});

watch(dotArea, (newCode) => {
  localStorage.setItem(`level-${currentLevelId}`, newCode);

  try {
    const dotCode = tm_string_to_dot(newCode, "", 0);
    dot.value = dotCode;
    // TODO -> effacer les potentielles erreurs dans AnswerOutputPanel
  } catch (e) {
    dot.value = "digraph  {bgcolor='transparent';}";
    console.log(e); // TODO -> ecrire e dans AnswerOutputPanel
  }
});

let currentSimulator: Simu | null = null;
let codeOfCurrentSimulator: string | null = null;

function getSimulator(): Simu {
  if (currentSimulator === null || codeOfCurrentSimulator !== dotArea.value) {
    console.log("Init simulator");
    codeOfCurrentSimulator = dotArea.value;

    // TODO: authorized methods
    console.log(
      codeOfCurrentSimulator,
      level.grammar_version,
      main_tape.value,
      work_tape.value,
      [],
    );
    try {
      currentSimulator = Simu.new(
        codeOfCurrentSimulator,
        level.grammar_version,
        main_tape.value,
        work_tape.value,
        [],
      );
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
  const _simu = getSimulator();
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

function add_completed_lvl(currentLvlId: string) {
  // read completed_lvl in localStorage
  const res = localStorage.getItem("completed_lvl");
  const arr_compl = res != null ? (JSON.parse(res) as string[]) : [];
  // add and save
  if (!arr_compl.includes(currentLvlId)) arr_compl.push(currentLvlId);
  localStorage.setItem("completed_lvl", JSON.stringify(arr_compl));
}

function check() {
  console.log("check");
  // TODO: test the TM on all input using rust
  // add current j=level to completed_lvl
  add_completed_lvl(currentLevelId);
}

// FCT LEGAL FCTS

function legal_fct() {
  const completed_lvl = read_completed_lvl();
  let res: string[] = [];
  if (level.grammar_version == 0) {
    for (let i = 0; i < completed_lvl.length; i++) {
      if (completed_lvl[i] in LevelsData.levels) {
        const tab = LevelsData.levels[completed_lvl[i]].unlocks0;
        res = res.concat(tab);
      }
    }
  } else {
    for (let i = 0; i < completed_lvl.length; i++) {
      if (completed_lvl[i] in LevelsData.levels) {
        const tab = LevelsData.levels[completed_lvl[i]].unlocks;
        res = res.concat(tab);
      }
    }
  }
  return res;
}

function read_completed_lvl() {
  // read completed_lvl in localStorage
  const res = localStorage.getItem("completed_lvl");
  if (res == null) return [];
  return JSON.parse(res) as string[];
}

// print list functions: events
onMounted(() => {
  const button: HTMLDivElement =
    document.getElementsByClassName("unlockfcts_hover")[0];
  const menu: HTMLDivElement =
    document.getElementsByClassName("unlockfcts_list")[0];

  button.addEventListener("mouseover", () => {
    menu.style.height = "auto"; // Set the desired height here
    menu.style.padding = "10px";
  });
  menu.addEventListener("mouseover", () => {
    menu.style.height = "auto"; // Set the desired height here
    menu.style.padding = "10px";
  });

  button.addEventListener("mouseout", () => {
    menu.style.height = "0";
    menu.style.padding = "0 10px";
  });
  menu.addEventListener("mouseout", () => {
    menu.style.height = "0";
    menu.style.padding = "0 10px";
  });
});

function display_legal_fcts(arr_legal_fcts: string[]) {
  if (arr_legal_fcts.length != 0) {
    document.getElementsByClassName("unlockfcts_list")[0].innerHTML =
      arr_legal_fcts.join("<br/>");
  } else {
    document.getElementsByClassName("unlockfcts_list")[0].innerHTML =
      "No authorized<br/>function yet";
  }
}

onMounted(() => {
  const arr_legal_fcts: string[] = legal_fct();
  display_legal_fcts(arr_legal_fcts);
});
</script>

<style scoped>
.text {
  height: 1005px;
}

.titleButtons {
  display: flex;
  /* Enables flexbox */
  align-items: center;
  /* Aligns items vertically in the center */
  justify-content: space-between;
  /* Distributes space evenly */
  gap: 10px;
  /* Adds spacing between elements */
  width: 100%;
}

.graphTitle {
  position: relative;
  font-family: "Press Start 2P", sans-serif;
  left: 3%;
  color: rgb(8, 8, 10);
  font-size: clamp(10px, 2vw, 25px);
}

.unlockfcts_hover {
  border: 2px solid black;
  padding: 3px;
  border-radius: 5px;
  background: silver;
  position: absolute;
  top: 80px;
  left: 40px;
  font-size: 15px;
  color: black;
  z-index: 2;
}

.unlockfcts_list {
  width: 150px;
  height: 0;
  padding: 0 10px;
  overflow: hidden;
  transition: 0.5s ease-out;
  color: white;
  background: gray;
  border-radius: 10px;
}
</style>
