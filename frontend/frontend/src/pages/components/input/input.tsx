// Libraries
import type { JSX } from "react/jsx-dev-runtime";

// Styles
import { InputWrapper, StyledInput, StyledLabel } from "./input.style.ts";

// Types
import type { InputProps } from "./input.types.ts";

export function Input({
  className,
  disabled = false,
  id,
  label,
  placeholder,
  readOnly = false,
  size = "middle",
  ...props
}: InputProps): JSX.Element {
  return (
    <InputWrapper className={className}>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput
        id={id}
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    </InputWrapper>
  );
}