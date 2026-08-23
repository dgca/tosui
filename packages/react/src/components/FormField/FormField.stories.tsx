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

export const NativeControl: Story = {
  render: () => (
    <FormField
      label="Email"
      helperText="We'll only use this for account notifications"
      isRequired
    >
      {(controlProps) => (
        <input
          type="email"
          placeholder="you@example.com"
          {...controlProps}
        />
      )}
    </FormField>
  ),
};
