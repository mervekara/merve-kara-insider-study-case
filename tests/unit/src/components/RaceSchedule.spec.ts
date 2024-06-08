import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import RaceSchedule from "@/components/RaceSchedule.vue";

describe("RaceSchedule.vue", () => {
  const store = createStore({
    getters: {
      getRaceSchedule: () => [
        {
          distance: 1200,
          horses: [
            { position: 1, name: "Horse 1" },
            { position: 2, name: "Horse 2" },
          ],
        },
        {
          distance: 1400,
          horses: [
            { position: 1, name: "Horse 3" },
            { position: 2, name: "Horse 4" },
          ],
        },
      ],
    },
  });

  it("renders correct race titles and table data", async () => {
    const wrapper = shallowMount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$nextTick();

    const raceTitles = wrapper.findAll("h3");
    expect(raceTitles.length).toBe(2);
    expect(raceTitles[0].text()).toBe("1st Lap - 1200m");
    expect(raceTitles[1].text()).toBe("2nd Lap - 1400m");

    const tables = wrapper.findAll(".race");
    expect(tables.length).toBe(2);
  });
});
