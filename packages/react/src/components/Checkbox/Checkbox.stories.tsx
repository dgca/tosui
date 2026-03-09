import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@/index";

const meta = {
  title: "Components/Checkbox",
  id: "components-checkbox",
  component: Checkbox,
  args: { label: "Accept terms and conditions" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
