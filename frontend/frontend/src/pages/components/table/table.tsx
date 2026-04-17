// Types
import type { TableCustomProps } from './table.types.ts';

// Styles
import { StyledTable } from './table.style.ts';

const TableCustom: React.FC<TableCustomProps> = ({
  columns,
  dataSource,
  pagination = { pageSize: 10 },
  rowKey = 'id',
}: TableCustomProps) => {
  return (
    <StyledTable
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      bordered
    />
  );
};

export default TableCustom;