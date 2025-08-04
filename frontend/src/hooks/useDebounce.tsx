import React, { useRef } from "react";

const useDebounce = () => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  function Debounce(
    set: React.Dispatch<React.SetStateAction<string | undefined>>,
    value: string
  ) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      set(value);
    }, 200);
  }

  return [Debounce];
};

export default useDebounce;
