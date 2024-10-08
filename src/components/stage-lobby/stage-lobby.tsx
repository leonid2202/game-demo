import "./stage-lobby.scss";
import { FC } from "react";
import { TeamList } from "../team-list";
import { PlayersList } from "../players-list";
import { isHost, setState, usePlayersList } from "playroomkit";
import { useGameStage, useTurnStage } from "../../hooks";

export const StageLobby: FC = () => {
  const players = usePlayersList(true);
  const [, setGameStage] = useGameStage();
  const [, setTurnStage] = useTurnStage();

  const canStartGame = !players.some(
    (player) => player.getState("team") === undefined
  );

  const handleStartGame = () => {
    setState('currentRound', 0, true);
    setState('usedWords', [], true);
    setState('currentGuesser', null, true);
    setState('guessers', [], true);
    setState('timer', 0, true);
    setTurnStage('clue');
    setGameStage("game");
  };

  return (
    <div className="stage-lobby-wrapper">
      <div className="teams">
        <TeamList team="left" />
        <PlayersList />
        <TeamList team="right" />
      </div>
      {isHost() ? (
        <button
          className="start-button"
          disabled={!canStartGame}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      ) : (
        "Waiting for the host to start the game"
      )}
    </div>
  );
};
