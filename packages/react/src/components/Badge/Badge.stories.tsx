import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/index";

const meta = {
  title: "Components/Badge",
  id: "components-badge",
  component: Badge,
  args: { children: "Default" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
