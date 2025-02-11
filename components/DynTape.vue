<template>
  <div ref="tapeDiv">
    <tape_head>
      <stick></stick>
      <arrow></arrow>
    </tape_head>
    <table class="tape">
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td
          v-if="props.grammVer === 2"
          class="last"
        ></td>
      </tr>
    </table>
    <br v-if="props.grammVer >= 1" />
    <tape_head v-if="props.grammVer >= 1">
      <stick></stick>
      <arrow></arrow>
    </tape_head>
    <table
      v-if="props.grammVer >= 1"
      class="tape"
    >
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td
          v-if="props.grammVer === 2"
          class="last"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Tape } from "~/lib/tapes";

const tapeDiv = ref();

const props = defineProps<{
  grammVer: number;
  initialText: string;
  initialPos: number;
}>();

onMounted(() => {
  const tape = new Tape(props.grammVer, tapeDiv.value as HTMLDivElement);
  if (props.grammVer == 0) {
    tape.write(props.initialText);
    tape.move(props.initialPos);
  } else if (props.grammVer == 1) {
    tape.writeM(props.initialText.substring(0, 8));
    tape.writeW(props.initialText.substring(8));
  } else if (props.grammVer == 2) {
    // +++ we need size max...
    tape.writeM(props.initialText);
  }
});
</script>

<style>
.tape {
  border-collapse: collapse;
}

.tape td {
  border: 1px solid;
  width: 50px;
  height: 53px;
  overflow: hidden;
  font-size: 25px;
  text-align: center;
  transition: opacity 0.1s;
  /* makes the fade effect smooth */
}

.tape .last {
  border-right: none;
}

tape_head {
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  position: relative;
  width: 50px;
}

tape_head stick {
  width: 10px;
  height: 30px;
  background-color: black;
  border-radius: 5px;
}

tape_head arrow {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid black;
  border-radius: 5px;
  margin-top: -3px;
  /* Ajuste la position pour que la flèche soit bien connectée au bâton */
}
</style>
