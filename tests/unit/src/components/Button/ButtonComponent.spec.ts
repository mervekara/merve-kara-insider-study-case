import { shallowMount } from "@vue/test-utils";
import ButtonComponent from "@/components/Button/ButtonComponent.vue";

describe("ButtonComponent", () => {
  it("renders slot content", () => {
    const wrapper = shallowMount(ButtonComponent, {
      slots: {
        default: "Click Me",
      },
      props: {
        onClick: jest.fn(),
      },
    });
    expect(wrapper.text()).toContain("Click Me");
  });

  it("calls onClick method when button is clicked", async () => {
    const onClick = jest.fn();
    const wrapper = shallowMount(ButtonComponent, {
      props: {
        onClick,
      },
    });

    await wrapper.find("button").trigger("click");
    expect(onClick).toHaveBeenCalled();
  });
});
