/**
 * Converts a spacing value to a CSS value string.
 * Used by margin, padding, and sizing style helpers.
 *
 * - Numbers are multiplied by the spacing unit (4px)
 * - Strings are passed through as-is (for custom values like "100%")
 * - 0 returns "0" (no unit needed)
 */
export function getRawValue(value?: string | number): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  if (value === 0) return "0";
  return `calc(var(--t-spacing-unit) * ${value})`;
}
