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
  const result: StorageValue = JSON.parse(window.localStorage.getItem(key)!);
  return result ?? defaultVal;
};

/**
 * Helper to write a value to localStorage.
 * @param key
 * @param val
 */
export const writeToStorage = (key: string, val: StorageValue) => {
  window.localStorage.setItem(key, String(val));
};
