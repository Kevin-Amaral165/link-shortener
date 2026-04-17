// Lirbaries
import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  top: 100px;
  width: 95% !important;
  margin: 0 auto;

  .ant-modal-content {
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 0;
  };

  .ant-modal-header {
    background-color: #ffffff;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 8px 8px 0 0;
    padding: 16px 20px;
  };

  .ant-modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #1e3a8a;
  };

  .ant-modal-close {
    top: 12px;
    right: 12px;
  };

  .ant-modal-close-x {
    font-size: 16px;
    color: #888;
    transition: color 0.3s, transform 0.3s;

    &:hover {
      color: #333;
      transform: rotate(90deg);
    };
  };

  .ant-modal-body {
    padding: 16px;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
  };

  @media (min-width: 768px) {
    top: 120px;
    width: 70% !important;
    
    .ant-modal-header {
      padding: 20px 24px;
    };

    .ant-modal-title {
      font-size: 22px;
    };

    .ant-modal-close-x {
      font-size: 18px;
    };

    .ant-modal-body {
      padding: 24px;
      font-size: 16px;
      line-height: 1.7;
    };
  };

  @media (min-width: 1200px) {
    max-width: 1200px;
  };
`;