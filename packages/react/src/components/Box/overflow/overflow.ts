import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_CLASS_SUFFIXES,
  type StateKey,
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

export type OverflowStateProps = {
  _hover?: OverflowProps;
  _focus?: OverflowProps;
  _active?: OverflowProps;
  _disabled?: OverflowProps;
};

type OverflowType = "overflow" | "overflowX" | "overflowY";

const CLASS_SUFFIX_MAP: Record<OverflowType, string> = {
  overflow: "",
  overflowX: "X",
  overflowY: "Y",
};

function getOverflowClass(
  value: OverflowValue,
  type: OverflowType,
  responsiveKey: (typeof RESPONSIVE_KEYS)[number],
  state: StateKey
): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  const typeSuffix = CLASS_SUFFIX_MAP[type];
  const baseClassName = `${value}${typeSuffix}`;

  if (responsiveKey === "base") {
    return stateClassSuffix
      ? styles[`${baseClassName}${stateClassSuffix}`]
      : styles[baseClassName];
  }

  return stateClassSuffix
    ? styles[`${baseClassName}_${responsiveKey}${stateClassSuffix}`]
    : styles[`${baseClassName}_${responsiveKey}`];
}

function getOverflowStylesForProp(
  value: ResponsiveValue<OverflowValue> | undefined,
  type: OverflowType,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  if (typeof value === "string") {
    const className = getOverflowClass(value, type, "base", state);
    if (className) {
      result.className = className;
    }
    return result;
  }

  for (const responsiveKey of RESPONSIVE_KEYS) {
    const overflowValue = value[responsiveKey];
    if (overflowValue === undefined) continue;

    const className = getOverflowClass(overflowValue, type, responsiveKey, state);
    if (className) {
      result.className = clsx(result.className, className);
    }
  }

  return result;
}

function getOverflowStylesForState(
  props: OverflowProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const overflow = getOverflowStylesForProp(props.overflow, "overflow", state);
  const overflowX = getOverflowStylesForProp(props.overflowX, "overflowX", state);
  const overflowY = getOverflowStylesForProp(props.overflowY, "overflowY", state);

  return {
    className: clsx(overflow.className, overflowX.className, overflowY.className),
    style: {},
  };
}

export function getOverflowStyles(
  props: OverflowProps & OverflowStateProps
): StyleResult {
  const { overflow, overflowX, overflowY, _hover, _focus, _active, _disabled } = props;

  const baseStyles = getOverflowStylesForState({ overflow, overflowX, overflowY }, "base");
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
