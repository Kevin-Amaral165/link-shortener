// Libraries
import { useEffect } from "react";
import type { JSX } from "react";

// Types
import type { CustomAlertProps } from "./customAlert.types.ts";

// Styles
import { StyledAlert } from "./customAlert.style.ts";

export function CustomAlert({
  message,
  onClose,
  type = "error",
  visible = true,
}: CustomAlertProps): JSX.Element | null {

  useEffect(() => {
    if (!onClose || !visible) return;

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose, visible]);

  if (!message || !visible) return null;

  return (
    <StyledAlert
      message={
        type === "error"
          ? "Erro"
          : type === "success"
          ? "Sucesso"
          : type === "warning"
          ? "Atenção"
          : "Info"
      }
      description={message}
      type={type}
      showIcon
      closable
      onClose={onClose}
    />
  );
}