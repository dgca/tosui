import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, VStack } from "@/index";

const meta = {
  title: "Components/VStack",
  id: "components-vstack",
  component: VStack,
} satisfies Meta<typeof VStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <VStack gap={4}>
      <Box p={4} bg="primary-subtle">Item 1</Box>
      <Box p={4} bg="accent-subtle">Item 2</Box>
      <Box p={4} bg="success-subtle">Item 3</Box>
    </VStack>
  ),
};
