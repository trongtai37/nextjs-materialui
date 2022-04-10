import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import * as React from 'react';
import { Column, usePagination, useSortBy, useTable } from 'react-table';

const MaterialTable = () => {
  return (
    <>
      <EnhancedTable />
    </>
  );
};

export default MaterialTable;

interface Data {
  col1: string;
  col2: string;
}

const EnhancedTable = () => {
  const data = React.useMemo<Data[]>(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    [],
  );
  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  );

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {column.render('Header')}
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell {...cell.getCellProps()} key={cellIndex}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data.length}
              page={pageIndex}
              rowsPerPage={pageSize}
              onPageChange={(_e, page) => gotoPage(page)}
              onRowsPerPageChange={(event) =>
                setPageSize(Number(event.target.value))
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
