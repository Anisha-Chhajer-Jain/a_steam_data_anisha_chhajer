import React from 'react';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { Memory, Storage, NetworkCheck } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const SystemMonitoring = () => (
  <Box>
    <Helmet><title>System Monitoring – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>ADMINISTRATION</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>System Monitoring</Typography>
    </Box>
    <Grid container spacing={3}>
      {[
        { label: 'CPU Usage', val: 42, icon: Memory, color: '#6c8fff' },
        { label: 'Memory (RAM)', val: 78, icon: Storage, color: '#ffb700' },
        { label: 'Network I/O', val: 25, icon: NetworkCheck, color: '#00e5a0' }
      ].map(m => (
        <Grid size={{ xs: 12, md: 4 }} key={m.label}>
          <Paper sx={{ p: 4, bgcolor: '#161b27', border: `1px solid ${m.color}33`, borderRadius: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
              <CircularProgress variant="determinate" value={m.val} size={100} thickness={4} sx={{ color: m.color }} />
              <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#e8eaf6' }}>{m.val}%</Typography>
              </Box>
            </Box>
            <m.icon sx={{ color: m.color, fontSize: 24, mb: 1 }} />
            <Typography variant="body1" sx={{ color: '#90a4ae', fontWeight: 700 }}>{m.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default SystemMonitoring;
