import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "@/index";

const meta = {
  title: "Components/Alert",
  id: "components-alert",
  component: Alert,
  args: { children: "This is an informational message." },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
