import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/analyticsSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Skeleton } from '@mui/material';

const ReleaseTrends = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(s => s.analytics);
  useEffect(() => { if (!data) dispatch(fetchAnalyticsData()); }, [dispatch, data]);
  const trendData = data?.releaseTrends || [];

  return (
    <Box>
      <Helmet><title>Release Trends – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>ANALYTICS</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Release Trends</Typography>
      </Box>
      {loading ? <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3, bgcolor: '#161b27' }} /> : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Games Released Per Year</Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="releasesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6c8fff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6c8fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
                    <XAxis dataKey="year" stroke="#7986cb" fontSize={12} />
                    <YAxis stroke="#7986cb" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                    <Area type="monotone" dataKey="releases" stroke="#6c8fff" strokeWidth={3} fill="url(#releasesGrad)" dot={{ fill: '#6c8fff', r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Growth Rate (Year over Year)</Typography>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
                    <XAxis dataKey="year" stroke="#7986cb" fontSize={12} />
                    <YAxis stroke="#7986cb" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                    <Line type="monotone" dataKey="releases" stroke="#00e5a0" strokeWidth={3} dot={{ fill: '#00e5a0', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Top Release Years</Typography>
              <Box>
                {[...trendData].sort((a, b) => b.releases - a.releases).slice(0, 6).map((d, i) => (
                  <Box key={d.year} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Typography variant="caption" sx={{ color: '#455a64', width: 20, textAlign: 'right' }}>#{i + 1}</Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 700, width: 40 }}>{d.year}</Typography>
                    <Box sx={{ flex: 1, height: 8, bgcolor: '#1e2637', borderRadius: 4, overflow: 'hidden' }}>
                      <Box sx={{ height: '100%', width: `${(d.releases / Math.max(...trendData.map(t => t.releases))) * 100}%`, bgcolor: '#6c8fff', borderRadius: 4 }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#6c8fff', fontWeight: 700, width: 50 }}>{d.releases}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ReleaseTrends;
