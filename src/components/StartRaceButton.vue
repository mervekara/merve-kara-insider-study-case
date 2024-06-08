<template>
  <ButtonComponent @click="onClick">START</ButtonComponent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonComponent from "./Button/ButtonComponent.vue";

export default defineComponent({
  name: "StartRaceButton",
  components: { ButtonComponent },
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
});
</script>
