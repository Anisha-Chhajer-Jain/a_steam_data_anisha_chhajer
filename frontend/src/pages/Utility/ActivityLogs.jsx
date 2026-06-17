import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const logs = [
  { id: 1, action: 'Login', detail: 'User logged in from Windows Chrome', time: '2026-06-17 20:42:13', type: 'auth' },
  { id: 2, action: 'Search', detail: 'Searched for "open world RPG"', time: '2026-06-17 20:43:31', type: 'search' },
  { id: 3, action: 'Wishlist Add', detail: 'Added "Hollow Knight" to wishlist', time: '2026-06-17 20:45:08', type: 'wishlist' },
  { id: 4, action: 'Favorite Add', detail: 'Added "Elden Ring" to favorites', time: '2026-06-17 20:47:22', type: 'favorite' },
  { id: 5, action: 'Game View', detail: 'Viewed game: Cyberpunk 2077', time: '2026-06-17 20:49:15', type: 'view' },
  { id: 6, action: 'Review Submit', detail: 'Posted review for "Stardew Valley"', time: '2026-06-17 20:51:44', type: 'review' },
  { id: 7, action: 'Settings Update', detail: 'Changed notification preferences', time: '2026-06-17 20:55:00', type: 'settings' },
  { id: 8, action: 'Logout', detail: 'User session ended', time: '2026-06-17 21:00:00', type: 'auth' },
];

const typeColors = { auth: '#6c8fff', search: '#00d4ff', wishlist: '#6c8fff', favorite: '#ff4f6a', view: '#7986cb', review: '#ffb700', settings: '#00e5a0' };
const typeEmojis = { auth: '🔑', search: '🔍', wishlist: '🔖', favorite: '❤️', view: '👁️', review: '⭐', settings: '⚙️' };

const ActivityLogs = () => (
  <Box>
    <Helmet><title>Activity Logs – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>UTILITY</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Activity Logs</Typography>
    </Box>
    <Paper sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
      {logs.map((log, i) => (
        <React.Fragment key={log.id}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 2 }}>
            <Typography sx={{ fontSize: '1.3rem' }}>{typeEmojis[log.type]}</Typography>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#e8eaf6' }}>{log.action}</Typography>
                <Chip label={log.type} size="small" sx={{ height: 16, fontSize: '0.58rem', bgcolor: `${typeColors[log.type]}22`, color: typeColors[log.type] }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#7986cb' }}>{log.detail}</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#455a64', flexShrink: 0 }}>{log.time}</Typography>
          </Box>
          {i < logs.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
        </React.Fragment>
      ))}
    </Paper>
  </Box>
);

export default ActivityLogs;
