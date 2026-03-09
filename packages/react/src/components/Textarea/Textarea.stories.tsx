import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@/index";

const meta = {
  title: "Components/Textarea",
  id: "components-textarea",
  component: Textarea,
  args: { placeholder: "Enter your message" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
