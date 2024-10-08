import "./timer.scss";
import { useMultiplayerState } from "playroomkit";
import { FC } from "react";

export const Timer: FC = () => {
  const [time] = useMultiplayerState("timer", 0);

  return (
    <div className="timer-wrapper">
      {time < 0 ? <h1>Time's up!</h1> : (
        <h1 key={time} className={`timer ${time < 6 ? "timer-ending" : ""}`}>
          {time}
        </h1>
      )}
    </div>
  );
};
