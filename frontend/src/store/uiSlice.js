import { createSlice } from '@reduxjs/toolkit';

const storedTheme = localStorage.getItem('themeMode') || 'dark';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    themeMode: storedTheme,
    globalLoading: false,
    errors: {},
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', state.themeMode);
    },
    setTheme: (state, action) => {
      state.themeMode = action.payload;
      localStorage.setItem('themeMode', action.payload);
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setError: (state, action) => {
      const { key, message } = action.payload;
      state.errors[key] = message;
    },
    clearError: (state, action) => {
      delete state.errors[action.payload];
    },
    clearAllErrors: (state) => {
      state.errors = {};
    },
  },
});

export const {
  toggleSidebar, setSidebarOpen,
  toggleTheme, setTheme,
  setGlobalLoading, setError, clearError, clearAllErrors,
} = uiSlice.actions;

export default uiSlice.reducer;
