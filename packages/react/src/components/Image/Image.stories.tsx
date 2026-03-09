import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "@/index";

const meta = {
  title: "Components/Image",
  id: "components-image",
  component: Image,
  args: {
    src: "https://picsum.photos/300/200",
    alt: "Sample image",
    w: "300px",
    h: "200px",
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
