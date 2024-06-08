import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import RaceTrack from "@/components/RaceTrack.vue";

describe("RaceTrack.vue", () => {
  it("renders correct number of lanes and lane numbers", () => {
    const currentRaceHorses = [
      { speed: 10, color: "red" },
      { speed: 15, color: "blue" },
      { speed: 20, color: "green" },
    ];

    const wrapper = shallowMount(RaceTrack, {
      global: {
        plugins: [
          createStore({
            getters: { getCurrentRaceHorses: () => currentRaceHorses },
          }),
        ],
      },
    });

    const lanes = wrapper.findAll(".lane");
    expect(lanes.length).toBe(currentRaceHorses.length);

    lanes.forEach((lane, index) => {
      const laneNumber = lane.find(".lane-number");
      expect(laneNumber.exists()).toBe(true);
      expect(laneNumber.text()).toBe((index + 1).toString());
    });
  });

  it("renders correct horse icons with proper animation duration", () => {
    const currentRaceHorses = [
      { speed: 10, color: "red" },
      { speed: 15, color: "blue" },
      { speed: 20, color: "green" },
    ];

    const wrapper = shallowMount(RaceTrack, {
      global: {
        plugins: [
          createStore({
            getters: { getCurrentRaceHorses: () => currentRaceHorses },
          }),
        ],
      },
    });

    const horseIcons = wrapper.findAll(".horse");
    expect(horseIcons.length).toBe(currentRaceHorses.length);

    horseIcons.forEach((horseIcon, index) => {
      const horse = currentRaceHorses[index];
      expect(horseIcon.attributes("style")).toContain(
        `animation-duration: ${500 / horse.speed}s;`
      );
      expect(horseIcon.find(".horse-icon").exists()).toBe(true);
      expect(horseIcon.find(".horse-icon").attributes("style")).toContain(
        `color: ${horse.color}`
      );
    });
  });

  it("renders finish line and finish text", () => {
    const store = createStore({
      getters: {
        getCurrentRaceHorses: () => [],
      },
    });

    const wrapper = shallowMount(RaceTrack, {
      global: {
        plugins: [store],
      },
    });

    const finishLine = wrapper.find(".finish-line");
    expect(finishLine.exists()).toBe(true);

    const finishText = wrapper.find(".finish-text");
    expect(finishText.exists()).toBe(true);
  });
});
