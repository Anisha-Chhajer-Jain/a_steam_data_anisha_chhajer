import React from 'react';
import { Box, Typography, Paper, Stack, Avatar, Chip, Divider } from '@mui/material';
import { Timeline } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const feed = [
  { id: 1, user: 'You', action: 'Added Hollow Knight to wishlist', time: '5 mins ago', icon: '🔖', color: '#6c8fff' },
  { id: 2, user: 'CyberNova', action: 'Posted a 5-star review for Cyberpunk 2077', time: '22 mins ago', icon: '⭐', color: '#ffb700' },
  { id: 3, user: 'PixelSlayer', action: 'Joined the forum discussion: Best RPGs 2024', time: '1h ago', icon: '💬', color: '#00e5a0' },
  { id: 4, user: 'GalaxyCrawler', action: 'Favorited Elden Ring', time: '2h ago', icon: '❤️', color: '#ff4f6a' },
  { id: 5, user: 'NightRunner', action: 'Searched for "open world RPG"', time: '3h ago', icon: '🔍', color: '#00d4ff' },
  { id: 6, user: 'System', action: 'Weekly analytics report generated', time: '1 day ago', icon: '📊', color: '#a78bfa' },
];

const ActivityFeed = () => (
  <Box>
    <Helmet><title>Activity Feed – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>COMMUNITY</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Activity Feed</Typography>
    </Box>
    <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
      <Stack spacing={0}>
        {feed.map((item, i) => (
          <React.Fragment key={item.id}>
            <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: `${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                {item.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600 }}><span style={{ color: item.color }}>{item.user}</span> {item.action}</Typography>
                <Typography variant="caption" sx={{ color: '#455a64' }}>{item.time}</Typography>
              </Box>
            </Box>
            {i < feed.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
          </React.Fragment>
        ))}
      </Stack>
    </Paper>
  </Box>
);

export default ActivityFeed;
