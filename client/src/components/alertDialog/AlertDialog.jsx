import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

import "./alertDialog.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = (props) => {

  const {
    isAlertDialogOpen,
    handleCloseAlertDIalog,
    alertDialogTitle,
    alertDialogContentText,
    handleSubmitAltertDialog,
  } = props;

  return (
    <>
      <Dialog
        open={isAlertDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleCloseAlertDIalog()}
        aria-describedby="alert-dialog-slide-description"
        maxWidth='xs'
        fullWidth={true}
      >
        <DialogTitle>{alertDialogTitle}</DialogTitle>
        <DialogContent>
            <Typography className='msg-typo'>
              {alertDialogContentText}
            </Typography>        
        </DialogContent>
        <DialogActions className='dialog-action'>
          <Button className='submit-btn' onClick={()=>handleSubmitAltertDialog()}>Yes</Button>
          <Button className='cancel-btn' onClick={()=>handleCloseAlertDIalog()}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;

