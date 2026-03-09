import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Popover, PopoverBody } from "@/index";

const meta = {
  title: "Components/Popover",
  id: "components-popover",
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Popover content={<PopoverBody>This is the popover content.</PopoverBody>}>
      <Button>Click me</Button>
    </Popover>
  ),
};
