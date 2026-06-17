import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Chip, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/analyticsSlice';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '@mui/material';

const COLORS = ['#6c8fff','#00e5a0','#ffb700','#ff4f6a','#00d4ff','#a78bfa','#ff9800','#4caf50'];

const ChartCard = ({ title, subtitle, children, height = 300 }) => (
  <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
    <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700, fontSize: '0.65rem' }}>{subtitle}</Typography>
    <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2, fontSize: '0.95rem' }}>{title}</Typography>
    <Box sx={{ height }}>{children}</Box>
  </Paper>
);

const GenreAnalytics = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(s => s.analytics);

  useEffect(() => { if (!data) dispatch(fetchAnalyticsData()); }, [dispatch, data]);

  if (loading || !data) return (
    <Box><Grid container spacing={3}>{[1,2,3,4].map(i => <Grid size={{ xs: 12, md: 6 }} key={i}><Skeleton variant="rectangular" height={340} sx={{ borderRadius: 3, bgcolor: '#161b27' }} /></Grid>)}</Grid></Box>
  );

  const genreData = data.genresData || [];
  const topGenres = [...genreData].sort((a, b) => b.value - a.value).slice(0, 8);

  return (
    <Box>
      <Helmet><title>Genre Analytics – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>ANALYTICS</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Genre Analytics</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {topGenres.slice(0, 4).map((g, i) => (
          <Grid size={{ xs: 6, md: 3 }} key={g.name}>
            <Paper sx={{ p: 2, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, borderLeft: `4px solid ${COLORS[i]}` }}>
              <Typography variant="caption" sx={{ color: '#7986cb' }}>#{i + 1} Genre</Typography>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700 }}>{g.name}</Typography>
              <Typography variant="body2" sx={{ color: COLORS[i], fontWeight: 700 }}>{g.value?.toLocaleString()} games</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Genre Distribution" subtitle="BREAKDOWN">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genreData.slice(0, 8)} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} stroke="none">
                  {genreData.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Top Genres by Game Count" subtitle="BAR CHART">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topGenres} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" horizontal={false} />
                <XAxis type="number" stroke="#7986cb" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#7986cb" fontSize={11} width={70} />
                <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                <Bar dataKey="value" fill="#6c8fff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GenreAnalytics;
