import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserTableHead({
  headLabel,
}) {


  return (
    <TableHead sx={{backgroundColor: '#ffffff'}}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={{ width: headCell.width, minWidth: headCell.minWidth, backgroundColor: '#e0eeff' }}
          >
            <Typography variant='subtitle1'>
              {headCell.label}
            </Typography>            
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  headLabel: PropTypes.array,
};
