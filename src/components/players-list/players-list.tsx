import { usePlayersList } from "playroomkit";
import { FC } from "react";
import { formatTeam } from "./helpers";
import "./players-list.scss";

export const PlayersList: FC = () => {
  const list = usePlayersList(true);

  return (
    <div className="players-list">
      <h1>Players</h1>
      <ul>
        {list.map((player) => (
          <li key={player.id}>
            {player.getProfile().name} <span>{formatTeam(player)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
