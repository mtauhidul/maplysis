import {
  Menu as MenuIcon,
  ScatterPlot as ScatterPlotIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';

import { createAndDownloadExcelFile } from '../../utils/fileDownloader';
import { processFiles } from '../../utils/processFiles';
import MapView from '../mapView/MapView';
import BasicButton from '../reusable/BasicButton';
import BasicLabel from '../reusable/BasicLabel';
import BasicTextField from '../reusable/BasicTextField';
import InputFileUpload from '../reusable/InputFileUpload';

const drawerWidth = 400;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const dataPoints = [
  {
    zip: 79101,
    lat: 35.2078,
    lng: -101.8339,
    dre: 25,
  },
  {
    zip: 79102,
    lat: 35.2008,
    lng: -101.8652,
    dre: 81,
  },
  {
    zip: 79103,
    lat: 35.1794,
    lng: -101.7955,
    dre: 28,
  },
  {
    zip: 79104,
    lat: 35.1999,
    lng: -101.7841,
    dre: 32,
  },
  {
    zip: 79105,
    lat: 35.2078,
    lng: -101.8339,
    dre: 25,
  },
  {
    zip: 79106,
    lat: 35.2078,
    lng: -101.8339,
    dre: 25,
  },
  {
    zip: 79107,
    lat: 35.2214,
    lng: -101.814,
    dre: 28,
  },
  {
    zip: 79108,
    lat: 35.2796,
    lng: -101.7613,
    dre: 28,
  },
  {
    zip: 79109,
    lat: 35.1745,
    lng: -101.8818,
    dre: 81,
  },
  {
    zip: 79110,
    lat: 35.1551,
    lng: -101.887,
    dre: 81,
  },
  {
    zip: 79111,
    lat: 35.2214,
    lng: -101.814,
    dre: 13,
  },
  {
    zip: 79118,
    lat: 35.1417,
    lng: -101.8068,
    dre: 36,
  },
  {
    zip: 79119,
    lat: 35.128,
    lng: -101.958,
    dre: 81,
  },
  {
    zip: 79121,
    lat: 35.1745,
    lng: -101.8818,
    dre: 45,
  },
  {
    zip: 79124,
    lat: 35.1745,
    lng: -101.8818,
    dre: 27,
  },
  {
    zip: 79159,
    lat: 35.2078,
    lng: -101.8339,
    dre: 25,
  },
  {
    zip: 79166,
    lat: 35.2078,
    lng: -101.8339,
    dre: 73,
  },
  {
    zip: 79168,
    lat: 35.2078,
    lng: -101.8339,
    dre: 25,
  },
];

const targetDataPoints = [
  {
    zip: 79168,
    lat: 35.2078,
    lng: -101.8339,
  },
  {
    zip: 79124,
    lat: 35.1745,
    lng: -101.8818,
  },
  {
    zip: 79111,
    lat: 35.2214,
    lng: -101.814,
  },
];

const Sidebar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  // const [dataPoints, setDataPoints] = useState([]);
  // const [targetDataPoints, setTargetDataPoints] = useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmit = () => {
    console.log('Submit button clicked');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      const result = processFiles(rows);

      setDataPoints(result.data);
      setTargetDataPoints(result.targetData);
    });
  };

  const handleSaveMap = () => {
    console.log('Save map button clicked');
  };

  const handleDownloadFile = () => {
    createAndDownloadExcelFile(targetDataPoints, dataPoints, 10);
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
        <InputFileUpload handleFileUpload={handleFileUpload} />
        <BasicLabel label='Input radius (Miles)' />
        <BasicTextField label='Ex: 10 (Only numbers)' />

        <br />
        <BasicButton text='Generate MAP' onClick={handleSubmit} />
        <br />
        <br />
        <BasicButton text='Save MAP' onClick={handleSaveMap} />
        <br />
        <br />
        <BasicButton text='Download File' onClick={handleDownloadFile} />
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
            Explore Data by Zip Codes
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
        <MapView dataPoints={dataPoints} targetDataPoints={targetDataPoints} />
      </Box>
    </Box>
  );
};

export default Sidebar;
