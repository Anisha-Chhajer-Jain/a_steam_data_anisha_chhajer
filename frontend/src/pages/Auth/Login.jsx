import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Button, TextField, Typography, Container, Paper, Link,
  InputAdornment, IconButton, Divider, Checkbox, FormControlLabel
} from '@mui/material';
import {
  LockOutlined, EmailOutlined, Visibility, VisibilityOff,
  BarChart as LogoIcon, ArrowForward, ShieldOutlined
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { loginUser } from '../../store/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(loginUser({ userId: values.email }));
      if (loginUser.fulfilled.match(result)) {
        toast.success('Access granted. Welcome back.');
        navigate('/dashboard');
      } else {
        toast.error(result.payload || 'Authentication failed');
      }
    },
  });

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#0d1117',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}>
      <Helmet>
        <title>Login – Arcade Stream</title>
        <meta name="description" content="Login to your Arcade Stream dashboard." />
      </Helmet>

      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <LogoIcon sx={{ color: '#6c8fff', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#e8eaf6', letterSpacing: 2, textTransform: 'uppercase' }}>
          ARCADE STREAM
        </Typography>
      </Box>

      <Container maxWidth="xs">
        <Paper elevation={0} sx={{
          p: { xs: 3, sm: 4 },
          bgcolor: '#161b27',
          border: '1px solid rgba(108,143,255,0.15)',
          borderRadius: 3,
        }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#e8eaf6', mb: 1 }}>
            Access Terminal
          </Typography>
          <Typography variant="body2" sx={{ color: '#7986cb', mb: 4 }}>
            Connect to the global analytics mesh.
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 0.5 }}>
              EMAIL ADDRESS
            </Typography>
            <TextField
              fullWidth id="email" name="email" size="small"
              placeholder="operator@station.io"
              value={formik.values.email} onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: '#6c8fff', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 0.5 }}>
              PASSWORD
            </Typography>
            <TextField
              fullWidth id="password" name="password" size="small"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formik.values.password} onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 1, '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: '#6c8fff', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: '#7986cb' }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />

            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Link component={RouterLink} to="/forgot-password" sx={{ color: '#6c8fff', fontSize: '0.8rem' }}>
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit" fullWidth variant="contained" disabled={loading}
              endIcon={<ArrowForward />}
              sx={{ py: 1.5, fontSize: '0.95rem', mb: 3 }}
            >
              {loading ? 'Authenticating...' : 'Login to Terminal'}
            </Button>

            <Divider sx={{ borderColor: 'rgba(108,143,255,0.1)', mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#7986cb' }}>OR</Typography>
            </Divider>

            <Typography variant="body2" align="center" sx={{ color: '#7986cb' }}>
              Not registered in the fleet?{' '}
              <Link component={RouterLink} to="/register" sx={{ color: '#6c8fff', fontWeight: 700 }}>
                Initialize Operative →
              </Link>
            </Typography>
          </Box>
        </Paper>

        {/* Footer */}
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

export default Login;
