import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Login as LoginIcon, LockPerson } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 2 }}>
      <Helmet>
        <title>401 Unauthorized – Arcade Stream</title>
      </Helmet>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 5, textAlign: 'center', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
          <LockPerson sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h1" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, fontSize: '4rem' }}>401</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main', mb: 3 }}>
            Access Denied
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Your operative clearance is insufficient or your session has expired. Please authenticate to regain access to the network mesh.
          </Typography>
          <Button variant="contained" color="primary" size="large" startIcon={<LoginIcon />} onClick={() => navigate('/login')}>
            Authenticate Terminal
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Unauthorized;
