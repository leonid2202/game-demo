import { FC } from "react";
import { Timer } from "../timer";
import { myPlayer, useMultiplayerState } from "playroomkit";

export const ClueWaiting: FC = () => {
  const [currentGuesser] = useMultiplayerState('currentGuesser', '');
  const isGuesser = myPlayer().id === currentGuesser;

  return (
    <div>
      <Timer />
      {isGuesser && (<div>It's your turn to guess</div>)}
      <div>Waiting for other players to give clues...</div>
    </div>
  );
};