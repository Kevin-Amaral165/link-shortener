// Libraries
import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 16px;
  min-height: 100vh;
  background-color: #f9fafb;

  h1 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1e3a8a;
    text-align: center;
  };

  @media (min-width: 768px) {
    padding: 32px;

    h1 {
      font-size: 28px;
      text-align: left;
    };
  };

  @media (min-width: 1200px) {
    padding: 48px;

    h1 {
      font-size: 32px;
    };
  };
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;

  input {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
    transition: all 0.2s;

    &:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
      outline: none;
    };
  };

  button {
    padding: 10px;
    font-size: 14px;
    background-color: #1e3a8a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      opacity: 0.9;
    };

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    };
  };

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 12px;

    input {
      flex: 1;
      font-size: 16px;
    };

    button {
      font-size: 16px;
      padding: 12px 20px;
    };
  };
`;

export const Message = styled.p<{ type?: "error" | "success" }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ type }) => (type === "success" ? "green" : "red")};
  margin-bottom: 12px;

  @media (min-width: 768px) {
    font-size: 16px;
  };
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 16px;

  .ant-table {
    min-width: 600px;
  };

  @media (min-width: 768px) {
    margin-top: 24px;
    .ant-table {
      min-width: auto;
    };
  };
`;

export const StatsModalContent = styled.div`
  p {
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  };

  hr {
    margin: 12px 0;
    border: none;
    border-top: 1px solid #ddd;
  };

  h4 {
    font-size: 16px;
    margin-bottom: 8px;
    color: #1e3a8a;
  };

  div {
    font-size: 14px;
    margin-bottom: 4px;
  };

  @media (min-width: 768px) {
    p, div {
      font-size: 16px;
    };

    h4 {
      font-size: 18px;
    };
  };
`;

/* Header da dashboard */
export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 22px;
    font-weight: 600;
    color: #1e3a8a;
    margin: 0;
  };

  button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #ef4444;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      opacity: 0.9;
    };

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    };
  };

  @media (min-width: 768px) {
    h1 {
      font-size: 28px;
    };
    button {
      font-size: 16px;
      padding: 10px 20px;
    };
  };
`;