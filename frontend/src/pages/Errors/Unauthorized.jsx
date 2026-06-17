import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Lock } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Helmet><title>401 Unauthorized – Arcade Stream</title></Helmet>
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Box sx={{ p: 4, bgcolor: 'rgba(255,183,0,0.1)', borderRadius: '50%', mb: 3 }}>
          <Lock sx={{ fontSize: 80, color: '#ffb700' }} />
        </Box>
        <Typography variant="h3" sx={{ color: '#e8eaf6', fontWeight: 900, mb: 2 }}>Access Denied</Typography>
        <Typography variant="body1" sx={{ color: '#90a4ae', mb: 4, maxWidth: 500 }}>
          You do not have the necessary permissions to view this page. If you believe this is an error, please contact an administrator.
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ color: '#ffb700', borderColor: '#ffb700', px: 4, py: 1.5 }}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
