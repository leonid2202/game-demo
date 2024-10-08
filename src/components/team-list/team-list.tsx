import { myPlayer, usePlayersList } from "playroomkit";
import { FC } from "react";
import { Team } from "../../types";
import "./team-list.scss";

interface TeamListProps {
  team: Team
}

export const TeamList: FC<TeamListProps> = ({ team }) => {
  const list = usePlayersList(true);
  const title = team === "left" ? "Left Team" : "Right Team";

  const me = myPlayer();

  const handleJoin = () => me.setState("team", team, true);

  return (
    <div className={`team-list-wrapper ${team}`}>
      <h1>{title}</h1>
      <ul className="team-list">
        {list.map((player) =>
          player.getState("team") === team ? (
            <li key={player.id}>{player.getProfile().name}</li>
          ) : null
        )}
      </ul>
      {me.getState("team") !== team && (
        <button className="join-button" onClick={handleJoin}>
          Join
        </button>
      )}
    </div>
  );
};
