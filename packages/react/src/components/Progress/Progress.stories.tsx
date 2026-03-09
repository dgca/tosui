import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "@/index";

const meta = {
  title: "Components/Progress",
  id: "components-progress",
  component: Progress,
  args: { value: 60 },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
