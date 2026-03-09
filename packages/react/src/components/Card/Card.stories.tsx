import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardBody } from "@/index";

const meta = {
  title: "Components/Card",
  id: "components-card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card>
      <CardBody>This is the card content.</CardBody>
    </Card>
  ),
};
