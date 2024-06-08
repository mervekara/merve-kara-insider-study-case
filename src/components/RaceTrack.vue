<template>
  <div class="race-track">
    <div v-for="(horse, index) in currentRaceHorses" :key="index" class="lane">
      <div class="lane-number">{{ index + 1 }}</div>
      <div class="lane-line"></div>
      <div
        class="horse running-animation"
        :class="{ 'running-animation': currentRaceHorses.length > 0 }"
        :style="{
          animationDuration: `${500 / horse.speed}s`,
        }"
      >
        <span class="horse-icon" :style="{ color: horse.color }">
          <RunningHorseIcon :style="{ color: horse.color }" />
        </span>
      </div>
    </div>
    <div class="finish-line"></div>
    <div class="finish-text">FINISH</div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import RunningHorseIcon from "./Icon/RunningHorseIcon.vue";

export default defineComponent({
  name: "RaceTrack",
  components: {
    RunningHorseIcon,
  },
  setup() {
    const store = useStore();
    const currentRaceHorses = computed(
      () => store.getters.getCurrentRaceHorses
    );

    return {
      currentRaceHorses,
    };
  },
});
</script>

<style scoped>
.race-track {
  position: relative;
  width: 1000px;
  height: 550px;
  background-color: #f0f0f0;
  margin-top: 8%;
  overflow: hidden;
}

.lane {
  position: relative;
  height: 50px;
}

.lane-number {
  position: absolute;
  left: 0;
  width: 40px;
  height: 50px;
  background-color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  z-index: 1;
  transform: rotate(-90deg);
}

.lane-line {
  position: absolute;
  left: 40px;
  width: calc(100% - 40px);
  height: 50px;
  border-bottom: 1px dashed #999;
}

.horse {
  position: absolute;
  left: 40px;
  top: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.finish-line {
  position: absolute;
  top: 0;
  right: 50px;
  height: 91%;
  width: 2px;
  background-color: red;
}

.finish-text {
  position: absolute;
  bottom: 15px;
  right: 20px;
  color: red;
  font-weight: bold;
}

@keyframes run {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(900px);
  }
}

.running-animation {
  animation-name: run;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
