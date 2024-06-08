export interface Horse {
  name: string;
  condition: number;
  color: string;
  speed: number;
  finishTime: number;
  position: number;
}

export interface Race {
  distance: number;
  horses: Horse[];
}

export interface State {
  horses: Horse[];
  raceSchedule: Race[];
  raceResults: Race[];
  currentRaceName: string;
  maxFinishTime: number;
  currentRaceHorses: Horse[];
}
