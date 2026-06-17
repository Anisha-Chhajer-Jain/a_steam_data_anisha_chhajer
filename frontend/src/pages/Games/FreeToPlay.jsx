import React, { useEffect } from 'react';
import { Box, Typography, Grid, Skeleton, Chip, Paper } from '@mui/material';
import { MoneyOff } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters } from '../../store/gamesSlice';
import { GameCard } from './GamesList';

const FreeToPlay = () => {
  const dispatch = useDispatch();
  const { gamesList, loading } = useSelector(s => s.games);
  const freeGames = gamesList.filter(g => parseFloat(g.price || 0) === 0);

  useEffect(() => {
    dispatch(setFilters({ genre: '' }));
    dispatch(fetchGames({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <Box>
      <Helmet><title>Free-to-Play – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <MoneyOff sx={{ color: '#00e5a0', fontSize: 32 }} />
        <Box>
          <Typography variant="overline" sx={{ color: '#00e5a0', fontWeight: 700 }}>COMPLETELY FREE</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Free-to-Play Games</Typography>
        </Box>
      </Box>
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(0,229,160,0.05)', border: '1px solid rgba(0,229,160,0.15)', borderRadius: 2 }}>
        <Typography variant="body2" sx={{ color: '#00e5a0' }}>🎮 {freeGames.length} free games available — no credit card required!</Typography>
      </Paper>
      <Grid container spacing={2.5}>
        {loading ? [1,2,3,4,5,6,8,9,10,12].map(i => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
            <Skeleton variant="rectangular" height={230} sx={{ borderRadius: 2.5, bgcolor: '#161b27' }} />
          </Grid>
        )) : (freeGames.length ? freeGames : gamesList.slice(0, 12)).map(game => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FreeToPlay;
