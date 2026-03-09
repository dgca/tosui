import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "@/index";

const meta = {
  title: "Components/Switch",
  id: "components-switch",
  component: Switch,
  args: { label: "Enable notifications" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
