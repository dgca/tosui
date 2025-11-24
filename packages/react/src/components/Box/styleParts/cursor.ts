import { css } from "@linaria/core";

const CURSOR = {
  auto: css`
    cursor: auto;
  `,
  default: css`
    cursor: default;
  `,
  pointer: css`
    cursor: pointer;
  `,
  wait: css`
    cursor: wait;
  `,
  text: css`
    cursor: text;
  `,
  move: css`
    cursor: move;
  `,
  grab: css`
    cursor: grab;
  `,
  grabbing: css`
    cursor: grabbing;
  `,
  notAllowed: css`
    cursor: not-allowed;
  `,
  help: css`
    cursor: help;
  `,
  crosshair: css`
    cursor: crosshair;
  `,
  zoomIn: css`
    cursor: zoom-in;
  `,
  zoomOut: css`
    cursor: zoom-out;
  `,
} as const;

export type Cursor = keyof typeof CURSOR;

export type CursorProps = {
  cursor?: Cursor;
};

export function getCursor(cursor?: Cursor) {
  if (!cursor) return "";
  return CURSOR[cursor];
}
