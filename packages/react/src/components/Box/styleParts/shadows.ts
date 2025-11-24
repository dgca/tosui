import { css } from "@linaria/core";

const SHADOWS = {
  none: css`
    box-shadow: var(--tosui-shadow-none);
  `,
  sm: css`
    box-shadow: var(--tosui-shadow-sm);
  `,
  md: css`
    box-shadow: var(--tosui-shadow-md);
  `,
  lg: css`
    box-shadow: var(--tosui-shadow-lg);
  `,
} as const;

type Shadow = keyof typeof SHADOWS;

export type ShadowProps = {
  shadow?: Shadow;
};

export function getShadow(shadow?: Shadow) {
  return SHADOWS[shadow ?? "none"];
}
