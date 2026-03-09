import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, Heading, Modal, ModalBody, ModalFooter, ModalHeader } from "@/index";

const meta = {
  title: "Components/Modal",
  id: "components-modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalHeader>
              <Heading fontSize="lg">Modal Title</Heading>
            </ModalHeader>
            <ModalBody>This is the modal content.</ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </ModalFooter>
          </Modal>
        </>
      );
    };
    return <Demo />;
  },
};
