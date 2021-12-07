import { useEffect, useLayoutEffect, useState } from "react";

import { Controls } from "components/controls";
import { Button } from "components/button";
import { Clock } from "components/clock";
import { readStopwatchData, writeStopwatchData, IStorage } from "utilities";

import "./Stopwatch.scss";

export const Stopwatch = () => {
  const [startTime, setStartTime] = useState<number>(0);
  const [isClockRunning, setIsClockRunning] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  /**
   * Initialize state from Storage (If it exists).
   * (We do not want to render until all state is synced up).
   */
  useLayoutEffect(() => {
    const { elapsedTime, isRunning, timestamp }: IStorage = readStopwatchData();
    if (timestamp > 0 && isRunning) {
      setStartTime(timestamp);
      setSecondsElapsed(Math.round((Date.now() - timestamp) / 1000));
      setIsClockRunning(true);
    }
    if (timestamp > 0 && !isRunning) {
      setStartTime(Date.now() - (timestamp - elapsedTime));
      setSecondsElapsed(elapsedTime);
    }
  }, []);

  /**
   * We run the stopwatch. setInterval has no actual guarantees for accuracy.
   * So, we recalculate the elapsed time using Date.now() and set the Raw elapsed
   * time to the difference in timestamps. That way, at least on average, the stopwatch
   * will be accurate.
   */
  useEffect(() => {
    let interval: number;
    if (isClockRunning) {
      const newStartTime = Date.now() - secondsElapsed * 1000;
      setStartTime(newStartTime);
      interval = window.setInterval(() => {
        const newTime = Date.now();
        setSecondsElapsed(Math.round((newTime - newStartTime) / 1000));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isClockRunning]);

  /**
   * Call updateStorage helper when any of secondsElapsed, isClockRunning,
   * or startTime changes.
   */
  useEffect(() => {
    updateStorage();
  }, [startTime, isClockRunning, secondsElapsed]);

  const handleStartClick = () => {
    setIsClockRunning(!isClockRunning);
  };

  const handleResetClick = () => {
    setSecondsElapsed(0);
    setIsClockRunning(false);
    setStartTime(0);
    document.title = "Running Clock";
  };

  /**
   * Helper to update storage when our clock has updated.
   */
  const updateStorage = () => {
    const newData = {
      timestamp: startTime,
      isRunning: isClockRunning,
      elapsedTime: secondsElapsed,
    };
    writeStopwatchData(newData);
  };

  return (
    <article className="stopwatch">
      <Clock value={secondsElapsed} />
      <Controls>
        <Button handleClick={handleStartClick} variant={"primary"}>
          {isClockRunning === true
            ? "Pause"
            : secondsElapsed === 0
            ? "Start"
            : "Resume"}
        </Button>
        <Button handleClick={handleResetClick} variant={"secondary"}>
          Reset
        </Button>
      </Controls>
    </article>
  );
};
