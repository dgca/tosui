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
      <AccordionItem title="Section 1">Content for section 1</AccordionItem>
      <AccordionItem title="Section 2">Content for section 2</AccordionItem>
      <AccordionItem title="Section 3">Content for section 3</AccordionItem>
    </Accordion>
  ),
};
