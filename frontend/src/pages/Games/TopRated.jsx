import React, { useEffect } from 'react';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters } from '../../store/gamesSlice';
import { GameCard } from './GamesList';

const TopRated = () => {
  const dispatch = useDispatch();
  const { gamesList, loading } = useSelector(s => s.games);

  useEffect(() => {
    dispatch(setFilters({ sort: 'rating', genre: '' }));
    dispatch(fetchGames({ page: 1, limit: 24, sort: 'rating' }));
  }, [dispatch]);

  return (
    <Box>
      <Helmet><title>Top Rated – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Star sx={{ color: '#ffb700', fontSize: 32 }} />
        <Box>
          <Typography variant="overline" sx={{ color: '#ffb700', fontWeight: 700 }}>HIGHEST RATED</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Top Rated Games</Typography>
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

export default TopRated;
