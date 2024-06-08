import { createStore, Store } from "vuex";
import { State, Horse, Race } from "@/types/Horse";
import { calculateFinishTime, generateRandomSpeed } from "@/utils/raceHelpers";
import { getSuffix } from "@/utils/helpers";

describe("Vuex Store", () => {
  let testStore: Store<State>;

  beforeEach(() => {
    testStore = createStore<State>({
      state: {
        horses: [],
        raceSchedule: [],
        raceResults: [],
        currentRaceName: "",
        maxFinishTime: 0,
        currentRaceHorses: [],
      },
      mutations: {
        setHorses(state, horses: Horse[]) {
          state.horses = horses;
        },
        setRaceSchedule(state, raceSchedule: Race[]) {
          state.raceSchedule = raceSchedule;
        },
        setRaceResults(state, raceResults: Race[]) {
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
      },
      actions: {
        generateRaceSchedule({ commit, state }) {
          const raceSchedule = [];
          const distances = [1200, 1400, 1600, 1800, 2000, 2200];
          for (let i = 0; i < 6; i++) {
            const shuffledHorses = [...state.horses].sort(
              () => 0.5 - Math.random()
            );
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
              ...currentRaceHorses.map((horse) =>
                calculateFinishTime(race.distance, horse.speed)
              )
            );

            commit("setCurrentRaceHorses", currentRaceHorses);

            await new Promise((resolve) =>
              setTimeout(resolve, maxFinishTime * 450)
            );

            const raceResult = currentRaceHorses.map((horse) => ({
              position: 0,
              name: horse.name,
              finishTime: calculateFinishTime(race.distance, horse.speed),
            }));

            raceResult.sort((a, b) => a.finishTime - b.finishTime);

            raceResult.forEach((horse, index) => {
              horse.position = index + 1;
            });

            commit("setRaceResults", [...state.raceResults, raceResult]);
            commit("setCurrentRaceHorses", []);
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        },
      },
    });
  });

  describe("Mutations", () => {
    it("setHorses mutation should update horses state correctly", () => {
      const horses: Horse[] = [
        {
          name: "Horse 1",
          color: "Brown",
          condition: 0,
          speed: 0,
          finishTime: 0,
          position: 0,
        },
      ];
      testStore.commit("setHorses", horses);
      expect(testStore.state.horses).toEqual(horses);
    });

    it("setRaceSchedule mutation should update raceSchedule state correctly", () => {
      const raceSchedule: Race[] = [{ distance: 1200, horses: [] }];
      testStore.commit("setRaceSchedule", raceSchedule);
      expect(testStore.state.raceSchedule).toEqual(raceSchedule);
    });

    it("setRaceResults mutation should update raceResults state correctly", () => {
      const raceResults: Horse[] = [
        {
          position: 1,
          name: "Horse 1",
          finishTime: 50,
          condition: 0,
          color: "",
          speed: 0,
        },
      ];
      testStore.commit("setRaceResults", raceResults);
      expect(testStore.state.raceResults).toEqual(raceResults);
    });

    it("setCurrentRaceHorses mutation should update currentRaceHorses state correctly", () => {
      const currentRaceHorses: Horse[] = [
        {
          name: "Horse 1",
          color: "Brown",
          position: 1,
          condition: 0,
          speed: 0,
          finishTime: 0,
        },
      ];
      testStore.commit("setCurrentRaceHorses", currentRaceHorses);
      expect(testStore.state.currentRaceHorses).toEqual(currentRaceHorses);
    });

    it("setCurrentRaceName mutation should update currentRaceName state correctly", () => {
      const currentRaceName = "Race 1";
      testStore.commit("setCurrentRaceName", currentRaceName);
      expect(testStore.state.currentRaceName).toEqual(currentRaceName);
    });

    it("setMaxFinishTime mutation should update maxFinishTime state correctly", () => {
      const maxFinishTime = 100;
      testStore.commit("setMaxFinishTime", maxFinishTime);
      expect(testStore.state.maxFinishTime).toEqual(maxFinishTime);
    });
  });

  describe("Actions", () => {
    it("generateRaceSchedule action should generate race schedule correctly", async () => {
      await testStore.dispatch("generateRaceSchedule");
      expect(testStore.state.raceSchedule.length).toBeGreaterThan(0);
    });

    it("startRace action should start the race correctly", async () => {
      testStore.commit("setRaceSchedule", [{ distance: 1200, horses: [] }]);
      await testStore.dispatch("startRace");
      expect(testStore.state.raceResults.length).toBeGreaterThan(0);
    });
  });
});
