import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Helmet><title>404 Not Found – Arcade Stream</title></Helmet>
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ fontSize: '8rem', fontWeight: 900, color: '#ff4f6a', lineHeight: 1, textShadow: '0 0 40px rgba(255,79,106,0.3)' }}>404</Typography>
        <Typography variant="h4" sx={{ color: '#e8eaf6', fontWeight: 800, mb: 2, mt: 2 }}>Game Over</Typography>
        <Typography variant="body1" sx={{ color: '#90a4ae', mb: 4, maxWidth: 500 }}>
          The page you are looking for has either been moved, deleted, or doesn't exist in our database.
        </Typography>
        <Button variant="contained" startIcon={<Home />} onClick={() => navigate('/dashboard')} sx={{ bgcolor: '#6c8fff', px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}>
          Return to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
