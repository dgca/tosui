import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionItem } from "@/index";

const meta = {
  title: "Components/Accordion",
  id: "components-accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Accordion>
      <AccordionItem index={0} title="Section 1">Content for section 1</AccordionItem>
      <AccordionItem index={1} title="Section 2">Content for section 2</AccordionItem>
      <AccordionItem index={2} title="Section 3">Content for section 3</AccordionItem>
    </Accordion>
  ),
};
