import PropTypes from 'prop-types';
import moment from 'moment';

import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { http_Request } from '../../../utils/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';

import './taskFormDialog.css';

const TaskFormDialog = (props) => {

  const { 
    isFormDialogOpen, 
    handleCloseFormDIalog,
    formDialogViewMode,
    handleRefreshTaskList,
    setSnackData,
    selectedTask,
  } = props;

  const initialFormValues = {
    title:"",
    priority: "Low",
    status: "New",
  }

  const initialFormErrors = {
    title: false, 
    priority: false,
    status: false,
  }

  const PriorityTypes = [
    {
      value: 'High',
      label: 'High',
    },
    {
      value: 'Medium',
      label: 'Medium',
    },
    {
      value: 'Low',
      label: 'Low',
    },
  ]

  const StatusTypes = [
    {
      value: 'New',
      label: 'New',
    },
    {
      value: 'In Progress',
      label: 'In Progress',
    },
    {
      value: 'Completed',
      label: 'Completed',
    }
  ]
 
  const StatusTypesForCompleted = [{ value: 'Completed', label: 'Completed'}]
  const StatusTypesForInProgress = [{value: 'In Progress', label: 'In Progress'},{ value: 'Completed', label: 'Completed'}]

  const userDetails = JSON.parse(localStorage.getItem("user"));

  const[formValues, setFormValues]= useState(initialFormValues);
  const[formErrors, setFormErrors]= useState(initialFormErrors);
  const[statusList, setStatusList]= useState(StatusTypes);

  useEffect(() => {
    if (isFormDialogOpen && (formDialogViewMode === "VIEW" || formDialogViewMode === "EDIT" )) {
      let tempStatusList = (selectedTask?.status === 'In Progress') ? StatusTypesForInProgress : ((selectedTask?.status === 'Completed') ? StatusTypesForCompleted : StatusTypes);
      setFormValues({
        title: selectedTask?.title,
        priority: selectedTask?.priority,
        status: selectedTask?.status,
      })
      setStatusList(tempStatusList);
    } else if (isFormDialogOpen && (formDialogViewMode === "NEW")) {
      setFormValues(initialFormValues);
      setStatusList(StatusTypes);
    }
  }, [isFormDialogOpen])
  
  const handleFormReset = () => {
    setFormErrors(initialFormErrors);
    setFormValues(initialFormValues);
  }

  const handleFormValues = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value});
    setFormErrors({...formErrors, [e.target.name]: false});
  }

  const handleFormSubmit = (type) => {
    if (formValues?.title === "") {
      setFormErrors({...formErrors, ['title']: true})
    } else {
      type === "NEW" ? handleAddNewTask() : handleUpdateTask();
    }
  }

  const handleAddNewTask = () => {
    let modifiedDateAndTime = `${(moment(new Date()).format('YYYY-MM-DD') + " / " + moment(new Date()).format('hh:mm A'))}`;
    let newTaskSubmitData = {
      userId: userDetails?.userId,
      title: formValues?.title,
      priority: formValues?.priority,
      status: formValues?.status,
      statusHistory: JSON.stringify({"New": modifiedDateAndTime})
    }
    http_Request(
      {
        url: API_URL.Task.PUT_NEW_TASK,
        method: 'PUT',
        bodyData: newTaskSubmitData,
      },
      function successCallback (response) {    
        if ( response.data) {
          handleRefreshTaskList();
          handleCloseFormDIalog();
          handleFormReset();
          setSnackData({ text: "New task created successfully", variant: "success" })
        }      
      },
      function errorCallback (error) {
        setSnackData({ text: "Error on new task creation !", variant: "error" })
      }
    )
  }

  const handleUpdateTask = () => {
    let modifiedDateAndTime = `${(moment(new Date()).format('YYYY-MM-DD') + " / " + moment(new Date()).format('hh:mm A'))}`;
    let newStatusHistory = selectedTask?.statusHistory;
    if ((selectedTask?.status !== formValues.status) && formValues.status=== "In Progress") {
      newStatusHistory = {
        ...(newStatusHistory || {}),
        "In Progress": modifiedDateAndTime,
      }
    } else if ((selectedTask?.status !== formValues.status) && formValues.status=== "Completed") {
      newStatusHistory = {
        ...(newStatusHistory || {}),
        "Completed": modifiedDateAndTime,
      }
    }
    let updateTaskSubmitData = {
      title: formValues?.title,
      priority: formValues?.priority,
      status: formValues?.status,
      statusHistory: JSON.stringify(newStatusHistory)
    }
    http_Request(
      {
        url: API_URL.Task.PUT_UPDATE_TASK_BY_ID.replace("{taskId}", selectedTask?.taskId),
        method: 'PUT',
        bodyData: updateTaskSubmitData,
      },
      function successCallback (response) {    
        if ( response.data) {
          handleRefreshTaskList();
          handleCloseFormDIalog();
          handleFormReset();
          setSnackData({ text: "Task updated successfully", variant: "success" })
        }      
      },
      function errorCallback (error) {
        setSnackData({ text: "Error on task update !", variant: "error" })
      }
    )
  }

  return (
    <>
      <Dialog
        open={isFormDialogOpen}
        onClose={()=>handleCloseFormDIalog()}
        PaperProps={{
          component: 'form',
          onSubmit: ()=> {},
        }}
        maxWidth='md'
        fullWidth={true}
      >
        <DialogTitle>Task Manager</DialogTitle>
        <DialogContent sx={{marginTop: "10px"}}>
          <Grid container item xs={12}>
            <Grid container item xs={12} md={4} direction='column' sx={{paddingRight: "25px"}}>
              <p className='form-label'> 
                Task Title
                <Typography className='required-red-star'>*</Typography>
              </p>
              <TextField 
                name='title'
                id="task-title" 
                fullWidth 
                variant="outlined" 
                value={formValues?.title}
                onChange={(e)=> {handleFormValues(e)}}
                error={formErrors.title}
                disabled={formDialogViewMode === "VIEW"}
              /> 
            </Grid>
            <Grid container item xs={12} md={4} direction='column' sx={{paddingRight: "25px"}}>
              <p className='form-label'> 
                Priority
                <Typography className='required-red-star'>*</Typography>
              </p>
              <TextField
                name='priority'
                id="task-priority"
                select
                defaultValue="Low"
                value={formValues?.priority}
                onChange={(e)=> {handleFormValues(e)}}
                error={formErrors.priority}
                disabled={formDialogViewMode === "VIEW"}
              >
                {PriorityTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>         
            </Grid>
            <Grid container item xs={12} md={4} direction='column' sx={{paddingRight: "25px"}}>
              <p className='form-label'> 
                Status
                <Typography className='required-red-star'>*</Typography>
              </p>
              <TextField
                name='status'
                id="task-status"
                select
                defaultValue="New"
                value={formValues?.status}
                onChange={(e)=> {handleFormValues(e)}}
                error={formErrors.status}
                disabled={formDialogViewMode === "VIEW" || formDialogViewMode === "NEW"}
              >
                {
                  statusList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>))
                }
              </TextField> 
            </Grid>
          </Grid>        

        </DialogContent>
        <DialogActions>
          <Box sx={{m: "20px"}}>
            {
              formDialogViewMode === "NEW" ? <Button onClick={()=> {handleFormSubmit("NEW")}} className='form-add-btn'>Add</Button>
              : formDialogViewMode === "EDIT" ? <Button onClick={()=> {handleFormSubmit("UPDATE")}} className='form-update-btn'>Update</Button>
              : <></>
            }
            <Button className='form-cancel-btn' onClick={()=> {handleCloseFormDIalog(); handleFormReset()}}>Cancel</Button>
          </Box>
          
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskFormDialog;

TaskFormDialog.propTypes = {
  isFormDialogOpen: PropTypes.bool,
  handleCloseFormDIalog: PropTypes.func,
  formDialogViewMode: PropTypes.string,
  handleRefreshTaskList: PropTypes.func,
  setSnackData: PropTypes.func,
  selectedTask: PropTypes.object,
};