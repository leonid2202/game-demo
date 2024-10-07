import { PlayerState } from "playroomkit";
import { TeamId } from "../../types";

export const formatTeam = (player: PlayerState) => {
    const team = player.getState('teamId') as (TeamId | undefined);

    switch (team) {
        case 'left': 
        return 'LEFT';
        case 'right': 
        return 'RIGHT';
        default: return '---'
    }
}