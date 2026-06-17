import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/analyticsSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@mui/material';

const mockDevData = [
  { name: 'Valve', games: 42, rating: 9.1, revenue: '$2.4B' },
  { name: 'CD Projekt', games: 8, rating: 9.4, revenue: '$890M' },
  { name: 'Bethesda', games: 31, rating: 8.7, revenue: '$1.1B' },
  { name: 'Rockstar', games: 12, rating: 9.6, revenue: '$3.8B' },
  { name: 'Ubisoft', games: 87, rating: 7.8, revenue: '$1.7B' },
  { name: 'EA Games', games: 124, rating: 7.2, revenue: '$2.1B' },
  { name: 'Square Enix', games: 68, rating: 8.1, revenue: '$680M' },
  { name: 'Bandai Namco', games: 93, rating: 7.9, revenue: '$520M' },
];

const DeveloperAnalytics = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(s => s.analytics);
  useEffect(() => { if (!data) dispatch(fetchAnalyticsData()); }, [dispatch, data]);

  return (
    <Box>
      <Helmet><title>Developer Analytics – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>ANALYTICS</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Developer Analytics</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Top Developers by Game Count</Typography>
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDevData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" horizontal={false} />
                  <XAxis type="number" stroke="#7986cb" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="#7986cb" fontSize={11} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                  <Bar dataKey="games" fill="#6c8fff" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Developer Leaderboard</Typography>
            <Stack spacing={1.5}>
              {mockDevData.slice(0, 6).map((dev, i) => (
                <Box key={dev.name} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: '#1e2637', borderRadius: 2 }}>
                  <Typography sx={{ fontWeight: 900, color: i < 3 ? '#ffb700' : '#455a64', fontSize: '0.8rem', width: 20 }}>#{i + 1}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 700 }}>{dev.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#7986cb' }}>{dev.games} games • ★{dev.rating}</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#00e5a0', fontWeight: 700 }}>{dev.revenue}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeveloperAnalytics;
