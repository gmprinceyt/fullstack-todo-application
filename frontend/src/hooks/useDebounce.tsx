import { useEffect, useRef, useState } from "react";

export default function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [value ,delay]);
  return debouncedValue;
}
