import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { Recommend, Favorite, Bookmark } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../store/gamesSlice';
import { GameCard } from '../Games/GamesList';

const Recommendations = () => {
  const dispatch = useDispatch();
  const { gamesList, loading } = useSelector(s => s.games);
  const { items: wishlist, favorites } = useSelector(s => s.wishlist);
  const allPersonal = [...wishlist, ...favorites];
  const genres = [...new Set(allPersonal.flatMap(g => Array.isArray(g.genres) ? g.genres : []))];

  useEffect(() => { dispatch(fetchGames({ page: 1, limit: 24 })); }, [dispatch]);

  const recommended = gamesList.filter(g =>
    !allPersonal.some(p => p.appid === g.appid) &&
    (genres.length === 0 || (Array.isArray(g.genres) && g.genres.some(genre => genres.includes(genre))))
  ).slice(0, 12);

  return (
    <Box>
      <Helmet><title>Recommendations – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Recommend sx={{ color: '#00e5a0', fontSize: 32 }} />
        <Box>
          <Typography variant="overline" sx={{ color: '#00e5a0', fontWeight: 700 }}>CURATED FOR YOU</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Recommendations</Typography>
        </Box>
      </Box>

      {genres.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ color: '#7986cb', display: 'block', mb: 1, fontWeight: 700 }}>Based on your interests:</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {genres.map(g => <Chip key={g} label={g} size="small" sx={{ bgcolor: 'rgba(108,143,255,0.1)', color: '#6c8fff' }} />)}
          </Box>
        </Paper>
      )}

      {allPersonal.length === 0 && (
        <Paper sx={{ p: 4, mb: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2, textAlign: 'center' }}>
          <Favorite sx={{ fontSize: 48, color: '#1e2637', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#455a64', mb: 1 }}>No personalization data yet</Typography>
          <Typography variant="body2" sx={{ color: '#37474f' }}>Add games to your Wishlist or Favorites to get personalized recommendations.</Typography>
        </Paper>
      )}

      <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>
        {recommended.length > 0 ? 'You might like these' : 'Popular Picks'}
      </Typography>
      <Grid container spacing={2.5}>
        {(recommended.length > 0 ? recommended : gamesList.slice(0, 12)).map(game => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recommendations;
