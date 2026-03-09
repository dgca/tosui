import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Divider, VStack } from "@/index";

const meta = {
  title: "Components/Divider",
  id: "components-divider",
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <VStack gap={4}>
      <Box>Content above</Box>
      <Divider />
      <Box>Content below</Box>
    </VStack>
  ),
};
