import type { ResponsiveValue, ResponsiveObject } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StateProps,
  type StyleResult,
} from "../shared";
import styles from "./overflow.module.css";
import clsx from "clsx";

export type OverflowValue = "auto" | "hidden" | "scroll" | "visible";

export type OverflowProps = {
  overflow?: ResponsiveValue<OverflowValue>;
  overflowX?: ResponsiveValue<OverflowValue>;
  overflowY?: ResponsiveValue<OverflowValue>;
};

/**
 * Overflow uses suffixed class names (e.g., "autoX", "hiddenY") rather than
 * prefixed ones, so we use a small custom lookup instead of getEnumResponsiveStyles.
 */
function getOverflowClassForProp(
  value: OverflowValue,
  suffix: string,
  bp: string,
  state: StateKey
): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  const baseKey = `${value}${suffix}`;

  if (bp === "base") {
    return stateClassSuffix ? styles[`${baseKey}${stateClassSuffix}`] : styles[baseKey];
  }
  return stateClassSuffix
    ? styles[`${baseKey}_${bp}${stateClassSuffix}`]
    : styles[`${baseKey}_${bp}`];
}

function resolveOverflowProp(
  value: ResponsiveValue<OverflowValue> | undefined,
  suffix: string,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };
  if (value === undefined) return result;

  if (typeof value === "string") {
    const cls = getOverflowClassForProp(value, suffix, "base", state);
    if (cls) result.className = cls;
    return result;
  }

  const responsive = value as ResponsiveObject<OverflowValue>;
  const classes: string[] = [];
  for (const key of RESPONSIVE_KEYS) {
    const v = responsive[key];
    if (v === undefined) continue;
    const cls = getOverflowClassForProp(v, suffix, key, state);
    if (cls) classes.push(cls);
  }
  if (classes.length > 0) {
    result.className = classes.join(" ");
  }
  return result;
}

function getOverflowStylesForState(
  props: OverflowProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const overflowResult = resolveOverflowProp(props.overflow, "", state);
  const overflowXResult = resolveOverflowProp(props.overflowX, "X", state);
  const overflowYResult = resolveOverflowProp(props.overflowY, "Y", state);

  return {
    className: clsx(overflowResult.className, overflowXResult.className, overflowYResult.className),
    style: {},
  };
}

export function getOverflowStyles(
  props: OverflowProps & StateProps<OverflowProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getOverflowStylesForState(baseProps, "base");
  const hoverStyles = getOverflowStylesForState(_hover, "hover");
  const focusStyles = getOverflowStylesForState(_focus, "focus");
  const activeStyles = getOverflowStylesForState(_active, "active");
  const disabledStyles = getOverflowStylesForState(_disabled, "disabled");

  return {
    className: clsx(
      baseStyles.className,
      hoverStyles.className,
      focusStyles.className,
      activeStyles.className,
      disabledStyles.className
    ),
    style: {},
  };
}
