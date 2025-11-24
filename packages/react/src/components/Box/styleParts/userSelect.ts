import { css } from "@linaria/core";

const USER_SELECT = {
  none: css`
    user-select: none;
  `,
  auto: css`
    user-select: auto;
  `,
  text: css`
    user-select: text;
  `,
  all: css`
    user-select: all;
  `,
} as const;

export type UserSelect = keyof typeof USER_SELECT;

export type UserSelectProps = {
  userSelect?: UserSelect;
};

export function getUserSelect(userSelect?: UserSelect) {
  if (!userSelect) return "";
  return USER_SELECT[userSelect];
}
