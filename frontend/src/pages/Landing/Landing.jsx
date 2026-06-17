import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Stack } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BarChart as LogoIcon, RocketLaunch, ShowChart, Security, Speed } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const FeatureCard = ({ icon, title, description }) => (
  <Paper sx={{ p: 4, height: '100%', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
    <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'rgba(108,143,255,0.1)', color: 'primary.main', mb: 2 }}>
      {icon}
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
    <Typography variant="body2" color="textSecondary">{description}</Typography>
  </Paper>
);

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', overflowX: 'hidden' }}>
      <Helmet>
        <title>Arcade Stream – Advanced Game Analytics</title>
      </Helmet>

      {/* Header */}
      <Box component="header" sx={{ py: 3, px: { xs: 2, md: 6 }, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LogoIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 2 }}>ARCADE STREAM</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          {isAuthenticated ? (
            <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
              Command Center
            </Button>
          ) : (
            <>
              <Button variant="outlined" color="primary" component={RouterLink} to="/login" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                Login
              </Button>
              <Button variant="contained" color="primary" component={RouterLink} to="/register">
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 15 }, pb: { xs: 8, md: 10 }, textAlign: 'center' }}>
        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 3, display: 'block', mb: 2 }}>
          NEXT-GEN TELEMETRY
        </Typography>
        <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3rem', md: '5rem' }, mb: 3, lineHeight: 1.1 }}>
          Master Your <Box component="span" sx={{ color: 'primary.main' }}>Gaming</Box><br /> Analytics Data.
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 700, mx: 'auto', mb: 5 }}>
          Arcade Stream is the ultimate command center for gaming metrics. Track real-time player data, monitor market trends, and optimize your strategy with military-grade precision.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          {isAuthenticated ? (
             <Button variant="contained" size="large" onClick={() => navigate('/dashboard')} startIcon={<RocketLaunch />} sx={{ py: 2, px: 4, fontSize: '1.1rem' }}>
              Enter Dashboard
            </Button>
          ) : (
             <Button variant="contained" size="large" component={RouterLink} to="/register" startIcon={<RocketLaunch />} sx={{ py: 2, px: 4, fontSize: '1.1rem' }}>
              Initialize Operative
            </Button>
          )}
          {!isAuthenticated && (
            <Button variant="outlined" size="large" component={RouterLink} to="/login" sx={{ py: 2, px: 4, fontSize: '1.1rem' }}>
              Access Terminal
            </Button>
          )}
        </Stack>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<ShowChart fontSize="large" />} 
              title="Deep Market Insights" 
              description="Visualize trends across global gaming markets with interactive, real-time Recharts dashboards."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<Speed fontSize="large" />} 
              title="High-Performance Mesh" 
              description="Built on an optimized React-Vite architecture ensuring zero-latency transitions and instant data loading."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<Security fontSize="large" />} 
              title="Secure Operations" 
              description="End-to-end encrypted JWT authentication guarantees your telemetry and analytics data remains confidential."
            />
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center', mt: 5 }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Arcade Stream Intelligence. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
