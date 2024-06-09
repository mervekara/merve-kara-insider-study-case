import store from "@/store";
import actions from "@/store/actions";
import { State } from "@/types/Horse";

jest.mock("@/utils/helpers", () => ({
  getSuffix: jest.fn().mockReturnValue("st"),
}));

jest.mock("@/utils/raceHelpers", () => ({
  calculateFinishTime: jest.fn().mockReturnValue(100),
  generateRandomSpeed: jest.fn().mockReturnValue(10),
}));

describe("Vuex Actions", () => {
  let state: State;
  let commit: jest.Mock;
  let dispatch: jest.Mock;

  beforeEach(() => {
    state = {
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
      raceSchedule: [
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
        {
          distance: 1400,
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
        {
          distance: 1600,
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
        {
          distance: 1800,
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
        {
          distance: 2000,
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
        {
          distance: 2200,
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
      raceResults: [
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
      currentRaceName: "",
      maxFinishTime: 0,
      currentRaceHorses: [
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
    };

    commit = jest.fn();
    dispatch = jest.fn();

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });

  it("generateRaceSchedule commits race schedule", async () => {
    const context = { commit, state, dispatch };
    await (actions as any).generateRaceSchedule(context as any);

    expect(commit).toHaveBeenCalledWith("setRaceSchedule", expect.any(Array));

    expect(state.raceSchedule.length).toBe(6);
    expect(state.raceSchedule[0].horses.length).toBe(2); // Assuming only 2 horses in the test state
  });

  it("should log an error if raceSchedule is empty", async () => {
    const context = { commit, state, dispatch };

    state.raceSchedule = [];

    console.error = jest.fn();
    await (actions as any).startRace(context as any);

    expect(console.error).toHaveBeenCalledWith(
      "Please generate a race schedule first."
    );
  });
});
