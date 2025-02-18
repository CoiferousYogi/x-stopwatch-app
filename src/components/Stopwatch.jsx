import React, { useEffect, useRef, useState } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  // functions to define the running state
  const [isRunning, setIsRunning] = useState(false);

  // function to calculate elapsed time
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef(null);

  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function startStopwatch() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function resetStopwatch() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    let seconds = Math.floor((elapsedTime / 1000) % 60);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
  }
  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="start-btn" onClick={startStopwatch}>
          Start
        </button>
        <button className="reset-btn" onClick={resetStopwatch}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
