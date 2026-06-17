import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, TextField, InputAdornment, Grid, Paper, Chip, Stack, Skeleton, IconButton } from '@mui/material';
import { Search, Clear, BookmarkBorder, Bookmark } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { addSavedSearch, removeSavedSearch } from '../../store/wishlistSlice';
import { fetchGames, setFilters } from '../../store/gamesSlice';
import { GameCard } from '../Games/GamesList';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { gamesList, loading } = useSelector(s => s.games);
  const { savedSearches } = useSelector(s => s.wishlist);
  const [hasSearched, setHasSearched] = useState(false);

  const doSearch = useCallback((q) => {
    if (!q.trim()) return;
    setHasSearched(true);
    dispatch(setFilters({ search: q }));
    dispatch(fetchGames({ search: q, page: 1, limit: 24 }));
  }, [dispatch]);

  const handleKey = (e) => { if (e.key === 'Enter') doSearch(query); };
  const handleSaveSearch = () => {
    if (query.trim()) { dispatch(addSavedSearch(query.trim())); toast.success('Search saved!'); }
  };

  return (
    <Box>
      <Helmet><title>Search – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>DISCOVERY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Search Games</Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
        <Stack direction="row" spacing={1}>
          <TextField fullWidth placeholder="Search by game title, developer, genre..." value={query}
            onChange={e => setQuery(e.target.value)} onKeyDown={handleKey}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: '#6c8fff' }} /></InputAdornment>,
              endAdornment: query && <InputAdornment position="end"><IconButton size="small" onClick={() => { setQuery(''); setHasSearched(false); }}><Clear sx={{ color: '#7986cb', fontSize: 18 }} /></IconButton></InputAdornment>
            }}}
            sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117', borderRadius: 2 } }} />
          <IconButton onClick={handleSaveSearch} title="Save this search" sx={{ bgcolor: '#1e2637', color: '#6c8fff', borderRadius: 2, '&:hover': { bgcolor: '#2a3448' } }}>
            <BookmarkBorder />
          </IconButton>
        </Stack>

        {savedSearches.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" sx={{ color: '#7986cb', fontWeight: 700, display: 'block', mb: 1 }}>SAVED SEARCHES</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {savedSearches.map(s => (
                <Chip key={s} label={s} size="small" clickable onClick={() => { setQuery(s); doSearch(s); }}
                  onDelete={() => dispatch(removeSavedSearch(s))}
                  sx={{ bgcolor: 'rgba(108,143,255,0.1)', color: '#6c8fff', fontWeight: 600 }} />
              ))}
            </Stack>
          </Box>
        )}
      </Paper>

      {!hasSearched && !loading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Search sx={{ fontSize: 64, color: '#1e2637', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#455a64' }}>Type to search the game database</Typography>
          <Typography variant="body2" sx={{ color: '#37474f', mt: 1 }}>Press Enter to search</Typography>
        </Box>
      )}

      {hasSearched && (
        <>
          <Typography variant="body2" sx={{ color: '#7986cb', mb: 2 }}>
            {loading ? 'Searching...' : `Found ${gamesList.length} results for "${query}"`}
          </Typography>
          <Grid container spacing={2.5}>
            {loading ? [1,2,3,4,5,6].map(i => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                <Skeleton variant="rectangular" height={230} sx={{ borderRadius: 2.5, bgcolor: '#161b27' }} />
              </Grid>
            )) : gamesList.map(game => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}>
                <GameCard game={game} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default SearchPage;
