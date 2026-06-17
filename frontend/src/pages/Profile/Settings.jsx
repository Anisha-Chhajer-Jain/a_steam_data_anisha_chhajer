import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Switch, FormControlLabel, Button, Divider } from '@mui/material';
import { Save, Notifications, Security, Language } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifs: true,
    pushNotifs: false,
    marketingEmails: false,
    twoFactor: false,
    publicProfile: true,
  });

  const handleChange = (k) => (e) => setSettings({ ...settings, [k]: e.target.checked });
  const handleSave = () => toast.success('Settings saved successfully!');

  return (
    <Box>
      <Helmet><title>Settings – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#00e5a0', fontWeight: 700 }}>USER</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Account Settings</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Notifications sx={{ color: '#6c8fff' }} />
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700 }}>Notifications</Typography>
            </Box>
            <FormControlLabel control={<Switch checked={settings.emailNotifs} onChange={handleChange('emailNotifs')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6c8fff' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6c8fff' } }} />} label="Email Notifications" sx={{ color: '#90a4ae', display: 'block', mb: 1 }} />
            <FormControlLabel control={<Switch checked={settings.pushNotifs} onChange={handleChange('pushNotifs')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6c8fff' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6c8fff' } }} />} label="Push Notifications" sx={{ color: '#90a4ae', display: 'block', mb: 1 }} />
            <FormControlLabel control={<Switch checked={settings.marketingEmails} onChange={handleChange('marketingEmails')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6c8fff' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6c8fff' } }} />} label="Marketing & Promotions" sx={{ color: '#90a4ae', display: 'block' }} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Security sx={{ color: '#00e5a0' }} />
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700 }}>Privacy & Security</Typography>
            </Box>
            <FormControlLabel control={<Switch checked={settings.publicProfile} onChange={handleChange('publicProfile')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00e5a0' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00e5a0' } }} />} label="Make Profile Public" sx={{ color: '#90a4ae', display: 'block', mb: 1 }} />
            <FormControlLabel control={<Switch checked={settings.twoFactor} onChange={handleChange('twoFactor')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00e5a0' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00e5a0' } }} />} label="Two-Factor Authentication (2FA)" sx={{ color: '#90a4ae', display: 'block' }} />
            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.05)' }} />
            <Button variant="outlined" sx={{ color: '#ff4f6a', borderColor: '#ff4f6a' }}>Change Password</Button>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<Save />} onClick={handleSave} sx={{ bgcolor: '#6c8fff' }}>Save All Settings</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
