import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * Reports whether React is rendering in a browser without introducing a
 * server/client hydration mismatch.
 */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
