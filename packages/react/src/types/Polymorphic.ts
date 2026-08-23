import { type ComponentPropsWithRef, type ElementType } from "react";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

/**
 * Polymorphic component type helper
 *
 * Enables components to render as different HTML elements via the `as` prop
 * while maintaining proper TypeScript types for the target element.
 *
 * @template T - The element type (defaults to "div")
 * @template P - Additional props specific to the component
 *
 * @example
 * type BoxProps<T extends ElementType = "div"> = Polymorphic<T, {
 *   p?: number;
 *   m?: number;
 * }>;
 *
 * // Usage:
 * <Box as="button" onClick={...} p={4} /> // ✓ TypeScript knows about onClick
 * <Box as="a" href="..." p={4} />          // ✓ TypeScript knows about href
 */
export type Polymorphic<
  T extends ElementType = "div",
  P = object
> = {
  as?: T;
} & P &
  DistributiveOmit<ComponentPropsWithRef<T>, keyof P | "as">;
