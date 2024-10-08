/*
    0 - only allies give clues, enemies try guessing and get points if you're wrong
    1 - enemies blindly give clues, try guessing
    2 - enemies see the answer and give clues
*/
const DEFAULT_GAME_PLAN = "012";

export const CONFIG = {
  defaultPlayerStates: { team: undefined },
  defaultStates: { gamePlan: DEFAULT_GAME_PLAN, clueTimer: 30, guessTimer: 200 },
  gameId: "uMblBO2cprpS70H2SNNA",
};