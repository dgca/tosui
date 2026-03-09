import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Stack } from "@/index";

const meta = {
  title: "Components/Stack",
  id: "components-stack",
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Stack gap={4}>
      <Box p={4} bg="primary-subtle">Item 1</Box>
      <Box p={4} bg="accent-subtle">Item 2</Box>
      <Box p={4} bg="success-subtle">Item 3</Box>
    </Stack>
  ),
};
