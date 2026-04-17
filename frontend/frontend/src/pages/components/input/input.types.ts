// Libraries
import type { InputProps as AntInputProps } from "antd";

export interface InputProps extends AntInputProps {
  className?: string;
  disabled?: boolean;
  id: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  size?: "small" | "middle" | "large";
}