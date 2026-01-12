import {
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./text.module.css";
import clsx from "clsx";

export type TextAlignValue = "left" | "center" | "right" | "justify";
export type WhiteSpaceValue = "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
export type TextDecorationValue = "none" | "underline" | "line-through";

export type TextStyleProps = {
  textAlign?: TextAlignValue;
  whiteSpace?: WhiteSpaceValue;
  textDecoration?: TextDecorationValue;
};

export type TextStyleStateProps = {
  _hover?: TextStyleProps;
};

function getTextAlignClass(value: TextAlignValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`text-${value}${stateClassSuffix}`]
    : styles[`text-${value}`];
}

function getWhiteSpaceClass(value: WhiteSpaceValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`whitespace-${value}${stateClassSuffix}`]
    : styles[`whitespace-${value}`];
}

function getTextDecorationClass(value: TextDecorationValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`decoration-${value}${stateClassSuffix}`]
    : styles[`decoration-${value}`];
}

function getTextStylesForState(
  props: TextStyleProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const classes: string[] = [];

  if (props.textAlign) {
    const cls = getTextAlignClass(props.textAlign, state);
    if (cls) classes.push(cls);
  }

  if (props.whiteSpace) {
    const cls = getWhiteSpaceClass(props.whiteSpace, state);
    if (cls) classes.push(cls);
  }

  if (props.textDecoration) {
    const cls = getTextDecorationClass(props.textDecoration, state);
    if (cls) classes.push(cls);
  }

  return { className: clsx(...classes), style: {} };
}

export function getTextStyles(
  props: TextStyleProps & TextStyleStateProps
): StyleResult {
  const { textAlign, whiteSpace, textDecoration, _hover } = props;

  const baseStyles = getTextStylesForState({ textAlign, whiteSpace, textDecoration }, "base");
  const hoverStyles = getTextStylesForState(_hover, "hover");

  return {
    className: clsx(baseStyles.className, hoverStyles.className),
    style: {},
  };
}
