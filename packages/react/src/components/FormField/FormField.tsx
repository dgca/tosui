import { type ReactElement, useId } from "react";
import { Box } from "@/components/Box/Box";
import { Label } from "@/components/Label/Label";
import { VStack } from "@/components/VStack/VStack";
import {
  FormFieldContext,
  type FormFieldControlProps,
} from "./FormFieldContext";

// ============================================================================
// Types
// ============================================================================

export type FormFieldProps = {
  /** Label text displayed above the control */
  label: string;
  /** Helper text displayed below the control (hidden when isInvalid) */
  helperText?: string;
  /** Error message displayed when isInvalid (replaces helperText) */
  errorMessage?: string;
  /** Whether the field is required (shows asterisk) */
  isRequired?: boolean;
  /** Whether the field is in an invalid state */
  isInvalid?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Custom ID for the field (auto-generated if not provided) */
  id?: string;
  /** A Tosui control, or an adapter function for a native/custom control */
  children:
    | ReactElement
    | ((controlProps: FormFieldControlProps) => ReactElement);
};

// ============================================================================
// Component
// ============================================================================

/**
 * FormField - Form field wrapper component
 *
 * A composition component that provides:
 * - Label with required indicator
 * - Helper text for descriptions
 * - Error message for validation
 * - State propagation to Tosui controls through context
 * - A render adapter for native and custom controls
 * - Accessible aria-describedby linking
 */
export function FormField({
  label,
  helperText,
  errorMessage,
  isRequired = false,
  isInvalid = false,
  disabled = false,
  id: providedId,
  children,
}: FormFieldProps) {
  // Generate ID for accessibility linking
  const generatedId = useId();
  const fieldId = providedId || generatedId;
  const helperId = `${fieldId}-helper`;

  // Determine which message to show
  const showError = isInvalid && errorMessage;
  const message = showError ? errorMessage : helperText;
  const hasMessage = Boolean(message);

  const controlProps: FormFieldControlProps = {
    id: fieldId,
    disabled: disabled || undefined,
    required: isRequired || undefined,
    "aria-describedby": hasMessage ? helperId : undefined,
    "aria-invalid": isInvalid || undefined,
  };

  return (
    <FormFieldContext.Provider value={{ ...controlProps, isInvalid }}>
      <VStack gap={1} align="stretch">
        {/* Label */}
        <Label htmlFor={fieldId} required={isRequired} mb={0}>
          {label}
        </Label>

        {/* Form control */}
        {typeof children === "function" ? children(controlProps) : children}

        {/* Helper text or error message */}
        {hasMessage && (
          <Box
            as="span"
            id={helperId}
            fontSize="sm"
            color={showError ? "error" : "foreground-muted"}
          >
            {message}
          </Box>
        )}
      </VStack>
    </FormFieldContext.Provider>
  );
}
