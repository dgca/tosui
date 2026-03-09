import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code, Text } from "@/index";

const meta = {
  title: "Components/Code",
  id: "components-code",
  component: Code,
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Text>
      Run <Code>npm install</Code> to install dependencies.
    </Text>
  ),
};
