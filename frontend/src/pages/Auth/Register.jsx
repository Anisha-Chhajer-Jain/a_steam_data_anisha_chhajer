import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Button, TextField, Typography, Container, Paper, Link,
  InputAdornment, IconButton, Checkbox, FormControlLabel
} from '@mui/material';
import {
  PersonOutlined as PersonOutline, LockOutlined, EmailOutlined,
  Visibility, VisibilityOff, BarChart as LogoIcon,
  RocketLaunch, ShieldOutlined, VerifiedUser
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', agree: false },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Too short').required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
      agree: Yup.boolean().oneOf([true], 'Must agree to terms').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await api.post('/auth/register', { name: values.name, email: values.email, password: values.password });
        // Automatically login the user using the provided credentials
        await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();
        toast.success('Operative initialized. Welcome aboard.');
        navigate('/dashboard');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Registration failed');
      }
    },
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1117', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Helmet>
        <title>Register – Arcade Stream</title>
        <meta name="description" content="Create your Arcade Stream operative account." />
      </Helmet>

      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <LogoIcon sx={{ color: '#6c8fff', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#e8eaf6', letterSpacing: 2, textTransform: 'uppercase' }}>
          ARCADE STREAM
        </Typography>
      </Box>

      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, bgcolor: '#161b27', border: '1px solid rgba(108,143,255,0.15)', borderRadius: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#e8eaf6', mb: 1 }}>
            Initialize Operative
          </Typography>
          <Typography variant="body2" sx={{ color: '#7986cb', mb: 4 }}>
            Connect your terminal to the global analytics mesh.
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit}>
            {/* Name */}
            <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 0.5 }}>FULL NAME</Typography>
            <TextField fullWidth id="name" name="name" size="small" placeholder="Commander Shepard"
              value={formik.values.name} onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment> } }}
            />

            {/* Email */}
            <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 0.5 }}>EMAIL ADDRESS</Typography>
            <TextField fullWidth id="email" name="email" size="small" placeholder="n7@citadel.station"
              value={formik.values.email} onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment> } }}
            />

            {/* Password */}
            <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 0.5 }}>PASSWORD</Typography>
            <TextField fullWidth id="password" name="password" size="small" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
              value={formik.values.password} onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff sx={{ fontSize: 16, color: '#7986cb' }} /> : <Visibility sx={{ fontSize: 16, color: '#7986cb' }} />}</IconButton></InputAdornment>
                }
              }}
            />

            {/* Confirm Password */}
            <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 0.5 }}>CONFIRM PASSWORD</Typography>
            <TextField fullWidth id="confirmPassword" name="confirmPassword" size="small" type={showConfirm ? 'text' : 'password'} placeholder="••••••••"
              value={formik.values.confirmPassword} onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><VerifiedUser sx={{ color: '#6c8fff', fontSize: 18 }} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <VisibilityOff sx={{ fontSize: 16, color: '#7986cb' }} /> : <Visibility sx={{ fontSize: 16, color: '#7986cb' }} />}</IconButton></InputAdornment>
                }
              }}
            />

            <FormControlLabel
              sx={{ mb: 3, alignItems: 'flex-start' }}
              control={
                <Checkbox id="agree" name="agree" size="small" checked={formik.values.agree} onChange={formik.handleChange}
                  sx={{ color: '#6c8fff', '&.Mui-checked': { color: '#6c8fff' }, mt: 0.25 }}
                />
              }
              label={
                <Typography variant="caption" sx={{ color: '#7986cb' }}>
                  I authorize the collection of telemetry data and agree to the Neural Protocol Agreement.
                </Typography>
              }
            />
            {formik.touched.agree && formik.errors.agree && (
              <Typography variant="caption" color="error" sx={{ display: 'block', mt: -2.5, mb: 2 }}>{formik.errors.agree}</Typography>
            )}

            <Button type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}
              endIcon={<RocketLaunch />}
              sx={{ py: 1.5, fontSize: '0.95rem', mb: 3 }}
            >
              {formik.isSubmitting ? 'Initializing...' : 'Create Operative Account'}
            </Button>

            <Typography variant="body2" align="center" sx={{ color: '#7986cb' }}>
              Already registered in the fleet?{' '}
              <Link component={RouterLink} to="/login" sx={{ color: '#6c8fff', fontWeight: 700 }}>
                Login to Terminal →
              </Link>
            </Typography>
          </Box>
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

export default Register;
