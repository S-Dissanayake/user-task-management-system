import PropTypes from 'prop-types';
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
import Slide from '@mui/material/Slide';

import { http_Request } from '../../../utils/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';

import './taskFormDialog.css'


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

  const[formValues, setFormValues]= useState(initialFormValues);
  const[formErrors, setFormErrors]= useState(initialFormErrors);

  useEffect(() => {
    if (isFormDialogOpen && (formDialogViewMode === "VIEW" || formDialogViewMode === "EDIT" )) {
      setFormValues({
        title: selectedTask?.title,
        priority: selectedTask?.priority,
        status: selectedTask?.status,
      })
    } else {
      setFormValues(initialFormValues);
    }
  }, [isFormDialogOpen])
  

  const handleFormValues =(e)=> {
    setFormValues({...formValues, [e.target.name]: e.target.value});
    setFormErrors({...formErrors, [e.target.name]: false});
  }

  const handleAddNewTask = () => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    let newTaskSubmitData = {
      userId: userDetails?.userId,
      title: formValues?.title,
      priority: formValues?.priority,
      status: formValues?.status,
    }
    http_Request(
      {
        url: API_URL.Task.PUT_NEW_TASK,
        method: 'PUT',
        bodyData: newTaskSubmitData,
      },
      function successCallback (response) {    
        if ( response.data) {
          handleFormReset();
          handleRefreshTaskList();
          handleCloseFormDIalog();
          setSnackData({ text: "New task created successfully", variant: "success" })
        }      
      },
      function errorCallback (error) {
        setSnackData({ text: "Error on new task creation !", variant: "error" })
      }
    )
  }

  const handleFormReset = () => {
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
  }

  const handleUpdateTask = () => {
    
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
                {StatusTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> 
            </Grid>
          </Grid>
          

        </DialogContent>
        <DialogActions>
          <Box sx={{m: "20px"}}>
            {
              formDialogViewMode === "NEW" ? <Button onClick={()=> {handleAddNewTask()}} className='form-add-btn'>Add</Button>
              : formDialogViewMode === "EDIT" ? <Button onClick={()=> {handleUpdateTask()}} className='form-update-btn'>Update</Button>
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