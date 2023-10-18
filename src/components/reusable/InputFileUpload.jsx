import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import * as React from 'react';

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

export default function InputFileUpload() {
  return (
    <Button
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
  );
}
