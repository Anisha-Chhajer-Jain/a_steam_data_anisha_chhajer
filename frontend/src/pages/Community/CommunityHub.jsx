import React from 'react';
import { Box, Typography, Paper, Stack, Avatar, Chip, Divider, Button, Grid } from '@mui/material';
import { People, SportsEsports, RateReview, Bookmark, TrendingUp } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const activityFeed = [
  { id: 1, user: 'CyberNova', action: 'reviewed', target: 'Cyberpunk 2077', icon: '⭐', time: '2m ago' },
  { id: 2, user: 'PixelSlayer', action: 'added to wishlist', target: 'Hollow Knight', icon: '🔖', time: '15m ago' },
  { id: 3, user: 'SteamMaster', action: 'posted in forum', target: 'Best RPGs of 2024?', icon: '💬', time: '42m ago' },
  { id: 4, user: 'NightRunner', action: 'favorited', target: 'Elden Ring', icon: '❤️', time: '1h ago' },
  { id: 5, user: 'GalaxyCrawler', action: 'reviewed', target: 'Stardew Valley', icon: '⭐', time: '2h ago' },
  { id: 6, user: 'PixelLord', action: 'added to wishlist', target: 'Baldur\'s Gate 3', icon: '🔖', time: '3h ago' },
];

const stats = [
  { label: 'Active Users', value: '1,245', icon: People, color: '#6c8fff' },
  { label: 'Reviews Today', value: '89', icon: RateReview, color: '#00e5a0' },
  { label: 'Games Wishlisted', value: '340', icon: Bookmark, color: '#ffb700' },
  { label: 'Trending Now', value: '12', icon: TrendingUp, color: '#ff4f6a' },
];

const CommunityHub = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Helmet><title>Community Hub – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>COMMUNITY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Community Hub</Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map(s => (
          <Grid size={{ xs: 6, md: 3 }} key={s.label}>
            <Paper sx={{ p: 2.5, bgcolor: '#161b27', border: `1px solid ${s.color}33`, borderRadius: 2.5, textAlign: 'center' }}>
              <s.icon sx={{ fontSize: 32, color: s.color, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#e8eaf6' }}>{s.value}</Typography>
              <Typography variant="caption" sx={{ color: '#7986cb' }}>{s.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Live Activity Feed</Typography>
            <Stack spacing={0}>
              {activityFeed.map((a, i) => (
                <React.Fragment key={a.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#1e2637', fontSize: '0.75rem' }}>{a.user[0]}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#e8eaf6', fontSize: '0.8rem' }}>
                        <span style={{ fontWeight: 700, color: '#6c8fff' }}>{a.user}</span> {a.action} <span style={{ color: '#ffb700' }}>{a.target}</span>
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#455a64' }}>{a.time}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '1.2rem' }}>{a.icon}</Typography>
                  </Box>
                  {i < activityFeed.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
                </React.Fragment>
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Quick Links</Typography>
            <Stack spacing={1.5}>
              {[{ label: 'Browse Reviews', path: '/reviews', color: '#6c8fff' }, { label: 'Join Discussions', path: '/forum', color: '#00e5a0' }, { label: 'View Activity', path: '/activity', color: '#ffb700' }, { label: 'Explore Games', path: '/games', color: '#ff4f6a' }].map(l => (
                <Button key={l.label} fullWidth variant="outlined" onClick={() => navigate(l.path)} sx={{ borderColor: `${l.color}44`, color: l.color, '&:hover': { bgcolor: `${l.color}11`, borderColor: l.color } }}>{l.label}</Button>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunityHub;
