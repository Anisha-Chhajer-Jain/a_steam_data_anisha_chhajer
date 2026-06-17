import React from 'react';
import { Box, Typography, Grid, Paper, Button, Stack, Divider } from '@mui/material';
import { Assessment, Download, BarChart, PieChart, TrendingUp } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

const reportTypes = [
  { id: 1, title: 'Games Summary Report', desc: 'Full breakdown of all games, genres, and pricing in the database.', icon: BarChart, color: '#6c8fff', size: '2.4 MB' },
  { id: 2, title: 'Genre Analytics Report', desc: 'Detailed genre distribution and popularity trends over time.', icon: PieChart, color: '#00e5a0', size: '1.8 MB' },
  { id: 3, title: 'Platform Distribution Report', desc: 'Windows, Mac, and Linux game availability and growth data.', icon: Assessment, color: '#ffb700', size: '1.2 MB' },
  { id: 4, title: 'Release Trends Report', desc: 'Year-by-year analysis of game releases and market growth.', icon: TrendingUp, color: '#ff4f6a', size: '980 KB' },
  { id: 5, title: 'Developer & Publisher Report', desc: 'Rankings and analytics for top developers and publishers.', icon: Assessment, color: '#a78bfa', size: '3.1 MB' },
  { id: 6, title: 'Wishlist Activity Report', desc: 'Your personal wishlist and gaming activity statistics.', icon: BarChart, color: '#00d4ff', size: '450 KB' },
];

const Reports = () => (
  <Box>
    <Helmet><title>Reports – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>UTILITY</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Reports</Typography>
    </Box>
    <Grid container spacing={2.5}>
      {reportTypes.map(r => (
        <Grid size={{ xs: 12, md: 6 }} key={r.id}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: `1px solid ${r.color}33`, borderRadius: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: `${r.color}22`, borderRadius: 2 }}>
                <r.icon sx={{ color: r.color, fontSize: 24 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#e8eaf6' }}>{r.title}</Typography>
                <Typography variant="body2" sx={{ color: '#7986cb', fontSize: '0.8rem', mt: 0.5 }}>{r.desc}</Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#455a64' }}>PDF • {r.size}</Typography>
              <Button size="small" startIcon={<Download />} onClick={() => toast.info('Generating report...')}
                sx={{ color: r.color, borderColor: `${r.color}55`, border: '1px solid', borderRadius: 1.5, px: 2, '&:hover': { bgcolor: `${r.color}11` } }}>
                Download
              </Button>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Reports;
