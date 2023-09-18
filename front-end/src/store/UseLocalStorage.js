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
  console.log(`localStorage jwt key: '${key}', values: '${value}'`);

  // store jwtKey in localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(
      `update value to localStorage jwt key: '${key}', values: '${value}'`
    );
  }, [key, value]);

  return [value, setValue];
}

export { useLocalState };
