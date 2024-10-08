import './stage-game.scss';
import { FC, useState } from "react";
import { Timer } from "../timer";
import { myPlayer, useMultiplayerState, usePlayerState } from "playroomkit";

export const ClueGiving: FC = () => {
  const [clue, setClue] = useState("");
  const [submittedClue, setSubmittedClue] = usePlayerState(
    myPlayer(),
    "clue",
    ""
  );
  const [word] = useMultiplayerState("word", "");

  const handleSubmit = () => setSubmittedClue(clue, true);

  return (
    <div>
      <h1>{word}</h1>
      <Timer />
      <div className="input-submit-wrapper">
        <input
          disabled={submittedClue}
          placeholder="Type your single-word clue for the word"
          value={clue}
          onChange={(e) => setClue(e.target.value)}
        />
        <button disabled={!clue || submittedClue} onClick={handleSubmit}>
          {submittedClue ? 'Submitted' : 'Submit'}
        </button>
      </div>
    </div>
  );
};
