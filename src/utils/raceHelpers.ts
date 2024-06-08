export const generateRandomSpeed = (): number => {
  return Math.floor(Math.random() * (20 - 10 + 1)) + 10;
};

export const calculateFinishTime = (
  distance: number,
  speed: number
): number => {
  return Math.round(distance / speed);
};
