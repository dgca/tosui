import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, HStack, Spacer } from "@/index";

const meta = {
  title: "Components/Spacer",
  id: "components-spacer",
  component: Spacer,
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <HStack p={4} bg="surface" border="thin" borderColor="border">
      <Box p={2} bg="primary-subtle">Left</Box>
      <Spacer />
      <Box p={2} bg="accent-subtle">Right</Box>
    </HStack>
  ),
};
