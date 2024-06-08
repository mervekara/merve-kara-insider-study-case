import { Horse } from "@/types/Horse";

export const initializeStore = (): Horse[] => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
    "gray",
    "cyan",
    "magenta",
    "lime",
    "indigo",
    "teal",
    "violet",
    "olive",
    "coral",
    "maroon",
  ];
  const horses: Horse[] = [];
  for (let i = 1; i <= 20; i++) {
    const horse: Horse = {
      name: `Horse ${i}`,
      condition: Math.floor(Math.random() * 100) + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0,
      finishTime: 0,
      position: 0,
    };
    horses.push(horse);
  }
  return horses;
};
