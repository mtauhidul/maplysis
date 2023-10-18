import Button from '@mui/material/Button';
import * as React from 'react';

export default function BasicButton() {
  return (
    <Button
      sx={{
        backgroundColor: '#191A1A',
        color: '#FFFFFF',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginTop: '0.5rem',
        padding: '1rem',
        width: '100%',

        '&:hover': {
          backgroundColor: '#191A1AE2',
          color: '#FFFFFF',
        },
      }}
      variant='contained'>
      Contained
    </Button>
  );
}
