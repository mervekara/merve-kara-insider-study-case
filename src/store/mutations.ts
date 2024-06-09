import { MutationTree } from "vuex";
import { State, Horse, Race } from "@/types/Horse";

const mutations: MutationTree<State> = {
  setHorses(state, horses: Horse[]) {
    state.horses = horses;
  },
  setRaceSchedule(state, raceSchedule: Race[]) {
    state.raceSchedule = raceSchedule;
  },
  setRaceResults(state, raceResults) {
    state.raceResults = raceResults;
  },
  setCurrentRaceHorses(state, currentRaceHorses: Horse[]) {
    state.currentRaceHorses = currentRaceHorses;
  },
  setCurrentRaceName(state, raceName: string) {
    state.currentRaceName = raceName;
  },
  setMaxFinishTime(state, maxFinishTime: number) {
    state.maxFinishTime = maxFinishTime;
  },
};

export default mutations;
