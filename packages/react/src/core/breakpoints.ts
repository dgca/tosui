export const DEFAULT_BREAKPOINTS = {
  base: 0,
  xs: 639,
  sm: 767,
  md: 1023,
  lg: 1279,
  xl: 1535,
} as const;

export type Breakpoint = keyof typeof DEFAULT_BREAKPOINTS;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getBreakpointValue<T extends Record<Breakpoint, any>>({
  breakpoints,
  width,
  options,
}: {
  breakpoints: Record<Breakpoint, number>;
  width: number;
  options: T;
}) {
  let returnValue = options.base || undefined;

  if ("xs" in options && width >= breakpoints.xs) {
    returnValue = options.xs;
  }

  if ("sm" in options && width >= breakpoints.sm) {
    returnValue = options.sm;
  }

  if ("md" in options && width >= breakpoints.md) {
    returnValue = options.md;
  }

  if ("lg" in options && width >= breakpoints.lg) {
    returnValue = options.lg;
  }

  if ("xl" in options && width >= breakpoints.xl) {
    returnValue = options.xl;
  }

  return returnValue;
}
