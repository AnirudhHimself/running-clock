import { useEffect, useLayoutEffect } from 'react';

import { Controls } from 'components/controls';
import { Button } from 'components/button';
import { Clock } from 'components/clock';
import { useStorage } from 'hooks';

import './Stopwatch.scss';

export const Stopwatch = () => {
  const [startTime, setStartTime, resetStartTime] = useStorage('timestamp', 0);
  const [isClockRunning, setIsClockRunning, resetIsClockRunning] = useStorage(
    'isRunning',
    false,
  );
  const [secondsElapsed, setSecondsElapsed, resetSecondsElapsed] = useStorage(
    'elapsedTime',
    0,
  );
  /**
   * We need to update start time and elapsed time if the clock was
   * previously running so that it correctly measures the time.
   */
  useLayoutEffect(() => {
    if (startTime > 0 && isClockRunning) {
      setSecondsElapsed(Math.round((Date.now() - startTime) / 1000));
    }
    if (startTime > 0 && !isClockRunning) {
      setStartTime(Date.now() - (startTime - secondsElapsed));
    }
  }, []);

  /**
   * Handle case where timer is paused or reset on a different tab.
   */
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'isRunning') {
        setIsClockRunning(JSON.parse(e.newValue ?? 'false'));
      }
      if (e.key === 'timestamp' && e.newValue === '0') {
        handleResetClick();
      } 
    };
    window.addEventListener('storage', e => handleStorageEvent(e));
    return window.removeEventListener('storage', e => handleStorageEvent(e));
  }, []);

  /**
   * Run the stopwatch. setInterval has no actual guarantees for accuracy.
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

  const handleStartClick = () => {
    setIsClockRunning(!isClockRunning);
  };

  const handleResetClick = () => {
    resetSecondsElapsed();
    resetIsClockRunning();
    resetStartTime();
    document.title = 'Running Clock';
  };

  return (
    <article className="stopwatch">
      <Clock value={secondsElapsed} />
      <Controls>
        <Button handleClick={handleStartClick} variant={'primary'}>
          {isClockRunning === true
            ? 'Pause'
            : secondsElapsed === 0
            ? 'Start'
            : 'Resume'}
        </Button>
        <Button handleClick={handleResetClick} variant={'secondary'}>
          Reset
        </Button>
      </Controls>
    </article>
  );
};
