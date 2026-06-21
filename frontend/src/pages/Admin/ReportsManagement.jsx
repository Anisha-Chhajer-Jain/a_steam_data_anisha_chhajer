import React from 'react';
import {
  Box, Typography, Grid, Paper, Stack, Button,
  IconButton, Chip, Divider, Avatar, AvatarGroup
} from '@mui/material';
import {
  CalendarTodayOutlined, Add, CloudDownloadOutlined,
  BarChartOutlined, AssessmentOutlined, DevicesOutlined,
  InsertDriveFileOutlined, ViewColumnOutlined,
  PictureAsPdfOutlined, TableChartOutlined
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import {
  BarChart, Bar, ResponsiveContainer, Cell
} from 'recharts';

const templateData = [
  { v: 10 }, { v: 15 }, { v: 25 }, { v: 40 }, { v: 65 }
];

const ReportsManagement = () => {
  return (
    <Box sx={{ pb: 8, bgcolor: '#0d1117', minHeight: '100vh', mx: -2, px: 2.5, pt: 2.5 }}>
      <Helmet><title>Reports Management – Arcade Stream Pro</title></Helmet>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#e8eaf6', fontWeight: 800, fontSize: '1.4rem' }}>
            Reports Management
          </Typography>
          <Typography sx={{ color: '#56637a', fontSize: '0.75rem', mt: 0.25 }}>
            Precision intelligence for Arcade Stream ecosystem performance.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<CalendarTodayOutlined sx={{ fontSize: 16 }} />}
            sx={{
              color: '#e8eaf6', borderColor: 'rgba(255,255,255,0.1)',
              textTransform: 'none', borderRadius: 1.5, px: 2, py: 0.8,
              fontSize: '0.78rem', fontWeight: 600,
              '&:hover': { borderColor: 'rgba(255,255,255,0.2)', bgcolor: 'rgba(255,255,255,0.02)' }
            }}
          >
            View Scheduled
          </Button>
          <Button
            variant="contained"
            startIcon={<Add sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: '#a3c2ff', color: '#0d1117', fontWeight: 700,
              textTransform: 'none', borderRadius: 1.5, px: 2.5, py: 0.8,
              fontSize: '0.78rem', '&:hover': { bgcolor: '#8eb3ff' },
              boxShadow: '0 2px 12px rgba(163,194,255,0.3)',
            }}
          >
            Generate New Report
          </Button>
        </Stack>
      </Box>

      {/* ── Report Templates ──────────────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssessmentOutlined sx={{ color: '#6c8fff', fontSize: 18 }} />
            <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.9rem' }}>Report Templates</Typography>
          </Box>
          <Typography sx={{ color: '#a3c2ff', fontWeight: 700, fontSize: '0.65rem', letterSpacing: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            VIEW ALL TEMPLATES
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Template 1 */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.9rem' }}>Genre Distribution</Typography>
                <ViewColumnOutlined sx={{ color: '#56637a', fontSize: 16 }} />
              </Box>
              <Typography sx={{ color: '#56637a', fontSize: '0.75rem', lineHeight: 1.4, mb: 4, flexGrow: 1 }}>
                Player engagement and retention metrics across all active game genres.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.65rem', border: '1px solid #161b27', bgcolor: '#2d3748' } }}>
                  <Avatar alt="1" />
                  <Avatar alt="2" />
                  <Avatar alt="3" />
                </AvatarGroup>
                <Button size="small" sx={{ color: '#7986cb', border: '1px solid rgba(121,134,203,0.2)', borderRadius: 1.5, fontSize: '0.7rem', fontWeight: 600, px: 2 }}>
                  CUSTOMIZE
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Template 2 */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(0,212,255,0.2)', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Top accent bar */}
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, bgcolor: '#00d4ff', opacity: 0.8 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.9rem' }}>Revenue Analytics</Typography>
              </Box>
              <Typography sx={{ color: '#56637a', fontSize: '0.75rem', lineHeight: 1.4, mb: 2 }}>
                Comprehensive financial breakdown including microtransactions and sub fees.
              </Typography>
              
              <Box sx={{ height: 40, width: '100%', mb: 2, flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={templateData} barSize={24}>
                    <Bar dataKey="v" radius={[2, 2, 0, 0]}>
                      {templateData.map((_, i) => (
                        <Cell key={i} fill={i === templateData.length - 1 ? '#00d4ff' : 'rgba(0,212,255,0.2)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: '#00d4ff', fontWeight: 800, fontSize: '0.65rem', letterSpacing: 0.5 }}>
                  LATEST: +12.4%
                </Typography>
                <Button size="small" sx={{ color: '#7986cb', border: '1px solid rgba(121,134,203,0.2)', borderRadius: 1.5, fontSize: '0.7rem', fontWeight: 600, px: 2 }}>
                  CUSTOMIZE
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Template 3 */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.9rem' }}>Platform Performance</Typography>
              </Box>
              <Typography sx={{ color: '#56637a', fontSize: '0.75rem', lineHeight: 1.4, mb: 3 }}>
                Cross-platform latency, uptime, and hardware-specific engagement data.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexGrow: 1 }}>
                <Box sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1.5, p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <Typography sx={{ color: '#7986cb', fontSize: '0.6rem', fontWeight: 700, letterSpacing: 1, mb: 0.5 }}>WEB</Typography>
                  <Typography sx={{ color: '#e8eaf6', fontWeight: 800, fontSize: '1.1rem' }}>99.9%</Typography>
                </Box>
                <Box sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1.5, p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <Typography sx={{ color: '#7986cb', fontSize: '0.6rem', fontWeight: 700, letterSpacing: 1, mb: 0.5 }}>MOBILE</Typography>
                  <Typography sx={{ color: '#e8eaf6', fontWeight: 800, fontSize: '1.1rem' }}>99.4%</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: '#ffb700', fontWeight: 800, fontSize: '0.65rem', letterSpacing: 0.5 }}>
                  STABLE
                </Typography>
                <Button size="small" sx={{ color: '#7986cb', border: '1px solid rgba(121,134,203,0.2)', borderRadius: 1.5, fontSize: '0.7rem', fontWeight: 600, px: 2 }}>
                  CUSTOMIZE
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ── Recent Exports ────────────────────────────────────────────────── */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CloudDownloadOutlined sx={{ color: '#6c8fff', fontSize: 18 }} />
          <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.9rem' }}>Recent Exports</Typography>
        </Box>
        
        <Paper sx={{ bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 1fr 2fr 1fr', px: 2.5, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            {['REPORT NAME', 'FORMAT', 'DATE GENERATED', 'ACTION'].map((h, i) => (
              <Typography key={h} sx={{ color: '#56637a', fontSize: '0.6rem', fontWeight: 700, letterSpacing: 1.2, textAlign: i === 3 ? 'right' : 'left' }}>
                {h}
              </Typography>
            ))}
          </Box>
          
          <Stack spacing={0}>
            {[
              { icon: BarChartOutlined, name: 'Q3 Growth Strategy v2', format: 'PDF', formatColor: '#ff4f6a', formatBg: 'rgba(255,79,106,0.1)', date: 'Oct 24, 2023 · 14:22' },
              { icon: InsertDriveFileOutlined, name: 'September Global Revenue', format: 'XLSX', formatColor: '#00e5a0', formatBg: 'rgba(0,229,160,0.1)', date: 'Oct 21, 2023 · 09:15' },
              { icon: PeopleOutlined, name: 'User Demographics Audit', format: 'CSV', formatColor: '#6c8fff', formatBg: 'rgba(108,143,255,0.1)', date: 'Oct 18, 2023 · 18:45' },
            ].map((row, i) => (
              <React.Fragment key={i}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 1fr 2fr 1fr', px: 2.5, py: 2, alignItems: 'center', '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <row.icon sx={{ fontSize: 14, color: '#a3c2ff' }} />
                    </Box>
                    <Typography sx={{ color: '#e8eaf6', fontSize: '0.8rem', fontWeight: 600 }}>{row.name}</Typography>
                  </Box>
                  <Box>
                    <Chip label={row.format} size="small" sx={{ bgcolor: row.formatBg, color: row.formatColor, fontSize: '0.6rem', fontWeight: 800, height: 20, borderRadius: 1 }} />
                  </Box>
                  <Typography sx={{ color: '#e8eaf6', fontSize: '0.75rem', fontWeight: 500 }}>{row.date}</Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton size="small" sx={{ color: '#6c8fff', '&:hover': { bgcolor: 'rgba(108,143,255,0.1)' } }}>
                      <CloudDownloadOutlined sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
                {i < 2 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
              </React.Fragment>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ReportsManagement;
