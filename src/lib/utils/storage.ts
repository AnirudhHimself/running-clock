export type Storage = {
  timestamp: number;
  isRunning: boolean;
  elapsedTime: number;
};

export type StorageKey = keyof Storage;
export type StorageValue = number | boolean | string;
/**
 * Helper to read an item from localStorage.
 * @param key
 * @returns
 */
export const readFromStorage = (
  key: string,
  defaultVal: StorageValue,
): StorageValue => {
  // null items get cast to 'null' which get cast back to null by
  // JSON.parse. Yeah. It's weird.
  let result: StorageValue;
  try {
    result = JSON.parse(window.localStorage.getItem(key));
  } catch {
    result = defaultVal;
  }
  return result;
};

/**
 * Helper to write a value to localStorage.
 * @param key
 * @param val
 */
export const writeToStorage = (key: string, val: StorageValue) => {
  window.localStorage.setItem(key, String(val));
};
