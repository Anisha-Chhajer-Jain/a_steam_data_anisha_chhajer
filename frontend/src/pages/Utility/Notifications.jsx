import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper, Button, Stack, Chip, IconButton } from '@mui/material';
import { Notifications as NotifIcon, Info, CheckCircle, Warning, Delete, DoneAll } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, markAllAsRead, deleteNotification } from '../../store/notificationsSlice';

const typeConfig = {
  info: { icon: <Info />, color: '#6c8fff', bg: 'rgba(108,143,255,0.1)' },
  success: { icon: <CheckCircle />, color: '#00e5a0', bg: 'rgba(0,229,160,0.1)' },
  warning: { icon: <Warning />, color: '#ffb700', bg: 'rgba(255,183,0,0.1)' },
};

const Notifications = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(s => s.notifications);
  const unread = items.filter(n => !n.read).length;

  return (
    <Box>
      <Helmet><title>Notifications – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>UTILITY</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Notifications
            {unread > 0 && <Chip label={unread} size="small" sx={{ ml: 1.5, bgcolor: '#ff4f6a', color: '#fff', fontWeight: 700, height: 20, fontSize: '0.7rem' }} />}
          </Typography>
        </Box>
        {unread > 0 && (
          <Button startIcon={<DoneAll />} onClick={() => dispatch(markAllAsRead())} sx={{ color: '#6c8fff' }}>Mark all as read</Button>
        )}
      </Box>
      <Paper sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
        <List disablePadding>
          {items.map((n, i) => {
            const cfg = typeConfig[n.type] || typeConfig.info;
            return (
              <ListItem key={n.id} onClick={() => dispatch(markAsRead(n.id))} sx={{ py: 2, px: 3, cursor: 'pointer', bgcolor: n.read ? 'transparent' : 'rgba(108,143,255,0.04)', borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', '&:hover': { bgcolor: 'rgba(108,143,255,0.07)' }, transition: 'background 0.2s' }}>
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color }}>
                    {cfg.icon}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2" sx={{ fontWeight: n.read ? 400 : 700, color: n.read ? '#90a4ae' : '#e8eaf6' }}>{n.title}</Typography>}
                  secondary={<><Typography variant="caption" sx={{ color: '#7986cb', display: 'block' }}>{n.message}</Typography><Typography variant="caption" sx={{ color: '#455a64' }}>{n.time}</Typography></>}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                  {!n.read && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#6c8fff' }} />}
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); dispatch(deleteNotification(n.id)); }} sx={{ color: '#455a64', '&:hover': { color: '#ff4f6a' } }}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })}
        </List>
        {items.length === 0 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <NotifIcon sx={{ fontSize: 48, color: '#1e2637', mb: 2 }} />
            <Typography sx={{ color: '#455a64' }}>No notifications</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Notifications;
