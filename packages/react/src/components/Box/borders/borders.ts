import {
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./borders.module.css";
import clsx from "clsx";

export type BorderWidthValue = "none" | "thin" | "medium" | "thick";
export type BorderStyleValue = "none" | "solid" | "dashed" | "dotted";

export type BorderProps = {
  border?: BorderWidthValue;
  borderX?: BorderWidthValue;
  borderY?: BorderWidthValue;
  borderTop?: BorderWidthValue;
  borderRight?: BorderWidthValue;
  borderBottom?: BorderWidthValue;
  borderLeft?: BorderWidthValue;
  borderStyle?: BorderStyleValue;
};

export type BorderStateProps = {
  _hover?: BorderProps;
};

function getBorderTopClass(value: BorderWidthValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`border-top-${value}${stateClassSuffix}`]
    : styles[`border-top-${value}`];
}

function getBorderRightClass(value: BorderWidthValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`border-right-${value}${stateClassSuffix}`]
    : styles[`border-right-${value}`];
}

function getBorderBottomClass(value: BorderWidthValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`border-bottom-${value}${stateClassSuffix}`]
    : styles[`border-bottom-${value}`];
}

function getBorderLeftClass(value: BorderWidthValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`border-left-${value}${stateClassSuffix}`]
    : styles[`border-left-${value}`];
}

function getBorderStyleClass(value: BorderStyleValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`border-style-${value}${stateClassSuffix}`]
    : styles[`border-style-${value}`];
}

function getBorderStylesForState(
  props: BorderProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const {
    border,
    borderX,
    borderY,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderStyle,
  } = props;

  const classes: string[] = [];

  // Cascading specificity: individual > axis > all
  const topWidth = borderTop ?? borderY ?? border;
  const rightWidth = borderRight ?? borderX ?? border;
  const bottomWidth = borderBottom ?? borderY ?? border;
  const leftWidth = borderLeft ?? borderX ?? border;

  if (topWidth) {
    const cls = getBorderTopClass(topWidth, state);
    if (cls) classes.push(cls);
  }

  if (rightWidth) {
    const cls = getBorderRightClass(rightWidth, state);
    if (cls) classes.push(cls);
  }

  if (bottomWidth) {
    const cls = getBorderBottomClass(bottomWidth, state);
    if (cls) classes.push(cls);
  }

  if (leftWidth) {
    const cls = getBorderLeftClass(leftWidth, state);
    if (cls) classes.push(cls);
  }

  // Apply borderStyle, default to solid if any width is set
  if (borderStyle) {
    const cls = getBorderStyleClass(borderStyle, state);
    if (cls) classes.push(cls);
  } else if (topWidth || rightWidth || bottomWidth || leftWidth) {
    const cls = getBorderStyleClass("solid", state);
    if (cls) classes.push(cls);
  }

  return { className: clsx(...classes), style: {} };
}

export function getBorderStyles(
  props: BorderProps & BorderStateProps
): StyleResult {
  const {
    border,
    borderX,
    borderY,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderStyle,
    _hover,
  } = props;

  const baseStyles = getBorderStylesForState(
    { border, borderX, borderY, borderTop, borderRight, borderBottom, borderLeft, borderStyle },
    "base"
  );
  const hoverStyles = getBorderStylesForState(_hover, "hover");

  return {
    className: clsx(baseStyles.className, hoverStyles.className),
    style: {},
  };
}
