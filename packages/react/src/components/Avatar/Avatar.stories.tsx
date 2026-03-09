import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@/index";

const meta = {
  title: "Components/Avatar",
  id: "components-avatar",
  component: Avatar,
  args: { src: "https://i.pravatar.cc/150?img=1", name: "John Doe" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
