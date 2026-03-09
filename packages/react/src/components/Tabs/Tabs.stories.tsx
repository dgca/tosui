import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Tab, TabList, TabPanel, Tabs } from "@/index";

const meta = {
  title: "Components/Tabs",
  id: "components-tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab index={0}>Account</Tab>
        <Tab index={1}>Password</Tab>
        <Tab index={2}>Notifications</Tab>
      </TabList>
      <TabPanel index={0}><Box>Account settings content</Box></TabPanel>
      <TabPanel index={1}><Box>Password settings content</Box></TabPanel>
      <TabPanel index={2}><Box>Notification settings content</Box></TabPanel>
    </Tabs>
  ),
};
