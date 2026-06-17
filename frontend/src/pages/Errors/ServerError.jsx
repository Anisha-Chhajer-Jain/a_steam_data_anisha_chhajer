import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Error } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const ServerError = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Helmet><title>500 Server Error – Arcade Stream</title></Helmet>
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Error sx={{ fontSize: 100, color: '#ff4f6a', mb: 3 }} />
        <Typography variant="h3" sx={{ color: '#e8eaf6', fontWeight: 900, mb: 2 }}>Internal Server Error</Typography>
        <Typography variant="body1" sx={{ color: '#90a4ae', mb: 4, maxWidth: 500 }}>
          Something went terribly wrong on our end. Our engineers have been notified. Please try again later.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => window.location.reload()} sx={{ bgcolor: '#ff4f6a' }}>Try Again</Button>
          <Button variant="outlined" onClick={() => navigate('/')} sx={{ color: '#6c8fff', borderColor: '#6c8fff' }}>Go Home</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServerError;
