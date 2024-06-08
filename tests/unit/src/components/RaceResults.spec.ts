import { shallowMount } from "@vue/test-utils";
import RaceResults from "@/components/RaceResults.vue";
import { createStore } from "vuex";

describe("RaceResults", () => {
  const store = createStore({
    getters: {
      getRaceResults: () => [
        [
          { position: 1, name: "Horse1", finishTime: 10 },
          { position: 2, name: "Horse2", finishTime: 15 },
          { position: 3, name: "Horse3", finishTime: 20 },
        ],
        [
          { position: 1, name: "Horse4", finishTime: 12 },
          { position: 2, name: "Horse5", finishTime: 18 },
          { position: 3, name: "Horse6", finishTime: 22 },
        ],
      ],
    },
  });

  it("renders correct race titles and table data", async () => {
    const wrapper = shallowMount(RaceResults, {
      global: {
        plugins: [store],
      },
    });

    const raceTitles = wrapper.findAll("h3");
    expect(raceTitles.length).toBe(2);
    expect(raceTitles[0].text()).toBe("1st Round Results");
    expect(raceTitles[1].text()).toBe("2nd Round Results");

    const tables = wrapper.findAll(".race-result");
    expect(tables.length).toBe(2);
  });
});
