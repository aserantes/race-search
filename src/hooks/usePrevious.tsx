import { useEffect, useRef } from "react";

/**
 * Returns the previous value of the value passed as argument.
 * This is a generic function, use T to define the type of the value.
 * @param {T} value
 */

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
