import type { Meta, StoryObj } from "@storybook/react-vite";

import { HStack } from "../HStack";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Click me",
    variant: "solid",
    size: "md",
    colorScheme: "primary",
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["solid", "outline", "ghost"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "accent", "success", "warning", "error", "info"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Variants: Story = {
  render: (args) => (
    <HStack gap={4}>
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </HStack>
  ),
  args: {
    children: undefined,
  },
};

export const States: Story = {
  render: (args) => (
    <HStack gap={4}>
      <Button {...args}>Normal</Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
    </HStack>
  ),
  args: {
    children: undefined,
  },
};
