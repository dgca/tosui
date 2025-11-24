import { css } from "@linaria/core";

const JUSTIFY_SELF = {
  auto: css`
    justify-self: auto;
  `,
  start: css`
    justify-self: start;
  `,
  center: css`
    justify-self: center;
  `,
  end: css`
    justify-self: end;
  `,
  stretch: css`
    justify-self: stretch;
  `,
} as const;

type JustifySelf = keyof typeof JUSTIFY_SELF;

export type GridProps = {
  justifySelf?: JustifySelf;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
};

export function getJustifySelf(justifySelf?: JustifySelf) {
  if (!justifySelf) return "";
  return JUSTIFY_SELF[justifySelf];
}

export function getGridTemplateColumns(gridTemplateColumns?: string) {
  return gridTemplateColumns ?? "none";
}

export function getGridTemplateRows(gridTemplateRows?: string) {
  return gridTemplateRows ?? "none";
}
