import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Skeleton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/analyticsSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6c8fff', '#00e5a0', '#ffb700', '#ff4f6a'];
const mockPlatformData = [
  { name: 'Windows', value: 72, games: 28000, color: '#6c8fff' },
  { name: 'Mac', value: 18, games: 7000, color: '#00e5a0' },
  { name: 'Linux', value: 10, games: 3900, color: '#ffb700' },
];

const PlatformAnalytics = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(s => s.analytics);
  useEffect(() => { if (!data) dispatch(fetchAnalyticsData()); }, [dispatch, data]);
  const platformData = data?.platformData || mockPlatformData;

  return (
    <Box>
      <Helmet><title>Platform Analytics – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>ANALYTICS</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Platform Analytics</Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {mockPlatformData.map((p, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={p.name}>
            <Paper sx={{ p: 3, bgcolor: '#161b27', border: `1px solid ${p.color}33`, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 900, color: p.color }}>{p.value}%</Typography>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700 }}>{p.name}</Typography>
              <Typography variant="body2" sx={{ color: '#7986cb' }}>{p.games.toLocaleString()} games</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Platform Share</Typography>
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockPlatformData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name} ${value}%`} stroke="none">
                    {mockPlatformData.map((p, i) => <Cell key={i} fill={p.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Games per Platform</Typography>
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPlatformData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
                  <XAxis dataKey="name" stroke="#7986cb" fontSize={12} />
                  <YAxis stroke="#7986cb" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                  <Bar dataKey="games" radius={[4, 4, 0, 0]}>
                    {mockPlatformData.map((p, i) => <Cell key={i} fill={p.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlatformAnalytics;
