<!-- components/ui/resizable/RightHalfPanel.vue -->
<!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>
  <div class="bg-[#D0D9E2]">
    <div class="flex flex-row gap-2 mt-2 ml-2">


      <Button variant="secondary" :disabled="start || running" @click="previousStep">
        <ChevronLeft class="w-4 h-4" />
      </Button>
      <Button variant="secondary" :disabled="end || running" @click="nextStep">
        <ChevronRight class="w-4 h-4" />
      </Button>

      <Button :disabled="end || running" @click="allSteps">
        <LoaderCircle v-if="running" class="w-4 h-4 animate-spin " />
        <ChevronLast v-else class="w-4 h-4" />
      </Button>

      <Button :disabled="!running" @click="stop">
        <OctagonX class="w-4 h-4" />
      </Button>

      <Button variant="destructive" :disabled="start || running" @click="reset">
        <RotateCcw class="w-4 h-4" />
      </Button>

    </div>
    <TuringGraphView class="h-full p-4" :code="dotArea" />
  </div>
</template>

<script setup lang="ts">
import { ChevronLast, ChevronLeft, ChevronRight, LoaderCircle, OctagonX, RotateCcw } from 'lucide-vue-next';

const start = ref(true);
const end = ref(false);
const running = ref(false);

let step = 0;

function previousStep() {
  console.log('previousStep');
  step -= 1;
  if (step === 0) {
    start.value = true;
  }
  end.value = false;
}

function nextStep() {
  console.log('nextStep');
  step += 1;
  if (step === 10) {
    end.value = true;
  }
  start.value = false;
}

function delay(delay: number) {
  return new Promise(r => {
    setTimeout(r, delay);
  })
}

async function allSteps() {
  console.log('run');
  running.value = true;
  await delay(5000);
  start.value = false;
  end.value = true;
  running.value = false;
  step = 10;
}

function stop() {
  console.log('stop');
  running.value = false;
}

function reset() {
  console.log('reset');
  step = 0;
  start.value = true;
  end.value = false;
}


const _props = defineProps({
  dotArea: {
    type: String,
    default: "",
  },
});
</script>
