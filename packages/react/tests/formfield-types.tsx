import { FormField, Input } from "../src";

const directControl = (
  <FormField label="Name">
    <Input />
  </FormField>
);

const adaptedControl = (
  <FormField label="Name">
    {(controlProps) => <input {...controlProps} />}
  </FormField>
);

const multipleControls = (
  // @ts-expect-error FormField represents one semantic form control.
  <FormField label="Names">
    <Input />
    <Input />
  </FormField>
);

void directControl;
void adaptedControl;
void multipleControls;
