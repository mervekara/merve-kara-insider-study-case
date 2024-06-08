<template>
  <ButtonComponent :disabled="!canStartRace" @click="onClick"
    >GENERATE PROGRAM</ButtonComponent
  >
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ButtonComponent from "./Button/ButtonComponent.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "GenerateRaceScheduleButton",
  components: { ButtonComponent },
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    // eslint-disable-next-line no-undef
    const canStartRace = computed(() => store.state.raceResults.length === 0);

    return {
      canStartRace,
    };
  },
});
</script>

function useStore() { throw new Error("Function not implemented."); }
