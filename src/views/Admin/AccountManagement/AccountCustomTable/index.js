import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
  Checkbox
} from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import _get from 'lodash/get'
import { Button } from '@material-ui/core'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import EnhancedTableHead from './EnhancedTableHead'

function createData(username, role, createBy, createAt, protein) {
  return { username, role, createBy, createAt, protein };
}

const headCells = [
  { id: 'user_name', numeric: false, disablePadding: true, label: 'Tên tài khoản' },
  { id: 'role', numeric: true, disablePadding: false, label: 'Vai trò' },
  { id: 'create_by', numeric: true, disablePadding: false, label: 'Người tạo' },
  { id: 'create_at', numeric: true, disablePadding: false, label: 'Ngày tạo' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
];

export default function AccountCustomTable({ accountManagement, fetchListAccount, pageSize, setPageSize }) {
  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [selected, setSelected] = useState([])
  const page = _get(accountManagement, "number", 0)
  const total = _get(accountManagement, "totalElements", 0)
  const listAccount = _get(accountManagement, "content", [])
  const rows = listAccount?.map((v) => {
    return createData(v?.userName, v?.role, v?.createBy, v?.createAt, "")
  })

  const [dense, setDense] = React.useState(true)

  const getListAccount = (page, pageSize, asc, sortBy) => {
    fetchListAccount({ page, pageSize, asc, sortBy })
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    getListAccount(newPage, pageSize, order === 'asc' ? true : false, orderBy)
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value)
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  };

  const handleRequestSort = (event, sortBy) => {
    if (sortBy !== 'action') {
      getListAccount(0, pageSize, order === 'asc' ? true : false, sortBy)
      const isAsc = orderBy === sortBy && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(sortBy)
    }
  };

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows = pageSize - Math.min(pageSize, rows.length - page * pageSize)

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={ dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {rows?.map((row, index) => {
                const isItemSelected = isSelected(row.username);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.username}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.username)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">{row.createBy}</TableCell>
                    <TableCell align="right">{row.createAt}</TableCell>
                    <TableCell align="right">
                      <Button variant="text" size="small">
                        <Visibility />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={total}
          rowsPerPage={pageSize}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
