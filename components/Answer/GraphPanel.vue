<!-- components/ui/resizable/RightHalfPanel.vue -->
<!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>

</template>

<script setup lang="ts">
import {
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  OctagonX,
  RotateCcw,
  MonitorCheck,
} from "lucide-vue-next";


function add_completed_lvl(currentLvlId: string) {
  // read completed_lvl in localStorage
  const res = localStorage.getItem("completed_lvl");
  const arr_compl = res != null ? (JSON.parse(res) as string[]) : [];
  // add and save
  if (!arr_compl.includes(currentLvlId)) arr_compl.push(currentLvlId);
  localStorage.setItem("completed_lvl", JSON.stringify(arr_compl));
}

interface Props {
  dotArea: string;
  currentLvlId: string;
}

const props = withDefaults(defineProps<Props>(), { dotArea: "" });
</script>
