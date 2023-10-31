import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function BasicTextField({ label, value, onChange, type }) {
  return (
    <Box
      value={value}
      onChange={onChange}
      component='form'
      sx={{
        width: '100%',

        '& > :not(style)': { mt: '0.1rem', width: '25ch' },
      }}
      noValidate
      autoComplete='off'>
      <TextField
        sx={{
          width: '100%',
          minWidth: '100%',
        }}
        id='filled-basic'
        label={label}
        value={value}
        onChange={onChange}
        variant='filled'
        type={type}
      />
    </Box>
  );
}
