import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { Refresh, Settings } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const AnalyticsManagement = () => (
  <Box>
    <Helmet><title>Analytics Config – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>ADMINISTRATION</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Analytics Configuration</Typography>
      </Box>
      <Button variant="outlined" startIcon={<Refresh />} sx={{ color: '#6c8fff', borderColor: '#6c8fff' }}>Force Recalculate</Button>
    </Box>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Aggregation Jobs</Typography>
          <Box sx={{ p: 2, bgcolor: '#1e2637', borderRadius: 2, mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 700 }}>Daily Trends Aggregation</Typography>
            <Typography variant="caption" sx={{ color: '#00e5a0' }}>Last run: 2 hours ago • Status: Success</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: '#1e2637', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 700 }}>Genre Metrics Sync</Typography>
            <Typography variant="caption" sx={{ color: '#ffb700' }}>Last run: 12 hours ago • Status: Pending</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Settings</Typography>
          <Typography variant="body2" sx={{ color: '#90a4ae', mb: 2 }}>
            Configure how often the analytics pipeline processes data from the core games database.
          </Typography>
          <Button variant="contained" startIcon={<Settings />} sx={{ bgcolor: '#455a64' }}>Modify Schedule</Button>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default AnalyticsManagement;
