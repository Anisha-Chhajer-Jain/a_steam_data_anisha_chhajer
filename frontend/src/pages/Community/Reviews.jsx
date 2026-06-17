import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, Avatar, Divider, TextField, Button, Chip, Rating } from '@mui/material';
import { RateReview, Send } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const mockReviews = [
  { id: 1, user: 'ShadowGamer99', game: 'Cyberpunk 2077', rating: 4, review: 'Great game after all the patches! Night City feels alive. Combat is fun, story is amazing.', time: '2 hours ago', helpful: 142 },
  { id: 2, user: 'PixelHunter', game: 'Hollow Knight', rating: 5, review: 'A masterpiece of game design. The combat, the lore, the atmosphere. 10/10 would recommend to everyone!', time: '5 hours ago', helpful: 89 },
  { id: 3, user: 'RetroKnight', game: 'The Witcher 3', rating: 5, review: 'Still the best RPG ever made. I replay it every year. The expansions are worth every penny.', time: '1 day ago', helpful: 234 },
  { id: 4, user: 'NeonWolf', game: 'Elden Ring', rating: 5, review: 'From Software has outdone themselves. The open world exploration is unlike anything else. GOTY easily.', time: '2 days ago', helpful: 178 },
  { id: 5, user: 'CyberBlaze', game: 'Stardew Valley', rating: 4, review: 'An incredibly relaxing farming game. Perfect for unwinding after a long day. Just one more day...', time: '3 days ago', helpful: 95 },
];

const Reviews = () => {
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const { profile } = useSelector(s => s.auth);

  const handleSubmit = () => {
    if (newReview.trim()) { toast.success('Review submitted!'); setNewReview(''); }
  };

  return (
    <Box>
      <Helmet><title>Reviews – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>COMMUNITY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Game Reviews</Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Write a Review</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#7986cb' }}>Your Rating:</Typography>
          <Rating value={newRating} onChange={(_, v) => setNewRating(v)} sx={{ color: '#ffb700' }} />
        </Box>
        <TextField fullWidth multiline rows={3} placeholder="Share your thoughts about a game..." value={newReview} onChange={e => setNewReview(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
        <Button variant="contained" startIcon={<Send />} onClick={handleSubmit} sx={{ bgcolor: '#6c8fff' }}>Submit Review</Button>
      </Paper>

      <Stack spacing={2}>
        {mockReviews.map(r => (
          <Paper key={r.id} sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#1e2637', color: '#6c8fff', fontSize: '0.85rem' }}>{r.user[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#e8eaf6', fontWeight: 700 }}>{r.user}</Typography>
                  <Chip label={r.game} size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: 'rgba(108,143,255,0.1)', color: '#6c8fff' }} />
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Rating value={r.rating} readOnly size="small" sx={{ color: '#ffb700' }} />
                <Typography variant="caption" sx={{ color: '#455a64', display: 'block' }}>{r.time}</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#90a4ae', lineHeight: 1.7 }}>{r.review}</Typography>
            <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button size="small" sx={{ color: '#7986cb', fontSize: '0.7rem' }}>👍 Helpful ({r.helpful})</Button>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Reviews;
