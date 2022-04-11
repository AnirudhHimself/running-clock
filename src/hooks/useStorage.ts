import { useState } from 'react';
import {
  readFromStorage,
  StorageKey,
  StorageValue,
  writeToStorage,
} from 'utilities';

/**
 * Hook that wraps use state to keep react state in sync with
 * local storage state.
 */
export const useStorage = (key: StorageKey, initialValue: StorageValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const valueFromStorage = readFromStorage(key);
    return valueFromStorage ? valueFromStorage : initialValue;
  });

  const updateStoredValue = (newVal: StorageValue) => {
    setStoredValue(newVal);
    writeToStorage(key, newVal);
  };

  const resetStoredValue = () => {
    updateStoredValue(initialValue);
  };

  return [storedValue, updateStoredValue, resetStoredValue];
};
