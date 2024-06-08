import { getSuffix } from "@/utils/helpers";

describe("getSuffix function", () => {
  it("should return 'st' for numbers ending in 1", () => {
    expect(getSuffix(1)).toBe("st");
  });

  it("should return 'nd' for numbers ending in 2", () => {
    expect(getSuffix(2)).toBe("nd");
  });

  it("should return 'rd' for numbers ending in 3", () => {
    expect(getSuffix(3)).toBe("rd");
  });

  it("should return 'th' for other numbers", () => {
    expect(getSuffix(4)).toBe("th");
    expect(getSuffix(11)).toBe("th");
    expect(getSuffix(101)).toBe("th");
  });
});
