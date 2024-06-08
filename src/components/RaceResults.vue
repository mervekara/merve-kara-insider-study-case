<template>
  <div class="race-results">
    <div
      v-for="(result, index) in raceResults"
      :key="index"
      class="race-result"
    >
      <h3>{{ getRaceTitle(index + 1) }}</h3>
      <Table :headers="headers" :rows="getRows(result)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { getSuffix } from "../utils/helpers";
import Table from "./Table/TableComponent.vue";

export default defineComponent({
  name: "RaceResults",
  components: {
    Table,
  },
  setup() {
    const store = useStore();

    const raceResults = ref(store.getters.getRaceResults);

    watch(
      () => store.getters.getRaceResults,
      (newRaceResults) => {
        raceResults.value = newRaceResults;
      }
    );

    const headers = ["Position", "Name", "Finish Time (s)"];

    const getRows = (result: any[]) => {
      return result.map((horse) => [
        horse.position,
        horse.name,
        horse.finishTime,
      ]);
    };

    const getRaceTitle = (index: number): string => {
      return `${index}${getSuffix(index)} Round Results`;
    };

    return {
      raceResults,
      headers,
      getRows,
      getRaceTitle,
    };
  },
});
</script>

<style scoped>
.race-results {
  margin-top: 20px;
  max-height: 600px;
  overflow-x: auto;
}

h3 {
  margin-top: 0;
  background-color: greenyellow;
  padding: 5px;
  text-align: center;
}
</style>
