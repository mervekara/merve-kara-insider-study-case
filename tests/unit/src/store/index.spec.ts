import { createStore, Store } from "vuex";
import { State } from "@/types/Horse";
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import { initializeStore } from "@/utils/storeInitializer";

jest.mock("@/store/actions", () => ({
  generateRaceSchedule: jest.fn(),
  startRace: jest.fn(),
}));

jest.mock("@/utils/storeInitializer", () => ({
  initializeStore: jest.fn(() => [
    { name: "Horse 1", speed: 40 },
    { name: "Horse 2", speed: 35 },
  ]),
}));

describe("Vuex Store", () => {
  let store: Store<State>;

  beforeEach(() => {
    const state: State = {
      horses: initializeStore(),
      raceSchedule: [],
      raceResults: [],
      currentRaceName: "",
      maxFinishTime: 0,
      currentRaceHorses: [],
    };

    store = createStore({
      state,
      actions,
      getters,
      mutations,
    });
  });

  test("initialize store with correct state", () => {
    expect(store.state.horses).toEqual([
      { name: "Horse 1", speed: 40 },
      { name: "Horse 2", speed: 35 },
    ]);
    expect(store.state.raceSchedule).toEqual([]);
    expect(store.state.raceResults).toEqual([]);
    expect(store.state.currentRaceName).toBe("");
    expect(store.state.maxFinishTime).toBe(0);
    expect(store.state.currentRaceHorses).toEqual([]);
  });

  test("generateRaceSchedule action", async () => {
    const mockSchedule = [{ name: "Race 1" }, { name: "Race 2" }];
    ((actions as any).generateRaceSchedule as jest.Mock).mockImplementationOnce(
      ({ commit }) => {
        commit("setRaceSchedule", mockSchedule);
      }
    );

    await store.dispatch("generateRaceSchedule");

    expect(store.state.raceSchedule).toEqual(mockSchedule);
  });

  test("startRace action", async () => {
    const mockResults = [
      { name: "Horse 1", finishTime: 50 },
      { name: "Horse 2", finishTime: 55 },
    ];
    ((actions as any).startRace as jest.Mock).mockImplementationOnce(
      ({ commit }, raceName) => {
        commit("setCurrentRaceName", raceName);
        commit("setRaceResults", mockResults);
      }
    );

    await store.dispatch("startRace", "Race 1");

    expect(store.state.currentRaceName).toBe("Race 1");
    expect(store.state.raceResults).toEqual(mockResults);
  });
});
