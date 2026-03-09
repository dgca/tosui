import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "@/index";

const meta = {
  title: "Components/IconButton",
  id: "components-icon-button",
  component: IconButton,
  args: {
    icon: <span aria-hidden="true">✎</span>,
    "aria-label": "Edit item",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
