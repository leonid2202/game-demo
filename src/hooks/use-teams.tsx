import { usePlayersState } from "playroomkit";

export const useTeams = () => {
  const playersTeams = usePlayersState('team');

  const leftTeam = playersTeams.filter(({ state }) => state === 'left').map(({ player }) => player);
  const rightTeam = playersTeams.filter(({ state }) => state === 'right').map(({ player }) => player);

  return [leftTeam, rightTeam];
};