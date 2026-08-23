---
"@tosui/react": minor
---

Prepare the 0.2 release with controlled Accordion state and the following migration notes:

- FormField now accepts one Tosui control or a render function. Adapt native and custom controls with `{(controlProps) => <input {...controlProps} />}` so label, disabled, required, and ARIA state reach the focusable element.
- FormField `isRequired` now applies the native `required` attribute in addition to rendering the required indicator.
- Accordion panels remain mounted while collapsed so transitions can run and local panel state is preserved. Collapsed panels are `aria-hidden` and inert.
- Accordion supports caller-owned state through `index` and `onChange`; continue using `defaultIndex` for uncontrolled state.
- Text now renders a `span` by default, matching its documented interface. Pass `as="div"` to retain the previous runtime element.
- Polymorphic component props and refs are now checked against the selected element. Code that passed element-incompatible props may require correction.
