import { css } from "@linaria/core";

const POINTER_EVENTS = {
  none: css`
    pointer-events: none;
  `,
  auto: css`
    pointer-events: auto;
  `,
  all: css`
    pointer-events: all;
  `,
} as const;

export type PointerEvents = keyof typeof POINTER_EVENTS;

export type PointerEventsProps = {
  pointerEvents?: PointerEvents;
};

export function getPointerEvents(pointerEvents?: PointerEvents) {
  if (!pointerEvents) return "";
  return POINTER_EVENTS[pointerEvents];
}
