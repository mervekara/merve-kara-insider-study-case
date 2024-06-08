<template>
  <div class="app">
    <header>
      <h1>Horse Racing</h1>
      <div class="controls">
        <GenerateButton @click="generateRaceSchedule" />
        <StartButton @click="startRace" />
      </div>
    </header>
    <div class="content">
      <div class="column">
        <HorseList />
      </div>
      <div class="column">
        <RaceTrack />
        <h4 class="currrent-race-name">{{ currentRaceName }}</h4>
      </div>
      <div class="column">
        <h2>Race Schedule</h2>
        <RaceSchedule />
      </div>
      <div class="column">
        <h2>Race Results</h2>
        <RaceResults v-if="errorMsg" />
        <template v-else>
          <RaceResults />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import HorseList from "../components/HorseList.vue";
import RaceSchedule from "../components/RaceSchedule.vue";
import RaceTrack from "../components/RaceTrack.vue";
import RaceResults from "../components/RaceResults.vue";
import GenerateButton from "../components/GenerateRaceScheduleButton.vue";
import StartButton from "../components/StartRaceButton.vue";

export default defineComponent({
  name: "App",
  components: {
    HorseList,
    RaceSchedule,
    RaceResults,
    RaceTrack,
    GenerateButton,
    StartButton,
  },
  setup() {
    const store = useStore();
    const raceSchedule = ref<any[]>([]);
    const raceResults = ref<any[][]>([]);
    const errorMsg = ref<string>("");
    const currentRaceHorses = ref<any[]>([]);

    const generateRaceSchedule = async () => {
      try {
        await store.dispatch("generateRaceSchedule");
        errorMsg.value = "";
      } catch (error) {
        console.error("Error while generating race schedule:", error);
        errorMsg.value = "Error generating race schedule.";
      }
    };

    const startRace = async () => {
      try {
        await store.dispatch("startRace");
      } catch (error) {
        console.error("Error while starting race:", error);
        errorMsg.value = "Error starting race.";
      }
    };

    const currentRaceHorsesWatcher = ref();
    store.watch(
      () => store.getters.getCurrentRaceHorses,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          currentRaceHorsesWatcher.value = newValue;
        }
      }
    );

    const currentRaceName = computed(() => store.state.currentRaceName);

    return {
      generateRaceSchedule,
      raceSchedule,
      startRace,
      raceResults,
      errorMsg,
      currentRaceHorses,
      currentRaceName,
    };
  },
});
</script>

<style>
#app {
  text-align: center;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #ff6347;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  margin: 0;
  color: white;
}

.controls {
  display: flex;
  gap: 10px;
}

.controls button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.controls button:hover {
  background-color: #45a049;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.content > * {
  flex: 1;
}

.column {
  flex: 1;
  margin-right: 20px;
}

.currrent-race-name {
  text-align: center;
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
