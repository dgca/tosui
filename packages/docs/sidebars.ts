import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  guideSidebar: [
    "introduction",
    "get-started",
    {
      type: "category",
      label: "Styling",
      items: [
        "guide/spacing",
        "guide/colors",
        "guide/responsive",
        "guide/state-styling",
        "guide/component-patterns",
        "guide/customization",
      ],
    },
  ],
  componentsSidebar: [
    {
      type: "category",
      label: "Primitives",
      items: ["components/box", "components/text", "components/heading"],
    },
    {
      type: "category",
      label: "Layout",
      items: [
        "components/stack",
        "components/hstack",
        "components/vstack",
        "components/flex",
        "components/grid",
        "components/container",
        "components/divider",
        "components/spacer",
      ],
    },
    {
      type: "category",
      label: "Forms",
      items: [
        "components/input",
        "components/select",
        "components/textarea",
        "components/checkbox",
        "components/radio",
        "components/switch",
        "components/form-field",
        "components/label",
      ],
    },
    {
      type: "category",
      label: "Buttons",
      items: ["components/button", "components/icon-button"],
    },
    {
      type: "category",
      label: "Navigation",
      items: [
        "components/link",
        "components/tabs",
        "components/breadcrumb",
        "components/menu",
        "components/pagination",
      ],
    },
    {
      type: "category",
      label: "Feedback",
      items: [
        "components/alert",
        "components/badge",
        "components/progress",
        "components/skeleton",
        "components/spinner",
      ],
    },
    {
      type: "category",
      label: "Data Display",
      items: [
        "components/avatar",
        "components/card",
        "components/image",
        "components/list",
        "components/code",
      ],
    },
    {
      type: "category",
      label: "Overlays",
      items: [
        "components/modal",
        "components/tooltip",
        "components/popover",
        "components/accordion",
      ],
    },
  ],
};

export default sidebars;
