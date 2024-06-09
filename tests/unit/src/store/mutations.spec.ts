import mutations from "@/store/mutations";
import { State, Horse, Race } from "@/types/Horse";

describe("Vuex Mutations", () => {
  let state: State;

  beforeEach(() => {
    state = {
      horses: [],
      raceSchedule: [],
      raceResults: [],
      currentRaceName: "",
      maxFinishTime: 0,
      currentRaceHorses: [],
    };
  });

  it("setHorses sets horses in state", () => {
    const horses: Horse[] = [
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
    ];
    mutations.setHorses(state, horses);
    expect(state.horses).toEqual(horses);
  });

  it("setRaceSchedule sets race schedule in state", () => {
    const raceSchedule: Race[] = [
      {
        distance: 1200,
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
      },
    ];
    mutations.setRaceSchedule(state, raceSchedule);
    expect(state.raceSchedule).toEqual(raceSchedule);
  });

  it("setRaceResults sets race results in state", () => {
    const raceResults: Race[][] = [
      [
        {
          distance: 1200,
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
        },
      ],
    ];
    mutations.setRaceResults(state, raceResults);
    expect(state.raceResults).toEqual(raceResults);
  });

  it("setCurrentRaceHorses sets current race horses in state", () => {
    const currentRaceHorses: Horse[] = [
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
    ];
    mutations.setCurrentRaceHorses(state, currentRaceHorses);
    expect(state.currentRaceHorses).toEqual(currentRaceHorses);
  });

  it("setCurrentRaceName sets current race name in state", () => {
    const raceName = "1st Lap 1200m";
    mutations.setCurrentRaceName(state, raceName);
    expect(state.currentRaceName).toEqual(raceName);
  });

  it("setMaxFinishTime sets max finish time in state", () => {
    const maxFinishTime = 120;
    mutations.setMaxFinishTime(state, maxFinishTime);
    expect(state.maxFinishTime).toEqual(maxFinishTime);
  });
});
