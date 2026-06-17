import React from 'react';
import { Box, Typography, Grid, Paper, Stack, Divider, LinearProgress } from '@mui/material';
import { Dashboard, People, VideogameAsset, Timeline, Storage, Settings } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const metrics = [
  { label: 'Total Users', value: '14,285', increase: '+12%', icon: People, color: '#6c8fff' },
  { label: 'Total Games', value: '52,143', increase: '+3%', icon: VideogameAsset, color: '#00e5a0' },
  { label: 'API Requests', value: '1.2M/day', increase: '+24%', icon: Timeline, color: '#ffb700' },
  { label: 'Database Size', value: '42.8 GB', increase: '+2%', icon: Storage, color: '#ff4f6a' },
];

const systemHealth = [
  { service: 'Frontend Server', status: 99, color: '#00e5a0' },
  { service: 'API Gateway', status: 95, color: '#00e5a0' },
  { service: 'Database Main', status: 88, color: '#ffb700' },
  { service: 'Search Indexer', status: 100, color: '#00e5a0' },
  { service: 'Analytics Worker', status: 72, color: '#ff4f6a' },
];

const AdminDashboard = () => (
  <Box>
    <Helmet><title>Admin Dashboard – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>ADMINISTRATION</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>System Dashboard</Typography>
    </Box>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {metrics.map(m => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={m.label}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: `1px solid ${m.color}33`, borderRadius: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#7986cb' }}>{m.label}</Typography>
              <m.icon sx={{ color: m.color, fontSize: 20 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#e8eaf6' }}>{m.value}</Typography>
            <Typography variant="body2" sx={{ color: '#00e5a0', mt: 1, fontWeight: 700 }}>{m.increase} this week</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Recent System Activity</Typography>
          <Stack spacing={2}>
            {[
              { time: '10 mins ago', log: 'Database backup completed successfully.', type: 'info' },
              { time: '1 hour ago', log: 'High CPU usage detected on API Worker #3.', type: 'warn' },
              { time: '3 hours ago', log: 'New Steam dataset sync completed (420 new games).', type: 'success' },
              { time: 'Yesterday', log: 'System administrator login from new IP address.', type: 'warn' },
            ].map((activity, i) => (
              <React.Fragment key={i}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="caption" sx={{ color: '#455a64', width: 80 }}>{activity.time}</Typography>
                  <Typography variant="body2" sx={{ color: activity.type === 'warn' ? '#ffb700' : activity.type === 'success' ? '#00e5a0' : '#e8eaf6' }}>
                    {activity.log}
                  </Typography>
                </Box>
                {i < 3 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
              </React.Fragment>
            ))}
          </Stack>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>System Health</Typography>
          <Stack spacing={2.5}>
            {systemHealth.map(s => (
              <Box key={s.service}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: '#90a4ae' }}>{s.service}</Typography>
                  <Typography variant="caption" sx={{ color: s.color, fontWeight: 700 }}>{s.status}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={s.status} sx={{ bgcolor: 'rgba(255,255,255,0.05)', height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: s.color, borderRadius: 3 } }} />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default AdminDashboard;
