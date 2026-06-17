import React, { useEffect } from 'react';
import { Box, Typography, Grid, Skeleton, Chip } from '@mui/material';
import { NewReleases as NewReleasesIcon } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters } from '../../store/gamesSlice';
import { GameCard } from './GamesList';

const NewReleases = () => {
  const dispatch = useDispatch();
  const { gamesList, loading } = useSelector(s => s.games);

  useEffect(() => {
    dispatch(setFilters({ sort: 'release_date', genre: '' }));
    dispatch(fetchGames({ page: 1, limit: 24, sort: 'release_date' }));
  }, [dispatch]);

  return (
    <Box>
      <Helmet><title>New Releases – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <NewReleasesIcon sx={{ color: '#00d4ff', fontSize: 32 }} />
        <Box>
          <Typography variant="overline" sx={{ color: '#00d4ff', fontWeight: 700 }}>JUST LAUNCHED</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>New Releases</Typography>
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

export default NewReleases;
