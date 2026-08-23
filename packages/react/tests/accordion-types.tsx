import { useState } from "react";
import { Accordion, AccordionItem } from "../src";

export function ControlledSingleAccordion() {
  const [index, setIndex] = useState<number | null>(0);

  return (
    <Accordion index={index} onChange={setIndex}>
      <AccordionItem title="First">First content</AccordionItem>
    </Accordion>
  );
}

export function ControlledMultipleAccordion() {
  const [indexes, setIndexes] = useState<number[]>([0]);

  return (
    <Accordion allowMultiple index={indexes} onChange={setIndexes}>
      <AccordionItem title="First">First content</AccordionItem>
    </Accordion>
  );
}
