import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '../../components/iconify/Iconify';
import { Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  taskTitle,
  priority,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

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
          <Tooltip title="Edit">
            <IconButton onClick={handleOpenMenu} sx={{":hover":{backgroundColor: '#99c6fc'}, marginRight: "10px"}}>
              <Iconify icon="mdi:note-edit"  />     
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleOpenMenu} sx={{":hover": {backgroundColor: '#f9a495'}}}>
              <Iconify icon="bxs:trash" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  priority: PropTypes.string,
  taskTitle: PropTypes.string,
  selected: PropTypes.any,
  status: PropTypes.string,
};
