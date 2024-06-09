import { createStore, Store } from "vuex";
import { State } from "@/types/Horse";
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import { initializeStore } from "@/utils/storeInitializer";

const state: State = {
  horses: initializeStore(),
  raceSchedule: [],
  raceResults: [],
  currentRaceName: "",
  maxFinishTime: 0,
  currentRaceHorses: [],
};

const store: Store<State> = createStore({
  state,
  actions,
  getters,
  mutations,
});

export default store;
