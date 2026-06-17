import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Chip, Stack, Button, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Code, Star, SportsEsports } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const mockDevs = {
  '1': { id: 1, name: 'Valve', games: 42, genres: ['Action', 'Strategy', 'Indie'], founded: 1996, country: '🇺🇸', employees: '336', about: 'Valve Corporation is an American video game developer and publisher. It is also the developer of the Steam digital distribution platform.', topGames: ['Counter-Strike 2', 'Dota 2', 'Half-Life: Alyx', 'Portal 2', 'Team Fortress 2'] },
  '2': { id: 2, name: 'CD Projekt RED', games: 8, genres: ['RPG', 'Adventure'], founded: 2002, country: '🇵🇱', employees: '865', about: 'CD Projekt Red is a Polish video game developer and publisher known for The Witcher series and Cyberpunk 2077.', topGames: ['Cyberpunk 2077', 'The Witcher 3', 'The Witcher 2', 'Gwent'] },
};

const DeveloperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dev = mockDevs[id] || { id, name: 'Unknown Developer', games: 0, genres: [], founded: 'N/A', country: '', employees: '?', about: 'No information available.', topGames: [] };

  return (
    <Box>
      <Helmet><title>{dev.name} – Arcade Stream</title></Helmet>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/developers')} sx={{ mb: 2, color: '#7986cb', '&:hover': { color: '#e8eaf6' } }}>Back to Developers</Button>
      <Paper sx={{ p: 4, mb: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#1e2637', color: '#6c8fff', fontWeight: 900, fontSize: '2rem', border: '3px solid rgba(108,143,255,0.3)' }}>
            {dev.name[0]}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#e8eaf6' }}>{dev.country} {dev.name}</Typography>
            <Typography variant="body2" sx={{ color: '#7986cb' }}>Founded {dev.founded} • {dev.employees} employees</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {dev.genres.map(g => <Chip key={g} label={g} size="small" sx={{ bgcolor: 'rgba(108,143,255,0.1)', color: '#6c8fff', fontWeight: 600 }} />)}
            </Stack>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2 }} />
        <Typography variant="body1" sx={{ color: '#90a4ae', lineHeight: 1.8 }}>{dev.about}</Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
            <SportsEsports sx={{ fontSize: 36, color: '#6c8fff', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#e8eaf6' }}>{dev.games}</Typography>
            <Typography variant="caption" sx={{ color: '#7986cb' }}>Total Games</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Notable Games</Typography>
            <Stack spacing={1}>
              {dev.topGames.map((game, i) => (
                <Box key={game} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: '#1e2637', borderRadius: 2 }}>
                  <Typography sx={{ color: '#455a64', fontWeight: 700, width: 20 }}>#{i + 1}</Typography>
                  <Star sx={{ color: '#ffb700', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600 }}>{game}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeveloperDetail;
