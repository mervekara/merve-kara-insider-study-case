import { generateRandomSpeed, calculateFinishTime } from "@/utils/raceHelpers";

describe("generateRandomSpeed function", () => {
  it("should generate a random speed between 10 and 20", () => {
    const speed = generateRandomSpeed();
    expect(speed).toBeGreaterThanOrEqual(10);
    expect(speed).toBeLessThanOrEqual(20);
  });
});

describe("calculateFinishTime function", () => {
  it("should calculate the finish time correctly", () => {
    const distance = 1000;
    const speed = 20;

    const expectedFinishTime = distance / speed;
    const finishTime = calculateFinishTime(distance, speed);

    expect(finishTime).toBe(expectedFinishTime);
  });
});
