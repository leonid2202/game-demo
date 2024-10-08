import { PlayerState } from "playroomkit";
import { Team } from "../../types";

export const formatTeam = (player: PlayerState) => {
  const team = player.getState("team") as Team | undefined;

  switch (team) {
    case "left":
      return "Left";
    case "right":
      return "Right";
    default:
      return "---";
  }
};
