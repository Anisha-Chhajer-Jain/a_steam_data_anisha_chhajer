import React, { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, Typography, Box, Chip,
  FormControl, InputLabel, Select, MenuItem, OutlinedInput,
  Slider, Divider
} from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, updateGame } from '../../store/gamesSlice';
import { toast } from 'react-toastify';
import { GENRE_OPTIONS, PLATFORM_OPTIONS } from '../../utils/constants';

const GameFormModal = ({ open, onClose, editingGame, onSuccess }) => {
  const dispatch = useDispatch();
  const { currentActionLoading } = useSelector((state) => state.games);
  const isEditing = Boolean(editingGame);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      appid: editingGame?.appid || '',
      name: editingGame?.name || '',
      price: editingGame?.price ?? 0,
      rating: editingGame?.rating ?? 7,
      release_date: editingGame?.release_date || new Date().toISOString().split('T')[0],
      genres: editingGame?.genres || [],
      platforms: editingGame?.platforms || ['windows'],
      tags: editingGame?.tags?.join(', ') || '',
      developer: editingGame?.developer || '',
      publisher: editingGame?.publisher || '',
      description: editingGame?.description || '',
    },
    validationSchema: Yup.object({
      appid: Yup.string().required('App ID is required'),
      name: Yup.string().required('Game title is required'),
      price: Yup.number().min(0, 'Cannot be negative').required('Required'),
      rating: Yup.number().min(1).max(10).required('Required'),
      genres: Yup.array().min(1, 'Select at least one genre'),
      platforms: Yup.array().min(1, 'Select at least one platform'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        ...values,
        tags: values.tags ? values.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        price: parseFloat(values.price),
        rating: parseFloat(values.rating),
      };
      let result;
      if (isEditing) {
        result = await dispatch(updateGame({ appid: editingGame.appid, data: payload }));
      } else {
        result = await dispatch(createGame(payload));
      }
      if (createGame.fulfilled.match(result) || updateGame.fulfilled.match(result)) {
        toast.success(isEditing ? `"${values.name}" updated successfully` : `"${values.name}" added to database`);
        resetForm();
        onClose();
        onSuccess?.();
      } else {
        toast.error(result.payload || 'Operation failed');
      }
    },
  });

  const handlePlatformToggle = (platform) => {
    const current = formik.values.platforms;
    if (current.includes(platform)) {
      formik.setFieldValue('platforms', current.filter(p => p !== platform));
    } else {
      formik.setFieldValue('platforms', [...current, platform]);
    }
  };

  const handleGenreToggle = (genre) => {
    const current = formik.values.genres;
    if (current.includes(genre)) {
      formik.setFieldValue('genres', current.filter(g => g !== genre));
    } else {
      formik.setFieldValue('genres', [...current, genre]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      PaperProps={{ sx: { bgcolor: '#161b27', border: '1px solid rgba(108,143,255,0.15)' } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(108,143,255,0.1)', pb: 2 }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#6c8fff', display: 'block' }}>
            {isEditing ? 'EDIT GAME' : 'ADD NEW GAME'}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#e8eaf6' }}>
            {isEditing ? `Edit ${editingGame.name}` : 'Initialize Game Data'}
          </Typography>
        </Box>
        <Button onClick={onClose} variant="outlined" size="small" startIcon={<CloseIcon />}
          sx={{ borderColor: 'rgba(108,143,255,0.3)', color: '#7986cb' }}>
          Discard
        </Button>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Core Identity */}
            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#6c8fff', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                ⚡ Core Identity
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 0.5 }}>GAME TITLE</Typography>
              <TextField fullWidth name="name" placeholder="e.g. Cyberpunk 2077"
                value={formik.values.name} onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 0.5 }}>APP ID</Typography>
              <TextField fullWidth name="appid" placeholder="730"
                value={formik.values.appid} onChange={formik.handleChange}
                disabled={isEditing}
                error={formik.touched.appid && Boolean(formik.errors.appid)}
                helperText={formik.touched.appid && formik.errors.appid}
                size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 0.5 }}>PRICE ($)</Typography>
              <TextField fullWidth name="price" type="number" placeholder="59.99"
                value={formik.values.price} onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 1 }}>
                CRITIC RATING — {formik.values.rating} / 10
              </Typography>
              <Slider
                name="rating" value={formik.values.rating}
                onChange={(_, val) => formik.setFieldValue('rating', val)}
                min={1} max={10} step={0.1} marks={[{value:1,label:'1'},{value:5,label:'5'},{value:10,label:'10'}]}
                sx={{ color: '#6c8fff' }}
              />
            </Grid>

            <Grid item xs={12}><Divider sx={{ borderColor: 'rgba(108,143,255,0.1)' }} /></Grid>

            {/* Classification */}
            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#6c8fff', mb: 2, display: 'block' }}>
                🏷 Classification
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 1 }}>
                GENRES (MULTI-SELECT)
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {GENRE_OPTIONS.map(g => (
                  <Chip key={g} label={g} size="small" clickable
                    onClick={() => handleGenreToggle(g)}
                    color={formik.values.genres.includes(g) ? 'primary' : 'default'}
                    variant={formik.values.genres.includes(g) ? 'filled' : 'outlined'}
                    sx={{ borderColor: 'rgba(108,143,255,0.3)' }}
                  />
                ))}
              </Box>
              {formik.touched.genres && formik.errors.genres && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{formik.errors.genres}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 0.5 }}>DEVELOPER</Typography>
              <TextField fullWidth name="developer" placeholder="Studio name"
                value={formik.values.developer} onChange={formik.handleChange}
                size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 0.5 }}>PUBLISHER</Typography>
              <TextField fullWidth name="publisher" placeholder="Company name"
                value={formik.values.publisher} onChange={formik.handleChange}
                size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              />
            </Grid>

            <Grid item xs={12}><Divider sx={{ borderColor: 'rgba(108,143,255,0.1)' }} /></Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#6c8fff', mb: 2, display: 'block' }}>📄 Description</Typography>
              <TextField fullWidth multiline rows={4} name="description"
                placeholder="Enter comprehensive game overview and short storyline..."
                value={formik.values.description} onChange={formik.handleChange}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
                inputProps={{ maxLength: 1000 }}
                helperText={`${formik.values.description.length} / 1000 characters`}
              />
            </Grid>

            <Grid item xs={12}><Divider sx={{ borderColor: 'rgba(108,143,255,0.1)' }} /></Grid>

            {/* Platforms */}
            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#6c8fff', mb: 2, display: 'block' }}>💻 Platforms</Typography>
              <Grid container spacing={1}>
                {[
                  { value: 'windows', label: 'PC (Windows)' },
                  { value: 'mac', label: 'macOS' },
                  { value: 'linux', label: 'Linux' },
                ].map(({ value, label }) => (
                  <Grid item xs={12} key={value}>
                    <Box sx={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      p: 1.5, borderRadius: 1.5, border: '1px solid',
                      borderColor: formik.values.platforms.includes(value) ? '#6c8fff' : 'rgba(108,143,255,0.15)',
                      bgcolor: formik.values.platforms.includes(value) ? 'rgba(108,143,255,0.08)' : 'transparent',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onClick={() => handlePlatformToggle(value)}
                    >
                      <Typography variant="body2" sx={{ color: '#e8eaf6', textTransform: 'capitalize' }}>{label}</Typography>
                      <Box sx={{
                        width: 18, height: 10, borderRadius: 5,
                        bgcolor: formik.values.platforms.includes(value) ? '#6c8fff' : 'rgba(108,143,255,0.2)',
                        transition: 'all 0.2s',
                      }} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {formik.touched.platforms && formik.errors.platforms && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{formik.errors.platforms}</Typography>
              )}
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 0.5 }}>TAGS (COMMA SEPARATED)</Typography>
              <TextField fullWidth name="tags" placeholder="action, open-world, multiplayer"
                value={formik.values.tags} onChange={formik.handleChange}
                size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block', mb: 0.5 }}>RELEASE DATE</Typography>
              <TextField fullWidth name="release_date" type="date"
                value={formik.values.release_date} onChange={formik.handleChange}
                size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1e2637' } }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(108,143,255,0.1)', gap: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#7986cb', flex: 1 }}>
            Data will be validated across international rating boards automatically upon initialization.
          </Typography>
          <Button onClick={onClose} variant="outlined" sx={{ borderColor: 'rgba(108,143,255,0.3)', color: '#7986cb' }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={currentActionLoading} startIcon={<SaveIcon />}>
            {currentActionLoading ? 'Saving...' : isEditing ? 'Sync Updates' : 'Initialize Game Data'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GameFormModal;
