import "./App.css"
import { StageLobby } from "./components/stage-lobby"
import { useGameStage } from "./hooks"

function App() {
  const [gameStage] = useGameStage()

  return <>{gameStage === "lobby" && <StageLobby />}</>
}

export default App
