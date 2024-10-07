import "./stage-lobby.scss"
import { FC } from "react"
import { TeamList } from "../team-list"
import { PlayersList } from "../players-list"
import { usePlayersList } from "playroomkit"
import { useGameStage } from "../../hooks"

export const StageLobby: FC = () => {
  const players = usePlayersList(true)
  const [, setGameStage] = useGameStage()

  const canStartGame = !players.some(
    (player) => player.getState("teamId") === undefined
  )

  const handleStartGame = () => setGameStage("game")

  return (
    <div className={"stage-lobby-wrapper"}>
      <div className={"teams"}>
        <TeamList teamId="left" />
        <PlayersList />
        <TeamList teamId="right" />
      </div>
      <button
        className={"start-button"}
        disabled={!canStartGame}
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  )
}
