import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, ErrorOutlined as ErrorOutline } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 2 }}>
      <Helmet>
        <title>404 Not Found – Arcade Stream</title>
      </Helmet>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 5, textAlign: 'center', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
          <ErrorOutline sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography variant="h1" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, fontSize: '4rem' }}>404</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.secondary', mb: 3 }}>
            Sector Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            The operational sector you are trying to access does not exist in the current database mesh. It may have been archived or deleted.
          </Typography>
          <Button variant="contained" size="large" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
            Return to Command Center
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;
