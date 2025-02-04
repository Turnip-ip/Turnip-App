<template>
  <div class="answerpage">
    <!-- Resizable Panels -->
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <LeftHalfPanel>
          <TextEditor v-model="dotArea" class="m-4" height="931px" />
          <!-- 931 parce que 1000 - 4 rem, 1 rem = 16 px et il faut considerer le padding donc un peu moins de 1000-4*16 -->
        </LeftHalfPanel>
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel>
        <RightHalfPanel :dot-area="dotArea" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LeftHalfPanel from "../../../components/ui/leftPanel/leftHalfPanel.vue";
import RightHalfPanel from "../../../components/ui/rightPanel/RightHalfPanel.vue";

definePageMeta({
  layout: "level",
});

const dotArea = ref<string>(`START
| b -> (b,R), START
| _ -> (_,L), q

q
| 1 -> (0,L), q
| 0 -> (1,L), END
`);

// TAPE

const route = useRoute()
import { LevelsData } from '~/lib/levels_data';
const currentLevelId: string = route.params.id as string;
import { Tape } from '~/lib/tapes';

// grammVer
let grammVer=find_group_of_lvl(currentLevelId).grammar_version;
function find_group_of_lvl(name: string) {
  //find the group level name belongs to
  for (const e in LevelsData.groups) {
    if (LevelsData.groups[e].levels.includes(name)) { return LevelsData.groups[e]; }
  }
}

//simple and ugly way to have access to the tape:
onMounted(() => {
  let tape = new Tape(grammVer, document.body.getElementsByTagName("tape_head")[0].parentElement);
  tape.write("hello");
  tape.move(5);
})

// FCT LEGAL FCTS

function legal_fct() {
  let completed_lvl = read_completed_lvl();
  let res = [];
  for (var i = 0; i < completed_lvl.length; i++) {
    if (completed_lvl[i] in LevelsData.levels) {
      res = res.concat(LevelsData.levels[completed_lvl[i]].unlocks)
    }
  }
  return res;
}

function read_completed_lvl() {
  // read completed_lvl in localStorage
  let res = localStorage.getItem("completed_lvl");
  if (res == null) return [];
  return JSON.parse(res);
}

// TESTS

onMounted(() => {
  console.log(legal_fct());
})
</script>

<style scoped>
.answerpage {
  display: flex;
  flex-direction: column;
}
</style>
