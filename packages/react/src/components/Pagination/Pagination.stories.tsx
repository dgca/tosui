import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "@/index";

const meta = {
  title: "Components/Pagination",
  id: "components-pagination",
  component: Pagination,
  args: {
    defaultPage: 1,
    totalPages: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Pagination defaultPage={1} totalPages={10} />,
};
