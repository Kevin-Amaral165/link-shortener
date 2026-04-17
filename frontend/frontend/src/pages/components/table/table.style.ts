// Libraries
import styled from 'styled-components';
import { Table } from 'antd';

export const StyledTable = styled(Table)`
  width: 100%;
  .ant-table {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 12px;
  };

  .ant-table-thead > tr > th {
    background-color: #f0f2f5;
    color: #1e3a8a;
    font-weight: 600;
    font-size: 14px;
    padding: 8px;
  };

  .ant-table-tbody > tr > td {
    padding: 8px;
    font-size: 12px;
    color: #333;
  };

  .ant-pagination {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
  };

  @media (min-width: 768px) {
    .ant-table {
      font-size: 14px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    };

    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 12px;
      font-size: 14px;
    };

    .ant-pagination {
      margin-top: 16px;
      font-size: 14px;
    };
  };

  @media (min-width: 1200px) {
    .ant-table-thead > tr > th {
      font-size: 16px;
    };

    .ant-table-tbody > tr > td {
      font-size: 14px;
    };

    .ant-pagination {
      font-size: 14px;
    };
  };
`;