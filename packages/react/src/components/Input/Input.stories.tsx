import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/index";

const meta = {
  title: "Components/Input",
  id: "components-input",
  component: Input,
  args: { placeholder: "Enter your name" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
