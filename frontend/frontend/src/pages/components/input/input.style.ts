// Libraries
import { Input as AntInput } from "antd";
import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  };
`;

export const StyledLabel = styled.label.attrs<{ htmlFor: string }>(props => ({
  htmlFor: props.htmlFor,
}))`
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 14px;
  color: #333;

  @media (min-width: 768px) {
    font-size: 16px;
  };
`;

export const StyledInput = styled(AntInput)<{ size?: "small" | "middle" | "large" }>`
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 14px;
  transition: border 0.2s, box-shadow 0.2s;
  width: 100%;

  &:hover {
    border-color: #888;
  };

  &:focus-visible {
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  };

  &:disabled {
    background: #f5f5f5;
    color: #aaa;
  };

  @media (min-width: 768px) {
    padding: 10px 14px;
    font-size: 16px; 
  };

  @media (min-width: 1200px) {
    padding: 12px 16px;
    font-size: 18px;
  };
`;