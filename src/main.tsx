import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { insertCoin } from "playroomkit"

insertCoin({
  defaultPlayerStates: { teamId: undefined },
  gameId: "uMblBO2cprpS70H2SNNA",
}).then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
)
