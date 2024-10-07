import { myPlayer, usePlayersList } from "playroomkit"
import { FC } from "react"
import { TeamId } from "../../types"
import "./team-list.scss"

interface TeamListProps {
  teamId: TeamId
}

export const TeamList: FC<TeamListProps> = ({ teamId }) => {
  const list = usePlayersList(true)
  const title = teamId === "left" ? "Left Team" : "Right Team"

  const me = myPlayer()

  const handleJoin = () => me.setState("teamId", teamId, true)

  return (
    <div className={`team-list-wrapper ${teamId}`}>
      <h1>{title}</h1>
      <ul className={"team-list"}>
        {list.map((player) =>
          player.getState("teamId") === teamId ? (
            <li key={player.id}>{player.getProfile().name}</li>
          ) : null
        )}
      </ul>
      {me.getState("teamId") !== teamId && (
        <button className={"join-button"} onClick={handleJoin}>
          JOIN
        </button>
      )}
    </div>
  )
}
