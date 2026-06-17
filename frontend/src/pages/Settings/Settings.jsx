import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Paper, Grid, Switch, FormControlLabel, Divider, Select, MenuItem,
  FormControl, InputLabel, Button, Stack
} from '@mui/material';
import { DarkMode, LightMode, Palette, Language, Save } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { toggleTheme, setTheme } from '../../store/uiSlice';
import { toast } from 'react-toastify';
import { savePreferences, getStoredPreferences } from '../../utils/helpers';

const Settings = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.ui);
  const prefs = getStoredPreferences();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    toast.success(`Switched to ${themeMode === 'dark' ? 'light' : 'dark'} mode`);
  };

  const handleSavePreferences = () => {
    savePreferences({ theme: themeMode });
    toast.success('Preferences saved');
  };

  return (
    <Box>
      <Helmet>
        <title>Settings – Arcade Stream</title>
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" sx={{ color: 'primary.main' }}>SYSTEM CONFIGURATION</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Settings</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Appearance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2.5 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Palette fontSize="small" /> APPEARANCE
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#1e2637', borderRadius: 2, mb: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Dark Mode</Typography>
                <Typography variant="caption" color="textSecondary">Toggle between dark and light themes</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LightMode sx={{ fontSize: 18, color: themeMode === 'light' ? '#ffb700' : '#7986cb' }} />
                <Switch checked={themeMode === 'dark'} onChange={handleThemeToggle} color="primary" />
                <DarkMode sx={{ fontSize: 18, color: themeMode === 'dark' ? '#6c8fff' : '#7986cb' }} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {['dark', 'light'].map(mode => (
                <Box key={mode} onClick={() => dispatch(setTheme(mode))}
                  sx={{
                    flex: 1, p: 2, borderRadius: 2, cursor: 'pointer',
                    border: '2px solid', textAlign: 'center',
                    borderColor: themeMode === mode ? 'primary.main' : 'divider',
                    bgcolor: mode === 'dark' ? '#0d1117' : '#f0f4ff',
                    transition: 'all 0.2s',
                  }}>
                  {mode === 'dark' ? <DarkMode sx={{ color: '#6c8fff', mb: 0.5 }} /> : <LightMode sx={{ color: '#ffb700', mb: 0.5 }} />}
                  <Typography variant="caption" sx={{ display: 'block', color: mode === 'dark' ? '#e8eaf6' : '#1a1f36', textTransform: 'capitalize' }}>
                    {mode} Mode
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2.5 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Language fontSize="small" /> PREFERENCES
            </Typography>

            <Stack spacing={2}>
              <Box sx={{ p: 2, bgcolor: '#1e2637', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Email Notifications</Typography>
                    <Typography variant="caption" color="textSecondary">Receive email alerts for updates</Typography>
                  </Box>
                  <Switch defaultChecked color="primary" onChange={(e) => savePreferences({ emailNotifications: e.target.checked })} />
                </Box>
              </Box>

              <Box sx={{ p: 2, bgcolor: '#1e2637', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Sound Effects</Typography>
                    <Typography variant="caption" color="textSecondary">Play sounds for notifications</Typography>
                  </Box>
                  <Switch defaultChecked={false} color="primary" onChange={(e) => savePreferences({ soundEffects: e.target.checked })} />
                </Box>
              </Box>

              <Box sx={{ p: 2, bgcolor: '#1e2637', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Auto-refresh Data</Typography>
                    <Typography variant="caption" color="textSecondary">Automatically refresh dashboard data</Typography>
                  </Box>
                  <Switch defaultChecked color="primary" onChange={(e) => savePreferences({ autoRefresh: e.target.checked })} />
                </Box>
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel>Language</InputLabel>
                <Select defaultValue="en" label="Language" onChange={(e) => savePreferences({ language: e.target.value })}
                  sx={{ bgcolor: '#1e2637' }}>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="ja">日本語</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Paper>
        </Grid>

        {/* Save */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<Save />} onClick={handleSavePreferences}>
              Save All Preferences
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
