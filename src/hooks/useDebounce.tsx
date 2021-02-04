import { useState, useEffect } from "react";

/**
 * Debounces a value.
 * Takes an initial value and a delay in ms. Returns the debounced value, the value, and the setter of said value.
 * This is a generic function, use T to define the type of the value and initial value.
 * @param {T} initialValue
 * @param {Number} delay
 */

export function useDebounce<T>(
  initialValue: T,
  time: number
): [T, T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);

  return [debouncedValue, value, setValue];
}
