import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@/index";

const meta = {
  title: "Components/Select",
  id: "components-select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Select>
      <option value="">Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
};
