import { useState } from 'preact/hooks';
import type { StateUpdater } from 'preact/hooks';

// Hook
function useLocalStorage<T>(key: string, init: T) {
  const [storedValue, __setStoredValue] = useState<T>(function () {
    // retrieve from localStorage
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : init;
    } catch (err) {
      console.warn('INVESTIGATE ME');
      console.error(err);
      return init;
    }
  });

  const setValue = (valueOrCallback: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const value = valueOrCallback instanceof Function ? valueOrCallback(storedValue) : valueOrCallback;

      __setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('INVESTIGATE ME TOO');
      console.error(err);
    }
  };

  return [storedValue, setValue] as [T, StateUpdater<T>];
}

export default useLocalStorage;
