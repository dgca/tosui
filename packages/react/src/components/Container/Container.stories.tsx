import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Container } from "@/index";

const meta = {
  title: "Components/Container",
  id: "components-container",
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Container>
      <Box p={4} bg="surface" border="thin" borderColor="border">
        Content constrained to max-width (default: lg = 1024px)
      </Box>
    </Container>
  ),
};
