import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, HStack } from "@/index";

const meta = {
  title: "Components/HStack",
  id: "components-hstack",
  component: HStack,
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <HStack gap={4}>
      <Box p={4} bg="primary-subtle">Item 1</Box>
      <Box p={4} bg="accent-subtle">Item 2</Box>
      <Box p={4} bg="success-subtle">Item 3</Box>
    </HStack>
  ),
};
