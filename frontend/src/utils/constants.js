// API endpoint constants — maps to the backend route structure
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_PROFILE: '/auth/profile',
  AUTH_CHANGE_PASSWORD: '/auth/change-password',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',

  // JWT
  JWT_GENERATE: '/jwt/generate-token',
  JWT_VERIFY: '/jwt/verify-token',
  JWT_PROFILE: '/jwt/profile',
  JWT_REFRESH: '/jwt/refresh-token',
  JWT_REVOKE: '/jwt/revoke-token',

  // Games
  GAMES: '/games',
  GAME_BY_ID: (appid) => `/games/${appid}`,
  GAME_SUMMARY: (appid) => `/games/${appid}/summary`,
  GAME_RELATED: (appid) => `/games/${appid}/related`,
  GAME_HISTORY: (appid) => `/games/${appid}/history`,
  GAME_EXISTS: (appid) => `/games/exists/${appid}`,
  GAME_ARCHIVE: (appid) => `/games/${appid}/archive`,
  GAME_RESTORE: (appid) => `/games/${appid}/restore`,
  GAME_SEARCH: '/search/games',

  // Analytics
  ANALYTICS_REVENUE_TOTAL: '/analytics/revenue/total',
  ANALYTICS_REVENUE_MONTHLY: '/analytics/revenue/monthly',
  ANALYTICS_ORDERS_COUNT: '/analytics/orders/count',
  ANALYTICS_CATEGORIES_TOP: '/analytics/categories/top',
  ANALYTICS_PRODUCTS_TOP: '/analytics/products/top-selling',
  ANALYTICS_PAYMENTS: '/analytics/payments/distribution',
};

// App routes
export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  GAMES: '/games',
  GAME_DETAIL: '/games/:appid',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// Theme mode values
export const THEME_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
};

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const LIMIT_OPTIONS = [5, 10, 25, 50];

// Sort options matching backend sortMap
export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating', label: 'Rating (High to Low)' },
  { value: 'rating-asc', label: 'Rating (Low to High)' },
  { value: 'releaseDate', label: 'Release Date (Newest)' },
  { value: 'title', label: 'Title (A-Z)' },
];

// Genre filter options
export const GENRE_OPTIONS = [
  'Action', 'RPG', 'Strategy', 'Adventure', 'Simulation',
  'Sports', 'Puzzle', 'Horror', 'Racing', 'Fighting',
  'Platformer', 'Shooter', 'Indie', 'Casual'
];

// Platform filter options
export const PLATFORM_OPTIONS = [
  'windows', 'mac', 'linux'
];

// Chart colors
export const CHART_COLORS = [
  '#66c0f4', '#00C49F', '#FFBB28', '#FF8042',
  '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'
];
