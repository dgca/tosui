import { type ReactNode, useId, cloneElement, isValidElement, Children } from "react";
import { Box } from "@/components/Box/Box";
import { Label } from "@/components/Label/Label";
import { VStack } from "@/components/VStack/VStack";

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
  /** The form control to render */
  children: ReactNode;
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
 * - State propagation to child controls (isInvalid, disabled)
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

  // Clone child to pass props and aria attributes
  const enhancedChild = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cloneElement(child as React.ReactElement<any>, {
      id: fieldId,
      isInvalid,
      disabled,
      "aria-describedby": hasMessage ? helperId : undefined,
      "aria-invalid": isInvalid || undefined,
    });
  });

  return (
    <VStack gap={1} align="stretch">
      {/* Label */}
      <Label htmlFor={fieldId} required={isRequired}>
        {label}
      </Label>

      {/* Form control */}
      {enhancedChild}

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
  );
}
