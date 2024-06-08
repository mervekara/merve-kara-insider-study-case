<template>
  <div>
    <h2>Horse List</h2>
    <Table :headers="headers" :rows="rows" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Table from "./Table/TableComponent.vue";

export default defineComponent({
  name: "HorseList",
  components: {
    Table,
  },
  setup() {
    const store = useStore();

    const headers = ["Name", "Condition", "Color"];
    const rows = computed(() =>
      store.getters.getHorses.map((horse: any) => [
        horse.name,
        horse.condition,
        horse.color,
      ])
    );

    return {
      headers,
      rows,
    };
  },
});
</script>

<style>
.horse-list {
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h3 {
  margin-top: 10px;
  margin-bottom: 0;
  background-color: #ffd700;
  padding: 5px;
  text-align: center;
}

.table-container {
  max-height: 600px;
  overflow-x: auto;
}
</style>
