import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@/index";

const meta = {
  title: "Components/Box",
  id: "components-box",
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Box p={4} bg="surface" rounded="md">
      Content goes here
    </Box>
  ),
};
