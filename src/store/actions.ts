import { ActionTree } from "vuex";
import { State, Horse } from "@/types/Horse";
import { getSuffix } from "@/utils/helpers";
import { calculateFinishTime, generateRandomSpeed } from "@/utils/raceHelpers";

const actions: ActionTree<State, State> = {
  generateRaceSchedule({ commit, state }) {
    const raceSchedule = [];
    const distances = [1200, 1400, 1600, 1800, 2000, 2200];
    for (let i = 0; i < 6; i++) {
      const shuffledHorses = [...state.horses].sort(() => 0.5 - Math.random());
      const selectedHorses = shuffledHorses.slice(0, 10);
      raceSchedule.push({
        distance: distances[i],
        horses: selectedHorses.map((horse, index) => ({
          position: index + 1,
          name: horse.name,
          color: horse.color,
        })),
      });
    }

    commit("setRaceSchedule", raceSchedule);
    return Promise.resolve(raceSchedule);
  },
  async startRace({ commit, state }) {
    if (state.raceSchedule.length === 0) {
      console.error("Please generate a race schedule first.");
      return;
    }

    for (const index in state.raceSchedule) {
      const race = state.raceSchedule[index];
      const raceIndex = Number(index) + 1;

      commit(
        "setCurrentRaceName",
        `${raceIndex}${getSuffix(raceIndex)} Lap ${race.distance}m`
      );

      const currentRaceHorses = race.horses.map((horse: Horse) => ({
        ...horse,
        color: horse.color,
        position: 0,
      }));

      for (const horse of currentRaceHorses) {
        horse.speed = generateRandomSpeed();
      }

      const maxFinishTime = Math.max(
        ...currentRaceHorses.map((horse: Horse) =>
          calculateFinishTime(race.distance, horse.speed)
        )
      );

      commit("setCurrentRaceHorses", currentRaceHorses);

      await new Promise((resolve) => setTimeout(resolve, maxFinishTime * 450));

      const raceResult = currentRaceHorses.map((horse: Horse) => ({
        position: 0,
        name: horse.name,
        finishTime: calculateFinishTime(race.distance, horse.speed),
      }));

      console.log(raceResult);

      raceResult.sort((a, b) => a.finishTime - b.finishTime);

      raceResult.forEach((horse, index) => {
        horse.position = index + 1;
      });

      commit("setRaceResults", [...state.raceResults, raceResult]);
      commit("setCurrentRaceHorses", []);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  },
};

export default actions;
