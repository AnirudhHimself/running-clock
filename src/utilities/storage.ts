export type IStorage = {
  timestamp: number;
  isRunning: boolean;
  elapsedTime: number;
};

/**
 * Helper to read an item from localStorage.
 * @param key
 * @returns
 */
export const readFromStorage = (key: string): string => {
  return window.localStorage.getItem(key) ?? "";
};

/**
 * Helper to read all stopwatch data from localStorage
 * @returns
 *  startTime, isRunning, elapsedTime
 */
export const readStopwatchData = () => {
  return {
    timestamp: JSON.parse(readFromStorage("timestamp")),
    isRunning: JSON.parse(readFromStorage("isRunning")),
    elapsedTime: JSON.parse(readFromStorage("elapsedTime")),
  };
};

/**
 * Helper to write a value to localStorage.
 * @param key
 * @param val
 */
export const writeToStorage = (key: string, val: string | number | boolean) => {
  window.localStorage.setItem(key, JSON.stringify(val));
};

/**
 * Helper to reset all stopwatch related data
 * from localStorage (similar to initialize)
 */
export const resetStopwatchData = () => {
  const storageDefaults: IStorage = {
    timestamp: 0,
    isRunning: false,
    elapsedTime: 0,
  };
  Object.keys(storageDefaults).map((key) => {
    writeToStorage(key, storageDefaults[key as keyof IStorage]);
  });
};

/**
 * Writes updated stopwatch data to localStorage.
 * @param stopwatchData {timestamp, isRunning, elapsedTime}
 */
export const writeStopwatchData = (stopwatchData: IStorage) => {
  Object.keys(stopwatchData).map((key) => {
    writeToStorage(key, stopwatchData[key as keyof IStorage]);
  });
};

/**
 * Initialize localStorage with default values if there is
 * no available value for that particular item.
 */
export const initializeStorage = () => {
  const storageDefaults: IStorage = {
    timestamp: 0,
    isRunning: false,
    elapsedTime: 0,
  };
  Object.keys(storageDefaults).map((key) => {
    if (!(readFromStorage(key) === "")) {
      writeToStorage(key, storageDefaults[key as keyof IStorage]);
    }
  });
};
