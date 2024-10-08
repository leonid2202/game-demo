import "./App.css";
import { StageGame } from "./components/stage-game";
import { StageLobby } from "./components/stage-lobby";
import { useGameStage } from "./hooks";

function App() {
  const [gameStage] = useGameStage();

  switch (gameStage) {
    case "lobby":
      return <StageLobby />;
    case "game":
      return <StageGame />;
    default:
      return "Something went wrong :)";
  }
}

export default App;
