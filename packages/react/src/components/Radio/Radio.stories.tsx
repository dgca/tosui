import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, VStack } from "@/index";

const meta = {
  title: "Components/Radio",
  id: "components-radio",
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <VStack gap={2} align="flex-start">
      <Radio name="fruit" label="Apple" value="apple" />
      <Radio name="fruit" label="Banana" value="banana" />
      <Radio name="fruit" label="Orange" value="orange" />
    </VStack>
  ),
};
