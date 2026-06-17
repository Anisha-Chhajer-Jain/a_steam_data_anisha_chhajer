import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Chip, Button, TextField, InputAdornment, MenuItem, Select, FormControl, Pagination, Stack, Skeleton } from '@mui/material';
import { Search, WhatshotOutlined, Bookmark, BookmarkBorder, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters, setPage } from '../../store/gamesSlice';
import { addToWishlist, removeFromWishlist, addToFavorites, removeFromFavorites } from '../../store/wishlistSlice';
import { toast } from 'react-toastify';

const genreColors = { Action: '#ff4f6a', Adventure: '#00d4ff', RPG: '#ffb700', Strategy: '#00e5a0', Indie: '#a78bfa', Simulation: '#6c8fff', Racing: '#ff9800', Sports: '#4caf50' };

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const { items: wishlist, favorites } = useSelector(s => s.wishlist);
  const isWishlisted = wishlist.some(g => g.appid === game.appid);
  const isFav = favorites.some(g => g.appid === game.appid);
  const genres = Array.isArray(game.genres) ? game.genres.slice(0, 2) : [];
  const rating = parseFloat(game.positive_ratings || game.rating || 0);
  const price = parseFloat(game.price || 0);

  return (
    <Paper sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(108,143,255,0.15)' } }}>
      <Box sx={{ height: 140, bgcolor: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <WhatshotOutlined sx={{ fontSize: 48, color: '#1e2637' }} />
        <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
          <Button size="small" onClick={() => { dispatch(isWishlisted ? removeFromWishlist(game.appid) : addToWishlist(game)); toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
            sx={{ minWidth: 0, p: 0.5, color: isWishlisted ? '#6c8fff' : '#455a64', bgcolor: 'rgba(13,17,23,0.8)', borderRadius: 1 }}>
            {isWishlisted ? <Bookmark fontSize="small" /> : <BookmarkBorder fontSize="small" />}
          </Button>
          <Button size="small" onClick={() => { dispatch(isFav ? removeFromFavorites(game.appid) : addToFavorites(game)); toast.info(isFav ? 'Removed from favorites' : 'Added to favorites'); }}
            sx={{ minWidth: 0, p: 0.5, color: isFav ? '#ff4f6a' : '#455a64', bgcolor: 'rgba(13,17,23,0.8)', borderRadius: 1 }}>
            {isFav ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </Button>
        </Box>
        <Chip label={price === 0 ? 'FREE' : `$${price.toFixed(2)}`} size="small" sx={{ position: 'absolute', bottom: 8, left: 8, bgcolor: price === 0 ? 'rgba(0,229,160,0.15)' : 'rgba(108,143,255,0.15)', color: price === 0 ? '#00e5a0' : '#6c8fff', fontWeight: 700, fontSize: '0.65rem' }} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 0.5, fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {game.name || 'Unknown Game'}
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
          {genres.map(g => (
            <Chip key={g} label={g} size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: `${genreColors[g] || '#455a64'}22`, color: genreColors[g] || '#90a4ae', fontWeight: 600 }} />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: '#ffb700', fontWeight: 700 }}>★ {rating > 0 ? (rating / 10000).toFixed(1) + 'K' : 'N/A'}</Typography>
          <Typography variant="caption" sx={{ color: '#455a64' }}>{game.developer || 'Unknown'}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const GamesList = () => {
  const dispatch = useDispatch();
  const { gamesList, loading, pagination, filters } = useSelector(s => s.games);
  const [search, setSearch] = useState('');

  useEffect(() => { dispatch(fetchGames({ page: pagination.page, limit: pagination.limit, ...filters })); }, [dispatch, pagination.page, filters]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') { dispatch(setFilters({ search })); }
  };

  return (
    <Box>
      <Helmet><title>All Games – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>GAMES LIBRARY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>All Games</Typography>
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField size="small" placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment> } }}
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { bgcolor: '#161b27', borderRadius: 2 } }} />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select value={filters.sort || 'popularity'} onChange={e => dispatch(setFilters({ sort: e.target.value }))} sx={{ bgcolor: '#161b27' }}>
            <MenuItem value="popularity">Most Popular</MenuItem>
            <MenuItem value="rating">Top Rated</MenuItem>
            <MenuItem value="price_asc">Price: Low to High</MenuItem>
            <MenuItem value="price_desc">Price: High to Low</MenuItem>
            <MenuItem value="release_date">Newest First</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <Select value={filters.genre || ''} onChange={e => dispatch(setFilters({ genre: e.target.value }))} displayEmpty sx={{ bgcolor: '#161b27' }}>
            <MenuItem value="">All Genres</MenuItem>
            {['Action', 'Adventure', 'RPG', 'Strategy', 'Indie', 'Simulation', 'Racing', 'Sports'].map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>
      <Grid container spacing={2.5}>
        {loading ? [1,2,3,4,5,6,8,9,10,12].map(i => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
            <Skeleton variant="rectangular" height={230} sx={{ borderRadius: 2.5, bgcolor: '#161b27' }} />
          </Grid>
        )) : gamesList.map(game => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
      {!loading && pagination.pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={pagination.pages} page={pagination.page} onChange={(_, p) => dispatch(setPage(p))} color="primary" />
        </Box>
      )}
    </Box>
  );
};

export default GamesList;
export { GameCard };
