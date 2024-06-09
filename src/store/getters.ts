import { GetterTree } from "vuex";
import { State } from "@/types/Horse";

const getters: GetterTree<State, State> = {
  getHorses: (state) => state.horses,
  getRaceSchedule: (state) => state.raceSchedule,
  getRaceResults: (state) => state.raceResults,
  getCurrentRaceHorses: (state) => state.currentRaceHorses,
  getCurrentRaceName: (state) => state.currentRaceName,
  getMaxFinishTime: (state) => state.maxFinishTime,
};

export default getters;
