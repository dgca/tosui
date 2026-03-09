import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu, MenuButton, MenuItem, MenuList } from "@/index";

const meta = {
  title: "Components/Menu",
  id: "components-menu",
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem onClick={() => undefined}>Edit</MenuItem>
        <MenuItem onClick={() => undefined}>Duplicate</MenuItem>
        <MenuItem onClick={() => undefined}>Delete</MenuItem>
      </MenuList>
    </Menu>
  ),
};
