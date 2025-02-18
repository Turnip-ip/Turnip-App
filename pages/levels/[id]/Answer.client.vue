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
              :code-valid="codeValid"
            />

            <Popover class="mr-2">
              <PopoverTrigger>
                <Button>Edit tapes</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div class="flex flex-col gap-2">
                  <div class="flex w-full max-w-sm items-center gap-1.5">
                    <Input
                      id="email"
                      v-model="newMainTape"
                      placeholder="0, 0, 0, 0"
                    />
                    <Button @click="setMainTape()"> Save </Button>
                  </div>
                  <div
                    v-if="level.grammar_version == 1"
                    class="flex w-full max-w-sm items-center gap-1.5"
                  >
                    <Input
                      id="email"
                      v-model="newWorkTape"
                      placeholder="0, 0, 0, 0"
                    />
                    <Button @click="setWorkTape()"> Save </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div class="h-full pb-6">
            <TuringGraphView
              class="h-full pb-4"
              :dot="dot"
            />
          </div>
        </div>

        <div class="h-[5px] bg-black" />

        <div class="flex h-1/4 flex-col bg-[#EAE2DD]">
          <div class="rubantitle">TAPE</div>
          <div class="rubanpopup">
            <div style="display: flex; column-gap: 10px">
              <DynTape
                :gramm-ver="level.grammar_version"
                initial-text="00001"
                :initial-pos="0"
              ></DynTape>
            </div>
          </div>
        </div>

        <div class="h-[5px] bg-black" />

        <div class="h-1/4 bg-[#D9DFE5]">
          <div class="outputtitle">ERROR LOGS</div>
          <div class="popuP">
            <ScrollArea class="h-full w-full">
              <span
                v-for="(log, index) in logs.slice(-20)"
                :key="index"
              >
                // eslint-disable-next-line vue/no-v-html
                <span v-html="log.replace('\n', '<br/>')" />
                <br />
              </span>
            </ScrollArea>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LevelsData } from "~/lib/levels_data";

import init, { tm_string_to_dot, Simu } from "tm_parser?init";
import { Tape } from "~/lib/tapes";

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

const newMainTape = ref<string>("");
const newWorkTape = ref<string>("");

function setMainTape() {
  main_tape.value = new Uint8Array(
    newMainTape.value.split(",").map((x) => parseInt(x)),
  );
  if (level.grammar_version == 0) {
    tape_object.write(main_tape.value);
  } else {
    tape_object.writeM(main_tape.value);
  }
  resetSimulation();
}

function setWorkTape() {
  work_tape.value = new Uint8Array(
    newWorkTape.value.split(",").map((x) => parseInt(x)),
  );
  if (level.grammar_version == 1) {
    tape_object.writeM(work_tape.value);
  }
  resetSimulation();
}

const defaultCode = `START
| b -> (b,R), START
| _ -> (_,L), q

q
| 1 -> (0,L), q
| 0 -> (1,L), END
`;

let tape_object: Tape;

onMounted(() => {
  const existingCode = localStorage.getItem(`level-${currentLevelId}`);
  dotArea.value = existingCode || level.initial_code || defaultCode;

  tape_object = new Tape(
    level.grammar_version,
    document.body.getElementsByTagName("tape_head")[0].parentElement,
  );
  if (level.grammar_version == 0) {
    tape_object.write([0, 0, 0, 0, 0]);
  } else {
    tape_object.writeM([0, 0, 0, 0, 0]);
    tape_object.writeW([0, 0, 0, 0, 0]);
  }
});

watch(dotArea, (newCode) => {
  localStorage.setItem(`level-${currentLevelId}`, newCode);
  try {
    const dotCode = tm_string_to_dot(newCode, "", 0);
    dot.value = dotCode;
  } catch (e) {
    console.error(e);
    logs.push(e.toString());
    dot.value = "digraph  {bgcolor='transparent';}";
  }
});

let currentSimulator: Simu | null = null;
let codeOfCurrentSimulator: string | null = null;
let currentState = "START";

function resetSimulation() {
  if (currentSimulator !== null) {
    currentSimulator.reset(main_tape.value, work_tape.value);
  }

  colorCurrentState(currentState, "black");
  currentState = "START";
  colorCurrentState(currentState, "red");

  main_tape.value = new Uint8Array(10);
  work_tape.value = new Uint8Array(10);
  pos_main_tape.value = 0;
  pos_work_tape.value = 0;

  start.value = true;
  end.value = false;
  running.value = false;

  if (level.grammar_version == 0) {
    tape_object.write(main_tape.value);
    tape_object.move(0);
  } else {
    tape_object.writeM(main_tape.value);
    tape_object.writeW(work_tape.value);
    tape_object.moveM(0);
    tape_object.moveW(0);
  }
}

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
  const node = document.getElementById(state);
  for (const child of node?.children ?? []) {
    if (child.tagName === "ellipse" || child.tagName === "polygon") {
      child.setAttribute("stroke", color);
    }
  }
}

function handleNewStep(simu: Simu) {
  colorCurrentState(currentState, "black");
  currentState = simu.get_current_state();
  colorCurrentState(currentState, "red");
  main_tape.value = simu.get_main_tape();
  work_tape.value = simu.get_work_tape();
  pos_main_tape.value = simu.head_pos_main();
  pos_work_tape.value = simu.head_pos_work();

  if (level.grammar_version == 0) {
    tape_object.write(main_tape.value);
    tape_object.move(pos_main_tape.value);
  } else {
    tape_object.writeM(main_tape.value);
    tape_object.writeW(work_tape.value);
    tape_object.moveM(pos_main_tape.value);
    tape_object.moveW(pos_work_tape.value);
  }
}

function previousStep() {
  running.value = true;
  const simu = getSimulator();
  try {
    simu.prev_step();
    handleNewStep(simu);
  } catch (e) {
    console.error(e);
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
    console.error(e);
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
    console.error(e);
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
  resetSimulation();
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

.outputtitle {
  position: relative;
  font-family: "Press Start 2P", sans-serif;
  z-index: 100;
  left: 3%;
  color: rgb(8, 8, 10);
  font-size: clamp(10px, 2vw, 25px);
}

.popuP {
  position: relative;
  z-index: 1000;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 18vh;
  width: 45vw;
  background-color: rgb(188, 248, 228);
  border: 5px solid black;
  border-radius: 15px;
  text-align: center;
}

.rubantitle {
  position: relative;
  font-family: "Press Start 2P", sans-serif;
  left: 3%;
  color: rgb(8, 8, 10);
  font-size: clamp(10px, 2vw, 25px);
}

.rubanpopup {
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
  overflow: auto;
}
</style>
