import { css } from "@linaria/core";

const ROUNDED_TOP_LEFT = {
  none: css`
    border-top-left-radius: var(--tosui-radius-none);
  `,
  sm: css`
    border-top-left-radius: var(--tosui-radius-sm);
  `,
  md: css`
    border-top-left-radius: var(--tosui-radius-md);
  `,
  lg: css`
    border-top-left-radius: var(--tosui-radius-lg);
  `,
  full: css`
    border-top-left-radius: var(--tosui-radius-full);
  `,
} as const;

const ROUNDED_TOP_RIGHT = {
  none: css`
    border-top-right-radius: var(--tosui-radius-none);
  `,
  sm: css`
    border-top-right-radius: var(--tosui-radius-sm);
  `,
  md: css`
    border-top-right-radius: var(--tosui-radius-md);
  `,
  lg: css`
    border-top-right-radius: var(--tosui-radius-lg);
  `,
  full: css`
    border-top-right-radius: var(--tosui-radius-full);
  `,
} as const;

const ROUNDED_BOTTOM_RIGHT = {
  none: css`
    border-bottom-right-radius: var(--tosui-radius-none);
  `,
  sm: css`
    border-bottom-right-radius: var(--tosui-radius-sm);
  `,
  md: css`
    border-bottom-right-radius: var(--tosui-radius-md);
  `,
  lg: css`
    border-bottom-right-radius: var(--tosui-radius-lg);
  `,
  full: css`
    border-bottom-right-radius: var(--tosui-radius-full);
  `,
} as const;

const ROUNDED_BOTTOM_LEFT = {
  none: css`
    border-bottom-left-radius: var(--tosui-radius-none);
  `,
  sm: css`
    border-bottom-left-radius: var(--tosui-radius-sm);
  `,
  md: css`
    border-bottom-left-radius: var(--tosui-radius-md);
  `,
  lg: css`
    border-bottom-left-radius: var(--tosui-radius-lg);
  `,
  full: css`
    border-bottom-left-radius: var(--tosui-radius-full);
  `,
} as const;

type Rounded = keyof typeof ROUNDED_TOP_LEFT;

export type RoundnessProps = {
  rounded?: Rounded;
  roundedTop?: Rounded;
  roundedBottom?: Rounded;
  roundedLeft?: Rounded;
  roundedRight?: Rounded;
  roundedTopLeft?: Rounded;
  roundedTopRight?: Rounded;
  roundedBottomLeft?: Rounded;
  roundedBottomRight?: Rounded;
};

function getRoundedTopLeft(props: RoundnessProps) {
  const value =
    props.roundedTopLeft ??
    props.roundedTop ??
    props.roundedLeft ??
    props.rounded ??
    "none";
  return ROUNDED_TOP_LEFT[value];
}

function getRoundedTopRight(props: RoundnessProps) {
  const value =
    props.roundedTopRight ??
    props.roundedTop ??
    props.roundedRight ??
    props.rounded ??
    "none";
  return ROUNDED_TOP_RIGHT[value];
}

function getRoundedBottomRight(props: RoundnessProps) {
  const value =
    props.roundedBottomRight ??
    props.roundedBottom ??
    props.roundedRight ??
    props.rounded ??
    "none";
  return ROUNDED_BOTTOM_RIGHT[value];
}

function getRoundedBottomLeft(props: RoundnessProps) {
  const value =
    props.roundedBottomLeft ??
    props.roundedBottom ??
    props.roundedLeft ??
    props.rounded ??
    "none";
  return ROUNDED_BOTTOM_LEFT[value];
}

export function getRoundness(props: RoundnessProps) {
  return [
    getRoundedTopLeft(props),
    getRoundedTopRight(props),
    getRoundedBottomRight(props),
    getRoundedBottomLeft(props),
  ];
}
