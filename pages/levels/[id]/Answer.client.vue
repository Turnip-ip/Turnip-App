<template>
  <div class="h-full">
    <!-- Resizable Panels -->
    <ResizablePanelGroup direction="horizontal" class="h-max">
      <ResizablePanel class="bg-[#8391A3]">
        <div class="unlockfcts_hover">
          authorized functions &darr;
          <div class="unlockfcts_list"></div>
        </div>
        <TextEditor v-model="dotArea" class="p-10" height="100%" />
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel>
        <div class="h-1/2 bg-[#D0D9E2]">
          <ButtonsBar :start="start" :running="running" :end="end" :previous-step="previousStep" :next-step="nextStep"
            :all-steps="allSteps" :stop="stop" :reset="reset" :check="check" :code-valid="codeValid" />
          <div class="h-full pb-6">
            <TuringGraphView class="h-full pb-4" :dot="dot" />
          </div>
        </div>

        <div class="h-[5px] bg-black" />


        <div class="h-1/4 bg-[#EAE2DD] flex flex-col items-center justify-center gap-4">

          <table>
            <tr>
              <td v-for="(char, index) in main_tape" :key="index"
                :class="'border-2 border-black  w-10 h-10 text-center' + (index == pos_main_tape ? ' bg-red-500' : '')">
                {{ char }}
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <td v-for="(char, index) in work_tape" :key="index"
                :class="'border-2 border-black w-10 h-10 text-center' + (index == pos_work_tape ? ' bg-red-500' : '')">
                {{ char }}
              </td>
            </tr>
          </table>
        </div>

        <div class="h-[5px] bg-black" />

        <div class="bg-[#D9DFE5] h-1/4">
          <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4 w-full">
            <span v-for="(log, index) in logs.slice(-20)" :key="index">
              <span v-html="log.replace('\n', '<br/>')" />
              <br />
            </span>
          </ScrollArea>
        </div>
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

const pos_main_tape = ref(0);
const pos_work_tape = ref(0);

const start = ref(true);
const end = ref(false);
const running = ref(false);

// If the code is not valid, we can not display, nor run the TM
const codeValid = ref(true);

const logs: string[] = [];

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
  try {
    const dotCode = tm_string_to_dot(newCode, "", 0);
    dot.value = dotCode;
  } catch (e) {
    console.log(e);
    logs.push(e.toString());
    dot.value = "digraph  {bgcolor='transparent';}";
  }
});

let currentSimulator: Simu | null = null;
let codeOfCurrentSimulator: string | null = null;
let currentState = "START";

function getSimulator(): Simu {
  if (currentSimulator === null || codeOfCurrentSimulator !== dotArea.value) {
    console.log("Init simulator");
    codeOfCurrentSimulator = dotArea.value;

    try {
      currentSimulator = Simu.new(
        codeOfCurrentSimulator,
        level.grammar_version,
        main_tape.value,
        work_tape.value,
        legal_fct(),
      );

    } catch (e) {
      console.error(e);
      logs.push(e.toString());
      throw e;
    }
  }
  return currentSimulator;
}

function colorCurrentState(state: string, color: string) {
  const node = document.getElementById(state)
  for (const child of node?.children ?? []) {
    console.log(child, child.tagName, child.className);
    if (child.tagName === 'ellipse' || child.tagName === 'polygon') {
      console.log(child.getAttribute('stroke'));
      child.setAttribute('stroke', color);
    }
  }
}

function handleNewStep(simu: Simu) {
  colorCurrentState(currentState, 'black');
  currentState = simu.get_current_state();
  colorCurrentState(currentState, 'red');
  main_tape.value = simu.get_main_tape();
  work_tape.value = simu.get_work_tape();
  pos_main_tape.value = simu.head_pos_main();
  pos_work_tape.value = simu.head_pos_work();
}

function previousStep() {
  running.value = true;
  const simu = getSimulator();
  try {
    simu.prev_step();
    handleNewStep(simu);
  } catch (e) {
    console.log(e);
  }
  end.value = simu.is_end();
  start.value = simu.is_start();
  running.value = false;
}

function nextStep() {
  running.value = true;
  const simu = getSimulator();
  try {
    simu.next_step();
    handleNewStep(simu);
  } catch (e) {
    console.log(e);
  }
  end.value = simu.is_end();
  start.value = simu.is_start();
  running.value = false;
}

function allSteps() {
  running.value = true;
  const simu = getSimulator();
  try {
    simu.all_steps();
    handleNewStep(simu);
  } catch (e) {
    console.log(e);
  }
  end.value = simu.is_end();
  start.value = simu.is_start();
  running.value = false;
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
