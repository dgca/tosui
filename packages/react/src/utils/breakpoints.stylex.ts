import * as stylex from "@stylexjs/stylex";

export const breakpoints = stylex.defineConsts({
  sm: "@media (min-width: 640px) and (max-width: 767px)",
  md: "@media (min-width: 768px) and (max-width: 1023px)",
  lg: "@media (min-width: 1024px) and (max-width: 1279px)",
  xl: "@media (min-width: 1280px) and (max-width: 1535px)",
  "2xl": "@media (min-width: 1536px)",
});

export type ResponsiveObject<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

export type FullResponsiveObject<T> = Required<ResponsiveObject<T>>;

/**
 * Responsive value type utility
 * Accepts either a single value or an object with breakpoint keys
 *
 * @example
 * // Single value
 * fontSize="lg"
 *
 * // Responsive object (mobile-first)
 * fontSize={{ base: "sm", md: "lg", xl: "2xl" }}
 */
export type ResponsiveValue<T> = T | ResponsiveObject<T>;

export function toFullResponsiveObject<T>(
  partial: ResponsiveObject<T>,
  defaultValue: T
): FullResponsiveObject<T> {
  const base = partial.base ?? defaultValue;
  const sm = partial.sm ?? base;
  const md = partial.md ?? sm;
  const lg = partial.lg ?? md;
  const xl = partial.xl ?? lg;
  const _2xl = partial["2xl"] ?? xl;

  return {
    base: base,
    sm: sm,
    md: md,
    lg: lg,
    xl: xl,
    "2xl": _2xl,
  } as const;
}

type StylesCSSProperties = Exclude<
  Parameters<typeof stylex.viewTransitionClass>[0]["group"],
  undefined
>;

type AllValue = "inherit" | "initial" | "unset" | null;

export type GetValuesForProperty<T extends keyof StylesCSSProperties> = Exclude<
  StylesCSSProperties[T],
  AllValue | undefined
>;
