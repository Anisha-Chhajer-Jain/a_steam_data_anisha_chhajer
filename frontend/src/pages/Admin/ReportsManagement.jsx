import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Chip } from '@mui/material';
import { Download, Delete } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const reports = [
  { id: 1, name: 'Q1_2024_Gaming_Trends.pdf', type: 'Analytics', date: '2024-03-31', size: '2.4 MB', status: 'Ready' },
  { id: 2, name: 'User_Growth_Report_May.csv', type: 'Users', date: '2024-05-01', size: '1.1 MB', status: 'Ready' },
  { id: 3, name: 'Platform_Revenue_Estimates.xlsx', type: 'Financial', date: '2024-06-15', size: '3.8 MB', status: 'Processing' },
];

const ReportsManagement = () => (
  <Box>
    <Helmet><title>Reports Management – Arcade Stream</title></Helmet>
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#ff4f6a', fontWeight: 700 }}>ADMINISTRATION</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#e8eaf6' }}>Generated Reports</Typography>
      </Box>
      <Button variant="contained" sx={{ bgcolor: '#6c8fff' }}>Generate New Report</Button>
    </Box>
    <TableContainer component={Paper} sx={{ bgcolor: '#161b27', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Report Name</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Type</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Date</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Status</TableCell>
            <TableCell sx={{ color: '#90a4ae', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((r) => (
            <TableRow key={r.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ color: '#e8eaf6', borderBottom: '1px solid rgba(255,255,255,0.03)', fontWeight: 600 }}>{r.name}</TableCell>
              <TableCell sx={{ color: '#7986cb', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{r.type}</TableCell>
              <TableCell sx={{ color: '#455a64', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{r.date}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <Chip label={r.status} size="small" sx={{ bgcolor: r.status === 'Ready' ? 'rgba(0,229,160,0.1)' : 'rgba(255,183,0,0.1)', color: r.status === 'Ready' ? '#00e5a0' : '#ffb700', fontSize: '0.65rem' }} />
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <IconButton size="small" sx={{ color: '#00e5a0' }} disabled={r.status !== 'Ready'}><Download fontSize="small" /></IconButton>
                <IconButton size="small" sx={{ color: '#ff4f6a' }}><Delete fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default ReportsManagement;
