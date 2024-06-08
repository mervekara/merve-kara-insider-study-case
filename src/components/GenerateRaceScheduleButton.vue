<template>
  <ButtonComponent @click="onClick">GENERATE PROGRAM</ButtonComponent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonComponent from "./Button/ButtonComponent.vue";

export default defineComponent({
  name: "GenerateRaceScheduleButton",
  components: { ButtonComponent },
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
});
</script>
