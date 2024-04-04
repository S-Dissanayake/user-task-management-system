import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../../components/iconify/Iconify';

import TableNoData from '../table-no-data';
import TableRow from '../table-row';
import TableHead from '../table-head';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows } from '../utils';

// ----------------------------------------------------------------------

const Dashboard = () => {

  const dummy_taskList = [
    {
      id: '123',
      taskTitle : "go to bed",
      priority : "High",
      status: 'active'
    },
    {
      id: '2',
      taskTitle : "Reding a Book",
      priority : "Low",
      status: 'active'
    }
  ];

  const [taskList, setTaskList] = useState(dummy_taskList);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const notFound = (taskList.length === 0) ? true : false;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={4}>
        <Typography variant="h4">Task List</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Task
        </Button>
      </Stack>

      <Card>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead
                headLabel={[
                  { id: 'taskTitle', label: 'Task Title' },
                  { id: 'priority', label: 'Priority', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {taskList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      taskTitle={row.taskTitle}
                      status={row.status}
                      priority={row.priority}
                      selected={selected.indexOf(row.taskTitle) !== -1}
                      handleClick={(event) => handleClick(event, row.taskTitle)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, taskList.length)}
                />

                {notFound && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={taskList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

export default Dashboard;
