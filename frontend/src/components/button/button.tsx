// Libraries
import type { JSX } from "react/jsx-dev-runtime";

// Styles
import { StyledButton } from "./button.style.ts";

// Types
import type { ButtonProps } from "./button.types.ts";

export function Button({
  children,
  className,
  disabled = false,
  htmlType = "button",
  loading = false,
  onClick,
  type = "default",
}: ButtonProps): JSX.Element {
  return (
    <StyledButton
      className={className}
      disabled={disabled}
      htmlType={htmlType}
      loading={loading}
      onClick={onClick}
      type={type}
    >
      {children}
    </StyledButton>
  );
}