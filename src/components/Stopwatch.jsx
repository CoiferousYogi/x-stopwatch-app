import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  // functions to define the running state
  const [isRunning, setIsRunning] = useState(false);

  // function to calculate elapsed time
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  function startStopStopwatch() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }

  function resetStopwatch() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">Time: {formatTime(elapsedTime)}</div>
      <div className="controls">
        <button className="start-btn" onClick={startStopStopwatch}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="reset-btn" onClick={resetStopwatch}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
