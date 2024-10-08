import "./stage-game.scss";
import { getState, myPlayer, useMultiplayerState, usePlayersList, usePlayerState } from "playroomkit";
import { FC, useMemo, useState } from "react";
import { Timer } from "../timer";

export const GuessCluesList: FC = () => {
  const [clues] = useMultiplayerState("clues", []);
  const players = usePlayersList();
  const [currentGuesser] = useMultiplayerState("currentGuesser", "");
  const [submittedGuess, setSubmittedGuess] = usePlayerState(
    myPlayer(),
    "guess",
    ""
  );
  const [guess, setGuess] = useState("");

  const isGuesser = useMemo(() => {
    const roundType = getState("gamePlan")[getState("currentRound")];

    // enemies can guess too
    if (roundType !== '0') {
      const guesser = players.find(player => player.id === currentGuesser);
      console.log(guesser);
      return myPlayer().id === currentGuesser || myPlayer().getState('team') !== guesser?.getState('team');
    }

    return myPlayer().id === currentGuesser;
  }, []);

  const handleSubmit = () => setSubmittedGuess(guess, true);

  return (
    <div className="guess-clues-list-container">
      <Timer />
      <div className="clues-container">
        {(clues as string[]).map((clue, i) => (
          <div style={{ transform: `rotate(${Math.random() * 6 - 3}deg) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)` }} key={i + clue}>
            <div className="clue-item" style={{ animationDuration: `${Math.random() * 0.3 + 0.35}s` }}>
              {clue || 'No clue :('}
            </div>
          </div>
        ))}
      </div>
      {isGuesser ? (
        <div className="input-submit-wrapper">
          <input
            disabled={submittedGuess}
            placeholder="Type your guess (you only get one)"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button disabled={!guess || submittedGuess} onClick={handleSubmit}>
            {submittedGuess ? "Submitted" : "Submit"}
          </button>
        </div>
      ) : (
        <div>Waiting for other players to guess</div>
      )}
    </div>
  );
};
