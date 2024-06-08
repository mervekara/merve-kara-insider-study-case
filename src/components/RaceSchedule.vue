<template>
  <div class="race-schedule">
    <div v-for="(race, index) in raceSchedule" :key="index" class="race">
      <h3>{{ getRaceTitle(index + 1, race.distance) }}</h3>
      <Table :headers="headers" :rows="getRows(race.horses)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { getSuffix } from "../utils/helpers";
import Table from "./Table/TableComponent.vue";

export default defineComponent({
  name: "RaceSchedule",
  components: {
    Table,
  },
  setup() {
    const store = useStore();
    const raceSchedule = computed(() => store.getters.getRaceSchedule);

    const headers = ["Position", "Name"];

    const getRows = (horses: any[]) => {
      return horses.map((horse) => [horse.position, horse.name]);
    };

    return {
      raceSchedule,
      headers,
      getRows,
    };
  },
  methods: {
    getRaceTitle(index: number, distance: number): string {
      return `${index}${getSuffix(index)} Lap - ${distance}m`;
    },
  },
});
</script>

<style scoped>
.race-schedule {
  max-height: 600px;
  margin-top: 20px;
  overflow-x: auto;
}
</style>
