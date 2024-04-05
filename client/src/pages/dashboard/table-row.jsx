import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Label from '../../components/label';

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

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" padding="none" >
            <Typography variant="subtitle2" noWrap sx={{marginLeft: "20px"}}>
              {taskTitle}
            </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="body2" noWrap>
            {priority}
          </Typography>
        </TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
        <Tooltip title="View">
            <IconButton onClick={()=>{handleActionClick("VIEW")}} sx={{backgroundColor: '#e0e0e0', ":hover":{backgroundColor: '#c9c7c7'}, marginRight: "15px"}}>
              <img src={ViewSvg} alt='view' width="20px"/>  
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