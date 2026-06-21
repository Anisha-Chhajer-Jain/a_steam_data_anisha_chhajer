import React from 'react';
import { Box, Typography, Grid, Paper, Stack, Button, IconButton, Select, MenuItem, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CloudDownloadOutlined, OpenInNewOutlined, FilterListOutlined } from '@mui/icons-material';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const lineData = [
  { name: 'JAN', aaa: 0, indie: 0 },
  { name: 'FEB', aaa: 0, indie: 0 },
  { name: 'MAR', aaa: 0, indie: 0 },
  { name: 'APR', aaa: 0, indie: 0 },
  { name: 'MAY', aaa: 0, indie: 0 },
  { name: 'JUN', aaa: 0, indie: 0 },
];

const pieData = [
  { name: 'RPG', value: 42, color: '#a3c2ff' },
  { name: 'Action', value: 28, color: '#00d4ff' },
  { name: 'Sim', value: 18, color: '#ffb700' },
  { name: 'Other', value: 12, color: '#56637a' },
];

const priceData = [
  { price: '$0', density: 10 },
  { price: '$20', density: 15 },
  { price: '$40', density: 30, special: true },
  { price: '$60', density: 45 },
  { price: '$80', density: 25 },
  { price: '$100', density: 15 },
  { price: '$120', density: 10 },
];

const devData = [
  { id: 'NS', name: 'Nebula Studios', loc: 'Montreal, CA', genre: 'Action RPG', share: 12.4, growth: '+8.2%' },
  { id: 'CF', name: 'CyberFlow Int.', loc: 'Berlin, DE', genre: 'Simulation', share: 9.1, growth: '+4.2%' },
  { id: 'PX', name: 'Pixel Vault', loc: 'Austin, US', genre: 'Roguelike', share: 5.8, growth: '+2.1%' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ bgcolor: 'rgba(22, 27, 39, 0.9)', p: 1, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 1 }}>
        <Typography sx={{ color: '#e8eaf6', fontSize: '0.7rem' }}>{`${payload[0].value}%`}</Typography>
      </Box>
    );
  }
  return null;
};

const GenreAnalytics = () => {
  return (
    <Box sx={{ pb: 8, bgcolor: '#0d1117', minHeight: '100vh', mx: -2, px: 2.5, pt: 2.5 }}>
      <Helmet><title>Analytics Command – Arcade Stream Pro</title></Helmet>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#e8eaf6', fontWeight: 800, fontSize: '1.2rem' }}>
            Analytics Command
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography sx={{ color: '#00d4ff', fontSize: '0.65rem', fontWeight: 800, letterSpacing: 1 }}>
              REAL-TIME DATA FEED •
            </Typography>
            <Typography sx={{ color: '#90a4ae', fontSize: '0.65rem', fontWeight: 700, letterSpacing: 1 }}>
              LAST SYNC: 2m AGO
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', bgcolor: '#161b27', borderRadius: 1.5, p: 0.5, border: '1px solid rgba(255,255,255,0.05)' }}>
            {['24H', '7D', '30D', 'ALL'].map((label) => (
              <Button
                key={label}
                sx={{
                  minWidth: 40, px: 1.5, py: 0.5,
                  color: label === '24H' ? '#e8eaf6' : '#56637a',
                  bgcolor: label === '24H' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  fontSize: '0.7rem', fontWeight: 700,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#e8eaf6' }
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Button
            variant="contained"
            startIcon={<CloudDownloadOutlined sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: '#a3c2ff', color: '#0d1117', fontWeight: 700,
              textTransform: 'none', borderRadius: 1.5, px: 2,
              fontSize: '0.75rem', '&:hover': { bgcolor: '#8eb3ff' }
            }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Main Grid */}
      <Grid container spacing={2}>
        {/* Release Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: 320, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography sx={{ color: '#e8eaf6', fontSize: '0.85rem', fontWeight: 700 }}>Release Trends</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#a3c2ff' }} />
                  <Typography sx={{ color: '#e8eaf6', fontSize: '0.7rem', fontWeight: 600 }}>AAA</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00d4ff' }} />
                  <Typography sx={{ color: '#e8eaf6', fontSize: '0.7rem', fontWeight: 600 }}>Indie</Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#56637a" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis hide domain={[-10, 10]} />
                  {/* Mock flat lines to match screenshot */}
                  <Line type="stepAfter" dataKey="aaa" stroke="#a3c2ff" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="stepAfter" dataKey="indie" stroke="#00d4ff" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Genre Market Share */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: 320, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: '#e8eaf6', fontSize: '0.85rem', fontWeight: 700, mb: 2 }}>Genre Market Share</Typography>
            
            <Box sx={{ position: 'relative', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={55} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                <Typography sx={{ color: '#e8eaf6', fontSize: '0.9rem', fontWeight: 800 }}>14.2k</Typography>
                <Typography sx={{ color: '#90a4ae', fontSize: '0.6rem', fontWeight: 700, letterSpacing: 0.5 }}>TOTAL UNITS</Typography>
              </Box>
            </Box>

            <Grid container spacing={1} sx={{ mt: 'auto' }}>
              {pieData.map((item) => (
                <Grid item xs={6} key={item.name}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: item.color }} />
                    <Typography sx={{ color: '#e8eaf6', fontSize: '0.75rem', fontWeight: 600 }}>
                      {item.name} <span style={{ color: '#56637a', fontWeight: 500 }}>({item.value}%)</span>
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Platform Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: 180 }}>
            <Typography sx={{ color: '#e8eaf6', fontSize: '0.85rem', fontWeight: 700, mb: 3 }}>Platform Distribution</Typography>
            <Stack spacing={2}>
              {[
                { name: 'Windows', val: 82, color: '#a3c2ff' },
                { name: 'macOS', val: 11, color: '#00d4ff' },
                { name: 'Linux', val: 7, color: '#ffb700' }
              ].map(p => (
                <Box key={p.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ color: '#e8eaf6', fontSize: '0.75rem', fontWeight: 600 }}>{p.name}</Typography>
                    <Typography sx={{ color: p.color, fontSize: '0.75rem', fontWeight: 800 }}>{p.val}%</Typography>
                  </Box>
                  <Box sx={{ height: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                    <Box sx={{ width: `${p.val}%`, height: '100%', bgcolor: p.color, borderRadius: 2 }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Price Density */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)', height: 180, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#e8eaf6', fontSize: '0.85rem', fontWeight: 700 }}>Price Density</Typography>
              <Typography sx={{ color: '#90a4ae', fontSize: '0.7rem', fontWeight: 600 }}>USD ($0 - $120)</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData} barCategoryGap={2}>
                  <XAxis dataKey="price" stroke="#56637a" fontSize={10} tickLine={false} axisLine={false} dy={5} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="density">
                    {priceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.special ? '#5c7399' : '#3d4a60'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {/* Sweet spot overlay label */}
              <Box sx={{ position: 'absolute', top: '20%', left: '46%', transform: 'translateX(-50%)', bgcolor: 'rgba(0,0,0,0.6)', px: 0.5, py: 0.2, borderRadius: 0.5 }}>
                <Typography sx={{ color: '#e8eaf6', fontSize: '0.45rem', fontWeight: 800, letterSpacing: 1 }}>SWEET</Typography>
                <Typography sx={{ color: '#e8eaf6', fontSize: '0.45rem', fontWeight: 800, letterSpacing: 1 }}>SPOT</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Developer Analytics Ranking */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2.5, bgcolor: '#161b27', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography sx={{ color: '#e8eaf6', fontSize: '0.9rem', fontWeight: 700 }}>Developer Analytics Ranking</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Select
                  value="monthly"
                  size="small"
                  sx={{
                    bgcolor: '#0d1117', color: '#e8eaf6', fontSize: '0.75rem', height: 32,
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                    '.MuiSvgIcon-root': { color: '#56637a' }
                  }}
                >
                  <MenuItem value="monthly" sx={{ fontSize: '0.75rem' }}>Monthly Growth</MenuItem>
                  <MenuItem value="yearly" sx={{ fontSize: '0.75rem' }}>Yearly Growth</MenuItem>
                </Select>
                <IconButton size="small" sx={{ color: '#56637a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 1 }}>
                  <FilterListOutlined fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1fr 1fr 0.5fr', mb: 2, px: 1 }}>
              {['DEVELOPER', 'PRIMARY GENRE', 'MARKET SHARE', 'GROWTH', 'PERFORMANCE'].map((h, i) => (
                <Typography key={h} sx={{ color: '#90a4ae', fontSize: '0.65rem', fontWeight: 700, letterSpacing: 1, textAlign: i === 4 ? 'right' : 'left' }}>
                  {h}
                </Typography>
              ))}
            </Box>

            <Stack spacing={1}>
              {devData.map((dev) => (
                <Box key={dev.id} sx={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1fr 1fr 0.5fr', alignItems: 'center', px: 1, py: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1.5 } }}>
                  {/* Developer Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3c2ff', fontWeight: 800, fontSize: '0.75rem' }}>
                      {dev.id}
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#e8eaf6', fontSize: '0.8rem', fontWeight: 600 }}>{dev.name}</Typography>
                      <Typography sx={{ color: '#56637a', fontSize: '0.65rem', fontWeight: 500 }}>{dev.loc}</Typography>
                    </Box>
                  </Box>

                  {/* Primary Genre */}
                  <Typography sx={{ color: '#e8eaf6', fontSize: '0.75rem' }}>{dev.genre}</Typography>

                  {/* Market Share */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 24, height: 4, bgcolor: '#5c7399', borderRadius: 2 }} />
                    <Typography sx={{ color: '#e8eaf6', fontSize: '0.75rem', fontWeight: 600 }}>{dev.share}%</Typography>
                  </Box>

                  {/* Growth */}
                  <Typography sx={{ color: '#00e5a0', fontSize: '0.75rem', fontWeight: 800 }}>{dev.growth}</Typography>

                  {/* Performance Action */}
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton size="small" sx={{ color: '#56637a', '&:hover': { color: '#e8eaf6' } }}>
                      <OpenInNewOutlined sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Typography sx={{ color: '#56637a', fontSize: '0.7rem', fontWeight: 600 }}>
          © 2024 Arcade Stream Pro • v4.2.1-stable
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['System Status', 'API Documentation', 'Help Desk'].map(link => (
            <Typography key={link} sx={{ color: '#e8eaf6', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              {link}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GenreAnalytics;
