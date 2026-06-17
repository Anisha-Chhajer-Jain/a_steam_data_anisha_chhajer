import React from 'react';
import { Box, Typography, Grid, Paper, Chip, Avatar, Stack } from '@mui/material';
import { Book, AccessTime } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const posts = [
  { id: 1, title: 'How to Build Your Ultimate Gaming PC in 2024', category: 'Hardware', author: 'TechGamer', time: '3 days ago', readTime: '10 min read', excerpt: 'A complete step-by-step guide to building a high-end gaming rig that will last you years.', avatar: 'T' },
  { id: 2, title: 'The History of Steam: From Valve\'s Dream to Gaming Empire', category: 'History', author: 'GamingHistorian', time: '1 week ago', readTime: '15 min read', excerpt: 'How a simple content delivery platform became the world\'s largest PC gaming marketplace.', avatar: 'G' },
  { id: 3, title: '10 Tips to Improve Your FPS in Competitive Games', category: 'Tips', author: 'ProGamer101', time: '2 weeks ago', readTime: '7 min read', excerpt: 'From settings optimization to hardware tips, these techniques will help you get more frames.', avatar: 'P' },
  { id: 4, title: 'Why Indie Games Are Changing the Industry', category: 'Opinion', author: 'IndieAdvocate', time: '3 weeks ago', readTime: '9 min read', excerpt: 'Small teams with big ideas are pushing gaming in directions AAA studios never dared to go.', avatar: 'I' },
  { id: 5, title: 'The Art of Game Storytelling: A Deep Dive', category: 'Design', author: 'NarrativeNerd', time: '1 month ago', readTime: '12 min read', excerpt: 'Exploring how modern games tell compelling stories through mechanics, world design, and character development.', avatar: 'N' },
  { id: 6, title: 'Best Gaming Headsets Under $100 — Reviewed', category: 'Review', author: 'AudioGamer', time: '2 months ago', readTime: '8 min read', excerpt: 'We tested 15 budget gaming headsets to find the best audio quality for your money.', avatar: 'A' },
];

const catColors = { Hardware: '#ff9800', History: '#a78bfa', Tips: '#00e5a0', Opinion: '#6c8fff', Design: '#00d4ff', Review: '#ffb700' };

const Blog = () => (
  <Box>
    <Helmet><title>Blog – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>CONTENT</Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Blog</Typography>
    </Box>
    <Grid container spacing={2.5}>
      {posts.map(p => (
        <Grid size={{ xs: 12, md: 6 }} key={p.id}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-3px)', borderColor: 'rgba(108,143,255,0.3)' } }}>
            <Chip label={p.category} size="small" sx={{ mb: 1.5, bgcolor: `${catColors[p.category]}22`, color: catColors[p.category], fontWeight: 600, fontSize: '0.62rem' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#e8eaf6', mb: 1, lineHeight: 1.4 }}>{p.title}</Typography>
            <Typography variant="body2" sx={{ color: '#7986cb', mb: 2, lineHeight: 1.7 }}>{p.excerpt}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: '#1e2637', color: '#6c8fff', fontSize: '0.75rem', fontWeight: 700 }}>{p.avatar}</Avatar>
              <Typography variant="caption" sx={{ color: '#7986cb', fontWeight: 600 }}>{p.author}</Typography>
              <Typography variant="caption" sx={{ color: '#455a64' }}>• {p.time} • {p.readTime}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Blog;
