import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Grid } from "@/index";

const meta = {
  title: "Components/Grid",
  id: "components-grid",
  component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Grid columns="repeat(3, 1fr)" gap={4}>
      <Box p={4} bg="primary-subtle">Item 1</Box>
      <Box p={4} bg="accent-subtle">Item 2</Box>
      <Box p={4} bg="success-subtle">Item 3</Box>
      <Box p={4} bg="warning-subtle">Item 4</Box>
      <Box p={4} bg="error-subtle">Item 5</Box>
      <Box p={4} bg="info-subtle">Item 6</Box>
    </Grid>
  ),
};
