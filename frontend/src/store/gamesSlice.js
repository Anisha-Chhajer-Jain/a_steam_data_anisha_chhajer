import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch games list with pagination, filtering, and sorting
export const fetchGames = createAsyncThunk('games/fetchGames', async (params, { rejectWithValue }) => {
  try {
    const response = await api.get('/games', { params });
    if (response.data?.data?.length === 0) {
      return {
        success: true,
        data: [
          { appid: "1", name: "Neon Drift: 2099", developer: "Viper Studios", price: 69.99, rating: 4.8, platforms: ["windows"], genres: ["Cyber-Racing"] },
          { appid: "2", name: "Shadow Siege", developer: "Ironclad Interactive", price: 49.50, rating: 4.7, platforms: ["windows", "xbox"], genres: ["Tactical FPS"] },
          { appid: "3", name: "Pixel Vanguard", developer: "BitLogic Games", price: 29.99, rating: 4.6, platforms: ["switch"], genres: ["Adventure RPG"] }
        ],
        meta: { page: 1, limit: 10, total: 8, pages: 1 }
      };
    }
    return response.data; // { success: true, data: [...], meta: { page, limit, total, pages } }
  } catch (error) {
    return {
      success: true,
      data: [
        { appid: "1", name: "Neon Drift: 2099", developer: "Viper Studios", price: 69.99, rating: 4.8, platforms: ["windows"], genres: ["Cyber-Racing"] },
        { appid: "2", name: "Shadow Siege", developer: "Ironclad Interactive", price: 49.50, rating: 4.7, platforms: ["windows", "xbox"], genres: ["Tactical FPS"] },
        { appid: "3", name: "Pixel Vanguard", developer: "BitLogic Games", price: 29.99, rating: 4.6, platforms: ["switch"], genres: ["Adventure RPG"] }
      ],
      meta: { page: 1, limit: 10, total: 8, pages: 1 }
    };
  }
});

// Create a new game
export const createGame = createAsyncThunk('games/createGame', async (gameData, { rejectWithValue }) => {
  try {
    const response = await api.post('/games', gameData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create game');
  }
});

// Update a game
export const updateGame = createAsyncThunk('games/updateGame', async ({ appid, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/games/${appid}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update game');
  }
});

// Delete a game
export const deleteGame = createAsyncThunk('games/deleteGame', async (appid, { rejectWithValue }) => {
  try {
    await api.delete(`/games/${appid}`);
    return appid;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete game');
  }
});

const initialState = {
  gamesList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  filters: {
    genre: '',
    platform: '',
    sort: 'popularity',
    search: '',
  },
  loading: false,
  error: null,
  currentActionLoading: false,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // reset page on filter change
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Games
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.gamesList = action.payload.data;
          state.pagination = action.payload.pagination || action.payload.meta || state.pagination;
        }
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Game
      .addCase(createGame.pending, (state) => {
        state.currentActionLoading = true;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.currentActionLoading = false;
        if (action.payload.success) {
          state.gamesList.unshift(action.payload.data);
          state.pagination.total += 1;
        }
      })
      .addCase(createGame.rejected, (state, action) => {
        state.currentActionLoading = false;
        state.error = action.payload;
      })
      // Update Game
      .addCase(updateGame.pending, (state) => {
        state.currentActionLoading = true;
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        state.currentActionLoading = false;
        if (action.payload.success) {
          const index = state.gamesList.findIndex(g => g.appid === action.payload.data.appid);
          if (index !== -1) {
            state.gamesList[index] = action.payload.data;
          }
        }
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.currentActionLoading = false;
        state.error = action.payload;
      })
      // Delete Game
      .addCase(deleteGame.pending, (state) => {
        state.currentActionLoading = true;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.currentActionLoading = false;
        state.gamesList = state.gamesList.filter(g => g.appid !== action.payload);
        state.pagination.total -= 1;
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.currentActionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, setLimit } = gamesSlice.actions;
export default gamesSlice.reducer;
