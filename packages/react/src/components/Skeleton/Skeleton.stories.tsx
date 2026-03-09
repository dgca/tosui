import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@/index";

const meta = {
  title: "Components/Skeleton",
  id: "components-skeleton",
  component: Skeleton,
  args: { w: "200px", h: "20px" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
