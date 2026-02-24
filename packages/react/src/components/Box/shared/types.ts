import type { STATE_CLASS_SUFFIXES } from "./constants";

export type StateKey = keyof typeof STATE_CLASS_SUFFIXES;

// Both fields are required for type safety.
// Files that don't need style should return style: {}
export type StyleResult = {
  className: string;
  style: Record<string, string>;
};

export type StateProps<T> = {
  _hover?: T;
  _focus?: T;
  _active?: T;
  _disabled?: T;
};
