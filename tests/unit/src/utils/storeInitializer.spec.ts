import { initializeStore } from "@/utils/storeInitializer";
import { Horse } from "@/types/Horse";

describe("initializeStore function", () => {
  it("should return an array of 20 horses", () => {
    const horses: Horse[] = initializeStore();
    expect(horses.length).toBe(20);
  });

  it("should return horses with correct properties", () => {
    const horses: Horse[] = initializeStore();
    horses.forEach((horse) => {
      expect(horse.name).toMatch(/^Horse \d+$/);
      expect(horse.condition).toBeGreaterThanOrEqual(1);
      expect(horse.condition).toBeLessThanOrEqual(100);
      expect(horse.color).toBeDefined();
      expect(horse.speed).toBe(0);
      expect(horse.finishTime).toBe(0);
      expect(horse.position).toBe(0);
    });
  });
});
