import React from 'react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

const priceRanges = [
  { range: 'Free', count: 3200, color: '#00e5a0' },
  { range: '$0-5', count: 5800, color: '#6c8fff' },
  { range: '$5-10', count: 8200, color: '#00d4ff' },
  { range: '$10-20', count: 11400, color: '#ffb700' },
  { range: '$20-30', count: 6700, color: '#ff9800' },
  { range: '$30-50', count: 3800, color: '#ff4f6a' },
  { range: '$50-60', count: 1200, color: '#a78bfa' },
  { range: '$60+', count: 420, color: '#9c27b0' },
];

const PriceAnalytics = () => (
  <Box>
    <Helmet><title>Price Analytics – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>ANALYTICS</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Price Analytics</Typography>
    </Box>
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {[{ label: 'Average Price', value: '$14.82', color: '#6c8fff' }, { label: 'Median Price', value: '$9.99', color: '#00e5a0' }, { label: 'Most Common', value: '$4.99', color: '#ffb700' }, { label: 'Free Games', value: '8.2%', color: '#ff4f6a' }].map(s => (
        <Grid size={{ xs: 6, md: 3 }} key={s.label}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', border: `1px solid ${s.color}33`, borderRadius: 2.5, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: s.color }}>{s.value}</Typography>
            <Typography variant="caption" sx={{ color: '#7986cb' }}>{s.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
      <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Price Distribution</Typography>
      <Box sx={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priceRanges}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
            <XAxis dataKey="range" stroke="#7986cb" fontSize={12} />
            <YAxis stroke="#7986cb" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#6c8fff" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  </Box>
);

export default PriceAnalytics;
