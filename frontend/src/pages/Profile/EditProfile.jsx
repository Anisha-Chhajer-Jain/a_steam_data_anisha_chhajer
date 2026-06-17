import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, Avatar } from '@mui/material';
import { Save } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { profile } = useSelector(s => s.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: profile?.name || '', bio: 'I love playing indie games and open world RPGs.', location: 'Earth' });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <Box>
      <Helmet><title>Edit Profile – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#00e5a0', fontWeight: 700 }}>USER</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Edit Profile</Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, textAlign: 'center' }}>
            <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: '#1e2637', color: '#00e5a0', fontSize: '3rem' }}>{form.name[0] || 'U'}</Avatar>
            <Button variant="outlined" sx={{ color: '#6c8fff', borderColor: '#6c8fff' }}>Change Avatar</Button>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Display Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth multiline rows={4} label="Bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#0d1117' } }} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button onClick={() => navigate('/profile')} sx={{ color: '#7986cb' }}>Cancel</Button>
                <Button variant="contained" startIcon={<Save />} onClick={handleSave} sx={{ bgcolor: '#00e5a0', color: '#000', fontWeight: 700 }}>Save Changes</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfile;
