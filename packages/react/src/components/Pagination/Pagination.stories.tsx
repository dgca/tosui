import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "@/index";

const meta = {
  title: "Components/Pagination",
  id: "components-pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(1);
      return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
    };
    return <Demo />;
  },
};
