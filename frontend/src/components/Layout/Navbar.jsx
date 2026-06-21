import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Box, InputBase, Typography, Tooltip, Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  NotificationsNoneOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { toggleSidebar } from '../../store/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  const location = useLocation();
  const isAnalytics = location.pathname.includes('/analytics');

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
    }
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ bgcolor: '#0b0e17', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <Toolbar
        sx={{
          minHeight: '60px !important',
          px: { xs: 2, md: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Mobile menu toggle */}
        <IconButton
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ display: { md: 'none' }, color: '#69748c', mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#161b27',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 1.5,
            px: 1.5,
            py: 0.5,
            width: { xs: '100%', md: 380 },
            transition: 'border-color 0.2s',
            '&:focus-within': { borderColor: 'rgba(163,194,255,0.4)' },
          }}
        >
          <SearchIcon sx={{ color: '#56637a', fontSize: 17, mr: 1, flexShrink: 0 }} />
          <InputBase
            placeholder={isAnalytics ? "Search analytics models..." : "Search by ID, Name, or Publisher..."}
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            sx={{ color: '#c5cae9', fontSize: '0.82rem', width: '100%' }}
          />
        </Box>

        {/* Right side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={() => navigate('/notifications')}
              sx={{ color: '#8b96a8', position: 'relative', '&:hover': { color: '#e8eaf6' } }}
            >
              <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
              {/* Notification dot */}
              <Box sx={{
                position: 'absolute', top: 10, right: 10,
                width: 6, height: 6,
                bgcolor: '#a3c2ff', borderRadius: '50%',
                border: '1.5px solid #0b0e17',
              }} />
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton
              onClick={() => navigate('/settings')}
              sx={{ color: '#8b96a8', '&:hover': { color: '#e8eaf6' } }}
            >
              <SettingsOutlined sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 1, my: 1.5 }}
          />

          {/* Status indicator */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#56637a', fontSize: '0.65rem', fontWeight: 700, letterSpacing: 1 }}>
              {isAnalytics ? 'NODE:' : 'STATUS:'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Typography variant="caption" sx={{ color: '#e8eaf6', fontSize: '0.75rem', fontWeight: 700, lineHeight: 1 }}>
                {isAnalytics ? 'US-EAST-1' : 'Server Live'}
              </Typography>
              <Box sx={{
                width: 6, height: 6,
                bgcolor: '#00e5a0',
                borderRadius: '50%',
                boxShadow: '0 0 6px rgba(0,229,160,0.5)',
              }} />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
