import { useMultiplayerState } from "playroomkit"
import { GameStage } from "../types"

export const useGameStage = (): [GameStage, (stage: GameStage) => void] => {
  const [gameStage, setGameStage] = useMultiplayerState("stage", "lobby")

  if (
    gameStage !== "lobby" &&
    gameStage !== "game" &&
    gameStage !== "results"
  ) {
    return ["lobby", setGameStage]
  }

  return [gameStage, setGameStage]
}
