import { useEffect, useState } from "react";

import { Controls } from "components/controls";
import { Button } from "components/button";
import { Clock } from "components/clock";
import { Title } from "components/title";

import "./App.scss";

const App = () => {
  const MAX_ALLOWED_TIME = 5999;
  const [rawElapsedTime, setRawElapsedTime] = useState(0);
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [formattedElapsedTime, setFormattedElapsedTime] = useState("");

  /**
   * We run the stopwatch. setInterval has no actual guarantees for accuracy.
   * So, we recalculate the elapsed time using Date.now();
   */
  useEffect(() => {
    let interval: number;
    if (isClockRunning) {
      const startTime = Date.now() - rawElapsedTime * 1000;
      interval = window.setInterval(() => {
        const newTime = Date.now();
        setRawElapsedTime(Math.round((newTime - startTime) / 1000));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isClockRunning]);

  /**
   * We format the time so that it is ready to consume.
   */
  useEffect(() => {
    if (rawElapsedTime >= MAX_ALLOWED_TIME) {
      setIsClockRunning(false);
    }
    const seconds = rawElapsedTime % 60;
    const minutes = Math.floor(rawElapsedTime / 60);
    const stringFormattedTime = padNumber(minutes) + padNumber(seconds);
    setFormattedElapsedTime(stringFormattedTime);
  }, [rawElapsedTime]);

  /**
   * We update the page title to match the elapsed time.
   */
  useEffect(() => {
    if (rawElapsedTime) {
      document.title = getPageTitle();
    }
  }, [formattedElapsedTime]);

  const handleStartClick = () => {
    if (!hasReachedMaxTime()) {
      setIsClockRunning(!isClockRunning);
    }
  };

  const handleResetClick = () => {
    setRawElapsedTime(0);
    setIsClockRunning(false);
    document.title = "stopwatch";
  };

  const padNumber = (n: number) => {
    return n < 10 ? "0" + String(n) : String(n);
  };

  /**
   * We've arbitrarily set a maximum time so the numbers fit the design.
   * (Which is also arbitrary).
   */
  const hasReachedMaxTime = () => {
    return !(rawElapsedTime < MAX_ALLOWED_TIME);
  };

  /**
   * The display is aria-hidden, so we add this label.
   * @returns A formatted human listenable string of the elapsed time.
   */
  const getAriaLabel = () => {
    return `
    ${Number(formattedElapsedTime.slice(0, 2))} minutes and ${Number(
      formattedElapsedTime.slice(-2)
    )} seconds.
    `;
  };

  const getPageTitle = () => {
    return `
      ${Number(formattedElapsedTime.slice(0, 2))}m${Number(
      formattedElapsedTime.slice(-2)
    )}s
    `;
  };

  return (
    <article className="app">
      <header>
        <Title label="stopwatch" />
      </header>
      <Clock value={formattedElapsedTime} ariaLabel={getAriaLabel()} />
      <Controls>
        <Button
          handleClick={handleStartClick}
          variant={hasReachedMaxTime() ? "inactive" : "primary"}
        >
          {isClockRunning === true
            ? "Pause"
            : hasReachedMaxTime()
            ? "The End"
            : rawElapsedTime === 0
            ? "Start"
            : "Continue"}
        </Button>
        <Button
          handleClick={handleResetClick}
          variant={hasReachedMaxTime() ? "primary" : "secondary"}
        >
          Reset
        </Button>
      </Controls>
    </article>
  );
};

export default App;
