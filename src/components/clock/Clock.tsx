import { Digit } from "components/digit";
import { useEffect, useState, useRef } from "react";
import "./Clock.scss";

interface IClockProps {
  value: any;
}

interface IElapsedTime {
  minutes: number;
  seconds: number;
}

/**
 * Component that formats and displays the
 * elapsed time in minutes and seconds.
 */
export const Clock = (props: IClockProps) => {
  const [elapsedTime, setElapsedTime] = useState<IElapsedTime>({
    minutes: 0,
    seconds: 0,
  });
  const [formattedTime, setFormattedTime] = useState<Array<string>>();

  const clockEl = useRef<HTMLDivElement>(null);

  /**
   * Recalculate elapsed time when the prop changes
   */
  useEffect(() => {
    const seconds = Math.floor(props.value % 60);
    const minutes = Math.floor(props.value / 60);
    setElapsedTime({ minutes: minutes, seconds: seconds });
  }, [props.value]);

  /**
   * We format the time so that it we can loop through it
   * for rendering.
   */
  useEffect(() => {
    const minutes = elapsedTime.minutes > 0 ? String(elapsedTime.minutes) : "";

    const seconds =
      elapsedTime.minutes > 0 && elapsedTime.seconds < 10
        ? padSecondsToString(elapsedTime.seconds)
        : String(elapsedTime.seconds);

    const newFormattedTime = minutes ? minutes + ":" + seconds : seconds;

    setFormattedTime(newFormattedTime.split(""));
  }, [elapsedTime]);

  /**
   * We update the page title to match the elapsed time.
   */
  useEffect(() => {
    if (props.value > 0) {
      document.title = `${elapsedTime.minutes ?? 0}m${elapsedTime.seconds}s`;
    }
  }, [elapsedTime]);

  useEffect(() => {
    if (clockEl.current && formattedTime?.length) {
      if (formattedTime.length > 7) {
        clockEl.current.style.setProperty("--fs-clock", "var(--fs-h3)");
      } else {
        clockEl.current.style.removeProperty("--fs-clock");
      }
    }
  }, [formattedTime]);

  /**
   * The display is aria-hidden, so we add this label.
   * @returns A formatted human listenable string of the elapsed time.
   */
  const getAriaLabel = () => {
    return `${elapsedTime.minutes ?? 0} minutes and ${
      elapsedTime.seconds ?? 0
    } seconds.`;
  };

  /**
   * Handle the case where if 3 minutes and 6 seconds have elapsed we want
   * to display: 3:06 on the clock.
   */
  const padSecondsToString = (n: number) => {
    const secondsString = n > 10 ? String(n) : "0" + String(n);
    return secondsString;
  };

  return (
    <div
      ref={clockEl}
      className="clock"
      role="timer"
      aria-label={getAriaLabel()}
    >
      {formattedTime &&
        formattedTime.map((digit, index) => {
          return <Digit key={index} value={digit} />;
        })}
    </div>
  );
};
