/**
 * FocusTrap hook
 *
 * Traps keyboard focus within a container element.
 * On Tab, cycles focus between first and last focusable element.
 * On Shift+Tab, cycles in reverse.
 *
 * This is a minimal implementation — for production use consider
 * a library like `focus-trap` for edge-case handling.
 */

import { useEffect, useRef } from "react";

/**
 * Get all focusable elements within a container.
 * Mirrors what users can Tab to.
 */
const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'area[href]',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  'audio[controls]',
  'video[controls]',
].join(", ");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors)
  );
  // Filter out elements that are not visible
  return elements.filter(
    (el) =>
      el.offsetParent !== null ||
      el.offsetWidth > 0 ||
      el.offsetHeight > 0
  );
}

/**
 * Hook to trap focus within a container element.
 * @param ref - Ref to the container element
 * @param enabled - Whether focus trapping is active (default: true)
 */
export function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  enabled = true
) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    // Store the element that had focus before the trap was activated
    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    const container = ref.current;
    const focusable = getFocusableElements(container);

    if (focusable.length === 0) return;

    // Focus the first focusable element (or the container itself)
    focusable[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const currentFocusable = getFocusableElements(container);
      if (currentFocusable.length === 0) return;

      const firstFocusable = currentFocusable[0];
      const lastFocusable = currentFocusable[currentFocusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Return focus to the element that had it before
      if (previouslyFocusedRef.current && typeof previouslyFocusedRef.current.focus === "function") {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [ref, enabled]);
}
