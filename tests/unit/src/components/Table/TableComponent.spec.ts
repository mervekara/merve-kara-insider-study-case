import { shallowMount } from "@vue/test-utils";
import TableComponent from "@/components/Table/TableComponent.vue";

describe("TableComponent", () => {
  const headers = ["Name", "Age", "Occupation"];
  const rows = [
    ["Alice", "30", "Engineer"],
    ["Bob", "25", "Designer"],
    ["Charlie", "35", "Teacher"],
  ];

  it("renders headers correctly", () => {
    const wrapper = shallowMount(TableComponent, {
      props: {
        headers,
        rows,
      },
    });

    const thElements = wrapper.findAll("th");
    expect(thElements.length).toBe(headers.length);

    thElements.forEach((th, index) => {
      expect(th.text()).toBe(headers[index]);
    });
  });

  it("renders rows and cells correctly", () => {
    const wrapper = shallowMount(TableComponent, {
      props: {
        headers,
        rows,
      },
    });

    const trElements = wrapper.findAll("tbody tr");
    expect(trElements.length).toBe(rows.length);

    trElements.forEach((tr, rowIndex) => {
      const tdElements = tr.findAll("td");
      expect(tdElements.length).toBe(rows[rowIndex].length);

      tdElements.forEach((td, cellIndex) => {
        expect(td.text()).toBe(rows[rowIndex][cellIndex]);
      });
    });
  });

  it("applies correct background color to even rows", () => {
    const wrapper = shallowMount(TableComponent, {
      props: {
        headers,
        rows,
      },
    });

    const evenRows = wrapper.findAll("tbody tr.even-row");
    expect(evenRows.length).toBeGreaterThan(0);
    evenRows.forEach((tr) => {
      expect(tr.classes()).toContain("even-row");
    });
  });
});
