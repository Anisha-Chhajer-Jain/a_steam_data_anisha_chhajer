import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Pagination } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/gamesSlice';

const GameManagement = () => {
  const dispatch = useDispatch();
  const { gamesList, loading, totalPages } = useSelector(s => s.games);
  const [page, setPage] = useState(1);

  useEffect(() => { dispatch(fetchGames({ page, limit: 10 })); }, [dispatch, page]);

  return (
    <Box>
      <Helmet><title>Game Management – Arcade Stream</title></Helmet>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>ADMINISTRATION</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Game Database</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#00e5a0', color: '#000', fontWeight: 700 }}>Add New Game</Button>
      </Box>
      <TableContainer component={Paper} sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
              <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>ID</TableCell>
              <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Title</TableCell>
              <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Price</TableCell>
              <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Release Date</TableCell>
              <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gamesList.map((game) => (
              <TableRow key={game.appid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: '#455a64', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{game.appid}</TableCell>
                <TableCell sx={{ color: '#e8eaf6', borderBottom: '1px solid rgba(255,255,255,0.03)', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{game.name}</TableCell>
                <TableCell sx={{ color: '#00e5a0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>${game.price}</TableCell>
                <TableCell sx={{ color: '#7986cb', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{new Date(game.release_date).toLocaleDateString()}</TableCell>
                <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <IconButton size="small" sx={{ color: '#6c8fff' }}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" sx={{ color: '#ff4f6a' }}><Delete fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} color="primary" sx={{ '& .MuiPaginationItem-root': { color: '#e8eaf6' } }} />
      </Box>
    </Box>
  );
};

export default GameManagement;
