import { createContext, useState } from "react";

export const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [timerID, setTimerID] = useState(null);

  return (
    <TimerContext.Provider
      value={{
        timerID,
        setTimerID,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
