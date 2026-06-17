import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button } from '@mui/material';
import { Edit, Delete, Block } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@arcadestream.io', role: 'admin', status: 'active', joined: '2023-01-15' },
  { id: 2, name: 'John Doe', email: 'john@gmail.com', role: 'user', status: 'active', joined: '2023-11-20' },
  { id: 3, name: 'Jane Smith', email: 'jane@gmail.com', role: 'user', status: 'active', joined: '2024-02-10' },
  { id: 4, name: 'Spam Bot', email: 'spammer@tempmail.com', role: 'user', status: 'banned', joined: '2024-06-01' },
  { id: 5, name: 'Game Reviewer', email: 'reviewer@gmail.com', role: 'moderator', status: 'active', joined: '2023-08-05' },
];

const UserManagement = () => (
  <Box>
    <Helmet><title>User Management – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>ADMINISTRATION</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>User Management</Typography>
      </Box>
      <Button variant="contained" sx={{ bgcolor: '#6c8fff' }}>Export Users</Button>
    </Box>
    <TableContainer component={Paper} sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>User</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Email</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Role</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Status</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Joined</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ color: '#e8eaf6', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{user.name}</TableCell>
              <TableCell sx={{ color: '#7986cb', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{user.email}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <Chip label={user.role} size="small" sx={{ bgcolor: user.role === 'admin' ? 'rgba(255,79,106,0.2)' : user.role === 'moderator' ? 'rgba(108,143,255,0.2)' : 'rgba(255,255,255,0.05)', color: user.role === 'admin' ? '#ff4f6a' : user.role === 'moderator' ? '#6c8fff' : '#90a4ae', fontWeight: 700, fontSize: '0.65rem' }} />
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <Chip label={user.status} size="small" sx={{ bgcolor: user.status === 'active' ? 'rgba(0,229,160,0.1)' : 'rgba(255,79,106,0.1)', color: user.status === 'active' ? '#00e5a0' : '#ff4f6a', fontSize: '0.65rem' }} />
              </TableCell>
              <TableCell sx={{ color: '#455a64', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{user.joined}</TableCell>
              <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <IconButton size="small" sx={{ color: '#6c8fff' }}><Edit fontSize="small" /></IconButton>
                <IconButton size="small" sx={{ color: '#ffb700' }}><Block fontSize="small" /></IconButton>
                <IconButton size="small" sx={{ color: '#ff4f6a' }}><Delete fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default UserManagement;
