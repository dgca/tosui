export const RESPONSIVE_KEYS = ["base", "sm", "md", "lg", "xl", "2xl"] as const;

export const STATE_SUFFIXES = {
  base: "",
  hover: "-h",
  focus: "-f",
  active: "-a",
  disabled: "-d",
} as const;

export const STATE_CLASS_SUFFIXES = {
  base: "",
  hover: ":h",
  focus: ":f",
  active: ":a",
  disabled: ":d",
} as const;
