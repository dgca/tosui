import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Tooltip } from "@/index";

const meta = {
  title: "Components/Tooltip",
  id: "components-tooltip",
  component: Tooltip,
  args: {
    label: "This is a tooltip",
    children: undefined,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tooltip label="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
