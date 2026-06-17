import React from 'react';
import { Box, Typography, Grid, Paper, Button, Stack, Divider } from '@mui/material';
import { BookmarkBorder, Delete, SportsEsports } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../store/wishlistSlice';
import { GameCard } from '../Games/GamesList';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(s => s.wishlist);

  return (
    <Box>
      <Helmet><title>Wishlist – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>PERSONAL</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>My Wishlist</Typography>
        </Box>
        {items.length > 0 && (
          <Typography variant="body2" sx={{ color: '#7986cb' }}>{items.length} games saved</Typography>
        )}
      </Box>

      {items.length === 0 ? (
        <Paper sx={{ p: 8, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
          <BookmarkBorder sx={{ fontSize: 64, color: '#1e2637', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#455a64', mb: 1 }}>Your wishlist is empty</Typography>
          <Typography variant="body2" sx={{ color: '#37474f' }}>Browse games and click the bookmark icon to save them here.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2.5}>
          {items.map(game => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}>
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Wishlist;
