import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: 200,
      gap: 2,
    }}
  >
    <CircularProgress color="primary" size={48} />
    <Typography variant="body2" color="textSecondary">{message}</Typography>
  </Box>
);

export default Loader;
