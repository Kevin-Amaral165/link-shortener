// Libraries
import styled from "styled-components";
import { Button as AntButton } from "antd";

export const StyledButton = styled(AntButton)`
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
    width: auto;
  }

  @media (min-width: 1024px) {
    padding: 12px 24px;
    font-size: 18px;
  }
`;