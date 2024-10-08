import {
  getState,
  isHost,
  myPlayer,
  setState,
  useMultiplayerState,
  usePlayersList,
} from "playroomkit";
import { FC, useEffect, useRef } from "react";
import { useGameStage, useTeams, useTurnStage } from "../../hooks";
import { pick } from "../../helpers";
import words from "../../assets/words.json";
import { ClueWaiting } from "./clue-waiting";
import { ClueGiving } from "./clue-giving";
import { GuessCluesList } from "./guess-clues-list";

// dumb, but works
function pickNewWord() {
  let newWord = "";
  const usedWords = getState("usedWords");
  do {
    newWord = pick(words.words);
  } while (usedWords.includes(newWord));

  return newWord;
}

export const StageGame: FC = () => {
  const players = usePlayersList();
  const [turnStage, setTurnStage] = useTurnStage();
  const [leftTeam, rightTeam] = useTeams();
  const [, setGameStage] = useGameStage();
  const [currentGuesser, setCurrentGuesser] = useMultiplayerState('currentGuesser', '');

  const timerRef = useRef<number | null>(null); // only host uses this

  useEffect(() => {
    if (isHost()) {
      switch (turnStage) {
        case "clue": {
          // return if no need to init the turn
          if (getState("timer") !== 0) {
            break;
          }

          const guessers = getState("guessers");
          const remainingGuessers = players.filter(
            (player) => !guessers.includes(player.id)
          );

          // end round
          if (!remainingGuessers.length) {
            const nextRound = getState("currentRound");

            // end game
            if (nextRound === getState("gamePlan").length) {
              setGameStage("results");
              return;
            }

            setState("guessers", [], true);
            setState("currentRound", nextRound, true);
          } else {
            // start new turn
            const guesser = pick(remainingGuessers);
            setState("word", pickNewWord(), true);
            setCurrentGuesser(guesser.id, true);

            setState("timer", getState("clueTimer"), true);
            timerRef.current = setInterval(() => {
              const currentTimer = getState("timer");

              // proceed to guessing stage
              if (currentTimer <= 0) {
                const currentTeam =
                guesser.getState('team') === "left" ? leftTeam : rightTeam;
                const enemyTeam =
                guesser.getState('team') === "left" ? rightTeam : leftTeam;

                const clues = currentTeam.map((player) =>
                  player.getState("clue")
                );

                const roundType = getState("gamePlan")[getState("currentRound")];
                if (roundType !== "0") {
                  const enemyClues = enemyTeam
                    .map((player) => player.getState("clue"))
                    .filter((clue) => clue);
                  clues.push(pick(enemyClues) ?? "No enemy clue :(");
                }

                const shuffledClues = clues.sort(() => Math.random() - 0.5);

                setState("clues", shuffledClues, true);
                setTurnStage("guess", true);
                clearInterval(timerRef.current ?? undefined);
              }

              setState("timer", currentTimer - 1, false);
            }, 1000);
          }
          break;
        }

        case "guess": {
          setState("timer", getState("guessTimer"), true);

          timerRef.current = setInterval(() => {
            const currentTimer = getState("timer");
            // proceed to end stage
            if (currentTimer <= 0) {
              // empty
            }

            setState("timer", currentTimer - 1, false);
          }, 1000);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnStage]);

  switch (turnStage) {
    case "clue": {
      if (myPlayer().id === currentGuesser) {
        return <ClueWaiting />;
      }

      return <ClueGiving />;
    }
    case "guess": {
      return <GuessCluesList />;
    }
  }

  return <div>Test</div>;
};

/*

 - select a guesser
 - pick a UNIQUE word
 - wait for clues
 - wait for a guess
 - sleep and repeat
 - go to next round when guessers === players
 - go to results after last round

*/
