import { shallowMount } from "@vue/test-utils";
import HorseList from "@/components/HorseList.vue";
import { createStore } from "vuex";

describe("HorseList", () => {
  const store = createStore({
    getters: {
      getHorses: () => [
        { name: "Horse1", condition: "Good", color: "Brown" },
        { name: "Horse2", condition: "Average", color: "Black" },
        { name: "Horse3", condition: "Poor", color: "White" },
      ],
    },
  });

  it("renders the correct headers and rows", () => {
    const wrapper = shallowMount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const headers = wrapper.vm.headers;
    expect(headers).toEqual(["Name", "Condition", "Color"]);

    const rows = wrapper.vm.rows;
    expect(rows).toEqual([
      ["Horse1", "Good", "Brown"],
      ["Horse2", "Average", "Black"],
      ["Horse3", "Poor", "White"],
    ]);
  });
});
