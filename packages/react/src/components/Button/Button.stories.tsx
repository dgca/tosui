import type { Meta, StoryObj } from "@storybook/react-vite";

import { HStack } from "../HStack";
import { VStack } from "../VStack";
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

export const Sizes: Story = {
  render: (args) => (
    <HStack gap={4} align="center">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </HStack>
  ),
  args: {
    children: undefined,
  },
};

export const ColorSchemes: Story = {
  render: (args) => (
    <HStack gap={4} wrap>
      <Button {...args} colorScheme="primary">
        Primary
      </Button>
      <Button {...args} colorScheme="accent">
        Accent
      </Button>
      <Button {...args} colorScheme="success">
        Success
      </Button>
      <Button {...args} colorScheme="warning">
        Warning
      </Button>
      <Button {...args} colorScheme="error">
        Error
      </Button>
      <Button {...args} colorScheme="info">
        Info
      </Button>
    </HStack>
  ),
  args: {
    children: undefined,
  },
};

export const VariantsWithColorSchemes: Story = {
  render: (args) => (
    <VStack gap={4}>
      <HStack gap={4}>
        <Button {...args} variant="solid" colorScheme="success">
          Solid
        </Button>
        <Button {...args} variant="outline" colorScheme="success">
          Outline
        </Button>
        <Button {...args} variant="ghost" colorScheme="success">
          Ghost
        </Button>
      </HStack>
      <HStack gap={4}>
        <Button {...args} variant="solid" colorScheme="error">
          Solid
        </Button>
        <Button {...args} variant="outline" colorScheme="error">
          Outline
        </Button>
        <Button {...args} variant="ghost" colorScheme="error">
          Ghost
        </Button>
      </HStack>
    </VStack>
  ),
  args: {
    children: undefined,
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <HStack gap={4}>
      <Button
        {...args}
        leftIcon={<span aria-hidden="true">↓</span>}
      >
        Download
      </Button>
      <Button
        {...args}
        rightIcon={<span aria-hidden="true">→</span>}
      >
        Continue
      </Button>
      <Button
        {...args}
        leftIcon={<span aria-hidden="true">↓</span>}
        rightIcon={<span aria-hidden="true">→</span>}
      >
        Both Icons
      </Button>
    </HStack>
  ),
  args: {
    children: undefined,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: "320px" }}>
      <Button {...args} fullWidth>
        Full Width Button
      </Button>
    </div>
  ),
  args: {
    children: undefined,
  },
};

export const AsLink: Story = {
  render: (args) => (
    <Button {...args} as="a" href="#button-link-example">
      Sign Up
    </Button>
  ),
  args: {
    children: undefined,
  },
};
