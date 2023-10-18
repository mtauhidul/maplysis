import {
  Menu as MenuIcon,
  ScatterPlot as ScatterPlotIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Checkbox,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import MapView from '../mapView/MapView';
import BasicButton from '../reusable/BasicButton';
import BasicLabel from '../reusable/BasicLabel';
import BasicTextField from '../reusable/BasicTextField';
import InputFileUpload from '../reusable/InputFileUpload';

const drawerWidth = 400;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Sidebar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          backgroundColor: '#191A1A',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 8px',
        }}>
        <ScatterPlotIcon
          sx={{
            color: '#FFFFFF',
            fontSize: '2rem',
            marginRight: '8px',
          }}
        />
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            color: '#FFFFFF',
            fontSize: '1.5rem',
          }}>
          Maplysis
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ p: 2 }}>
        <BasicLabel label='Upload Excel/CSV file' />
        <InputFileUpload />
        <BasicLabel label='Input radius (Miles)' />
        <BasicTextField label='Ex: 10 (Only numbers)' />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Checkbox
            sx={{
              marginTop: '0.55rem',
            }}
            {...label}
            defaultChecked
          />
          <BasicLabel label='Set custom headers' />
        </div>
        <BasicLabel label='Header name of ZIP Code column' />
        <BasicTextField label='Input header name' />
        <BasicLabel label='Header name of Target ZIP Code column' />
        <BasicTextField label='Input header name' />
        <BasicLabel label='Header name of Data column' />
        <BasicTextField label='Input header name' />
        <br />
        <BasicButton />
        <br />
        <br />
        <BasicButton />
        <BasicButton />
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#191A1A',
        }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Mapping Insights: Explore Data by Zip Codes
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <MapView />
      </Box>
    </Box>
  );
};

export default Sidebar;
