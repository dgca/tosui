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
