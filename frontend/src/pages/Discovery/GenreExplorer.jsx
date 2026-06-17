import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Explore } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../store/gamesSlice';

const genres = [
  { name: 'Action', color: '#ff4f6a', bg: 'rgba(255,79,106,0.1)', emoji: '⚔️', desc: 'Fast-paced combat & shooters' },
  { name: 'Adventure', color: '#00d4ff', bg: 'rgba(0,212,255,0.1)', emoji: '🗺️', desc: 'Explore vast worlds' },
  { name: 'RPG', color: '#ffb700', bg: 'rgba(255,183,0,0.1)', emoji: '🧙', desc: 'Level up your character' },
  { name: 'Strategy', color: '#00e5a0', bg: 'rgba(0,229,160,0.1)', emoji: '♟️', desc: 'Plan & conquer' },
  { name: 'Indie', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', emoji: '🎨', desc: 'Creative indie experiences' },
  { name: 'Simulation', color: '#6c8fff', bg: 'rgba(108,143,255,0.1)', emoji: '🏗️', desc: 'Build & manage worlds' },
  { name: 'Racing', color: '#ff9800', bg: 'rgba(255,152,0,0.1)', emoji: '🏎️', desc: 'Speed & competition' },
  { name: 'Sports', color: '#4caf50', bg: 'rgba(76,175,80,0.1)', emoji: '⚽', desc: 'Virtual sports leagues' },
  { name: 'Horror', color: '#9c27b0', bg: 'rgba(156,39,176,0.1)', emoji: '👻', desc: 'Thrills & chills' },
  { name: 'Puzzle', color: '#00bcd4', bg: 'rgba(0,188,212,0.1)', emoji: '🧩', desc: 'Brain teasers & logic' },
  { name: 'Casual', color: '#8bc34a', bg: 'rgba(139,195,74,0.1)', emoji: '😌', desc: 'Relax & unwind' },
  { name: 'MMO', color: '#f44336', bg: 'rgba(244,67,54,0.1)', emoji: '🌐', desc: 'Massive multiplayer worlds' },
];

const GenreExplorer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGenreClick = (genre) => {
    dispatch(setFilters({ genre: genre.name }));
    navigate('/games');
  };

  return (
    <Box>
      <Helmet><title>Genre Explorer – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Explore sx={{ color: '#6c8fff', fontSize: 32 }} />
        <Box>
          <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>BROWSE BY GENRE</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Genre Explorer</Typography>
        </Box>
      </Box>
      <Grid container spacing={2.5}>
        {genres.map(genre => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={genre.name}>
            <Paper onClick={() => handleGenreClick(genre)} sx={{
              p: 3, bgcolor: '#161b27', border: `1px solid ${genre.color}33`,
              borderRadius: 3, cursor: 'pointer', transition: 'all 0.2s',
              '&:hover': { transform: 'translateY(-4px)', bgcolor: genre.bg, boxShadow: `0 8px 30px ${genre.color}22` }
            }}>
              <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>{genre.emoji}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: genre.color, mb: 0.5 }}>{genre.name}</Typography>
              <Typography variant="caption" sx={{ color: '#7986cb' }}>{genre.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GenreExplorer;
