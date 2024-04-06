import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import { alpha } from '@mui/material/styles';

import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';
import { useResponsive } from '../../hooks/use-responsive';
import Logo from '../../components/logo/Logo';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);


  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Grid>
      <Stack direction='row' alignItems='center'>
        <Logo sx={{ mt: 3, ml: 4 }} />
        <Typography sx={{padding: '25px 0 0 10px', fontWeight:600, color: '#1877F2', fontSize: '18px'}}>
          Task Manager
        </Typography>
      </Stack>
      <Box sx={{ flexGrow: 1 , marginBottom: '50px'}} />
      {renderMenu}      
    </Grid>      
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        backgroundColor: 'yellow',
        boxShadow:  '8px 0px 10px -9px rgba(0,0,0,0.1)'
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            backgroundColor: (theme) => theme.palette.background.paper
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  const handleLocalStorageClean = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  }

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'primary.main',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightSemiBold',
        ...(active && {
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
      onClick={()=>{(item.title === 'logout') && handleLocalStorageClean()}}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
