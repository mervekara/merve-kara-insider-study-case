import getters from "@/store/getters";
import { State, Horse } from "@/types/Horse";

describe("Vuex Getters", () => {
  const state: State = {
    horses: [
      {
        name: "Thunderbolt",
        color: "black",
        condition: 0,
        speed: 0,
        finishTime: 0,
        position: 0,
      },
      {
        name: "Lightning",
        color: "white",
        condition: 0,
        speed: 0,
        finishTime: 0,
        position: 0,
      },
    ],
    raceSchedule: [],
    raceResults: [],
    currentRaceName: "1st Lap 1200m",
    maxFinishTime: 120,
    currentRaceHorses: [],
  };

  // Mock rootState with the same structure as State
  const rootState: State = {
    horses: [],
    raceSchedule: [],
    raceResults: [],
    currentRaceName: "",
    maxFinishTime: 0,
    currentRaceHorses: [],
  };

  const rootGetters = {}; // Define actual root getters if necessary

  it("getHorses returns horses from state", () => {
    expect(getters.getHorses(state, {}, rootState, rootGetters)).toEqual(
      state.horses
    );
  });

  it("getRaceSchedule returns race schedule from state", () => {
    expect(getters.getRaceSchedule(state, {}, rootState, rootGetters)).toEqual(
      state.raceSchedule
    );
  });

  it("getRaceResults returns race results from state", () => {
    expect(getters.getRaceResults(state, {}, rootState, rootGetters)).toEqual(
      state.raceResults
    );
  });

  it("getCurrentRaceName returns current race name from state", () => {
    expect(
      getters.getCurrentRaceName(state, {}, rootState, rootGetters)
    ).toEqual(state.currentRaceName);
  });

  it("getMaxFinishTime returns max finish time from state", () => {
    expect(getters.getMaxFinishTime(state, {}, rootState, rootGetters)).toEqual(
      state.maxFinishTime
    );
  });

  it("getCurrentRaceHorses returns current race horses from state", () => {
    expect(
      getters.getCurrentRaceHorses(state, {}, rootState, rootGetters)
    ).toEqual(state.currentRaceHorses);
  });
});
