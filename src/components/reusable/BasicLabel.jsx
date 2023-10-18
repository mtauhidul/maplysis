// Create basic label component using MUI and Functional Component

import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function BasicLabel({ label }) {
  return (
    <Typography
      variant='h6'
      noWrap
      component='div'
      sx={{
        color: '#343332',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginTop: '0.8rem',
        marginBottom: '0.2rem',
      }}>
      {label}
    </Typography>
  );
}
