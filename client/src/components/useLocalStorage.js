import { useState } from "react";

// from https://usehooks.com/useLocalStorage/
// Usage:
// const [name, setName] = useLocalStorage('name', 'Bob');
// searches localStorage for 'name' value or sets 'Bob' as the name constant
// does not set 'name=Bob' in local storage, could probably be configured to

const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // if no item exists, set item to initialValue
      if (item === null) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log("error in local storage", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
