import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "@/index";

const meta = {
  title: "Components/Link",
  id: "components-link",
  component: Link,
  args: { href: "#", children: "Documentation" },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
