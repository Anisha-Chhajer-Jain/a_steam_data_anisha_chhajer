import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Toolbar, Typography, Box, Divider, useTheme,
  Collapse, Badge
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  SportsEsports as GamesIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExpandLess, ExpandMore,
  TrendingUp, NewReleases, Star, MoneyOff, Brush,
  Search as SearchIcon, Explore, Recommend,
  BarChart, PieChart, AttachMoney, Timeline, Code, Business,
  Group, StoreOutlined,
  Favorite, BookmarkBorder, History,
  RateReview, Forum, People, Timeline as FeedIcon,
  Newspaper, Article, Book,
  Notifications as NotifIcon, List as LogsIcon, Assessment, Help, Email, Info,
  AdminPanelSettings, ManageAccounts, VideogameAsset, Speed,
  VideogameAsset as LogoIcon,
  WhatshotOutlined,
} from '@mui/icons-material';
import { toggleSidebar } from '../../store/uiSlice';
import { useSelector as useSel } from 'react-redux';

const DRAWER_WIDTH = 260;

const NavSection = ({ label, icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const theme = useTheme();
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(!open)} sx={{ borderRadius: 2, mx: 1, px: 1.5, py: 0.8 }}>
          <ListItemIcon sx={{ minWidth: 36, color: '#6c8fff' }}>{icon}</ListItemIcon>
          <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: 600, color: '#b0bec5' }} />
          {open ? <ExpandLess sx={{ color: '#7986cb', fontSize: 18 }} /> : <ExpandMore sx={{ color: '#7986cb', fontSize: 18 }} />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

const NavItem = ({ label, icon, path, badge }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(s => s.ui);
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    if (window.innerWidth < 960 && sidebarOpen) dispatch(toggleSidebar());
  };

  return (
    <ListItem disablePadding sx={{ mb: 0.2 }}>
      <ListItemButton onClick={handleClick} sx={{
        borderRadius: 2, mx: 1, pl: 2, pr: 1, py: 0.7,
        bgcolor: isActive ? 'rgba(108,143,255,0.15)' : 'transparent',
        '&:hover': { bgcolor: 'rgba(108,143,255,0.08)' },
        borderLeft: isActive ? '3px solid #6c8fff' : '3px solid transparent',
      }}>
        <ListItemIcon sx={{ minWidth: 34, color: isActive ? '#6c8fff' : '#7986cb', fontSize: 18 }}>
          {badge ? <Badge badgeContent={badge} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 14, height: 14 } }}>{icon}</Badge> : icon}
        </ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: isActive ? 700 : 400, color: isActive ? '#e8eaf6' : '#90a4ae' }} />
      </ListItemButton>
    </ListItem>
  );
};

const SectionLabel = ({ label }) => (
  <Typography variant="overline" sx={{ px: 2.5, pt: 2, pb: 0.5, display: 'block', color: '#455a64', fontSize: '0.6rem', letterSpacing: 2, fontWeight: 700 }}>
    {label}
  </Typography>
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(s => s.ui);
  const { items: notifs } = useSelector(s => s.notifications);
  const unreadCount = notifs.filter(n => !n.read).length;
  const theme = useTheme();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', bgcolor: '#0d1117',
      '&::-webkit-scrollbar': { width: 4 },
      '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
      '&::-webkit-scrollbar-thumb': { bgcolor: '#1e2637', borderRadius: 4 }
    }}>
      {/* Logo */}
      <Box sx={{ px: 2, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <LogoIcon sx={{ color: '#6c8fff', fontSize: 28 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#e8eaf6', lineHeight: 1, letterSpacing: 1, fontSize: '0.95rem' }}>ARCADE STREAM</Typography>
          <Typography variant="caption" sx={{ color: '#455a64', fontSize: '0.6rem', letterSpacing: 2 }}>ANALYTICS PRO</Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

      <List sx={{ pt: 1, flexGrow: 1 }}>
        {/* CORE */}
        <SectionLabel label="Core" />
        <NavItem label="Dashboard" icon={<DashboardIcon sx={{ fontSize: 18 }} />} path="/dashboard" />

        {/* GAMES */}
        <SectionLabel label="Games" />
        <NavSection label="Games" icon={<GamesIcon sx={{ fontSize: 18 }} />} defaultOpen>
          <NavItem label="All Games" icon={<GamesIcon sx={{ fontSize: 16 }} />} path="/games" />
          <NavItem label="Trending" icon={<WhatshotOutlined sx={{ fontSize: 16 }} />} path="/games/trending" />
          <NavItem label="New Releases" icon={<NewReleases sx={{ fontSize: 16 }} />} path="/games/new-releases" />
          <NavItem label="Top Rated" icon={<Star sx={{ fontSize: 16 }} />} path="/games/top-rated" />
          <NavItem label="Free-to-Play" icon={<MoneyOff sx={{ fontSize: 16 }} />} path="/games/free-to-play" />
          <NavItem label="Indie Games" icon={<Brush sx={{ fontSize: 16 }} />} path="/games/indie" />
        </NavSection>

        {/* DISCOVERY */}
        <SectionLabel label="Discovery" />
        <NavItem label="Search" icon={<SearchIcon sx={{ fontSize: 18 }} />} path="/search" />
        <NavItem label="Genre Explorer" icon={<Explore sx={{ fontSize: 18 }} />} path="/genres" />
        <NavItem label="Recommendations" icon={<Recommend sx={{ fontSize: 18 }} />} path="/recommendations" />

        {/* ANALYTICS */}
        <SectionLabel label="Analytics" />
        <NavSection label="Analytics" icon={<AnalyticsIcon sx={{ fontSize: 18 }} />} defaultOpen>
          <NavItem label="Overview" icon={<BarChart sx={{ fontSize: 16 }} />} path="/analytics/genres" />
          <NavItem label="Genre Analytics" icon={<PieChart sx={{ fontSize: 16 }} />} path="/analytics/genres" />
          <NavItem label="Platform Analytics" icon={<BarChart sx={{ fontSize: 16 }} />} path="/analytics/platforms" />
          <NavItem label="Price Analytics" icon={<AttachMoney sx={{ fontSize: 16 }} />} path="/analytics/pricing" />
          <NavItem label="Release Trends" icon={<Timeline sx={{ fontSize: 16 }} />} path="/analytics/releases" />
          <NavItem label="Developer Analytics" icon={<Code sx={{ fontSize: 16 }} />} path="/analytics/developers" />
          <NavItem label="Publisher Analytics" icon={<Business sx={{ fontSize: 16 }} />} path="/analytics/publishers" />
        </NavSection>

        {/* DIRECTORIES */}
        <SectionLabel label="Directories" />
        <NavItem label="Developers" icon={<Code sx={{ fontSize: 18 }} />} path="/developers" />
        <NavItem label="Publishers" icon={<Business sx={{ fontSize: 18 }} />} path="/publishers" />

        {/* PERSONAL */}
        <SectionLabel label="Personal" />
        <NavItem label="Wishlist" icon={<BookmarkBorder sx={{ fontSize: 18 }} />} path="/wishlist" />
        <NavItem label="Favorites" icon={<Favorite sx={{ fontSize: 18 }} />} path="/favorites" />
        <NavItem label="Recently Viewed" icon={<History sx={{ fontSize: 18 }} />} path="/recently-viewed" />

        {/* COMMUNITY */}
        <SectionLabel label="Community" />
        <NavSection label="Community" icon={<People sx={{ fontSize: 18 }} />}>
          <NavItem label="Community Hub" icon={<People sx={{ fontSize: 16 }} />} path="/community" />
          <NavItem label="Reviews" icon={<RateReview sx={{ fontSize: 16 }} />} path="/reviews" />
          <NavItem label="Forum" icon={<Forum sx={{ fontSize: 16 }} />} path="/forum" />
          <NavItem label="Activity Feed" icon={<FeedIcon sx={{ fontSize: 16 }} />} path="/activity" />
        </NavSection>

        {/* CONTENT */}
        <SectionLabel label="Content" />
        <NavItem label="Gaming News" icon={<Newspaper sx={{ fontSize: 18 }} />} path="/news" />
        <NavItem label="Blog" icon={<Book sx={{ fontSize: 18 }} />} path="/blog" />

        {/* UTILITY */}
        <SectionLabel label="Utility" />
        <NavItem label="Notifications" icon={<NotifIcon sx={{ fontSize: 18 }} />} path="/notifications" badge={unreadCount || null} />
        <NavItem label="Activity Logs" icon={<LogsIcon sx={{ fontSize: 18 }} />} path="/logs" />
        <NavItem label="Reports" icon={<Assessment sx={{ fontSize: 18 }} />} path="/reports" />
        <NavItem label="Help Center" icon={<Help sx={{ fontSize: 18 }} />} path="/help" />
        <NavItem label="Contact Us" icon={<Email sx={{ fontSize: 18 }} />} path="/contact" />
        <NavItem label="About Us" icon={<Info sx={{ fontSize: 18 }} />} path="/about" />

        {/* ADMIN */}
        <SectionLabel label="Admin" />
        <NavSection label="Admin Panel" icon={<AdminPanelSettings sx={{ fontSize: 18 }} />}>
          <NavItem label="Admin Dashboard" icon={<AdminPanelSettings sx={{ fontSize: 16 }} />} path="/admin/dashboard" />
          <NavItem label="User Management" icon={<ManageAccounts sx={{ fontSize: 16 }} />} path="/admin/users" />
          <NavItem label="Game Management" icon={<VideogameAsset sx={{ fontSize: 16 }} />} path="/admin/games" />
          <NavItem label="System Monitor" icon={<Speed sx={{ fontSize: 16 }} />} path="/admin/monitoring" />
        </NavSection>

        {/* USER */}
        <SectionLabel label="Account" />
        <NavItem label="Profile" icon={<PersonIcon sx={{ fontSize: 18 }} />} path="/profile" />
        <NavItem label="Settings" icon={<SettingsIcon sx={{ fontSize: 18 }} />} path="/settings" />
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: '#37474f', fontSize: '0.65rem' }}>Arcade Stream v2.0 • Analytics Pro</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer variant="permanent" sx={{
        display: { xs: 'none', md: 'block' },
        width: DRAWER_WIDTH, flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH, boxSizing: 'border-box',
          bgcolor: '#0d1117', borderRight: '1px solid rgba(255,255,255,0.05)',
          position: 'relative', height: '100%',
        },
      }}>
        {drawerContent}
      </Drawer>
      <Drawer variant="temporary" open={sidebarOpen} onClose={() => dispatch(toggleSidebar())} sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH, boxSizing: 'border-box', bgcolor: '#0d1117',
        },
      }}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
