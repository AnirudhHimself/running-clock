import { useEffect, useState } from 'react'
import { readFromStorage, StorageKey, StorageValue, writeToStorage } from 'utilities'

// TODO:
export const useStoredTimer = (key: StorageKey, initialValue: StorageValue) => {

    const [value, setValue] = useState(() => {
        const valueFromStorage = readFromStorage(key);
        const initial = valueFromStorage ? valueFromStorage : initialValue;
        return initial;
    });

    const updateValue = (newVal: StorageValue) => {
        setValue(newVal);
        writeToStorage(key, newVal);
    }

    // If localStorage gets updated in a different window, we'll trigger this event.
    useEffect(() => {
        const handleStorageEvent = (e: StorageEvent) => {
            updateValue(e.newValue!);
        }
        window.addEventListener('storage', (e) => handleStorageEvent)

        return (
            window.removeEventListener('storage', (e) => handleStorageEvent)
        );
    }, []);

    return [value, updateValue]
}

