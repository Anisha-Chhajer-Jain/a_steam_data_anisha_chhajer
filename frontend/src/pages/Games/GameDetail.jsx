import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Chip, Skeleton, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/gamesSlice';
import { addToWishlist, removeFromWishlist, addRecentlyViewed } from '../../store/wishlistSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckIcon from '@mui/icons-material/Check';
import WindowIcon from '@mui/icons-material/Window';

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gamesList, loading } = useSelector(s => s.games);
  const { items: wishlist } = useSelector(s => s.wishlist);

  const game = gamesList.find(g => g.appid.toString() === id);

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!game && !loading) {
      dispatch(fetchGames({ page: 1, limit: 100 }));
    }
  }, [game, loading, dispatch]);

  useEffect(() => {
    if (game) {
      dispatch(addRecentlyViewed(game));
      setActiveImage(game.header_image);
    }
  }, [game, dispatch]);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 940, margin: '0 auto', pt: 4 }}>
        <Skeleton variant="text" width="40%" height={40} sx={{ bgcolor: '#161b27', mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={350} sx={{ bgcolor: '#161b27', mb: 1 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[1,2,3,4].map(i => <Skeleton key={i} variant="rectangular" width={120} height={65} sx={{ bgcolor: '#161b27' }} />)}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={150} sx={{ bgcolor: '#161b27', mb: 2 }} />
            <Skeleton variant="text" width="100%" height={100} sx={{ bgcolor: '#161b27', mb: 2 }} />
            <Skeleton variant="rectangular" height={150} sx={{ bgcolor: '#161b27' }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!game) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5" sx={{ color: '#8f98a0' }}>Game not found</Typography>
        <Button onClick={() => navigate('/games')} sx={{ mt: 2, color: '#67c1f5' }}>Back to Games</Button>
      </Box>
    );
  }

  const isWishlisted = wishlist.some(item => item.appid === game.appid);
  const toggleWishlist = () => {
    isWishlisted ? dispatch(removeFromWishlist(game.appid)) : dispatch(addToWishlist(game));
  };

  // Mock data for Steam-like features that might not be in the basic API
  const reviewStatus = (game.positive_ratings || 0) > (game.negative_ratings || 0) * 2 ? 'Very Positive' : 'Positive';
  const totalReviews = (game.positive_ratings || 0) + (game.negative_ratings || 0);
  const devName = game.developer || 'Unknown Developer';
  const pubName = game.publisher || devName;
  const releaseDate = game.release_date ? new Date(game.release_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Unknown Date';

  // Screenshots mock (using the same header image for demo if no screenshots are available)
  const screenshots = [game.header_image, game.header_image, game.header_image, game.header_image, game.header_image];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: '#1b2838', 
      color: '#c6d4df',
      fontFamily: '"Motiva Sans", Arial, Helvetica, sans-serif',
      pb: 8
    }}>
      <Helmet><title>{game.name} on Arcade Stream</title></Helmet>

      {/* Top Banner Gradient Background area */}
      <Box sx={{ 
        position: 'absolute', top: 0, left: 0, right: 0, height: 450, 
        background: 'radial-gradient(ellipse at top, #2a475e 0%, #1b2838 70%)',
        zIndex: 0, opacity: 0.5, pointerEvents: 'none'
      }} />

      <Box sx={{ maxWidth: 940, margin: '0 auto', pt: 3, position: 'relative', zIndex: 1, px: { xs: 2, md: 0 } }}>
        
        {/* Breadcrumbs & Title */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#8f98a0', fontSize: '0.8rem', mb: 1, '& span': { color: '#8f98a0', mx: 0.5 } }}>
              <span style={{ cursor: 'pointer', '&:hover': { color: '#fff' } }} onClick={() => navigate('/games')}>All Games</span>
              &gt; <span style={{ cursor: 'pointer' }}>{(game.genres && game.genres[0]) || 'Indie'} Games</span>
              &gt; <span style={{ cursor: 'pointer' }}>{game.name}</span>
            </Typography>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 500, letterSpacing: '0.05em' }}>
              {game.name}
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: 'rgba(103, 193, 245, 0.2)', 
              color: '#67c1f5', 
              textTransform: 'none', 
              borderRadius: '2px',
              px: 2, py: 0.5,
              fontSize: '0.9rem',
              '&:hover': { bgcolor: '#67c1f5', color: '#fff' }
            }}
          >
            Community Hub
          </Button>
        </Box>

        {/* Hero Section Container */}
        <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)', p: 2, borderRadius: 1, mb: 4 }}>
          <Grid container spacing={2}>
            {/* Left: Main Media & Thumbnails */}
            <Grid item xs={12} md={8}>
              <Box sx={{ position: 'relative', bgcolor: '#000', mb: 1, height: { xs: 250, sm: 350, md: 400 }, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {activeImage && <img src={activeImage} alt={game.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
                
                {/* Mock arrows for carousel */}
                <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)', display: 'flex', alignItems: 'center', cursor: 'pointer', opacity: 0, '&:hover': { opacity: 1 }, transition: 'opacity 0.2s' }}>
                  <ArrowBackIosNewIcon sx={{ color: '#fff', fontSize: 40, ml: 1 }} />
                </Box>
                <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)', display: 'flex', alignItems: 'center', cursor: 'pointer', opacity: 0, '&:hover': { opacity: 1 }, transition: 'opacity 0.2s' }}>
                  <ArrowForwardIosIcon sx={{ color: '#fff', fontSize: 40, mr: 1 }} />
                </Box>
              </Box>
              
              {/* Thumbnail Strip */}
              <Box sx={{ display: 'flex', gap: 0.5, overflowX: 'auto', '&::-webkit-scrollbar': { height: 8 }, '&::-webkit-scrollbar-thumb': { bgcolor: '#3d4450', borderRadius: 4 } }}>
                {screenshots.map((img, idx) => (
                  <Box 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    sx={{ 
                      width: 116, height: 65, flexShrink: 0, cursor: 'pointer',
                      border: activeImage === img ? '2px solid #fff' : '2px solid transparent',
                      opacity: activeImage === img ? 1 : 0.6,
                      '&:hover': { opacity: 1 },
                      transition: 'all 0.1s'
                    }}
                  >
                    <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right: Game Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img src={game.header_image} alt="Header" style={{ width: '100%', marginBottom: '10px' }} />
                
                <Typography sx={{ fontSize: '0.85rem', color: '#c6d4df', mb: 2, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {game.short_description || "A fantastic new experience that you can play with your viewers. Get ready for the ultimate interactive streaming session!"}
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', fontSize: '0.75rem', mb: 0.5 }}>
                    <Box sx={{ width: 100, color: '#556772' }}>ALL REVIEWS:</Box>
                    <Box sx={{ color: '#66c0f4', fontWeight: 'bold' }}>{reviewStatus} <span style={{ color: '#8f98a0', fontWeight: 'normal' }}>({totalReviews})</span></Box>
                  </Box>
                  <Box sx={{ display: 'flex', fontSize: '0.75rem', mb: 2 }}>
                    <Box sx={{ width: 100, color: '#556772' }}>RELEASE DATE:</Box>
                    <Box sx={{ color: '#8f98a0' }}>{releaseDate}</Box>
                  </Box>

                  <Box sx={{ display: 'flex', fontSize: '0.75rem', mb: 0.5 }}>
                    <Box sx={{ width: 100, color: '#556772' }}>DEVELOPER:</Box>
                    <Box sx={{ color: '#66c0f4' }}>{devName}</Box>
                  </Box>
                  <Box sx={{ display: 'flex', fontSize: '0.75rem', mb: 2 }}>
                    <Box sx={{ width: 100, color: '#556772' }}>PUBLISHER:</Box>
                    <Box sx={{ color: '#66c0f4' }}>{pubName}</Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#556772', width: '100%' }}>Popular user-defined tags for this product:</Typography>
                  {(game.genres || ['Indie', 'Action', 'Casual']).slice(0, 4).map(g => (
                    <Chip key={g} label={g} size="small" sx={{ bgcolor: 'rgba(103, 193, 245, 0.2)', color: '#67c1f5', height: 20, fontSize: '0.7rem', borderRadius: '2px', '&:hover': { bgcolor: 'rgba(103, 193, 245, 0.4)' } }} />
                  ))}
                  <Chip label="+" size="small" sx={{ bgcolor: 'rgba(103, 193, 245, 0.2)', color: '#67c1f5', height: 20, fontSize: '0.7rem', borderRadius: '2px', cursor: 'pointer' }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Lower Section container */}
        <Grid container spacing={2}>
          
          {/* Left Main Content (Buy Box & About) */}
          <Grid item xs={12} md={8}>
            
            {/* Buy Box */}
            <Box sx={{ 
              background: 'linear-gradient(-60deg, rgba(226,244,255,0.3) 5%,rgba(84,107,115,0.3) 95%)',
              borderRadius: '3px',
              p: '16px',
              mb: 4,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" sx={{ color: '#fff', fontSize: '1.3rem' }}>Buy {game.name}</Typography>
                <WindowIcon sx={{ color: '#c6d4df', fontSize: '1rem', opacity: 0.5 }} />
              </Box>

              <Box sx={{ 
                bgcolor: '#000', 
                p: '2px', 
                borderRadius: '2px', 
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}>
                <Box sx={{ color: '#c6d4df', px: 2, py: 0.5, fontSize: '0.9rem' }}>
                  {parseFloat(game.price) === 0 ? 'Free' : `₹ ${game.price || '199'}`}
                </Box>
                <Button 
                  sx={{ 
                    background: 'linear-gradient(to right, #75b022 5%, #588a1b 95%)',
                    color: '#d2efa9',
                    borderRadius: '2px',
                    textTransform: 'none',
                    px: 3,
                    py: '6px',
                    lineHeight: 1,
                    fontSize: '0.9rem',
                    '&:hover': { background: 'linear-gradient(to right, #8ed629 5%, #6aa621 95%)', color: '#fff' }
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>

            {/* About This Game */}
            <Box sx={{ pt: 2, borderTop: '1px solid #3c444c' }}>
              <Typography sx={{ color: '#fff', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '2px', mb: 2 }}>
                About This Game
              </Typography>
              <Typography component="div" sx={{ color: '#acb2b8', fontSize: '15px', lineHeight: 1.6, '& p': { mb: 2 } }}>
                <p>{game.name} Only works for TWITCH Streamers</p>
                <p>{game.short_description || "This is a set of mini games that Twitch Streamers can play with their viewers interaction."}</p>
                <p>Available Content:<br/>- 7 minigames<br/>- 3 tools</p>
                <p>It does not display nicknames for viewers that have non-Latin characters, such as Japanese, Chinese, Korean, etc.</p>
                <p>As a Streamer, you can connect to the chat of your channel and allow your viewers to participate in mini-games to earn rank and points.</p>
                <p>You can set your bot and currency name, or customize the commands that your channel bot uses to add points to the viewers.</p>
              </Typography>
            </Box>

          </Grid>

          {/* Right Sidebar Features */}
          <Grid item xs={12} md={4}>
            
            {/* Features List */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', p: 1, mb: '2px', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(103, 193, 245, 0.2)' } }}>
                <PeopleAltIcon sx={{ color: '#66c0f4', fontSize: '1.2rem', mr: 2, ml: 1 }} />
                <Typography sx={{ color: '#66c0f4', fontSize: '0.85rem' }}>Online PvP</Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', p: 1, mb: '2px', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(103, 193, 245, 0.2)' } }}>
                <PeopleAltIcon sx={{ color: '#66c0f4', fontSize: '1.2rem', mr: 2, ml: 1 }} />
                <Typography sx={{ color: '#66c0f4', fontSize: '0.85rem' }}>Online Co-op</Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', p: 1, mb: '2px', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(103, 193, 245, 0.2)' } }}>
                <EmojiEventsIcon sx={{ color: '#66c0f4', fontSize: '1.2rem', mr: 2, ml: 1 }} />
                <Typography sx={{ color: '#66c0f4', fontSize: '0.85rem' }}>Steam Achievements</Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', p: 1, mb: '2px', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(103, 193, 245, 0.2)' } }}>
                <PeopleAltIcon sx={{ color: '#66c0f4', fontSize: '1.2rem', mr: 2, ml: 1 }} />
                <Typography sx={{ color: '#66c0f4', fontSize: '0.85rem' }}>Family Sharing</Typography>
              </Box>
            </Box>

            {/* Third-Party Notice */}
            <Box sx={{ bgcolor: 'rgba(172, 161, 107, 0.2)', border: '1px solid rgba(172, 161, 107, 0.4)', p: 1, mb: 3 }}>
              <Typography sx={{ color: '#cba560', fontSize: '0.75rem' }}>
                Requires 3rd-Party Account: Twitch
              </Typography>
            </Box>

            {/* Languages */}
            <Box sx={{ mb: 3, pt: 2, borderTop: '1px solid #3c444c' }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#8f98a0', mb: 1 }}>Languages:</Typography>
              <TableContainer sx={{ overflowX: 'hidden' }}>
                <Table size="small" sx={{ '& .MuiTableCell-root': { borderBottom: 'none', p: 0.5, fontSize: '0.75rem', color: '#8f98a0' } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#556772' }}></TableCell>
                      <TableCell align="center" sx={{ color: '#556772' }}>Interface</TableCell>
                      <TableCell align="center" sx={{ color: '#556772' }}>Full Audio</TableCell>
                      <TableCell align="center" sx={{ color: '#556772' }}>Subtitles</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ borderTop: '1px solid #2a3f5a' }}>
                      <TableCell sx={{ color: '#c6d4df' }}>English</TableCell>
                      <TableCell align="center"><CheckIcon sx={{ fontSize: '1rem', color: '#c6d4df' }} /></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"><CheckIcon sx={{ fontSize: '1rem', color: '#c6d4df' }} /></TableCell>
                    </TableRow>
                    <TableRow sx={{ borderTop: '1px solid #2a3f5a' }}>
                      <TableCell sx={{ color: '#c6d4df' }}>Portuguese - Brazil</TableCell>
                      <TableCell align="center"><CheckIcon sx={{ fontSize: '1rem', color: '#c6d4df' }} /></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"><CheckIcon sx={{ fontSize: '1rem', color: '#c6d4df' }} /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Achievements Mock */}
            <Box sx={{ pt: 2, borderTop: '1px solid #3c444c' }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#8f98a0', mb: 1 }}>Includes 6 Steam Achievements</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4].map(i => (
                  <Box key={i} sx={{ width: 48, height: 48, bgcolor: '#1a1f24', border: '1px solid #3c444c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '10px', color: '#556772' }}>Img {i}</Typography>
                  </Box>
                ))}
                <Box sx={{ width: 48, height: 48, bgcolor: '#22384c', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#2d4b66' } }}>
                  <Typography sx={{ fontSize: '11px', color: '#67c1f5', textAlign: 'center', lineHeight: 1 }}>View<br/>all 6</Typography>
                </Box>
              </Box>
            </Box>

            {/* Meta Info bottom right */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #3c444c', fontSize: '0.75rem', color: '#556772' }}>
              <Box sx={{ display: 'flex', mb: 0.5 }}><Box sx={{ width: 70 }}>TITLE:</Box> <Box sx={{ color: '#c6d4df' }}>{game.name}</Box></Box>
              <Box sx={{ display: 'flex', mb: 0.5 }}><Box sx={{ width: 70 }}>GENRE:</Box> <Box sx={{ color: '#67c1f5' }}>{(game.genres || []).join(', ')}</Box></Box>
              <Box sx={{ display: 'flex', mb: 0.5 }}><Box sx={{ width: 70 }}>DEVELOPER:</Box> <Box sx={{ color: '#67c1f5' }}>{devName}</Box></Box>
              <Box sx={{ display: 'flex' }}><Box sx={{ width: 70 }}>PUBLISHER:</Box> <Box sx={{ color: '#67c1f5' }}>{pubName}</Box></Box>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GameDetail;
