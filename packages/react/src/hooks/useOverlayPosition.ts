import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type OverlayPlacement = "top" | "bottom" | "left" | "right";

type UseOverlayPositionOptions = {
  isOpen: boolean;
  placement: OverlayPlacement;
  triggerRef: RefObject<HTMLElement | null>;
  overlayRef: RefObject<HTMLElement | null>;
  gap?: number;
};

/**
 * Positions a body-level overlay relative to its trigger and keeps the two
 * aligned as scroll and resize events change their viewport geometry.
 */
export function useOverlayPosition({
  isOpen,
  placement,
  triggerRef,
  overlayRef,
  gap = 8,
}: UseOverlayPositionOptions) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !overlayRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const overlayRect = overlayRef.current.getBoundingClientRect();
    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = triggerRect.top - overlayRect.height - gap;
        left = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
        left = triggerRect.left - overlayRect.width - gap;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }

    setPosition({ top: top + window.scrollY, left: left + window.scrollX });
  }, [gap, overlayRef, placement, triggerRef]);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- measure before paint
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);

  return position;
}
