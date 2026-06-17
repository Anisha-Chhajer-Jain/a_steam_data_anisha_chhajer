import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Container, Paper, Link, InputAdornment
} from '@mui/material';
import { EmailOutlined, BarChart as LogoIcon, ArrowForward, ArrowBack, ShieldOutlined } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import api from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Email is required'); return; }
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
      toast.success('Recovery code dispatched to your email.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1117', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Helmet>
        <title>Forgot Password – Arcade Stream</title>
      </Helmet>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <LogoIcon sx={{ color: '#6c8fff', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#e8eaf6', letterSpacing: 2, textTransform: 'uppercase' }}>
          ARCADE STREAM
        </Typography>
      </Box>

      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, bgcolor: '#161b27', border: '1px solid rgba(108,143,255,0.15)', borderRadius: 3 }}>
          {sent ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#e8eaf6', mb: 2 }}>Code Dispatched</Typography>
              <Typography variant="body2" sx={{ color: '#7986cb', mb: 4 }}>
                A 6-digit recovery code has been sent to <strong style={{ color: '#6c8fff' }}>{email}</strong>. Check your inbox.
              </Typography>
              <Link component={RouterLink} to="/login" sx={{ color: '#6c8fff', fontWeight: 700 }}>
                ← Back to Login
              </Link>
            </Box>
          ) : (
            <>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#e8eaf6', mb: 1 }}>
                Forgot Password
              </Typography>
              <Typography variant="body2" sx={{ color: '#7986cb', mb: 4 }}>
                Enter your account email and we'll send you a temporary 6-digit recovery code.
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 0.5 }}>EMAIL ADDRESS</Typography>
                <TextField
                  fullWidth size="small" placeholder="gamer@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment> }}
                />
                <Button type="submit" fullWidth variant="contained" disabled={loading} endIcon={<ArrowForward />} sx={{ py: 1.5, mb: 3 }}>
                  {loading ? 'Dispatching...' : 'Send Reset Code'}
                </Button>
                <Typography align="center">
                  <Link component={RouterLink} to="/login" sx={{ color: '#6c8fff', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <ArrowBack fontSize="small" /> Back to Login
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, px: 1 }}>
          <Typography variant="caption" sx={{ color: '#4a5568', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ShieldOutlined sx={{ fontSize: 11 }} /> END-TO-END ENCRYPTION ACTIVE
          </Typography>
          <Typography variant="caption" sx={{ color: '#4a5568' }}>SYSTEM V8.4.2-STABLE</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
