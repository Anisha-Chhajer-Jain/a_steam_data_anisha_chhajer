import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Chip, Stack, Button, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Business } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const PublisherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pub = { name: 'Publisher', titles: 50, founded: '2000', country: '🌐', about: 'A major game publisher.', topTitles: ['Game 1', 'Game 2', 'Game 3'] };

  return (
    <Box>
      <Helmet><title>Publisher Detail – Arcade Stream</title></Helmet>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/publishers')} sx={{ mb: 2, color: '#7986cb' }}>Back to Publishers</Button>
      <Paper sx={{ p: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#1e2637', color: '#00e5a0', fontWeight: 900, fontSize: '2rem', border: '3px solid rgba(0,229,160,0.3)' }}>
            <Business fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#e8eaf6' }}>{pub.country} Publisher #{id}</Typography>
            <Typography variant="body2" sx={{ color: '#7986cb', mt: 0.5 }}>Founded {pub.founded} • {pub.titles} titles published</Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2 }} />
        <Typography variant="body1" sx={{ color: '#90a4ae' }}>{pub.about}</Typography>
      </Paper>
    </Box>
  );
};

export default PublisherDetail;
