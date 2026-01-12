import {
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./interactions.module.css";
import clsx from "clsx";

export type CursorValue =
  | "auto"
  | "default"
  | "pointer"
  | "wait"
  | "text"
  | "move"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "zoom-in"
  | "zoom-out"
  | "crosshair";

export type PointerEventsValue = "auto" | "none" | "all";

export type UserSelectValue = "auto" | "none" | "text" | "all";

export type InteractionProps = {
  cursor?: CursorValue;
  pointerEvents?: PointerEventsValue;
  userSelect?: UserSelectValue;
};

export type InteractionStateProps = {
  _hover?: InteractionProps;
};

function getCursorClass(value: CursorValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`cursor-${value}${stateClassSuffix}`]
    : styles[`cursor-${value}`];
}

function getPointerEventsClass(value: PointerEventsValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`pointer-${value}${stateClassSuffix}`]
    : styles[`pointer-${value}`];
}

function getUserSelectClass(value: UserSelectValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`select-${value}${stateClassSuffix}`]
    : styles[`select-${value}`];
}

function getInteractionStylesForState(
  props: InteractionProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const classes: string[] = [];

  if (props.cursor) {
    const cls = getCursorClass(props.cursor, state);
    if (cls) classes.push(cls);
  }

  if (props.pointerEvents) {
    const cls = getPointerEventsClass(props.pointerEvents, state);
    if (cls) classes.push(cls);
  }

  if (props.userSelect) {
    const cls = getUserSelectClass(props.userSelect, state);
    if (cls) classes.push(cls);
  }

  return { className: clsx(...classes), style: {} };
}

export function getInteractionStyles(
  props: InteractionProps & InteractionStateProps
): StyleResult {
  const { cursor, pointerEvents, userSelect, _hover } = props;

  const baseStyles = getInteractionStylesForState({ cursor, pointerEvents, userSelect }, "base");
  const hoverStyles = getInteractionStylesForState(_hover, "hover");

  return {
    className: clsx(baseStyles.className, hoverStyles.className),
    style: {},
  };
}
