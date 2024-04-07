import { useState, useEffect } from 'react';

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
import AlertDialog from '../../../components/alertDialog/AlertDialog';
import Snackbar from '../../../components/snackbar/Snackbar';
import { useRouter } from '../../../routes/hooks';
import TaskFormDialog from '../dialog/TaskFormDialog';

import { http_Request } from '../../../utils/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';

import TableNoData from '../table-no-data';
import TableRow from '../table-row';
import TableHead from '../table-head';
import TableEmptyRows from '../table-empty-rows';

// ----------------------------------------------------------------------

const Dashboard = () => {

  const router = useRouter();

  const [taskList, setTaskList] = useState([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackData, setSnackData]= useState({text: "", variant: ""});
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formDialogViewMode, setFormDialogViewMode] = useState("NEW");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  // effect on dashboard mount
  useEffect(() => {
      fetchTaskListByUserId();
  }, [])  
  
  // fnction for handle action clicks
  const handleActionClick = (actionType, rowData) => {
    setSelected(rowData);
    if (actionType === "EDIT" || actionType === "VIEW") {
      setFormDialogViewMode(actionType);      
      setIsFormDialogOpen(true);
    } else if (actionType === "DELETE") {
      setIsAlertDialogOpen(true);
    }
  };

  // function for handle new task btn click
  const HandleNewTaskOnClick = () => {
    setFormDialogViewMode("NEW");
    setIsFormDialogOpen(true);
  }

  // function for handle page number of table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // function for handle number of rows in one page
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // function to close task form dialog
  const handleCloseFormDIalog = () => {
    setIsFormDialogOpen(false);
    setSelected({});
  }

  // function to close altert dialog
  const handleCloseAlertDIalog = () => {
    setIsAlertDialogOpen(false);
    setSelected({});
  }

  // function for fetch task list for user
  const fetchTaskListByUserId = () => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    http_Request(
      {
        url: API_URL.Task.PUT_TASKS_BY_USER_ID.replace("{userId}", userDetails?.userId),
        method: 'PUT',
      },
      function successCallback (response) {    
        if ( response.data) {
          let taskListFromResponse = response.data;
          let modifiedTaskList = taskListFromResponse?.map && taskListFromResponse.map((singleItem) => {
            return {
              ...(singleItem || {}),
              statusHistory: JSON.parse(singleItem?.statusHistory)
            }
          });
          setTaskList(modifiedTaskList);
        }      
      },
      function errorCallback (error) {
        console.log('error', error)
      }
    )
  }
  
  const handleTaskDelete = () => {
    http_Request(
      {
        url: API_URL.Task.DELETE_TASKS_BY_ID.replace("{taskId}", selected?.taskId),
        method: 'DELETE',
      },
      function successCallback (response) {
        fetchTaskListByUserId();
        setIsAlertDialogOpen(false);    
        setSnackData({ text: "Task deleted successfully", variant: "success" })     
      },
      function errorCallback (error) {
        setSnackData({ text: "Error on task deletion !", variant: "error" })
      }
    )
  }

  const handleSnackReset = () => {
    setSnackData({text: "", variant: ""})
  }

  const emptyRows = (page, rowsPerPage, arrayLength) => {
    return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
  }
  

  return (
    <>
      <Snackbar 
        snackText={snackData.text} 
        snackVariant={snackData.variant} 
        handleReset={()=>handleSnackReset()} 
      />
      <TaskFormDialog
        isFormDialogOpen={isFormDialogOpen}
        handleCloseFormDIalog={handleCloseFormDIalog}
        formDialogViewMode={formDialogViewMode}
        handleRefreshTaskList={fetchTaskListByUserId}
        setSnackData={setSnackData}
        selectedTask={selected}
      />
      <AlertDialog
        isAlertDialogOpen={isAlertDialogOpen}
        handleCloseAlertDIalog={handleCloseAlertDIalog}
        alertDialogContentText={"Do you want delete this task ?"}
        handleSubmitAltertDialog={()=>handleTaskDelete()}
        setSnackData={setSnackData}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={4}>
          <Typography variant="h4">Task List</Typography>
          <Button variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill"/>} onClick={()=> {HandleNewTaskOnClick()}}>
            New Task
          </Button>
        </Stack>
        <Card>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <TableHead
                  headLabel={[
                    { id: 'taskTitle', label: 'Task Title' },
                    { id: 'priority', label: 'Priority' },
                    { id: 'status', label: 'Status' },
                    { id: 'actions', label: 'Actions', align: 'right'},
                  ]}
                />
                <TableBody>
                  {taskList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        taskTitle={row.title}
                        status={row.status}
                        priority={row.priority}
                        statusHistory={row.statusHistory}
                        handleActionClick={(actionType) => handleActionClick(actionType, row)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, taskList.length)}
                  />

                  {(taskList.length === 0) && <TableNoData />}
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
    </>    
  );
}

export default Dashboard;
