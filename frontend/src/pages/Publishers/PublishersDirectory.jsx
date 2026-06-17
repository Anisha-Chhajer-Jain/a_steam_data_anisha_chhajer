import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, InputAdornment, Avatar, Chip, Stack } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const mockPubs = [
  { id: 1, name: 'Valve', titles: 38, founded: 2003, country: '🇺🇸', types: ['Digital Distribution', 'Self-Published'] },
  { id: 2, name: 'Electronic Arts', titles: 112, founded: 1982, country: '🇺🇸', types: ['AAA', 'Sports', 'Mobile'] },
  { id: 3, name: 'Ubisoft', titles: 89, founded: 1986, country: '🇫🇷', types: ['AAA', 'Adventure'] },
  { id: 4, name: 'Activision Blizzard', titles: 44, founded: 1979, country: '🇺🇸', types: ['AAA', 'FPS', 'MMO'] },
  { id: 5, name: 'Square Enix', titles: 71, founded: 1975, country: '🇯🇵', types: ['RPG', 'Strategy'] },
  { id: 6, name: 'Paradox Interactive', titles: 55, founded: 1999, country: '🇸🇪', types: ['Strategy', 'Simulation'] },
  { id: 7, name: 'Team17', titles: 48, founded: 1990, country: '🇬🇧', types: ['Indie', 'Publisher'] },
  { id: 8, name: 'Devolver Digital', titles: 62, founded: 2009, country: '🇺🇸', types: ['Indie', 'Action'] },
  { id: 9, name: '2K Games', titles: 35, founded: 2005, country: '🇺🇸', types: ['AAA', 'Sports', 'RPG'] },
  { id: 10, name: 'THQ Nordic', titles: 67, founded: 2011, country: '🇦🇹', types: ['AAA', 'Indie'] },
  { id: 11, name: 'Focus Entertainment', titles: 43, founded: 1996, country: '🇫🇷', types: ['Action', 'Simulation'] },
  { id: 12, name: 'Raw Fury', titles: 28, founded: 2015, country: '🇸🇪', types: ['Indie'] },
];

const PublishersDirectory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = mockPubs.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Helmet><title>Publishers – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>DIRECTORY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Game Publishers</Typography>
      </Box>
      <TextField fullWidth placeholder="Search publishers..." value={search} onChange={e => setSearch(e.target.value)}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment> } }}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#161b27', borderRadius: 2 } }} />
      <Grid container spacing={2.5}>
        {filtered.map(pub => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pub.id}>
            <Paper onClick={() => navigate(`/publishers/${pub.id}`)} sx={{ p: 2.5, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-3px)', borderColor: 'rgba(108,143,255,0.3)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: '#1e2637', color: '#00e5a0', fontWeight: 900, width: 48, height: 48, border: '2px solid rgba(0,229,160,0.2)' }}>
                  {pub.name[0]}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" sx={{ color: '#e8eaf6', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pub.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#7986cb' }}>Founded {pub.founded} {pub.country}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#00e5a0', fontWeight: 700 }}>{pub.titles} Titles</Typography>
                <Stack direction="row" spacing={0.5}>
                  {pub.types.slice(0, 2).map(t => <Chip key={t} label={t} size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: 'rgba(0,229,160,0.1)', color: '#00e5a0' }} />)}
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PublishersDirectory;
