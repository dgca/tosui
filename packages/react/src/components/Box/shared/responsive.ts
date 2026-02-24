import type { ResponsiveValue, ResponsiveObject } from "@/utils/breakpoints";
import { RESPONSIVE_KEYS, STATE_SUFFIXES, STATE_CLASS_SUFFIXES } from "./constants";
import type { StateKey, StyleResult } from "./types";

/**
 * Generic helper for variable-based responsive props using CSS fallback chains.
 *
 * With this pattern, each prop has ONE CSS class per state. The CSS handles
 * breakpoint cascading via nested var() fallbacks in media queries.
 * JS only needs to apply the class and set CSS variables for specified breakpoints.
 *
 * @param styles     CSS module styles object
 * @param classKey   Key to look up in the CSS module (e.g., "pt")
 * @param varPrefix  CSS variable prefix (e.g., "pt" → --t-pt, --t-pt_sm, etc.)
 * @param value      The prop value (plain or responsive object)
 * @param state      Interaction state (base, hover, focus, active, disabled)
 * @param transform  Optional transform from prop value to CSS string (e.g., getRawValue)
 */
export function getResponsiveVarStyles<T>(
  styles: Record<string, string>,
  classKey: string,
  varPrefix: string,
  value: ResponsiveValue<T> | undefined,
  state: StateKey = "base",
  transform?: (v: T) => string | undefined
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  const stateSuffix = STATE_SUFFIXES[state];
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];

  const className = stateClassSuffix
    ? styles[`${classKey}${stateClassSuffix}`]
    : styles[classKey];

  if (!className) return result;

  if (typeof value !== "object") {
    const raw = transform ? transform(value) : String(value);
    if (raw === undefined) return result;
    result.className = className;
    result.style[`--t-${varPrefix}${stateSuffix}`] = raw;
    return result;
  }

  let hasAnyValue = false;
  const responsive = value as ResponsiveObject<T>;

  for (const key of RESPONSIVE_KEYS) {
    const v = responsive[key];
    if (v === undefined) continue;
    const raw = transform ? transform(v) : String(v);
    if (raw === undefined) continue;
    const bpSuffix = key === "base" ? "" : `_${key}`;
    result.style[`--t-${varPrefix}${bpSuffix}${stateSuffix}`] = raw;
    hasAnyValue = true;
  }

  if (hasAnyValue) {
    result.className = className;
  }

  return result;
}

/**
 * Generic helper for enum-based responsive props using per-breakpoint CSS classes.
 *
 * Each combination of (value, breakpoint, state) maps to a unique CSS class.
 * No inline styles — pure class-name lookup. Zero runtime cost.
 *
 * CSS class naming convention:
 *   base:       .{classPrefix}-{value}  or  .{value} (if classPrefix is empty)
 *   breakpoint:  .{classPrefix}-{value}_{bp}
 *   state:       .{classPrefix}-{value}{stateClassSuffix}
 *   both:        .{classPrefix}-{value}_{bp}{stateClassSuffix}
 *
 * @param styles       CSS module styles object
 * @param classPrefix  Prefix for class lookup (e.g., "color", "text", "flex"). Empty string for no prefix.
 * @param value        The prop value (plain string or responsive object)
 * @param state        Interaction state (base, hover, focus, active, disabled)
 */
export function getEnumResponsiveStyles<T extends string>(
  styles: Record<string, string>,
  classPrefix: string,
  value: ResponsiveValue<T> | undefined,
  state: StateKey = "base"
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];

  const getClass = (val: string, bp: string): string | undefined => {
    const baseKey = classPrefix ? `${classPrefix}-${val}` : val;
    if (bp === "base") {
      return stateClassSuffix ? styles[`${baseKey}${stateClassSuffix}`] : styles[baseKey];
    }
    return stateClassSuffix
      ? styles[`${baseKey}_${bp}${stateClassSuffix}`]
      : styles[`${baseKey}_${bp}`];
  };

  if (typeof value === "string") {
    const cls = getClass(value, "base");
    if (cls) result.className = cls;
    return result;
  }

  const responsive = value as ResponsiveObject<T>;
  const classes: string[] = [];
  for (const key of RESPONSIVE_KEYS) {
    const v = responsive[key];
    if (v === undefined) continue;
    const cls = getClass(v, key);
    if (cls) classes.push(cls);
  }
  if (classes.length > 0) {
    result.className = classes.join(" ");
  }

  return result;
}
