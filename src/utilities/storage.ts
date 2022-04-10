export type Storage = {
  timestamp: number;
  isRunning: boolean;
  elapsedTime: number;
};

export type StorageKey = keyof Storage;
export type StorageValue = number | boolean | string
/**
 * Helper to read an item from localStorage.
 * @param key
 * @returns
 */
export const readFromStorage = (key: string): any => {
  // null items get cast to 'null' which get cast back to null by
  // JSON.parse. Yeah. It's weird.
  return JSON.parse(String(window.localStorage.getItem(key)));
};

/**
 * Helper to read all stopwatch data from localStorage
 * @returns
 *  startTime, isRunning, elapsedTime
 */
export const readStopwatchData = () => {
  return {
    timestamp: readFromStorage("timestamp"),
    isRunning: readFromStorage("isRunning"),
    elapsedTime: readFromStorage("elapsedTime"),
  };
};

/**
 * Helper to write a value to localStorage.
 * @param key
 * @param val
 */
export const writeToStorage = (key: string, val: string | number | boolean) => {
  window.localStorage.setItem(key, String(val));
};

/**
 * Helper to reset all stopwatch related data
 * from localStorage (similar to initialize)
 */
export const resetStopwatchData = () => {
  const storageDefaults: Storage = {
    timestamp: 0,
    isRunning: false,
    elapsedTime: 0,
  };
  Object.keys(storageDefaults).map((key) => {
    writeToStorage(key, storageDefaults[key as StorageKey]);
  });
};

/**
 * Writes updated stopwatch data to localStorage.
 * @param stopwatchData {timestamp, isRunning, elapsedTime}
 */
export const writeStopwatchData = (stopwatchData: Storage) => {
  Object.keys(stopwatchData).map((key) => {
    writeToStorage(key, stopwatchData[key as StorageKey]);
  });
};

/**
 * Initialize localStorage with default values if there is
 * no available value for that particular item.
 */
export const initializeStorage = () => {
  const storageDefaults: Storage = {
    timestamp: 0,
    isRunning: false,
    elapsedTime: 0,
  };
  Object.keys(storageDefaults).map((key) => {
    if (!(key)) {
      writeToStorage(key, storageDefaults[key as StorageKey]);
    }
  });
};
