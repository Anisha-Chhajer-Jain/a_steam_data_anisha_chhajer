import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, Avatar, Button, TextField, Chip, Divider } from '@mui/material';
import { Forum as ForumIcon, Send, Reply } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

const threads = [
  { id: 1, title: 'Best RPGs of 2024?', author: 'GamingElite', replies: 34, views: 892, tag: 'Discussion', time: '2h ago' },
  { id: 2, title: 'Cyberpunk 2.0 vs Vanilla — Which is better?', author: 'NightCityFan', replies: 67, views: 2100, tag: 'Debate', time: '5h ago' },
  { id: 3, title: 'How to get started with Elden Ring as a beginner', author: 'SoulsVet', replies: 89, views: 3400, tag: 'Guide', time: '1d ago' },
  { id: 4, title: 'Indie game recommendations for 2024', author: 'PixelLover', replies: 45, views: 1200, tag: 'Recommendation', time: '2d ago' },
  { id: 5, title: 'Steam Summer Sale predictions thread', author: 'DealHunter', replies: 112, views: 5800, tag: 'Discussion', time: '3d ago' },
];

const tagColors = { Discussion: '#6c8fff', Debate: '#ff4f6a', Guide: '#00e5a0', Recommendation: '#ffb700', News: '#00d4ff' };

const Forum = () => {
  const [newThread, setNewThread] = useState('');
  return (
    <Box>
      <Helmet><title>Forum – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>COMMUNITY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Discussion Forum</Typography>
      </Box>
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Start a New Thread</Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth placeholder="Ask the community something..." value={newThread} onChange={e => setNewThread(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
          <Button variant="contained" startIcon={<Send />} onClick={() => { if (newThread.trim()) { toast.success('Thread posted!'); setNewThread(''); } }}>Post</Button>
        </Stack>
      </Paper>
      <Stack spacing={2}>
        {threads.map(t => (
          <Paper key={t.id} sx={{ p: 2.5, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, cursor: 'pointer', '&:hover': { borderColor: 'rgba(108,143,255,0.3)' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label={t.tag} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: `${tagColors[t.tag] || '#6c8fff'}22`, color: tagColors[t.tag] || '#6c8fff', fontWeight: 700 }} />
                </Box>
                <Typography variant="subtitle1" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 0.5 }}>{t.title}</Typography>
                <Typography variant="caption" sx={{ color: '#7986cb' }}>by {t.author} • {t.time}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right', ml: 2 }}>
                <Typography variant="body2" sx={{ color: '#6c8fff', fontWeight: 700 }}>{t.replies} replies</Typography>
                <Typography variant="caption" sx={{ color: '#455a64' }}>{t.views} views</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Forum;
