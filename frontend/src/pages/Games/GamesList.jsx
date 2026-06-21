import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button, Chip, Stack, IconButton,
  Checkbox, MenuItem, Select, FormControl, Tooltip, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Pagination, Avatar, LinearProgress
} from '@mui/material';
import {
  Add, FilterList, Refresh, Edit, Delete, Star, TrendingUp,
  PeopleOutlined, Storage, WarningAmberOutlined, CloudDoneOutlined
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters, setPage, deleteGame } from '../../store/gamesSlice';
import { toast } from 'react-toastify';
import GameFormModal from '../../components/Games/GameFormModal';

const GENRE_LIST = ['All Genres', 'Action', 'Adventure', 'RPG', 'Strategy', 'Indie', 'Simulation', 'Racing', 'Sports'];
const RATING_LIST = ['All Ratings', '4.5+', '4.0+', '3.5+', '3.0+'];
const YEAR_LIST  = ['Release Year', '2024', '2023', '2022', '2021', '2020', 'Before 2020'];

const genreColor = {
  Action: '#ff4f6a', Adventure: '#00d4ff', RPG: '#ffb700',
  Strategy: '#00e5a0', Indie: '#a78bfa', Simulation: '#6c8fff',
  Racing: '#ff9800', Sports: '#4caf50', 'Cyber-Racing': '#00d4ff',
  'Tactical FPS': '#ff4f6a', 'Adventure RPG': '#ffb700',
};

const StatCard = ({ label, value, sub, subColor, icon: Icon, iconColor, progress }) => (
  <Paper sx={{
    flex: 1, p: 2.5, bgcolor: '#161b27',
    border: `1px solid ${iconColor}33`, borderRadius: 2.5,
    minWidth: 180,
  }}>
    <Typography variant="overline" sx={{ color: iconColor, fontSize: '0.6rem', fontWeight: 700, letterSpacing: 1.5 }}>
      {label}
    </Typography>
    <Typography variant="h5" sx={{ color: '#e8eaf6', fontWeight: 700, mt: 0.5, mb: 0.5 }}>
      {value}
    </Typography>
    {progress !== undefined && (
      <LinearProgress variant="determinate" value={progress}
        sx={{ mb: 0.5, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: iconColor } }} />
    )}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {Icon && <Icon sx={{ fontSize: 12, color: subColor || iconColor }} />}
      <Typography variant="caption" sx={{ color: subColor || iconColor, fontSize: '0.7rem', fontWeight: 600 }}>
        {sub}
      </Typography>
    </Box>
  </Paper>
);

export const GameCard = ({ game }) => {
  const genres = Array.isArray(game.genres) ? game.genres : [];
  const genreLabel = genres.length >= 2 ? `${genres[0]} ${genres[1]}` : genres[0] || 'N/A';
  const gColor = genreColor[genreLabel] || genreColor[genres[0]] || '#7986cb';
  const ratingRaw = parseFloat(game.rating || game.positive_ratings || 0);
  const rating = ratingRaw > 100 ? (ratingRaw / 10000).toFixed(1) : ratingRaw > 0 ? ratingRaw.toFixed(1) : 'N/A';
  const price = parseFloat(game.price || 0) === 0 ? 'FREE' : `$${parseFloat(game.price).toFixed(2)}`;

  return (
    <Paper sx={{
      bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 2.5, overflow: 'hidden', cursor: 'pointer',
      transition: 'transform 0.18s, box-shadow 0.18s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 8px 32px rgba(0,0,0,0.4)` },
    }}>
      {/* Banner */}
      <Box sx={{
        height: 120, bgcolor: '#0d1117',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <Typography sx={{ fontSize: '2.2rem', fontWeight: 800, color: '#a3c2ff', letterSpacing: 2, opacity: 0.7 }}>
          {game.name ? game.name.substring(0, 2).toUpperCase() : '??'}
        </Typography>
      </Box>
      {/* Info */}
      <Box sx={{ p: 1.8 }}>
        <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.9rem', mb: 0.3, lineHeight: 1.3 }} noWrap>
          {game.name || 'Unknown Game'}
        </Typography>
        <Typography variant="caption" sx={{ color: '#00d4ff', fontSize: '0.72rem', display: 'block', mb: 1 }} noWrap>
          {game.developer || game.publisher || 'Unknown Studio'}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip label={genreLabel} size="small" sx={{
            bgcolor: `${gColor}18`, color: gColor,
            fontWeight: 700, fontSize: '0.65rem', height: 20, borderRadius: 1,
          }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Star sx={{ fontSize: 12, color: '#ffb700' }} />
            <Typography variant="caption" sx={{ color: '#e8eaf6', fontWeight: 600, fontSize: '0.75rem' }}>
              {rating}
            </Typography>
          </Box>
        </Stack>
        <Typography variant="body2" sx={{
          mt: 1, color: parseFloat(game.price || 0) === 0 ? '#00e5a0' : '#e8eaf6',
          fontWeight: 700, fontSize: '0.85rem',
        }}>
          {price}
        </Typography>
      </Box>
    </Paper>
  );
};

const GamesList = () => {
  const dispatch = useDispatch();
  const { gamesList, loading, pagination, filters } = useSelector(s => s.games);

  const [selected, setSelected]       = useState([]);
  const [genre, setGenre]             = useState('All Genres');
  const [rating, setRating]           = useState('All Ratings');
  const [year, setYear]               = useState('Release Year');
  const [modalOpen, setModalOpen]     = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    dispatch(fetchGames({ page: pagination.page, limit: pagination.limit, ...filters }));
  }, [dispatch, pagination.page, filters]);

  const handleSelectAll = (e) => {
    setSelected(e.target.checked ? gamesList.map(g => g.appid) : []);
  };
  const handleSelectOne = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleDelete = (game) => {
    if (window.confirm(`Delete "${game.name}"?`)) {
      dispatch(deleteGame(game.appid));
      toast.success(`"${game.name}" removed from database`);
    }
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingGame(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingGame(null);
  };

  const handleRefresh = () => {
    dispatch(fetchGames({ page: pagination.page, limit: pagination.limit, ...filters }));
    toast.info('Refreshing game list...');
  };

  const handleGenreFilter = (val) => {
    setGenre(val);
    dispatch(setFilters({ genre: val === 'All Genres' ? '' : val }));
  };

  const formatId = (appid, name) => {
    const initials = name ? name.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('') : 'XX';
    return `#${initials}-${String(appid).slice(-4).padStart(4, '0')}`;
  };

  const formatRating = (game) => {
    const r = parseFloat(game.rating || game.positive_ratings || 0);
    if (r > 100) return (r / 10000).toFixed(1);
    return r > 0 ? r.toFixed(1) : 'N/A';
  };

  const formatPrice = (game) => {
    const p = parseFloat(game.price || 0);
    return p === 0 ? 'FREE' : `$${p.toFixed(2)}`;
  };

  const getGenreDisplay = (game) => {
    const genres = Array.isArray(game.genres) ? game.genres : [];
    if (genres.length === 0) return 'N/A';
    // Combine if multiple
    if (genres.length >= 2) return `${genres[0]} ${genres[1]}`;
    return genres[0];
  };

  const total = pagination.total || gamesList.length;

  return (
    <Box sx={{ bgcolor: '#0d1117', minHeight: '100vh', mx: -2, px: 2, pt: 1, pb: 6 }}>
      <Helmet>
        <title>All Games Management – Arcade Stream</title>
      </Helmet>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, pt: 1 }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#e8eaf6', fontWeight: 700 }}>
            All Games Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#69748c', mt: 0.5 }}>
            Oversee and regulate the global Arcade Stream Pro game repository.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
          sx={{
            bgcolor: '#a3c2ff', color: '#0d1117', fontWeight: 700,
            textTransform: 'none', borderRadius: 2, px: 3, py: 1.2,
            '&:hover': { bgcolor: '#8eb3ff' },
            whiteSpace: 'nowrap',
          }}
        >
          Create New Game
        </Button>
      </Box>

      {/* Filters Row */}
      <Paper sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2, p: 1.5, mb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          {/* Genre Filter */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={genre}
              onChange={e => handleGenreFilter(e.target.value)}
              displayEmpty
              startAdornment={<FilterList sx={{ color: '#69748c', fontSize: 16, mr: 0.5 }} />}
              sx={{ bgcolor: 'transparent', color: '#e8eaf6', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.08)' }, fontSize: '0.85rem' }}
            >
              {GENRE_LIST.map(g => <MenuItem key={g} value={g} sx={{ fontSize: '0.85rem' }}>{g}</MenuItem>)}
            </Select>
          </FormControl>

          {/* Rating Filter */}
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <Select
              value={rating}
              onChange={e => setRating(e.target.value)}
              displayEmpty
              startAdornment={<Star sx={{ color: '#69748c', fontSize: 14, mr: 0.5 }} />}
              sx={{ bgcolor: 'transparent', color: '#e8eaf6', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.08)' }, fontSize: '0.85rem' }}
            >
              {RATING_LIST.map(r => <MenuItem key={r} value={r} sx={{ fontSize: '0.85rem' }}>{r}</MenuItem>)}
            </Select>
          </FormControl>

          {/* Year Filter */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={year}
              onChange={e => setYear(e.target.value)}
              displayEmpty
              sx={{ bgcolor: 'transparent', color: '#e8eaf6', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.08)' }, fontSize: '0.85rem' }}
            >
              {YEAR_LIST.map(y => <MenuItem key={y} value={y} sx={{ fontSize: '0.85rem' }}>{y}</MenuItem>)}
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Typography variant="caption" sx={{ color: '#69748c', fontWeight: 600, fontSize: '0.78rem' }}>
            {total.toLocaleString()} Records Found
          </Typography>

          <Tooltip title="Refresh">
            <IconButton size="small" onClick={handleRefresh} sx={{ color: '#69748c', '&:hover': { color: '#a3c2ff' } }}>
              <Refresh fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 1.5 } }}>
                <TableCell padding="checkbox" sx={{ bgcolor: '#1a2035', pl: 2 }}>
                  <Checkbox
                    size="small"
                    indeterminate={selected.length > 0 && selected.length < gamesList.length}
                    checked={gamesList.length > 0 && selected.length === gamesList.length}
                    onChange={handleSelectAll}
                    sx={{ color: '#56637a', '&.Mui-checked': { color: '#a3c2ff' } }}
                  />
                </TableCell>
                {['GAME', 'ID', 'GENRE', 'RATING', 'PRICE', 'ACTIONS'].map(h => (
                  <TableCell key={h} sx={{
                    bgcolor: '#1a2035', color: '#56637a', fontWeight: 700,
                    fontSize: '0.65rem', letterSpacing: 1.2, textTransform: 'uppercase'
                  }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6, borderBottom: 'none' }}>
                    <CircularProgress size={28} sx={{ color: '#6c8fff' }} />
                  </TableCell>
                </TableRow>
              ) : gamesList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6, borderBottom: 'none', color: '#56637a' }}>
                    No games found. Try adjusting filters or add a new game.
                  </TableCell>
                </TableRow>
              ) : (
                gamesList.map((game, idx) => {
                  const isChecked = selected.includes(game.appid);
                  const genres = Array.isArray(game.genres) ? game.genres : [];
                  const genreLabel = getGenreDisplay(game);
                  const gColor = genreColor[genreLabel] || genreColor[genres[0]] || '#7986cb';
                  return (
                    <TableRow
                      key={game.appid}
                      hover
                      sx={{
                        '& .MuiTableCell-root': { borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 },
                        bgcolor: isChecked ? 'rgba(163,194,255,0.04)' : 'transparent',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSelectOne(game.appid)}
                    >
                      <TableCell padding="checkbox" sx={{ pl: 2 }} onClick={e => e.stopPropagation()}>
                        <Checkbox
                          size="small"
                          checked={isChecked}
                          onChange={() => handleSelectOne(game.appid)}
                          sx={{ color: '#56637a', '&.Mui-checked': { color: '#a3c2ff' } }}
                        />
                      </TableCell>

                      {/* Game Name + Developer */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar variant="rounded" sx={{
                            width: 40, height: 40, bgcolor: '#0d1117',
                            border: '1px solid rgba(255,255,255,0.05)',
                            fontSize: '0.7rem', color: '#a3c2ff', fontWeight: 700,
                          }}>
                            {game.name ? game.name.substring(0, 2).toUpperCase() : '??'}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ color: '#e8eaf6', fontWeight: 600, fontSize: '0.85rem' }}>
                              {game.name || 'Unknown Game'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#00d4ff', fontSize: '0.72rem' }}>
                              {game.developer || game.publisher || 'Unknown Studio'}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* ID */}
                      <TableCell>
                        <Typography variant="caption" sx={{
                          color: '#7986cb', fontFamily: 'monospace',
                          bgcolor: 'rgba(121,134,203,0.08)', px: 1, py: 0.5,
                          borderRadius: 1, fontSize: '0.72rem', fontWeight: 600,
                        }}>
                          {formatId(game.appid, game.name)}
                        </Typography>
                      </TableCell>

                      {/* Genre */}
                      <TableCell>
                        <Typography variant="caption" sx={{ color: '#c5cae9', fontSize: '0.8rem' }}>
                          {genreLabel}
                        </Typography>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ fontSize: 13, color: '#ffb700' }} />
                          <Typography variant="caption" sx={{ color: '#e8eaf6', fontWeight: 600, fontSize: '0.82rem' }}>
                            {formatRating(game)}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Price */}
                      <TableCell>
                        <Typography variant="body2" sx={{
                          color: parseFloat(game.price || 0) === 0 ? '#00e5a0' : '#e8eaf6',
                          fontWeight: 600, fontSize: '0.85rem'
                        }}>
                          {formatPrice(game)}
                        </Typography>
                      </TableCell>

                      {/* Actions */}
                      <TableCell onClick={e => e.stopPropagation()}>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Edit Game">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(game)}
                              sx={{ color: '#7986cb', '&:hover': { color: '#a3c2ff', bgcolor: 'rgba(163,194,255,0.1)' } }}
                            >
                              <Edit sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Game">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(game)}
                              sx={{ color: '#7986cb', '&:hover': { color: '#ff4f6a', bgcolor: 'rgba(255,79,106,0.1)' } }}
                            >
                              <Delete sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {!loading && (
          <Box sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            px: 2, py: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Typography variant="caption" sx={{ color: '#56637a' }}>
              Showing {((pagination.page - 1) * (pagination.limit || 10)) + 1}–{Math.min(pagination.page * (pagination.limit || 10), total)} of {total.toLocaleString()} games
            </Typography>
            {(pagination.pages || 1) > 1 && (
              <Pagination
                count={pagination.pages || 1}
                page={pagination.page}
                onChange={(_, p) => dispatch(setPage(p))}
                size="small"
                sx={{
                  '& .MuiPaginationItem-root': { color: '#7986cb', borderColor: 'rgba(255,255,255,0.08)' },
                  '& .Mui-selected': { bgcolor: '#a3c2ff !important', color: '#0d1117', fontWeight: 700 },
                }}
              />
            )}
          </Box>
        )}
      </Paper>

      {/* Stat Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <StatCard
          label="ACTIVE PLAYERS"
          value="1.2M"
          sub="+12% this week"
          icon={TrendingUp}
          iconColor="#00d4ff"
          subColor="#00d4ff"
        />
        <StatCard
          label="LIBRARY STORAGE"
          value="14.8 TB"
          sub=""
          icon={Storage}
          iconColor="#a3c2ff"
          progress={74}
        />
        <StatCard
          label="GLOBAL UPTIME"
          value="99.99%"
          sub="All systems operational"
          icon={CloudDoneOutlined}
          iconColor="#ffb700"
          subColor="#ffb700"
        />
        <StatCard
          label="PENDING REPORTS"
          value="24"
          sub="Action required"
          icon={WarningAmberOutlined}
          iconColor="#ff4f6a"
          subColor="#ff4f6a"
        />
      </Stack>

      {/* Game Form Modal */}
      <GameFormModal
        open={modalOpen}
        onClose={handleModalClose}
        editingGame={editingGame}
        onSuccess={() => dispatch(fetchGames({ page: pagination.page, limit: pagination.limit, ...filters }))}
      />
    </Box>
  );
};

export default GamesList;
export { GamesList };
