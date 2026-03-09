import type { Meta, StoryObj } from "@storybook/react-vite";
import { List, ListItem } from "@/index";

const meta = {
  title: "Components/List",
  id: "components-list",
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <List>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </List>
  ),
};
