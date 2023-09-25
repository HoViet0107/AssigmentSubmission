import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  // initial value
  const [value, setValue] = useState(() => {
    // get localStorageValue in localStorage
    const localStorageValue = localStorage.getItem(key);
    // set initial value
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  // store jwtKey in localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useLocalState };
