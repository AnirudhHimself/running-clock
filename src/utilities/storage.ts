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
export const readFromStorage = (key: string): any => {
  // null items get cast to 'null' which get cast back to null by
  // JSON.parse. Yeah. It's weird.
  return JSON.parse(String(window.localStorage.getItem(key)));
};

/**
 * Helper to write a value to localStorage.
 * @param key
 * @param val
 */
export const writeToStorage = (key: string, val: string | number | boolean) => {
  window.localStorage.setItem(key, String(val));
};
