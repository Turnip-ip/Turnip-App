<!-- components/ui/resizable/RightHalfPanel.vue -->
<!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>
  <div class="bg-[#D0D9E2]">
    <div class="flex flex-row gap-2 mt-2 ml-2">


      <Button variant="secondary" :disabled="start || running">
        <ChevronLeft class="w-4 h-4" />
      </Button>
      <Button variant="secondary" :disabled="end || running">
        <ChevronRight class="w-4 h-4" />
      </Button>

      <Button :disabled="end || running">
        <LoaderCircle v-if="running" class="w-4 h-4 animate-spin " />
        <ChevronLast v-else class="w-4 h-4" />
      </Button>

      <Button :disabled="!running">
        <OctagonX class="w-4 h-4" />
      </Button>

      <Button variant="destructive" :disabled="start || running">
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
const running = ref(true);


const _props = defineProps({
  dotArea: {
    type: String,
    default: "",
  },
});
</script>
