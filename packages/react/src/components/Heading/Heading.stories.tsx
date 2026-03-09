import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "@/index";

const meta = {
  title: "Components/Heading",
  id: "components-heading",
  component: Heading,
  args: { children: "Default h1 heading" },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
