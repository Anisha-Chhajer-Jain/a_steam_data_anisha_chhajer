import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper, Chip, Skeleton, Divider } from '@mui/material';
import { ArrowBack, Bookmark, BookmarkBorder, Favorite, FavoriteBorder, Star, Code, CalendarToday, Translate } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/gamesSlice';
import { addToWishlist, removeFromWishlist, addToFavorites, removeFromFavorites, addRecentlyViewed } from '../../store/wishlistSlice';

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gamesList, loading } = useSelector(s => s.games);
  const { items: wishlist, favorites } = useSelector(s => s.wishlist);

  // Fallback find game from Redux state. Ideally you'd fetch the specific game from backend.
  const game = gamesList.find(g => g.appid.toString() === id);

  useEffect(() => {
    if (!game && !loading) {
      // If we don't have the game in the list, fetch games (or dispatch a specific fetchGameById)
      dispatch(fetchGames({ page: 1, limit: 100 }));
    }
  }, [game, loading, dispatch]);

  useEffect(() => {
    if (game) {
      dispatch(addRecentlyViewed(game));
    }
  }, [game, dispatch]);

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3, bgcolor: '#161b27', mb: 3 }} />
        <Skeleton variant="text" width="60%" height={60} sx={{ bgcolor: '#161b27' }} />
        <Skeleton variant="text" width="40%" height={40} sx={{ bgcolor: '#161b27' }} />
      </Box>
    );
  }

  if (!game) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5" sx={{ color: '#e8eaf6' }}>Game not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/games')} sx={{ mt: 2, color: '#6c8fff' }}>Back to Games</Button>
      </Box>
    );
  }

  const isWishlisted = wishlist.some(item => item.appid === game.appid);
  const isFavorited = favorites.some(item => item.appid === game.appid);

  const toggleWishlist = () => {
    isWishlisted ? dispatch(removeFromWishlist(game.appid)) : dispatch(addToWishlist(game));
  };

  const toggleFavorite = () => {
    isFavorited ? dispatch(removeFromFavorites(game.appid)) : dispatch(addToFavorites(game));
  };

  return (
    <Box>
      <Helmet><title>{game.name} – Arcade Stream</title></Helmet>
      
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#7986cb', '&:hover': { color: '#e8eaf6' } }}>
        Back
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Main Content Area */}
          <Paper sx={{ p: 0, overflow: 'hidden', bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, mb: 4 }}>
            <Box sx={{ width: '100%', height: 450, backgroundImage: `url(${game.header_image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, #161b27)', height: '50%' }} />
              <Box sx={{ position: 'absolute', bottom: 24, left: 32 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#e8eaf6', mb: 1, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{game.name}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {(game.genres || []).map(g => (
                    <Chip key={g} label={g} size="small" sx={{ bgcolor: 'rgba(108,143,255,0.2)', color: '#6c8fff', backdropFilter: 'blur(4px)', fontWeight: 700 }} />
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, mb: 2 }}>About this Game</Typography>
              <Typography variant="body1" sx={{ color: '#90a4ae', lineHeight: 1.8 }}>
                {game.short_description || "No description available for this game."}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Sidebar Area */}
          <Paper sx={{ p: 3, bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, position: 'sticky', top: 24 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#00e5a0' }}>
                {parseFloat(game.price) === 0 ? 'Free to Play' : `$${game.price}`}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
              <Button 
                fullWidth 
                variant={isWishlisted ? "outlined" : "contained"} 
                startIcon={isWishlisted ? <Bookmark /> : <BookmarkBorder />}
                onClick={toggleWishlist}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 700, 
                  bgcolor: isWishlisted ? 'transparent' : '#6c8fff',
                  color: isWishlisted ? '#6c8fff' : '#fff',
                  borderColor: '#6c8fff'
                }}
              >
                {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button 
                fullWidth 
                variant={isFavorited ? "outlined" : "contained"} 
                startIcon={isFavorited ? <Favorite /> : <FavoriteBorder />}
                onClick={toggleFavorite}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 700, 
                  bgcolor: isFavorited ? 'transparent' : 'rgba(255,79,106,0.1)',
                  color: '#ff4f6a',
                  borderColor: 'rgba(255,79,106,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(255,79,106,0.2)',
                    borderColor: '#ff4f6a'
                  }
                }}
              >
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </Button>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <CalendarToday sx={{ color: '#7986cb', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#455a64', display: 'block' }}>Release Date</Typography>
                  <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600 }}>
                    {new Date(game.release_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Code sx={{ color: '#7986cb', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#455a64', display: 'block' }}>Developer</Typography>
                  <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600 }}>
                    {game.developer || 'Unknown Developer'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Star sx={{ color: '#7986cb', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#455a64', display: 'block' }}>Rating</Typography>
                  <Typography variant="body2" sx={{ color: '#ffb700', fontWeight: 600 }}>
                    {game.positive_ratings} Positive / {game.negative_ratings} Negative
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Translate sx={{ color: '#7986cb', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#455a64', display: 'block' }}>Languages</Typography>
                  <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {game.languages?.join(', ') || 'English'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameDetail;
