// Libraries
import type { TablePaginationConfig } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface TableRow {
  id: string;
  name: string;
  age: number;
}

export interface TableCustomProps {
  columns: ColumnsType<any>;
  dataSource: any[];
  pagination?: TablePaginationConfig | false;
  rowKey?: string;
}