import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { GameCard } from '../Games/GamesList';

const Favorites = () => {
  const { favorites } = useSelector(s => s.wishlist);
  return (
    <Box>
      <Helmet><title>Favorites – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>PERSONAL</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>My Favorites</Typography>
      </Box>
      {favorites.length === 0 ? (
        <Paper sx={{ p: 8, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
          <FavoriteIcon sx={{ fontSize: 64, color: '#1e2637', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#455a64', mb: 1 }}>No favorites yet</Typography>
          <Typography variant="body2" sx={{ color: '#37474f' }}>Click the heart icon on any game to add it to favorites.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2.5}>
          {favorites.map(game => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}><GameCard game={game} /></Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
