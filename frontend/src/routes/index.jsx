import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';

// Auth Pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';

// Dashboard
import Dashboard from '../pages/Dashboard/Dashboard';

// Games Pages
import GamesList from '../pages/Games/GamesList';
import GameDetail from '../pages/Games/GameDetail';
import TrendingGames from '../pages/Games/TrendingGames';
import NewReleases from '../pages/Games/NewReleases';
import TopRated from '../pages/Games/TopRated';
import FreeToPlay from '../pages/Games/FreeToPlay';
import IndieGames from '../pages/Games/IndieGames';

// Discovery Pages
import SearchPage from '../pages/Discovery/SearchPage';
import GenreExplorer from '../pages/Discovery/GenreExplorer';
import Recommendations from '../pages/Discovery/Recommendations';

// Analytics Pages
import GenreAnalytics from '../pages/Analytics/GenreAnalytics';
import PlatformAnalytics from '../pages/Analytics/PlatformAnalytics';
import ReleaseTrends from '../pages/Analytics/ReleaseTrends';
import PriceAnalytics from '../pages/Analytics/PriceAnalytics';
import DeveloperAnalytics from '../pages/Analytics/DeveloperAnalytics';
import PublisherAnalytics from '../pages/Analytics/PublisherAnalytics';

// Developers & Publishers
import DevelopersDirectory from '../pages/Developers/DevelopersDirectory';
import DeveloperDetail from '../pages/Developers/DeveloperDetail';
import PublishersDirectory from '../pages/Publishers/PublishersDirectory';
import PublisherDetail from '../pages/Publishers/PublisherDetail';

// Profile
import Profile from '../pages/Profile/Profile';
import EditProfile from '../pages/Profile/EditProfile';
import Settings from '../pages/Profile/Settings';

// Personal
import Wishlist from '../pages/Personal/Wishlist';
import Favorites from '../pages/Personal/Favorites';
import RecentlyViewed from '../pages/Personal/RecentlyViewed';

// Community
import Reviews from '../pages/Community/Reviews';
import Forum from '../pages/Community/Forum';
import CommunityHub from '../pages/Community/CommunityHub';
import ActivityFeed from '../pages/Community/ActivityFeed';

// Content
import News from '../pages/Content/News';
import Blog from '../pages/Content/Blog';

// Utility
import Notifications from '../pages/Utility/Notifications';
import ActivityLogs from '../pages/Utility/ActivityLogs';
import Reports from '../pages/Utility/Reports';
import HelpCenter from '../pages/Utility/HelpCenter';
import ContactUs from '../pages/Utility/ContactUs';
import AboutUs from '../pages/Utility/AboutUs';

// Admin
import AdminDashboard from '../pages/Admin/AdminDashboard';
import UserManagement from '../pages/Admin/UserManagement';
import GameManagement from '../pages/Admin/GameManagement';
import AnalyticsManagement from '../pages/Admin/AnalyticsManagement';
import ReportsManagement from '../pages/Admin/ReportsManagement';
import SystemMonitoring from '../pages/Admin/SystemMonitoring';

// Errors
import NotFound from '../pages/Errors/NotFound';
import Unauthorized from '../pages/Errors/Unauthorized';
import ServerError from '../pages/Errors/ServerError';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token) return <Navigate to="/dashboard" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

      {/* Default route redirect based on auth */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected Routes inside Layout */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      {/* Games */}
      <Route path="/games" element={<ProtectedRoute><GamesList /></ProtectedRoute>} />
      <Route path="/games/:id" element={<ProtectedRoute><GameDetail /></ProtectedRoute>} />
      <Route path="/games/trending" element={<ProtectedRoute><TrendingGames /></ProtectedRoute>} />
      <Route path="/games/new-releases" element={<ProtectedRoute><NewReleases /></ProtectedRoute>} />
      <Route path="/games/top-rated" element={<ProtectedRoute><TopRated /></ProtectedRoute>} />
      <Route path="/games/free-to-play" element={<ProtectedRoute><FreeToPlay /></ProtectedRoute>} />
      <Route path="/games/indie" element={<ProtectedRoute><IndieGames /></ProtectedRoute>} />

      {/* Discovery */}
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/genres" element={<ProtectedRoute><GenreExplorer /></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />

      {/* Analytics */}
      <Route path="/analytics/genres" element={<ProtectedRoute><GenreAnalytics /></ProtectedRoute>} />
      <Route path="/analytics/platforms" element={<ProtectedRoute><PlatformAnalytics /></ProtectedRoute>} />
      <Route path="/analytics/releases" element={<ProtectedRoute><ReleaseTrends /></ProtectedRoute>} />
      <Route path="/analytics/pricing" element={<ProtectedRoute><PriceAnalytics /></ProtectedRoute>} />
      <Route path="/analytics/developers" element={<ProtectedRoute><DeveloperAnalytics /></ProtectedRoute>} />
      <Route path="/analytics/publishers" element={<ProtectedRoute><PublisherAnalytics /></ProtectedRoute>} />

      {/* Developers & Publishers */}
      <Route path="/developers" element={<ProtectedRoute><DevelopersDirectory /></ProtectedRoute>} />
      <Route path="/developers/:id" element={<ProtectedRoute><DeveloperDetail /></ProtectedRoute>} />
      <Route path="/publishers" element={<ProtectedRoute><PublishersDirectory /></ProtectedRoute>} />
      <Route path="/publishers/:id" element={<ProtectedRoute><PublisherDetail /></ProtectedRoute>} />

      {/* Profile */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* Personal */}
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
      <Route path="/recently-viewed" element={<ProtectedRoute><RecentlyViewed /></ProtectedRoute>} />

      {/* Community */}
      <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
      <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><CommunityHub /></ProtectedRoute>} />
      <Route path="/activity" element={<ProtectedRoute><ActivityFeed /></ProtectedRoute>} />

      {/* Content */}
      <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
      <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />

      {/* Utility */}
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/logs" element={<ProtectedRoute><ActivityLogs /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/help" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/games" element={<ProtectedRoute><GameManagement /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><AnalyticsManagement /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute><ReportsManagement /></ProtectedRoute>} />
      <Route path="/admin/monitoring" element={<ProtectedRoute><SystemMonitoring /></ProtectedRoute>} />

      {/* Errors */}
      <Route path="/unauthorized" element={<ProtectedRoute><Unauthorized /></ProtectedRoute>} />
      <Route path="/server-error" element={<ProtectedRoute><ServerError /></ProtectedRoute>} />
      
      {/* 404 Catch All */}
      <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
