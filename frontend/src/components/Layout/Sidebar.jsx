import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Box, Divider, Avatar, Button, IconButton
} from '@mui/material';
import {
  DashboardOutlined,
  SportsEsportsOutlined,
  AddCircleOutlined,
  InsertChartOutlined,
  PieChartOutlined,
  TrendingUpOutlined,
  AdminPanelSettingsOutlined,
  SettingsOutlined,
  Logout,
  WorkspacePremiumOutlined,
  DevicesOutlined,
  StarBorderOutlined,
} from '@mui/icons-material';
import { toggleSidebar } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';

const DRAWER_WIDTH = 210;

const NavItem = ({ label, icon, path, exactMatch = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(s => s.ui);

  const isActive = exactMatch
    ? location.pathname === path
    : location.pathname.startsWith(path);

  const handleClick = () => {
    navigate(path);
    if (window.innerWidth < 960 && sidebarOpen) dispatch(toggleSidebar());
  };

  return (
    <ListItem disablePadding sx={{ mb: 0.25 }}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          borderRadius: 1.5,
          mx: 1.5,
          pl: 1.5,
          pr: 1,
          py: 0.85,
          bgcolor: isActive ? 'rgba(163,194,255,0.1)' : 'transparent',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
          borderLeft: isActive ? '3px solid #a3c2ff' : '3px solid transparent',
          transition: 'all 0.15s',
        }}
      >
        <ListItemIcon sx={{ minWidth: 32, color: isActive ? '#a3c2ff' : '#69748c' }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          slotProps={{
            primary: {
              fontSize: '0.82rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#e8eaf6' : '#8b96a8',
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const SectionLabel = ({ label }) => (
  <Typography
    variant="overline"
    sx={{
      px: 2.5,
      pt: 2,
      pb: 0.75,
      display: 'block',
      color: '#3d4a60',
      fontSize: '0.6rem',
      letterSpacing: 2,
      fontWeight: 700,
    }}
  >
    {label}
  </Typography>
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarOpen } = useSelector(s => s.ui);
  const { profile } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
        bgcolor: '#0b0e17',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        '&::-webkit-scrollbar': { width: 3 },
        '&::-webkit-scrollbar-thumb': { bgcolor: '#1e2637', borderRadius: 4 },
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Typography sx={{ fontWeight: 800, color: '#e8eaf6', fontSize: '1.15rem', lineHeight: 1.2 }}>
          Arcade Stream
        </Typography>
        <Typography sx={{ fontWeight: 800, color: '#e8eaf6', fontSize: '1.15rem', lineHeight: 1.2 }}>
          Pro
        </Typography>
        <Typography
          sx={{ color: '#3d4a60', fontSize: '0.58rem', letterSpacing: 2, mt: 0.75, display: 'block', fontWeight: 700 }}
        >
          COMMAND CENTER
        </Typography>
      </Box>

      <List sx={{ pt: 0, flexGrow: 1 }}>
        {/* Main Nav */}
        <NavItem
          label="Dashboard"
          icon={<DashboardOutlined sx={{ fontSize: 18 }} />}
          path="/dashboard"
          exactMatch
        />
        <NavItem
          label="All Games"
          icon={<SportsEsportsOutlined sx={{ fontSize: 18 }} />}
          path="/games"
          exactMatch
        />
        <NavItem
          label="Add Game"
          icon={<AddCircleOutlined sx={{ fontSize: 18 }} />}
          path="/games"
          exactMatch
        />

        {/* Insights Section */}
        <SectionLabel label="INSIGHTS" />
        <NavItem
          label="Overview"
          icon={<InsertChartOutlined sx={{ fontSize: 18 }} />}
          path="/analytics/genres"
        />
        <NavItem
          label="Genre"
          icon={<PieChartOutlined sx={{ fontSize: 18 }} />}
          path="/analytics/genres"
        />
        <NavItem
          label="Platform"
          icon={<DevicesOutlined sx={{ fontSize: 18 }} />}
          path="/analytics/platforms"
        />
        <NavItem
          label="Trends"
          icon={<TrendingUpOutlined sx={{ fontSize: 18 }} />}
          path="/analytics/releases"
        />
        <NavItem
          label="Top Rated"
          icon={<StarBorderOutlined sx={{ fontSize: 18 }} />}
          path="/games/top-rated"
        />

        {/* System Section */}
        <SectionLabel label="SYSTEM" />
        <NavItem
          label="Admin"
          icon={<AdminPanelSettingsOutlined sx={{ fontSize: 18 }} />}
          path="/admin/dashboard"
        />
        <NavItem
          label="Settings"
          icon={<SettingsOutlined sx={{ fontSize: 18 }} />}
          path="/settings"
          exactMatch
        />
      </List>

      {/* Upgrade Pro */}
      <Box sx={{ px: 1.5, mb: 2, bgcolor: '#1a1f2c', borderRadius: 2, p: 2, mx: 1.5, border: '1px solid rgba(255,255,255,0.05)' }}>
        <Typography sx={{ color: '#e8eaf6', fontSize: '0.65rem', fontWeight: 800, letterSpacing: 1, mb: 0.5 }}>
          LIMIT REACHED
        </Typography>
        <Typography sx={{ color: '#90a4ae', fontSize: '0.75rem', mb: 1.5, lineHeight: 1.3 }}>
          Unlock full API insights
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/settings')}
          sx={{
            bgcolor: '#a3c2ff',
            color: '#0d1117',
            fontWeight: 800,
            textTransform: 'none',
            borderRadius: 1.5,
            fontSize: '0.75rem',
            py: 0.6,
            '&:hover': { bgcolor: '#8eb3ff' }
          }}
        >
          Upgrade Pro
        </Button>
      </Box>


      <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', mx: 1.5, mb: 1.5 }} />

      {/* User Profile */}
      <Box
        sx={{
          px: 1.5,
          pb: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: 'pointer', flex: 1, minWidth: 0 }}
          onClick={() => navigate('/profile')}
        >
          <Avatar
            src={profile?.avatar}
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#1e2637',
              color: '#00d4ff',
              fontSize: '0.85rem',
              fontWeight: 700,
              border: '1.5px solid rgba(0,212,255,0.4)',
              flexShrink: 0,
            }}
          >
            {profile?.name ? profile.name[0].toUpperCase() : 'A'}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ color: '#e8eaf6', fontSize: '0.82rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {profile?.name || 'Alex Chen'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#56637a', fontSize: '0.65rem' }}>
              Master A...
            </Typography>
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={handleLogout}
          sx={{ color: '#56637a', flexShrink: 0, '&:hover': { color: '#ff4f6a' } }}
        >
          <Logout sx={{ fontSize: 17 }} />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: '#0b0e17',
            border: 'none',
            position: 'relative',
            height: '100%',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: '#0b0e17',
            border: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
