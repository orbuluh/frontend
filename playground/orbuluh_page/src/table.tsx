import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";

const CustomTextFilter = ({ column, setFilter }) => {
  const { filterValue, setFilterValue } = column;

  return (
    <input
      type="text"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined);
        setFilterValue(e.target.value);
      }}
      placeholder={`Filter ${column.Header}`}
    />
  );
};


const Table = ({ data }) => {
  // Define table columns
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Age", accessor: "age" },
      { Header: "Location", accessor: "location" },
    ], []
  );

  // We then create an instance of the table using the useTable hook from
  // React-Table. This hook returns various properties and methods that we can
  // use to render the table structure. We destructure the required properties
  // and methods, such as:
  // getTableProps, getTableBodyProps, headerGroups, rows, and prepareRow.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy);

  // In the JSX code, we use these properties and methods to render the table
  // structure. We iterate over the headerGroups array to render the table
  // header row and iterate over the rows array to render the table body rows.
  // Within each row, we iterate over the cells array to render each cell's
  // content.
  return (
    <div>
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()}>
                <span {...column.getSortByToggleProps()}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
                <div>
                  {column.canFilter ? (
                    <column.Filter
                      column={column}
                      preFilteredRows={rows}
                      setFilter={column.setFilter}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <table {...getTableProps()}>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );


  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '🧙'}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );


  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
                {/* Add filter input */}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
