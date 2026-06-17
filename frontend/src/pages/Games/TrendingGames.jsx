import React, { useEffect } from 'react';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { WhatshotOutlined } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters } from '../../store/gamesSlice';
import { GameCard } from './GamesList';

const TrendingGames = () => {
  const dispatch = useDispatch();
  const { gamesList, loading } = useSelector(s => s.games);

  useEffect(() => {
    dispatch(setFilters({ sort: 'popularity', genre: '' }));
    dispatch(fetchGames({ page: 1, limit: 24, sort: 'popularity' }));
  }, [dispatch]);

  return (
    <Box>
      <Helmet><title>Trending Games – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <WhatshotOutlined sx={{ color: '#ff4f6a', fontSize: 32 }} />
        <Box>
          <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>HOT RIGHT NOW</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Trending Games</Typography>
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

export default TrendingGames;
