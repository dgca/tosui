import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, Input } from "@/index";

const meta = {
  title: "Components/FormField",
  id: "components-form-field",
  component: FormField,
  args: {
    label: "Email",
    children: undefined,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <FormField label="Email">
      <Input type="email" placeholder="you@example.com" />
    </FormField>
  ),
};
