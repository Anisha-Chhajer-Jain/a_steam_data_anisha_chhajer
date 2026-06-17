import React, { useEffect } from 'react';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { Brush } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters } from '../../store/gamesSlice';
import { GameCard } from './GamesList';

const IndieGames = () => {
  const dispatch = useDispatch();
  const { gamesList, loading } = useSelector(s => s.games);

  useEffect(() => {
    dispatch(setFilters({ genre: 'Indie', sort: 'rating' }));
    dispatch(fetchGames({ page: 1, limit: 24, genre: 'Indie' }));
  }, [dispatch]);

  return (
    <Box>
      <Helmet><title>Indie Games – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Brush sx={{ color: '#a78bfa', fontSize: 32 }} />
        <Box>
          <Typography variant="overline" sx={{ color: '#a78bfa', fontWeight: 700 }}>INDIE SHOWCASE</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Indie Games</Typography>
        </Box>
      </Box>
      <Grid container spacing={2.5}>
        {loading ? [1,2,3,4,5,6,8,9,10,12].map(i => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
            <Skeleton variant="rectangular" height={230} sx={{ borderRadius: 2.5, bgcolor: '#161b27' }} />
          </Grid>
        )) : gamesList.slice(0, 24).map(game => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IndieGames;
