import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Flex } from "@/index";

const meta = {
  title: "Components/Flex",
  id: "components-flex",
  component: Flex,
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Flex gap={4}>
      <Box p={4} bg="primary-subtle">Item 1</Box>
      <Box p={4} bg="accent-subtle">Item 2</Box>
      <Box p={4} bg="success-subtle">Item 3</Box>
    </Flex>
  ),
};
