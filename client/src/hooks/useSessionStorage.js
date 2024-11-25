import { useState } from "react";

// from https://usehooks.com/useSessionStorage/
// Usage:
// const [name, setName] = useSessionStorage('name', 'Bob');
// searches sessionStorage for 'name' value or sets 'name=Bob'

const useSessionStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from session storage by key
      const item = window.sessionStorage.getItem(key);
      // if no item exists, set item to initialValue
      if (item === null) {
        window.sessionStorage.setItem(key, JSON.stringify(initialValue));
      }
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to session storage
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error("error in session storage", error);
    }
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
