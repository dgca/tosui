import { type RefObject, useEffect } from "react";
import { getTabbableElements } from "@/utils/focus";

type FocusTrapOptions = {
  isActive: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onEscape?: () => void;
};

export function useFocusTrap({
  isActive,
  containerRef,
  onEscape,
}: FocusTrapOptions) {
  useEffect(() => {
    if (!isActive) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const firstTabbable = containerRef.current
      ? getTabbableElements(containerRef.current)[0]
      : undefined;
    (firstTabbable ?? containerRef.current)?.focus();

    return () => {
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isActive, containerRef]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== "Tab" || !containerRef.current) return;

      const tabbable = getTabbableElements(containerRef.current);
      const firstTabbable = tabbable[0];
      const lastTabbable = tabbable.at(-1);

      if (!firstTabbable || !lastTabbable) {
        event.preventDefault();
        containerRef.current.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === firstTabbable ||
          !containerRef.current.contains(document.activeElement))
      ) {
        event.preventDefault();
        lastTabbable.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastTabbable ||
          !containerRef.current.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstTabbable.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, containerRef, onEscape]);
}
