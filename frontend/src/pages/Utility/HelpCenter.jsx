import React, { useState } from 'react';
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, TextField, InputAdornment, Button, Stack, Chip } from '@mui/material';
import { ExpandMore, Search, Help } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const faqs = [
  { q: 'How do I add a game to my wishlist?', a: 'Browse to any game page or the Games Library and click the bookmark icon (🔖) in the top-right of the game card. The game will be saved to your Wishlist under Personal → Wishlist.' },
  { q: 'What is the difference between Wishlist and Favorites?', a: 'Wishlist (📌) is for games you want to play eventually. Favorites (❤️) is for games you love. Both are persisted locally and accessible from the sidebar.' },
  { q: 'How does the recommendation system work?', a: 'Recommendations are generated based on genres present in your Wishlist and Favorites. The system finds games in similar genres that you haven\'t saved yet.' },
  { q: 'Can I filter games by multiple genres?', a: 'Currently the Games Library supports filtering by one genre at a time. Use the Genre Explorer to browse by category, or use the Search page for more specific queries.' },
  { q: 'How do I search for a specific game?', a: 'Navigate to Search in the sidebar, type the game title, and press Enter. You can also save frequently used searches using the bookmark icon next to the search bar.' },
  { q: 'What do the analytics pages show?', a: 'Analytics pages show real-time data from the Steam database including genre distribution, platform availability, price analytics, release trends over the years, and developer/publisher rankings.' },
  { q: 'Is my data saved between sessions?', a: 'Yes! Your Wishlist, Favorites, Recently Viewed, and Saved Searches are all stored in your browser\'s localStorage and will persist between sessions.' },
  { q: 'How do I contact support?', a: 'Navigate to Utility → Contact Us in the sidebar, or send us an email. We aim to respond within 24 hours.' },
];

const HelpCenter = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Helmet><title>Help Center – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>UTILITY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Help Center</Typography>
      </Box>
      <Paper sx={{ p: 4, mb: 4, bgcolor: '#161b27', borderRadius: 3, textAlign: 'center', border: '1px solid rgba(108,143,255,0.2)' }}>
        <Help sx={{ fontSize: 48, color: '#6c8fff', mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6', mb: 1 }}>How can we help?</Typography>
        <TextField placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: '#6c8fff' }} /></InputAdornment> } }}
          sx={{ mt: 2, width: '100%', maxWidth: 500, '& .MuiOutlinedInput-root': { bgcolor: '#0d1117', borderRadius: 2 } }} />
      </Paper>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Frequently Asked Questions</Typography>
        {filtered.map((faq, i) => (
          <Accordion key={i} sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', mb: 1, borderRadius: '8px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#6c8fff' }} />} sx={{ px: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#e8eaf6' }}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 3 }}>
              <Typography variant="body2" sx={{ color: '#90a4ae', lineHeight: 1.8 }}>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        {filtered.length === 0 && <Typography sx={{ color: '#455a64', textAlign: 'center', py: 4 }}>No FAQs match your search.</Typography>}
      </Box>
      <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2.5, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#e8eaf6', fontWeight: 600, mb: 2 }}>Still need help?</Typography>
        <Button variant="contained" onClick={() => navigate('/contact')} sx={{ bgcolor: '#6c8fff' }}>Contact Support</Button>
      </Paper>
    </Box>
  );
};

export default HelpCenter;
