# TODO

## API follow-ups from the documentation audit

1. Add accessible-name props to `Modal` and `Popover`, and connect each popover to a semantic trigger. These gaps prevent the components from expressing required dialog relationships without workarounds.
2. Preserve an image's accessible text when `Image` displays its terminal error placeholder. The current placeholder replaces the `<img>` and drops its `alt` text.
3. Complete the Tabs interaction model: assign tab and panel indexes automatically, connect them with generated IDs, and add arrow-key navigation. Do not add `TabPanels` by itself. A wrapper is useful only if it supports that complete model.
4. Support `_focus`, `_active`, and `_disabled` grid styles in `Box`. The public state-prop type accepts them, but the grid style resolver currently applies only `_hover`.
5. Export `SpinnerProps`, `SpinnerOwnProps`, and `SpinnerSize` from the package root. The component entry point already exports these types.
6. Make `IconButton` accept native button and Box props, or make it polymorphic like `Button`. Its runtime forwards extra props, but its type excludes common layout and native button attributes.
7. Consider responsive `Text` and `Heading` convenience props. Their Box equivalents are responsive, but `size`, `weight`, `align`, and `color` accept only scalar values.
8. Clarify Grid alignment in the API. `justify` and `justifyContent` currently control the same property, while the source comment describes item alignment. Add an explicit `justifyItems` prop and deprecate a redundant alias instead of changing existing behavior.
