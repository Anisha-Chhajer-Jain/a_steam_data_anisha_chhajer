import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Stack, Chip } from '@mui/material';
import { VideogameAsset, Group, Analytics, Security, Speed, Code } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const stats = [
  { label: 'Games in Database', value: '50,000+', color: '#6c8fff' },
  { label: 'Active Users', value: '12,000+', color: '#00e5a0' },
  { label: 'Developers Tracked', value: '8,500+', color: '#ffb700' },
  { label: 'Data Points', value: '2M+', color: '#ff4f6a' },
];

const features = [
  { icon: Analytics, title: 'Deep Analytics', desc: 'Real-time insights into gaming trends, genre popularity, and market data.', color: '#6c8fff' },
  { icon: Speed, title: 'Fast & Reliable', desc: 'Lightning-fast database queries powered by MongoDB and Express.js.', color: '#00e5a0' },
  { icon: Security, title: 'Secure Platform', desc: 'JWT authentication and rate limiting keep your data safe.', color: '#ffb700' },
  { icon: Code, title: 'Open API', desc: 'Full REST API access for developers to build on top of our platform.', color: '#ff4f6a' },
];

const AboutUs = () => (
  <Box>
    <Helmet><title>About – Arcade Stream</title></Helmet>
    <Paper sx={{ p: 6, mb: 4, bgcolor: '#161b27', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 3, textAlign: 'center' }}>
      <VideogameAsset sx={{ fontSize: 60, color: '#6c8fff', mb: 2 }} />
      <Typography variant="h3" sx={{ fontWeight: 900, color: '#e8eaf6', mb: 1 }}>Arcade Stream</Typography>
      <Typography variant="h6" sx={{ color: '#6c8fff', fontWeight: 400, mb: 2 }}>Analytics Pro — v2.0</Typography>
      <Typography variant="body1" sx={{ color: '#90a4ae', maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
        Arcade Stream is a full-stack Steam Games Analytics platform built to provide deep insights into the gaming industry. Browse thousands of games, analyze trends, and discover your next favorite title.
      </Typography>
    </Paper>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map(s => (
        <Grid size={{ xs: 6, md: 3 }} key={s.label}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: `1px solid ${s.color}33`, borderRadius: 2.5, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: s.color }}>{s.value}</Typography>
            <Typography variant="caption" sx={{ color: '#7986cb' }}>{s.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Typography variant="h5" sx={{ fontWeight: 700, color: '#e8eaf6', mb: 3 }}>What We Offer</Typography>
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {features.map(f => (
        <Grid size={{ xs: 12, sm: 6 }} key={f.title}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: `1px solid ${f.color}33`, borderRadius: 2.5, display: 'flex', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: `${f.color}22`, borderRadius: 2, height: 'fit-content' }}><f.icon sx={{ color: f.color, fontSize: 24 }} /></Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#e8eaf6', mb: 0.5 }}>{f.title}</Typography>
              <Typography variant="body2" sx={{ color: '#7986cb' }}>{f.desc}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5 }}>
      <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Tech Stack</Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {['React 19', 'Redux Toolkit', 'Material UI v9', 'Recharts', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Vite'].map(t => (
          <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(108,143,255,0.1)', color: '#6c8fff', fontWeight: 600 }} />
        ))}
      </Stack>
    </Paper>
  </Box>
);

export default AboutUs;
