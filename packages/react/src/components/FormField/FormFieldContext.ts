import {
  type AriaAttributes,
  createContext,
  useContext,
} from "react";

export type FormFieldControlProps = {
  id: string;
  disabled?: boolean;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
};

type FormFieldContextValue = FormFieldControlProps & {
  isInvalid: boolean;
};

type OwnControlProps = {
  id?: string;
  disabled?: boolean;
  required?: boolean;
  isInvalid?: boolean;
  ariaDescribedBy?: string;
  ariaInvalid?: AriaAttributes["aria-invalid"];
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function mergeIds(...values: Array<string | undefined>) {
  const ids = new Set(
    values
      .flatMap((value) => value?.split(/\s+/) ?? [])
      .filter((id) => id.length > 0)
  );
  return ids.size > 0 ? Array.from(ids).join(" ") : undefined;
}

export function useFormFieldControl(props: OwnControlProps) {
  const field = useContext(FormFieldContext);
  const isInvalid = Boolean(props.isInvalid || field?.isInvalid);

  return {
    id: field?.id ?? props.id,
    disabled: Boolean(props.disabled || field?.disabled),
    required: Boolean(props.required || field?.required),
    isInvalid,
    ariaDescribedBy: mergeIds(
      props.ariaDescribedBy,
      field?.["aria-describedby"]
    ),
    ariaInvalid: field?.isInvalid
      ? true
      : (props.ariaInvalid ?? (isInvalid || undefined)),
  };
}

export { FormFieldContext };
