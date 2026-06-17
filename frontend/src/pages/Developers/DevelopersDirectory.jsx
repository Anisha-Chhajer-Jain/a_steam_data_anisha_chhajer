import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, InputAdornment, Avatar, Chip, Stack } from '@mui/material';
import { Search, Code } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const mockDevs = [
  { id: 1, name: 'Valve', games: 42, genres: ['Action', 'Strategy'], founded: 1996, country: '🇺🇸' },
  { id: 2, name: 'CD Projekt RED', games: 8, genres: ['RPG', 'Adventure'], founded: 2002, country: '🇵🇱' },
  { id: 3, name: 'Bethesda Game Studios', games: 31, genres: ['RPG', 'Action'], founded: 2001, country: '🇺🇸' },
  { id: 4, name: 'Rockstar Games', games: 12, genres: ['Action', 'Adventure'], founded: 1998, country: '🇺🇸' },
  { id: 5, name: 'Naughty Dog', games: 19, genres: ['Adventure', 'Action'], founded: 1984, country: '🇺🇸' },
  { id: 6, name: 'FromSoftware', games: 24, genres: ['Action', 'RPG'], founded: 1986, country: '🇯🇵' },
  { id: 7, name: 'Insomniac Games', games: 16, genres: ['Action', 'Adventure'], founded: 1994, country: '🇺🇸' },
  { id: 8, name: 'Ubisoft', games: 87, genres: ['Action', 'Adventure', 'Strategy'], founded: 1986, country: '🇫🇷' },
  { id: 9, name: 'Square Enix', games: 68, genres: ['RPG', 'Strategy'], founded: 1975, country: '🇯🇵' },
  { id: 10, name: 'Team Cherry', games: 3, genres: ['Indie', 'Action'], founded: 2014, country: '🇦🇺' },
  { id: 11, name: 'ConcernedApe', games: 1, genres: ['Indie', 'Simulation'], founded: 2012, country: '🇺🇸' },
  { id: 12, name: 'Supergiant Games', games: 5, genres: ['Indie', 'Action', 'RPG'], founded: 2009, country: '🇺🇸' },
];

const DevelopersDirectory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = mockDevs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Helmet><title>Developers – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>DIRECTORY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Game Developers</Typography>
      </Box>
      <TextField fullWidth placeholder="Search developers..." value={search} onChange={e => setSearch(e.target.value)}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment> } }}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#161b27', borderRadius: 2 } }} />
      <Grid container spacing={2.5}>
        {filtered.map(dev => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dev.id}>
            <Paper onClick={() => navigate(`/developers/${dev.id}`)} sx={{ p: 2.5, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-3px)', borderColor: 'rgba(108,143,255,0.3)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: '#1e2637', color: '#6c8fff', fontWeight: 900, width: 48, height: 48, border: '2px solid rgba(108,143,255,0.2)' }}>
                  {dev.name[0]}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" sx={{ color: '#e8eaf6', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dev.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#7986cb' }}>Founded {dev.founded} {dev.country}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#6c8fff', fontWeight: 700 }}>{dev.games} Games</Typography>
                <Stack direction="row" spacing={0.5}>
                  {dev.genres.slice(0, 2).map(g => <Chip key={g} label={g} size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: 'rgba(108,143,255,0.1)', color: '#6c8fff' }} />)}
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DevelopersDirectory;
