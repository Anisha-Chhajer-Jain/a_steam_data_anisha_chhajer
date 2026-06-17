import React from 'react';
import { Box, Typography, Grid, Paper, Chip, Avatar, Stack, Button } from '@mui/material';
import { Newspaper, AccessTime } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const newsItems = [
  { id: 1, title: 'Steam Summer Sale 2024: Everything You Need to Know', category: 'Events', author: 'GamingDesk', time: '2 hours ago', readTime: '4 min read', excerpt: 'The annual Steam Summer Sale is just around the corner. Here are the dates, expected discounts, and the top games to look out for.', hot: true },
  { id: 2, title: 'Elden Ring DLC "Shadow of the Erdtree" Review — A Masterpiece', category: 'Review', author: 'SoulsBorne Weekly', time: '5 hours ago', readTime: '8 min read', excerpt: 'FromSoftware\'s massive expansion is everything fans hoped for and more. We break down every aspect of this stunning DLC.' },
  { id: 3, title: 'Counter-Strike 2 Major 2024: Schedule and Teams', category: 'Esports', author: 'ESL Network', time: '1 day ago', readTime: '3 min read', excerpt: 'The biggest CS2 tournament of the year is almost here. Find out which teams qualified, the schedule, and where to watch.' },
  { id: 4, title: 'Indie Game Spotlight: 10 Hidden Gems You Missed in 2024', category: 'Indie', author: 'IndieWatch', time: '2 days ago', readTime: '6 min read', excerpt: 'From cozy farming sims to brutal roguelikes, we highlight 10 indie games that flew under the radar this year.' },
  { id: 5, title: 'GTA VI Confirmed for PC — Release Date and System Requirements', category: 'Announcement', author: 'Rockstar Fan Central', time: '3 days ago', readTime: '5 min read', excerpt: 'Rockstar Games has officially confirmed GTA VI will come to PC six months after the console launch. Here\'s what we know.' },
  { id: 6, title: 'How AI is Changing Game Development in 2024', category: 'Tech', author: 'DevInsider', time: '4 days ago', readTime: '7 min read', excerpt: 'From procedural generation to NPC behavior, artificial intelligence is revolutionizing how games are made and played.' },
];

const catColors = { Events: '#6c8fff', Review: '#ffb700', Esports: '#ff4f6a', Indie: '#a78bfa', Announcement: '#00e5a0', Tech: '#00d4ff' };

const News = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Helmet><title>Gaming News – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>CONTENT</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Gaming News</Typography>
      </Box>
      {/* Featured Article */}
      <Paper onClick={() => navigate(`/news/1`)} sx={{ p: 4, mb: 4, bgcolor: '#161b27', border: '2px solid rgba(108,143,255,0.3)', borderRadius: 3, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: '#6c8fff', transform: 'translateY(-2px)' } }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip label="🔥 HOT" size="small" sx={{ bgcolor: 'rgba(255,79,106,0.15)', color: '#ff4f6a', fontWeight: 700 }} />
          <Chip label={newsItems[0].category} size="small" sx={{ bgcolor: `${catColors[newsItems[0].category]}22`, color: catColors[newsItems[0].category], fontWeight: 600 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6', mb: 1 }}>{newsItems[0].title}</Typography>
        <Typography variant="body1" sx={{ color: '#90a4ae', mb: 2, lineHeight: 1.7 }}>{newsItems[0].excerpt}</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar sx={{ width: 24, height: 24, bgcolor: '#1e2637', fontSize: '0.7rem' }}>{newsItems[0].author[0]}</Avatar>
          <Typography variant="caption" sx={{ color: '#7986cb' }}>{newsItems[0].author}</Typography>
          <Typography variant="caption" sx={{ color: '#455a64' }}>• {newsItems[0].time} • {newsItems[0].readTime}</Typography>
        </Box>
      </Paper>
      {/* News Grid */}
      <Grid container spacing={2.5}>
        {newsItems.slice(1).map(n => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={n.id}>
            <Paper onClick={() => navigate(`/news/${n.id}`)} sx={{ p: 2.5, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, cursor: 'pointer', height: '100%', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-3px)', borderColor: 'rgba(108,143,255,0.3)' } }}>
              <Chip label={n.category} size="small" sx={{ mb: 1.5, height: 20, fontSize: '0.62rem', bgcolor: `${catColors[n.category] || '#6c8fff'}22`, color: catColors[n.category] || '#6c8fff', fontWeight: 600 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#e8eaf6', mb: 1, lineHeight: 1.4 }}>{n.title}</Typography>
              <Typography variant="body2" sx={{ color: '#7986cb', mb: 2, fontSize: '0.8rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.excerpt}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                <AccessTime sx={{ fontSize: 13, color: '#455a64' }} />
                <Typography variant="caption" sx={{ color: '#455a64' }}>{n.time} • {n.readTime}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default News;
