import { useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage.js";

export const HEART_IDS = [
  "collage",
  "polaroid",
  "map",
  "timeline",
  "player",
  "coupon",
  "open-when",
  "footer",
  "date-generator",
  "nav",
];

export const TOTAL_HEARTS = HEART_IDS.length;

export default function useHearts() {
  const [found, setFound] = useLocalStorage("heartsFound", []);

  const foundSet = useMemo(() => new Set(found), [found]);

  const collect = useCallback(
    (id) => {
      if (foundSet.has(id)) return false;
      setFound((prev) => (prev.includes(id) ? prev : [...prev, id]));
      return true;
    },
    [foundSet, setFound]
  );

  const isFound = useCallback((id) => foundSet.has(id), [foundSet]);

  return {
    found: foundSet,
    count: foundSet.size,
    total: TOTAL_HEARTS,
    collect,
    isFound,
    complete: foundSet.size >= TOTAL_HEARTS,
  };
}
