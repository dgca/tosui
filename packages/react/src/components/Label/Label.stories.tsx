import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Label, VStack } from "@/index";

const meta = {
  title: "Components/Label",
  id: "components-label",
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <VStack gap={1} align="stretch">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </VStack>
  ),
};
