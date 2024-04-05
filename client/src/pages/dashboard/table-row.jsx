import PropTypes from 'prop-types';
import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Label from '../../components/label';
import Timeline from '../../components/timeline/TimeLine';

import ViewSvg from "../../assets/icons/view.svg";
import EditSvg from "../../assets/icons/edit.svg";
import DeleteSvg from "../../assets/icons/delete.svg";

// ----------------------------------------------------------------------

export default function UserTableRow({
  taskTitle,
  priority,
  status,
  handleActionClick,
}) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Timeline 
        isPopoverOpen={open}
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
      />
      <TableRow>
        <TableCell component="th" scope="row" padding="none" >
            <Typography variant="subtitle2" noWrap sx={{marginLeft: "20px"}}>
              {taskTitle}
            </Typography>
        </TableCell>

        <TableCell>
          <Label 
            variant={'outlined'}
            color={priority === "Low" ? 'info' : priority === "Medium" ? 'warning' :  'error'} 
          >
            {priority}
          </Label>
        </TableCell>

        <TableCell>
          <Label 
            color={status === "New" ? 'secondary' : status === "In Progress" ? 'primary' :  'success'}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}            
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
        <Tooltip title="View">
            <IconButton onClick={()=>{handleActionClick("VIEW")}} sx={{backgroundColor: '#e0e0e0', ":hover":{backgroundColor: '#c9c7c7'}, marginRight: "15px"}}>
              <img src={ViewSvg} alt='view' width="20px" />  
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={()=>{handleActionClick("EDIT")}} sx={{backgroundColor: '#b7d8f7', ":hover":{backgroundColor: '#93c8f9'}, marginRight: "15px"}}>
              <img src={EditSvg} alt='edit' width="20px"/>    
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={()=>{handleActionClick("DELETE")}} sx={{backgroundColor: '#fcbdbd', ":hover":{backgroundColor: '#f78f8f'}}}>
              <img src={DeleteSvg} alt='delete' width="20px"/>
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}

UserTableRow.propTypes = {
  handleActionClick: PropTypes.func,
  priority: PropTypes.string,
  taskTitle: PropTypes.string,
  status: PropTypes.string,
};
