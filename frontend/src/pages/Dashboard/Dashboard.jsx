import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, Stack, Button,
  IconButton, Chip, Divider, Avatar, CircularProgress, Tooltip,
} from '@mui/material';
import {
  SportsEsportsOutlined, StarOutlined, AttachMoneyOutlined,
  DevicesOutlined, PeopleOutlined, TrendingUpOutlined,
  FileDownloadOutlined, CalendarTodayOutlined,
  FiberManualRecordOutlined, AddCircleOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/gamesSlice';
import { toast } from 'react-toastify';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
  Tooltip as RechartTooltip, PieChart, Pie, Cell,
} from 'recharts';
import GameFormModal from '../../components/Games/GameFormModal';

// ─── Static data ──────────────────────────────────────────────────────────────
const releaseData = [
  { year: '2019', v: 120 },
  { year: '2020', v: 180 },
  { year: '2021', v: 210 },
  { year: '2022', v: 290 },
  { year: '2023', v: 380 },
];

const GENRE_COLORS = {
  RPG: '#6c8fff', Action: '#00d4ff', Simulation: '#00e5a0',
  Indie: '#ffb700', Adventure: '#ff4f6a', Strategy: '#a78bfa',
};

const recentActivity = [
  { id: 1, Icon: AddCircleOutlined,     color: '#00e5a0', bg: 'rgba(0,229,160,0.1)',   title: 'New Game Added: StarField',       time: '4 hours ago' },
  { id: 2, Icon: TrendingUpOutlined,    color: '#6c8fff', bg: 'rgba(108,143,255,0.1)', title: 'GTA V – BlitzStation 5',          time: '6 hours ago' },
  { id: 3, Icon: NotificationsOutlined, color: '#ffb700', bg: 'rgba(255,183,0,0.1)',   title: 'Platform update deployed',        time: '1 day ago' },
  { id: 4, Icon: PeopleOutlined,        color: '#00d4ff', bg: 'rgba(0,212,255,0.1)',   title: '1,200 new players onboarded',     time: '2 days ago' },
];

const STATUS_LABELS = ['TOP SELLER', 'TRENDING', 'NEW', 'FEATURED', 'HOT'];
const STATUS_COLOR  = { 'TOP SELLER': '#00e5a0', TRENDING: '#00d4ff', NEW: '#a3c2ff', FEATURED: '#ffb700', HOT: '#ff4f6a' };
const STATUS_BG     = { 'TOP SELLER': 'rgba(0,229,160,0.12)', TRENDING: 'rgba(0,212,255,0.12)', NEW: 'rgba(163,194,255,0.12)', FEATURED: 'rgba(255,183,0,0.12)', HOT: 'rgba(255,79,106,0.12)' };

// ─── Sub-components ───────────────────────────────────────────────────────────
const StatCard = ({ label, value, delta, deltaPos, sub, accent }) => (
  <Paper sx={{
    p: 2, bgcolor: '#161b27', borderRadius: 2.5,
    border: '1px solid rgba(255,255,255,0.05)', height: '100%',
    position: 'relative', overflow: 'hidden',
  }}>
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, bgcolor: accent, borderRadius: '2px 2px 0 0', opacity: 0.8 }} />
    <Typography sx={{ color: '#56637a', fontSize: '0.58rem', fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', mb: 0.5 }}>
      {label}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 0.25 }}>
      <Typography sx={{ color: '#e8eaf6', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1 }}>
        {value}
      </Typography>
      {delta && (
        <Typography sx={{ color: deltaPos ? '#00e5a0' : '#ff4f6a', fontWeight: 700, fontSize: '0.68rem' }}>
          {deltaPos ? '+' : ''}{delta}
        </Typography>
      )}
    </Box>
    {sub && (
      <Typography sx={{ color: '#3d4a60', fontSize: '0.68rem' }}>{sub}</Typography>
    )}
  </Paper>
);

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ bgcolor: '#1a2035', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 1.5, px: 1.5, py: 0.75 }}>
      <Typography sx={{ color: '#a3c2ff', fontWeight: 700, fontSize: '0.75rem' }}>{label}</Typography>
      <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.85rem' }}>{payload[0].value} releases</Typography>
    </Box>
  );
};

// Custom SVG center label rendered via Recharts `customized` on PieChart
const DonutLabel = ({ viewBox, total }) => {
  if (!viewBox) return null;
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#e8eaf6" fontSize="18" fontWeight="800">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#56637a" fontSize="9" fontWeight="700" letterSpacing="1">TITLES</text>
    </g>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { gamesList, loading, pagination } = useSelector(s => s.games);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGames({ page: 1, limit: 50, sort: 'rating' }));
  }, [dispatch]);

  // ── Derived stats ────────────────────────────────────────────────────────
  const totalGames = pagination.total || gamesList.length || 245;
  const avgRating  = gamesList.length
    ? (gamesList.reduce((s, g) => s + parseFloat(g.rating || 0), 0) / gamesList.length).toFixed(1)
    : '8.5';
  const avgPrice = gamesList.length
    ? `$${(gamesList.reduce((s, g) => s + parseFloat(g.price || 0), 0) / gamesList.length).toFixed(2)}`
    : '$24.99';

  const platformSet = new Set();
  gamesList.forEach(g => (g.platforms || []).forEach(p => platformSet.add(p)));
  const platformCount = platformSet.size || 5;

  const devSet = new Set();
  gamesList.forEach(g => { if (g.developer || g.publisher) devSet.add(g.developer || g.publisher); });
  const devCount = devSet.size || 48;

  // Genre donut data
  const genreMap = {};
  gamesList.forEach(g => (g.genres || []).forEach(genre => {
    genreMap[genre] = (genreMap[genre] || 0) + 1;
  }));
  const genreData = Object.entries(genreMap).length
    ? Object.entries(genreMap).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({ name, value }))
    : [{ name: 'RPG', value: 40 }, { name: 'Action', value: 30 }, { name: 'Simulation', value: 30 }];
  const donutTotal = genreData.reduce((s, d) => s + d.value, 0);

  // Top rated
  const topRated = [...gamesList]
    .sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
    .slice(0, 5);

  const fmtRating = (g) => {
    const r = parseFloat(g.rating || 0);
    return r > 10 ? (r / 10).toFixed(1) : r.toFixed(1);
  };

  return (
    <Box sx={{ pb: 8, bgcolor: '#0d1117', minHeight: '100vh', mx: -2, px: 2.5, pt: 2.5 }}>
      <Helmet><title>Dashboard – Arcade Stream Pro</title></Helmet>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography sx={{ color: '#e8eaf6', fontWeight: 800, fontSize: '1.3rem' }}>
            Dashboard Overview
          </Typography>
          <Typography sx={{ color: '#56637a', fontSize: '0.73rem', mt: 0.25 }}>
            Real-time gaming performance metrics and trends.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            icon={<CalendarTodayOutlined sx={{ fontSize: 12, color: '#69748c !important' }} />}
            label="Last 30 Days"
            size="small"
            sx={{ bgcolor: '#161b27', color: '#7986cb', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.73rem', height: 28 }}
          />
          <Button
            variant="contained" size="small"
            startIcon={<FileDownloadOutlined sx={{ fontSize: 14 }} />}
            onClick={() => { toast.info('Generating report…'); setTimeout(() => toast.success('Report ready!'), 1500); }}
            sx={{
              bgcolor: '#6c8fff', color: '#fff', fontWeight: 700,
              textTransform: 'none', borderRadius: 1.5, px: 2, py: 0.6,
              fontSize: '0.76rem', '&:hover': { bgcolor: '#5a7aee' },
              boxShadow: '0 2px 12px rgba(108,143,255,0.4)',
            }}
          >
            Export Report
          </Button>
        </Stack>
      </Box>

      {/* ── Stat Cards ────────────────────────────────────────────────────── */}
      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        {[
          { label: 'TOTAL GAMES',  value: totalGames.toLocaleString(), delta: '+2.5K', deltaPos: true,  sub: 'In library',          accent: '#6c8fff' },
          { label: 'AVG. RATING',  value: avgRating,                   delta: '+0.4K', deltaPos: true,  sub: '★★★★☆  Competitive',   accent: '#ffb700' },
          { label: 'AVG. PRICE',   value: avgPrice,                    delta: '-5X',   deltaPos: false, sub: 'Market competitive',  accent: '#00e5a0' },
          { label: 'TOTAL MONTHS', value: '12',                        delta: null,    deltaPos: true,  sub: 'Active seasons',      accent: '#00d4ff' },
          { label: 'PLATFORMS',    value: platformCount,               delta: null,    deltaPos: true,  sub: 'PC · Console · More', accent: '#a3c2ff' },
          { label: 'DEVELOPERS',   value: devCount,                    delta: '+8',    deltaPos: true,  sub: 'Active partners',     accent: '#ff4f6a' },
        ].map((card, i) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* ── Charts Row ────────────────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {/* Release Trends */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.92rem' }}>Release Trends</Typography>
                <Typography sx={{ color: '#56637a', fontSize: '0.7rem', mt: 0.25 }}>Decade growth and projection</Typography>
              </Box>
              <Chip
                icon={<FiberManualRecordOutlined sx={{ fontSize: 9, color: '#6c8fff !important' }} />}
                label="Releases"
                size="small"
                sx={{ bgcolor: 'rgba(108,143,255,0.1)', color: '#6c8fff', fontSize: '0.67rem', height: 22, border: '1px solid rgba(108,143,255,0.2)' }}
              />
            </Box>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={releaseData} barSize={38} margin={{ left: -20 }}>
                  <XAxis dataKey="year" tick={{ fill: '#56637a', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <RechartTooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                    {releaseData.map((_, i) => (
                      <Cell key={i} fill={i === releaseData.length - 1 ? '#6c8fff' : '#1e2d50'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Genre Distribution */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.92rem', mb: 0.4 }}>Genre Distribution</Typography>
            <Typography sx={{ color: '#56637a', fontSize: '0.7rem', mb: 1.5 }}>Market share by genre</Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress size={24} sx={{ color: '#6c8fff' }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Donut */}
                <Box sx={{ width: 148, height: 148, flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreData}
                        cx="50%" cy="50%"
                        innerRadius={46} outerRadius={65}
                        dataKey="value"
                        startAngle={90} endAngle={-270}
                        paddingAngle={3}
                        labelLine={false}
                        label={false}
                      >
                        {genreData.map((entry, i) => (
                          <Cell key={i} fill={GENRE_COLORS[entry.name] || '#7986cb'} />
                        ))}
                      </Pie>
                      {/* Center text rendered as customized */}
                      <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" fill="#e8eaf6" fontSize="18" fontWeight="800">{donutTotal}</text>
                      <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill="#56637a" fontSize="9" fontWeight="700" letterSpacing="1">TITLES</text>
                      <RechartTooltip
                        formatter={(v, n) => [`${v} titles`, n]}
                        contentStyle={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12 }}
                        itemStyle={{ color: '#e8eaf6' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                {/* Legend */}
                <Stack spacing={0.75} sx={{ flex: 1 }}>
                  {genreData.slice(0, 6).map((g, i) => {
                    const pct = donutTotal ? Math.round((g.value / donutTotal) * 100) : 0;
                    const color = GENRE_COLORS[g.name] || '#7986cb';
                    return (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
                          <Typography sx={{ color: '#8b96a8', fontSize: '0.7rem' }}>{g.name}</Typography>
                        </Box>
                        <Typography sx={{ color: color, fontWeight: 700, fontSize: '0.7rem' }}>{pct}%</Typography>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* ── Bottom Row ────────────────────────────────────────────────────── */}
      <Grid container spacing={2}>
        {/* Top Rated Games */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.92rem' }}>Top Rated Games</Typography>
              <Typography
                onClick={() => navigate('/games')}
                sx={{ color: '#6c8fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.73rem', '&:hover': { color: '#a3c2ff', textDecoration: 'underline' } }}
              >
                View All
              </Typography>
            </Box>

            {/* Table header */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1.5fr', px: 0.5, mb: 0.75 }}>
              {['TITLE', 'SCORE', 'DEVELOPER', 'STATUS'].map(h => (
                <Typography key={h} sx={{ color: '#3d4a60', fontSize: '0.58rem', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                  {h}
                </Typography>
              ))}
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 0.5 }} />

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress size={24} sx={{ color: '#6c8fff' }} />
              </Box>
            ) : (
              <Stack>
                {topRated.map((game, i) => {
                  const statusKey = STATUS_LABELS[i % STATUS_LABELS.length];
                  const dev = game.developer || game.publisher || 'FromSoftware';
                  return (
                    <React.Fragment key={game.appid}>
                      <Box
                        onClick={() => navigate('/games')}
                        sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1.5fr', alignItems: 'center', py: 1.25, px: 0.5, cursor: 'pointer', borderRadius: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}
                      >
                        {/* Title */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                          <Avatar variant="rounded" sx={{ width: 28, height: 28, bgcolor: '#0d1117', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.6rem', color: '#a3c2ff', fontWeight: 800, flexShrink: 0 }}>
                            {game.name ? game.name.substring(0, 2).toUpperCase() : '??'}
                          </Avatar>
                          <Typography sx={{ color: '#e8eaf6', fontWeight: 600, fontSize: '0.8rem' }} noWrap>
                            {game.name}
                          </Typography>
                        </Box>
                        {/* Score */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                          <StarOutlined sx={{ fontSize: 11, color: '#ffb700' }} />
                          <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.78rem' }}>{fmtRating(game)}</Typography>
                        </Box>
                        {/* Developer */}
                        <Typography sx={{ color: '#56637a', fontSize: '0.73rem' }} noWrap>{dev}</Typography>
                        {/* Status */}
                        <Chip
                          label={statusKey}
                          size="small"
                          sx={{ bgcolor: STATUS_BG[statusKey], color: STATUS_COLOR[statusKey], fontSize: '0.57rem', fontWeight: 800, height: 19, borderRadius: 1, letterSpacing: 0.4, width: 'fit-content' }}
                        />
                      </Box>
                      {i < topRated.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
                    </React.Fragment>
                  );
                })}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Typography sx={{ color: '#e8eaf6', fontWeight: 700, fontSize: '0.92rem', mb: 2 }}>Recent Activity</Typography>
            <Stack>
              {recentActivity.map((item, i) => (
                <React.Fragment key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.4 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.Icon sx={{ fontSize: 15, color: item.color }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ color: '#c5cae9', fontSize: '0.78rem', fontWeight: 500, lineHeight: 1.4 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: '#3d4a60', fontSize: '0.66rem', mt: 0.25 }}>{item.time}</Typography>
                    </Box>
                  </Box>
                  {i < recentActivity.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
                </React.Fragment>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <GameFormModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        editingGame={null}
        onSuccess={() => { toast.success('Game added!'); setAddOpen(false); }}
      />
    </Box>
  );
};

export default Dashboard;
