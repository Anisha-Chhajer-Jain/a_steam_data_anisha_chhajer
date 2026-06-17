import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu,
  MenuItem, ListItemIcon, ListItemText, Divider, Tooltip, useTheme
} from '@mui/material';
import {
  Menu as MenuIcon, DarkMode, LightMode, Logout as LogoutIcon,
  Person as PersonIcon, Settings as SettingsIcon, BarChart as LogoIcon,
  Notifications as NotifIcon
} from '@mui/icons-material';
import { toggleSidebar, toggleTheme } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';
import { getInitials } from '../../utils/helpers';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { profile } = useSelector((state) => state.auth);
  const { themeMode } = useSelector((state) => state.ui);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}
      sx={{ borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.default' }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={() => dispatch(toggleSidebar())}
          sx={{ mr: 2, display: { md: 'none' }, color: 'text.secondary' }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: { xs: 'flex', md: 'flex' }, alignItems: 'center', gap: 1, mr: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5, color: '#e8eaf6' }}>
            GamerAnalytics Pro
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton onClick={() => dispatch(toggleTheme())} sx={{ color: 'text.secondary' }}>
              {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton sx={{ color: 'text.secondary', position: 'relative' }}>
              <NotifIcon fontSize="small" />
              {/* Red dot badge to match screenshot */}
              <Box sx={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, bgcolor: '#ff4f6a', borderRadius: '50%' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 0.5 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem', fontWeight: 700 }}>
                {getInitials(profile?.name || profile?.email || 'U')}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{ sx: { bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', minWidth: 200, mt: 1 } }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{profile?.name || 'Operative'}</Typography>
            <Typography variant="caption" color="textSecondary">{profile?.email || 'admin@arcade.stream'}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}>
            <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings'); }}>
            <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ color: 'error' }} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
