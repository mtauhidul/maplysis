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

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { createAndDownloadExcelFile } from '../../utils/fileDownloader';
import { processFiles } from '../../utils/processFiles';
import MapView from '../mapView/MapView';
import BasicButton from '../reusable/BasicButton';
import BasicLabel from '../reusable/BasicLabel';
import BasicTextField from '../reusable/BasicTextField';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const drawerWidth = 400;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// const dataPoints = [
//   {
//     zip: 79101,
//     lat: 35.2078,
//     lng: -101.8339,
//     dre: 25,
//   },
//   {
//     zip: 79102,
//     lat: 35.2008,
//     lng: -101.8652,
//     dre: 81,
//   },
//   {
//     zip: 79103,
//     lat: 35.1794,
//     lng: -101.7955,
//     dre: 28,
//   },
//   {
//     zip: 79104,
//     lat: 35.1999,
//     lng: -101.7841,
//     dre: 32,
//   },
//   {
//     zip: 79105,
//     lat: 35.2078,
//     lng: -101.8339,
//     dre: 25,
//   },
//   {
//     zip: 79106,
//     lat: 35.2078,
//     lng: -101.8339,
//     dre: 25,
//   },
//   {
//     zip: 79107,
//     lat: 35.2214,
//     lng: -101.814,
//     dre: 28,
//   },
//   {
//     zip: 79108,
//     lat: 35.2796,
//     lng: -101.7613,
//     dre: 28,
//   },
//   {
//     zip: 79109,
//     lat: 35.1745,
//     lng: -101.8818,
//     dre: 81,
//   },
//   {
//     zip: 79110,
//     lat: 35.1551,
//     lng: -101.887,
//     dre: 81,
//   },
//   {
//     zip: 79111,
//     lat: 35.2214,
//     lng: -101.814,
//     dre: 13,
//   },
//   {
//     zip: 79118,
//     lat: 35.1417,
//     lng: -101.8068,
//     dre: 36,
//   },
//   {
//     zip: 79119,
//     lat: 35.128,
//     lng: -101.958,
//     dre: 81,
//   },
//   {
//     zip: 79121,
//     lat: 35.1745,
//     lng: -101.8818,
//     dre: 45,
//   },
//   {
//     zip: 79124,
//     lat: 35.1745,
//     lng: -101.8818,
//     dre: 27,
//   },
//   {
//     zip: 79159,
//     lat: 35.2078,
//     lng: -101.8339,
//     dre: 25,
//   },
//   {
//     zip: 79166,
//     lat: 35.2078,
//     lng: -101.8339,
//     dre: 73,
//   },
//   {
//     zip: 79168,
//     lat: 35.2078,
//     lng: -101.8339,
//     dre: 25,
//   },
// ];

// const targetDataPoints = [
//   {
//     zip: 79168,
//     lat: 35.2078,
//     lng: -101.8339,
//   },
//   {
//     zip: 79124,
//     lat: 35.1745,
//     lng: -101.8818,
//   },
//   {
//     zip: 79111,
//     lat: 35.2214,
//     lng: -101.814,
//   },
// ];

const Sidebar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  const [targetDataPoints, setTargetDataPoints] = useState([]);
  const [radius, setRadius] = useState(10);
  const [working, setWorking] = useState(false);
  const [latAndLng, setLatAndLng] = useState([]);
  const [targetLatAndLng, setTargetLatAndLng] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [targetMapData, setTargetMapData] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmit = async () => {
    setWorking(true);

    const filteredData = dataPoints.filter((row) => {
      return row.zip !== null && row.dre !== null;
    });

    const targetFilteredData = targetDataPoints.filter((row) => {
      return row.zip !== null && row.zip !== undefined;
    });

    const promises = filteredData.map(async (row) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${row.zip}&key=AIzaSyCOGSsKzlKCe3BNTwbL2bjO1SYV4eU8H64`
      );

      const data = await response.json();

      return {
        zip: row.zip,
        dre: row.dre,
        lat: data.results[0]?.geometry.location.lat,
        lng: data.results[0]?.geometry.location.lng,
      };
    });

    const newDataWithLatLng = await Promise.all(promises);

    const filteredDataWithLatLng = newDataWithLatLng.filter((row) => {
      return row.lat !== undefined && row.lng !== undefined;
    });

    setLatAndLng(filteredDataWithLatLng);
    setMapData(filteredDataWithLatLng);

    console.log(targetFilteredData);

    const targetPromises = targetFilteredData.map(async (row) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${row.zip}&key=AIzaSyCOGSsKzlKCe3BNTwbL2bjO1SYV4eU8H64`
      );

      const data = await response.json();

      return {
        zip: row.zip,
        lat: data.results[0]?.geometry.location.lat,
        lng: data.results[0]?.geometry.location.lng,
      };
    });

    const newTargetDataWithLatLng = await Promise.all(targetPromises);

    const filteredTargetDataWithLatLng = newTargetDataWithLatLng.filter(
      (row) => {
        return row.lat !== undefined && row.lng !== undefined;
      }
    );

    setTargetLatAndLng(filteredTargetDataWithLatLng);
    setTargetMapData(filteredTargetDataWithLatLng);

    console.log(filteredTargetDataWithLatLng);

    setWorking(false);
  };

  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      const result = processFiles(rows);
      setFileName(file.name);

      console.log(result);

      setDataPoints(result.data);
      setTargetDataPoints(result.targetData);
    });
  };

  const handleDownloadFile = () => {
    createAndDownloadExcelFile(targetMapData, mapData, radius);
  };

  const handleReset = () => {
    setDataPoints([]);
    setTargetDataPoints([]);
    setRadius(10);
    setWorking(false);
    setLatAndLng([]);
    setTargetLatAndLng([]);
    setMapData([]);
    setTargetMapData([]);
    setFileName('');
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
        {fileName === '' ? (
          <Button
            onChange={handleFileUpload}
            sx={{
              backgroundColor: '#191A1A',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: '1rem',
              width: '100%',

              '&:hover': {
                backgroundColor: '#191A1AE2',
                color: '#FFFFFF',
              },
            }}
            component='label'
            variant='contained'
            startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type='file' />
          </Button>
        ) : (
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              color: 'green',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}>
            {fileName}
          </Typography>
        )}
        <BasicLabel label='Input radius (Miles)' />
        <BasicTextField
          label='Radius'
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />

        <br />
        {fileName !== '' && mapData.length === 0 && (
          <BasicButton
            text={working ? <CircularProgress /> : 'Generate Map'}
            onClick={handleSubmit}
          />
        )}
        <br />
        <br />
        {mapData && mapData.length > 0 && (
          <BasicButton text='Download File' onClick={handleDownloadFile} />
        )}
        <br />
        <br />
        {fileName !== '' && <BasicButton text='Reset' onClick={handleReset} />}
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
        <MapView
          dataPoints={mapData}
          targetDataPoints={targetMapData}
          radius={radius}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
