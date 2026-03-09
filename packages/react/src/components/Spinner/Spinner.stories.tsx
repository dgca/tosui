import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@/index";

const meta = {
  title: "Components/Spinner",
  id: "components-spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
