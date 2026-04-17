// Libraries
import styled from "styled-components";
import { Alert } from "antd";

export const StyledAlert = styled(Alert)<{ type?: "error" | "success" | "warning" | "info" }>`
  margin: 16px 0;
  border-radius: 8px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin: 12px 0;
  };

  .ant-alert-message {
    font-weight: 600;
  };

  .ant-alert-description {
    margin-top: 4px;
    color: ${({ type }) => {
      switch (type) {
        case "success":
          return "#237804";
        case "warning":
          return "#ad8b00";
        case "info":
          return "#096dd9";
        default:
          return "#a8071a";
      };
    }};
  };
`;