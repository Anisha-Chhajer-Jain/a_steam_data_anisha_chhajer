import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { History, Delete } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { clearRecentlyViewed } from '../../store/wishlistSlice';
import { GameCard } from '../Games/GamesList';

const RecentlyViewed = () => {
  const dispatch = useDispatch();
  const { recentlyViewed } = useSelector(s => s.wishlist);
  return (
    <Box>
      <Helmet><title>Recently Viewed – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#00d4ff', fontWeight: 700 }}>PERSONAL</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Recently Viewed</Typography>
        </Box>
        {recentlyViewed.length > 0 && (
          <Button startIcon={<Delete />} size="small" onClick={() => dispatch(clearRecentlyViewed())} sx={{ color: '#ff4f6a' }}>Clear History</Button>
        )}
      </Box>
      {recentlyViewed.length === 0 ? (
        <Paper sx={{ p: 8, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
          <History sx={{ fontSize: 64, color: '#1e2637', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#455a64' }}>No browsing history yet</Typography>
          <Typography variant="body2" sx={{ color: '#37474f' }}>Games you visit will appear here.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2.5}>
          {recentlyViewed.map(game => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.appid}><GameCard game={game} /></Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecentlyViewed;
