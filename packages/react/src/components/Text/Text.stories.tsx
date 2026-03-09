import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "@/index";

const meta = {
  title: "Components/Text",
  id: "components-text",
  component: Text,
  args: { children: "Default text content" },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
