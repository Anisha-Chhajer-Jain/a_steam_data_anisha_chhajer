import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Stack, Button, IconButton, Chip, Divider, Fab, Avatar, CircularProgress } from '@mui/material';
import axios from 'axios';
import {
  Storage, Group, Speed, PersonOutlined, CloudDoneOutlined,
  ShieldOutlined, StayCurrentPortraitOutlined, Add as AddIcon
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, YAxis
} from 'recharts';

const userGrowthData = [
  { day: 1, val: 10 }, { day: 2, val: 12 }, { day: 3, val: 15 }, { day: 4, val: 20 },
  { day: 5, val: 25 }, { day: 6, val: 32 }, { day: 7, val: 36 }, { day: 8, val: 40 },
  { day: 9, val: 55 }, { day: 10, val: 68 }, { day: 11, val: 78 }, { day: 12, val: 82 }, { day: 13, val: 80 }
];

const barDataServer = [{ v: 3 }, { v: 5 }, { v: 4 }, { v: 8 }, { v: 6 }, { v: 7 }];
const barDataUsers = [{ v: 4 }, { v: 6 }, { v: 5 }, { v: 8 }, { v: 7 }, { v: 9 }];
const barDataApi = [{ v: 6 }, { v: 4 }, { v: 3 }, { v: 5 }, { v: 4 }, { v: 3 }];

const securityLogs = [
  { id: 1, title: 'New User Registered', subtitle: 'User ID: #7829 • 2 mins ago', icon: PersonOutlined, bg: 'rgba(108,143,255,0.1)' },
  { id: 2, title: 'Database Backup Completed', subtitle: 'Shard-B • 15 mins ago', icon: CloudDoneOutlined, bg: 'rgba(0,212,255,0.1)' },
  { id: 3, title: 'Unauthorized Login Attempt', subtitle: 'IP: 192.168.1.1 (Blocked) - 1h ago', icon: ShieldOutlined, bg: 'rgba(255,79,106,0.1)', color: '#ff4f6a' },
  { id: 4, title: 'System Update Deployed', subtitle: 'Build v2.4.0-stable • 4h ago', icon: StayCurrentPortraitOutlined, bg: 'rgba(121,134,203,0.1)' },
];

// Removing mock topGames to fetch from API

const CustomCard = ({ title, value, subtitle, icon: Icon, chartData, chartColor, isDot }) => (
  <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.65rem', fontWeight: 700, letterSpacing: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color: chartColor || '#e8eaf6', fontWeight: 600, mt: 0.5, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: chartColor || '#7986cb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isDot && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#00d4ff' }} />}
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <Icon sx={{ color: '#7986cb', fontSize: 20 }} />
        {chartData && (
          <Box sx={{ width: 60, height: 30 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <YAxis hide domain={[0, 10]} />
                <Bar dataKey="v" fill={chartColor || '#7986cb'} radius={[2, 2, 0, 0]} barSize={4} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Box>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const [topGames, setTopGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);

  useEffect(() => {
    const fetchTopGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/dashboard/top-games');
        if (response.data && response.data.success) {
          setTopGames(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch top games for dashboard', error);
      } finally {
        setLoadingGames(false);
      }
    };
    fetchTopGames();
  }, []);

  return (
    <Box sx={{ pb: 8, bgcolor: '#0d1117', minHeight: '100vh', mx: -2, px: 2, pt: 2 }}>
      <Helmet>
        <title>GamerAnalytics Pro Dashboard</title>
      </Helmet>

      <Grid container spacing={2}>
        {/* TOP STAT CARDS */}
        <Grid item xs={12} md={6} lg={3}>
          <CustomCard title="SERVER LOAD" value="72%" subtitle="+2.4% vs prev hr" icon={Storage} chartData={barDataServer} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <CustomCard title="ACTIVE USERS" value="1,245" subtitle="Live Streaming" icon={Group} chartData={barDataUsers} chartColor="#00d4ff" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <CustomCard title="API LATENCY" value="42ms" subtitle="Optimal Performance" icon={Speed} chartData={barDataApi} chartColor="#ffb700" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <CustomCard title="DB HEALTH" value="Optimal" subtitle="ACTIVE" icon={Storage} isDot />
          <Typography variant="caption" sx={{ color: '#7986cb', display: 'block', mt: -2, ml: 2.5 }}>Last sync 2m ago</Typography>
        </Grid>

        {/* USER GROWTH CHART */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '1rem' }}>User Growth</Typography>
                <Typography variant="caption" sx={{ color: '#7986cb', display: 'block', mt: -0.5 }}>Network expansion<br/>over the last 30 days</Typography>
              </Box>
              <Box sx={{ display: 'flex', bgcolor: '#222836', borderRadius: 1 }}>
                <Button size="small" sx={{ color: '#e8eaf6', minWidth: 40, px: 1, fontSize: '0.7rem' }}>30D</Button>
                <Button size="small" sx={{ color: '#7986cb', minWidth: 40, px: 1, fontSize: '0.7rem' }}>90D</Button>
              </Box>
            </Box>
            <Box sx={{ height: 120, width: '100%', mb: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4185f4" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#4185f4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <Area type="monotone" dataKey="val" stroke="#4185f4" strokeWidth={2} fillOpacity={1} fill="url(#colorGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
          </Paper>
        </Grid>

        {/* SECURITY LOG */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '1rem' }}>Security Log</Typography>
              <Typography variant="caption" sx={{ color: '#6c8fff', fontWeight: 600, cursor: 'pointer' }}>View All</Typography>
            </Box>
            <Stack spacing={0}>
              {securityLogs.map((log, index) => {
                const Icon = log.icon;
                return (
                  <React.Fragment key={log.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: log.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon sx={{ fontSize: 18, color: log.color || '#7986cb' }} />
                      </Box>
                      <Box>
                      <Typography variant="body2" sx={{ color: log.color || '#e8eaf6', fontSize: '0.8rem', fontWeight: 500 }}>{log.title}</Typography>
                      <Typography variant="caption" sx={{ color: '#7986cb', display: 'block', fontSize: '0.65rem' }}>{log.subtitle}</Typography>
                    </Box>
                  </Box>
                  {index < securityLogs.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
                </React.Fragment>
                );
              })}
            </Stack>
          </Paper>
        </Grid>

        {/* TOP PERFORMING GAMES */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '1rem' }}>Top Performing Games</Typography>
                <Typography variant="caption" sx={{ color: '#7986cb', display: 'block', maxWidth: 200, mt: -0.5 }}>Revenue and growth metrics for the top 4 titles</Typography>
              </Box>
              <Button variant="contained" size="small" sx={{ bgcolor: '#a3c2ff', color: '#0d1117', fontWeight: 700, textTransform: 'none', borderRadius: 2, px: 2, py: 1, '&:hover': { bgcolor: '#8eb3ff' } }}>
                Download Report
              </Button>
            </Box>

            <Grid container sx={{ mb: 1 }}>
              <Grid item xs={8}>
                <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.65rem', fontWeight: 700 }}>GAME NAME</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="overline" sx={{ color: '#7986cb', fontSize: '0.65rem', fontWeight: 700 }}>STATUS</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 1 }} />

            <Stack spacing={0} sx={{ minHeight: 200, position: 'relative' }}>
              {loadingGames ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                  <CircularProgress size={24} sx={{ color: '#6c8fff' }} />
                </Box>
              ) : topGames.length > 0 ? (
                topGames.map((game, i) => (
                  <React.Fragment key={game.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                      <Grid container alignItems="center">
                        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: '#1e2637', fontSize: '0.9rem', color: '#00d4ff', fontWeight: 800 }}>
                            {game.initial}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ color: '#e8eaf6', fontSize: '0.8rem', fontWeight: 700 }}>{game.name}</Typography>
                            <Typography variant="caption" sx={{ color: '#7986cb', display: 'block', fontSize: '0.65rem' }}>{game.genre}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Chip label={game.status} size="small" sx={{ bgcolor: game.bg, color: game.color, fontSize: '0.55rem', fontWeight: 800, height: 20, borderRadius: 1 }} />
                        </Grid>
                      </Grid>
                    </Box>
                    {i < topGames.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
                  </React.Fragment>
                ))
              ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#7986cb' }}>No games found in the database.</Typography>
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography variant="caption" sx={{ color: '#7986cb', display: 'block', mb: 1 }}>
          © 2024 Arcade Stream Pro. All systems operational.
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center">
          <Typography variant="caption" sx={{ color: '#e8eaf6', fontWeight: 600 }}>Terms of Service</Typography>
          <Typography variant="caption" sx={{ color: '#e8eaf6', fontWeight: 600 }}>Support Portal</Typography>
          <Typography variant="caption" sx={{ color: '#e8eaf6', fontWeight: 600 }}>API Docs</Typography>
        </Stack>
      </Box>

      <Fab color="primary" sx={{ position: 'fixed', bottom: 20, right: 20, bgcolor: '#a3c2ff', color: '#0d1117', '&:hover': { bgcolor: '#8eb3ff' } }}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Dashboard;
