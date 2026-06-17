import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Button, Divider, Chip } from '@mui/material';
import { Edit, Email, CalendarMonth, VideogameAsset } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { profile } = useSelector(s => s.auth);
  const navigate = useNavigate();

  return (
    <Box>
      <Helmet><title>Profile – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#00e5a0', fontWeight: 700 }}>USER</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>My Profile</Typography>
      </Box>
      <Paper sx={{ p: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size="auto">
            <Avatar sx={{ width: 120, height: 120, bgcolor: '#1e2637', color: '#00e5a0', fontSize: '3rem', border: '4px solid rgba(0,229,160,0.3)' }}>
              {profile?.name?.[0] || 'U'}
            </Avatar>
          </Grid>
          <Grid size="grow">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#e8eaf6' }}>{profile?.name || 'User'}</Typography>
                <Typography variant="body1" sx={{ color: '#7986cb', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" /> {profile?.email}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Gamer" sx={{ bgcolor: 'rgba(0,229,160,0.1)', color: '#00e5a0', fontWeight: 700 }} />
                  <Chip label="Pro Member" sx={{ bgcolor: 'rgba(255,183,0,0.1)', color: '#ffb700', fontWeight: 700 }} />
                </Box>
              </Box>
              <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate('/profile/edit')} sx={{ color: '#6c8fff', borderColor: '#6c8fff' }}>
                Edit Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
            <VideogameAsset sx={{ fontSize: 40, color: '#6c8fff', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#e8eaf6' }}>42</Typography>
            <Typography variant="caption" sx={{ color: '#7986cb' }}>Games Owned</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#e8eaf6' }}>15</Typography>
            <Typography variant="caption" sx={{ color: '#7986cb' }}>Reviews Written</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#e8eaf6' }}>Lvl 8</Typography>
            <Typography variant="caption" sx={{ color: '#7986cb' }}>Community Level</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
