import React from 'react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockPubData = [
  { name: 'Valve', games: 38, revenue: '$4.2B', share: 14 },
  { name: 'Electronic Arts', games: 112, revenue: '$2.1B', share: 11 },
  { name: 'Ubisoft', games: 89, revenue: '$1.7B', share: 9 },
  { name: 'Activision', games: 44, revenue: '$3.8B', share: 8 },
  { name: 'Square Enix', games: 71, revenue: '$680M', share: 6 },
  { name: '505 Games', games: 62, revenue: '$320M', share: 5 },
  { name: 'Paradox', games: 55, revenue: '$290M', share: 4 },
  { name: 'Team17', games: 48, revenue: '$180M', share: 4 },
];
const COLORS = ['#6c8fff','#00e5a0','#ffb700','#ff4f6a','#00d4ff','#a78bfa','#ff9800','#4caf50'];

const PublisherAnalytics = () => (
  <Box>
    <Helmet><title>Publisher Analytics – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>ANALYTICS</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Publisher Analytics</Typography>
    </Box>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Top Publishers by Revenue</Typography>
          <Box sx={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPubData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
                <XAxis dataKey="name" stroke="#7986cb" fontSize={10} angle={-20} textAnchor="end" height={50} />
                <YAxis stroke="#7986cb" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} formatter={(v) => [v, 'Games']} />
                <Bar dataKey="games" radius={[4, 4, 0, 0]}>
                  {mockPubData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Publisher Rankings</Typography>
          <Stack spacing={1.5}>
            {mockPubData.slice(0, 6).map((pub, i) => (
              <Box key={pub.name} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: '#1e2637', borderRadius: 2 }}>
                <Typography sx={{ fontWeight: 900, color: COLORS[i], fontSize: '0.8rem', width: 20 }}>#{i + 1}</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 700 }}>{pub.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#7986cb' }}>{pub.games} titles published</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#00e5a0', fontWeight: 700 }}>{pub.revenue}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default PublisherAnalytics;
