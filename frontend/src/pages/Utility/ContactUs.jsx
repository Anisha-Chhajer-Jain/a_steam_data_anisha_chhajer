import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Stack } from '@mui/material';
import { Email, Send, CheckCircle } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      toast.success('Message sent! We\'ll respond within 24 hours.');
      setSent(true);
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  return (
    <Box>
      <Helmet><title>Contact Us – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#6c8fff', fontWeight: 700 }}>UTILITY</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Contact Us</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>Get in Touch</Typography>
            {[{ icon: Email, label: 'Email', value: 'support@arcadestream.io' }, { icon: Email, label: 'Business', value: 'business@arcadestream.io' }].map(c => (
              <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ p: 1, bgcolor: 'rgba(108,143,255,0.1)', borderRadius: 1.5 }}><c.icon sx={{ color: '#6c8fff', fontSize: 20 }} /></Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#7986cb' }}>{c.label}</Typography>
                  <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600 }}>{c.value}</Typography>
                </Box>
              </Box>
            ))}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0,229,160,0.05)', borderRadius: 2, border: '1px solid rgba(0,229,160,0.15)' }}>
              <Typography variant="body2" sx={{ color: '#00e5a0', fontWeight: 600 }}>⚡ Response Time</Typography>
              <Typography variant="caption" sx={{ color: '#7986cb' }}>We typically respond within 24 hours.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          {sent ? (
            <Paper sx={{ p: 6, bgcolor: '#161b27', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 3, textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 64, color: '#00e5a0', mb: 2 }} />
              <Typography variant="h5" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 1 }}>Message Sent!</Typography>
              <Typography variant="body1" sx={{ color: '#7986cb' }}>We'll get back to you within 24 hours.</Typography>
              <Button variant="outlined" onClick={() => setSent(false)} sx={{ mt: 3, borderColor: '#6c8fff', color: '#6c8fff' }}>Send Another</Button>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 3 }}>Send a Message</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Your Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Your Email *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth multiline rows={5} label="Message *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button fullWidth variant="contained" startIcon={<Send />} onClick={handleSubmit} sx={{ py: 1.5, bgcolor: '#6c8fff', '&:hover': { bgcolor: '#5c7cff' } }}>Send Message</Button>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
