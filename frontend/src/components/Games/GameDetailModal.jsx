import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, Box, Chip, Divider, Grid, Rating, Skeleton, Stack
} from '@mui/material';
import {
  Close as CloseIcon, Star, MonetizationOn, SportsEsports,
  Computer, CalendarMonth, Person, Business, OpenInNew
} from '@mui/icons-material';
import api from '../../services/api';
import { formatPrice, formatRating } from '../../utils/helpers';

const GameDetailModal = ({ open, onClose, game }) => {
  const [related, setRelated] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    if (open && game?.appid) {
      setLoadingRelated(true);
      api.get(`/games/${game.appid}/related`)
        .then(res => setRelated(res.data?.data || []))
        .catch(() => setRelated([]))
        .finally(() => setLoadingRelated(false));
    }
  }, [open, game]);

  if (!game) return null;

  const ratingColor = parseFloat(game.rating) >= 8
    ? '#00e5a0' : parseFloat(game.rating) >= 6 ? '#ffb700' : '#ff4f6a';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper"
      PaperProps={{ sx: { bgcolor: '#161b27', border: '1px solid rgba(108,143,255,0.15)', maxHeight: '90vh' } }}
    >
      <DialogTitle sx={{ p: 0, position: 'relative' }}>
        {/* Hero Banner */}
        <Box sx={{
          height: 140, bgcolor: '#1e2637',
          backgroundImage: 'linear-gradient(135deg, #1e2637 0%, #161b27 100%)',
          display: 'flex', alignItems: 'flex-end', p: 2,
          borderBottom: '1px solid rgba(108,143,255,0.1)',
        }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="overline" sx={{ color: '#6c8fff' }}>GAME DETAILS</Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6', lineHeight: 1.2 }}>
              {game.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#7986cb', fontFamily: 'monospace' }}>
              appid: {game.appid}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#6c8fff' }}>
              {formatPrice(game.price)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
              <Star sx={{ color: ratingColor, fontSize: 16 }} />
              <Typography variant="body2" sx={{ color: ratingColor, fontWeight: 700 }}>
                {formatRating(game.rating)} / 10
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button onClick={onClose} size="small"
          sx={{ position: 'absolute', top: 8, right: 8, minWidth: 0, color: '#7986cb', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
          <CloseIcon fontSize="small" />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Genres */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 1 }}>GENRES</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {(game.genres || []).map(g => (
              <Chip key={g} label={g} size="small" color="primary" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(108,143,255,0.1)', mb: 3 }} />

        {/* Meta Info */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {game.developer && (
            <Grid item xs={6}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block' }}>DEVELOPER</Typography>
              <Typography variant="body2" sx={{ color: '#e8eaf6', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Person sx={{ fontSize: 14, color: '#6c8fff' }} />{game.developer}
              </Typography>
            </Grid>
          )}
          {game.publisher && (
            <Grid item xs={6}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block' }}>PUBLISHER</Typography>
              <Typography variant="body2" sx={{ color: '#e8eaf6', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Business sx={{ fontSize: 14, color: '#6c8fff' }} />{game.publisher}
              </Typography>
            </Grid>
          )}
          {game.release_date && (
            <Grid item xs={6}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block' }}>RELEASE DATE</Typography>
              <Typography variant="body2" sx={{ color: '#e8eaf6', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarMonth sx={{ fontSize: 14, color: '#6c8fff' }} />{game.release_date}
              </Typography>
            </Grid>
          )}
          {game.release_year && (
            <Grid item xs={6}>
              <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.6rem', display: 'block' }}>RELEASE YEAR</Typography>
              <Typography variant="body2" sx={{ color: '#e8eaf6' }}>{game.release_year}</Typography>
            </Grid>
          )}
        </Grid>

        {/* Description */}
        {game.description && (
          <>
            <Divider sx={{ borderColor: 'rgba(108,143,255,0.1)', mb: 3 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 1 }}>ABOUT THE GAME</Typography>
              <Typography variant="body2" sx={{ color: '#9aa5c4', lineHeight: 1.8 }}>{game.description}</Typography>
            </Box>
          </>
        )}

        <Divider sx={{ borderColor: 'rgba(108,143,255,0.1)', mb: 3 }} />

        {/* Platforms */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 1 }}>PLATFORMS</Typography>
          <Stack direction="row" spacing={1}>
            {(game.platforms || []).map(p => (
              <Chip key={p} icon={<Computer sx={{ fontSize: '14px !important' }} />} label={p} size="small"
                sx={{ bgcolor: 'rgba(108,143,255,0.1)', color: '#8fa8ff', textTransform: 'capitalize', borderColor: 'rgba(108,143,255,0.2)', border: '1px solid' }}
              />
            ))}
          </Stack>
        </Box>

        {/* Tags */}
        {(game.tags || []).length > 0 && (
          <>
            <Divider sx={{ borderColor: 'rgba(108,143,255,0.1)', mb: 3 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 1 }}>TAGS</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {game.tags.map(t => (
                  <Chip key={t} label={t} size="small" variant="outlined"
                    sx={{ borderColor: 'rgba(108,143,255,0.2)', color: '#7986cb', fontSize: '0.65rem' }}
                  />
                ))}
              </Box>
            </Box>
          </>
        )}

        {/* Related Games */}
        {(loadingRelated || related.length > 0) && (
          <>
            <Divider sx={{ borderColor: 'rgba(108,143,255,0.1)', mb: 3 }} />
            <Typography variant="overline" sx={{ color: '#7986cb', display: 'block', mb: 1.5 }}>RELATED GAMES</Typography>
            <Stack spacing={1}>
              {loadingRelated ? [1, 2, 3].map(i => <Skeleton key={i} variant="rectangular" height={48} sx={{ borderRadius: 1, bgcolor: '#1e2637' }} />) :
                related.map(r => (
                  <Box key={r.appid} sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    p: 1.5, bgcolor: '#1e2637', borderRadius: 1.5, border: '1px solid rgba(108,143,255,0.1)',
                  }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600 }}>{r.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#7986cb' }}>{(r.genres || []).join(', ')}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#6c8fff', fontWeight: 700 }}>{formatPrice(r.price)}</Typography>
                  </Box>
                ))
              }
            </Stack>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(108,143,255,0.1)' }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderColor: 'rgba(108,143,255,0.3)', color: '#7986cb' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameDetailModal;
