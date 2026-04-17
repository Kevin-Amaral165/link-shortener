// Libraries
import type { ReactNode, MouseEventHandler } from "react";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "primary" | "default" | "dashed" | "text" | "link";
}