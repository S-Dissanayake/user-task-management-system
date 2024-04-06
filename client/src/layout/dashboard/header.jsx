import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from '../../hooks/use-responsive';

import { bgBlur } from '../../theme/css';

import { NAV, HEADER } from './config-layout';

import Logo from '../../components/logo/Logo';

import Avtar from '../../assets/icons/user_avatar.svg';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const userName = JSON.parse(localStorage.getItem("user")).name;

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Logo/>
        </IconButton>
      )}
      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
        <Box>
          <Typography sx={{color: '#34465b', paddingRight: '10px', fontWeight: 600}}>
            Hello, {userName}
          </Typography>
        </Box>
        
        <img src={Avtar} alt='avatar' height='40px'/>
      </Toolbar>      
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
