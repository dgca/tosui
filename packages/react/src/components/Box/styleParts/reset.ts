import { css } from "@linaria/core";

export const resetStyles = css`
  &,
  &::before,
  &::after {
    box-sizing: border-box;
  }

  border: 0;
  background: none;
  color: inherit;
  appearance: none;
  text-decoration: none;
  font-family: var(--tosui-font-family-body);
  font-size: var(--tosui-font-size-md);
  font-weight: var(--tosui-font-weight-normal);
  line-height: var(--tosui-line-height-normal);
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
