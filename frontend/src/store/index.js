import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import gamesReducer from './gamesSlice';
import analyticsReducer from './analyticsSlice';
import uiReducer from './uiSlice';
import wishlistReducer from './wishlistSlice';
import notificationsReducer from './notificationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
    notifications: notificationsReducer,
  },
});

export default store;
