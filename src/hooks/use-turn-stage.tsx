import { useMultiplayerState } from "playroomkit";
import { TurnStage } from "../types";

export const useTurnStage = (): [TurnStage, (stage: TurnStage, reliable?: boolean) => void] => {
  const [turnStage, setTurnStage] = useMultiplayerState("turnStage", "clue");

  if (
    turnStage !== "clue" &&
    turnStage !== "guess" &&
    turnStage !== "end"
  ) {
    return ["clue", setTurnStage];
  }

  return [turnStage, setTurnStage];
};
