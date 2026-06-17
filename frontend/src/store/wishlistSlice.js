import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage for persistence
const loadState = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : [];
  } catch { return []; }
};

const saveState = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadState('wishlist'),
    favorites: loadState('favorites'),
    recentlyViewed: loadState('recentlyViewed'),
    savedSearches: loadState('savedSearches'),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(g => g.appid === action.payload.appid);
      if (!exists) {
        state.items.unshift(action.payload);
        saveState('wishlist', state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(g => g.appid !== action.payload);
      saveState('wishlist', state.items);
    },
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(g => g.appid === action.payload.appid);
      if (!exists) {
        state.favorites.unshift(action.payload);
        saveState('favorites', state.favorites);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(g => g.appid !== action.payload);
      saveState('favorites', state.favorites);
    },
    addRecentlyViewed: (state, action) => {
      state.recentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter(g => g.appid !== action.payload.appid)
      ].slice(0, 20);
      saveState('recentlyViewed', state.recentlyViewed);
    },
    addSavedSearch: (state, action) => {
      const exists = state.savedSearches.includes(action.payload);
      if (!exists) {
        state.savedSearches = [action.payload, ...state.savedSearches].slice(0, 10);
        saveState('savedSearches', state.savedSearches);
      }
    },
    removeSavedSearch: (state, action) => {
      state.savedSearches = state.savedSearches.filter(s => s !== action.payload);
      saveState('savedSearches', state.savedSearches);
    },
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
      saveState('recentlyViewed', []);
    },
  },
});

export const {
  addToWishlist, removeFromWishlist,
  addToFavorites, removeFromFavorites,
  addRecentlyViewed, addSavedSearch, removeSavedSearch, clearRecentlyViewed
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
