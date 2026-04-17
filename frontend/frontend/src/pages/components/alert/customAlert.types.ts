export interface CustomAlertProps {
  message?: string;
  onClose?: () => void;
  type?: "error" | "success" | "warning" | "info";
  visible?: boolean;
}