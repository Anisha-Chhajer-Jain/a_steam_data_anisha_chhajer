import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Skeleton, Chip, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, LineChart, Line, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area
} from 'recharts';
import api from '../../services/api';
import { CHART_COLORS } from '../../utils/constants';

const ChartPaper = ({ title, children, height = 380 }) => (
  <Paper sx={{ p: 2.5, height, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2.5 }}>
    <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 2 }}>{title}</Typography>
    {children}
  </Paper>
);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, monthlyRes, categoriesRes, paymentsRes, topProductsRes] = await Promise.allSettled([
          api.get('/analytics/revenue/total'),
          api.get('/analytics/revenue/monthly'),
          api.get('/analytics/categories/top'),
          api.get('/analytics/payments/distribution'),
          api.get('/analytics/products/top-selling'),
        ]);

        const monthlyData = monthlyRes.status === 'fulfilled' ? monthlyRes.value.data?.data : null;
        const categoriesData = categoriesRes.status === 'fulfilled' ? categoriesRes.value.data?.data : null;
        const paymentsData = paymentsRes.status === 'fulfilled' ? paymentsRes.value.data?.data : null;
        const topProducts = topProductsRes.status === 'fulfilled' ? topProductsRes.value.data?.data : null;
        const totalRevenue = revenueRes.status === 'fulfilled' ? revenueRes.value.data?.data : null;

        setData({
          totalRevenue: totalRevenue?.total || totalRevenue || 0,
          monthlyRevenue: Array.isArray(monthlyData) ? monthlyData : [
            { month: 'Jan', revenue: 12500 }, { month: 'Feb', revenue: 15200 },
            { month: 'Mar', revenue: 18900 }, { month: 'Apr', revenue: 22100 },
            { month: 'May', revenue: 19800 }, { month: 'Jun', revenue: 25400 },
          ],
          categories: Array.isArray(categoriesData) ? categoriesData.map(c => ({
            name: c.name || c._id || c.category || 'Unknown',
            value: c.count || c.value || c.total || 0,
          })) : [
            { name: 'Action', value: 420 }, { name: 'RPG', value: 310 },
            { name: 'Strategy', value: 280 }, { name: 'Indie', value: 195 },
            { name: 'Adventure', value: 175 },
          ],
          payments: Array.isArray(paymentsData) ? paymentsData.map(p => ({
            name: p.name || p._id || p.method || 'Other',
            value: p.count || p.value || p.total || 0,
          })) : [
            { name: 'Credit Card', value: 45 }, { name: 'PayPal', value: 30 },
            { name: 'Steam Wallet', value: 20 }, { name: 'Other', value: 5 },
          ],
          topProducts: Array.isArray(topProducts) ? topProducts.slice(0, 8).map(p => ({
            name: p.name || p._id || 'Unknown',
            sales: p.sales || p.count || p.total || 0,
          })) : [
            { name: 'Elden Ring', sales: 2500 }, { name: 'Cyberpunk 2077', sales: 2100 },
            { name: 'Hades', sales: 1900 }, { name: 'Baldur\'s Gate 3', sales: 1800 },
          ],
        });
      } catch {
        setData({
          totalRevenue: 0, monthlyRevenue: [], categories: [],
          payments: [], topProducts: [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Analytics</Typography>
        <Grid container spacing={2.5}>
          {[1,2,3,4].map(i => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="rectangular" height={380} sx={{ borderRadius: 2.5, bgcolor: '#1e2637' }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Helmet>
        <title>Analytics – Arcade Stream</title>
        <meta name="description" content="Deep analytics for your game catalogue." />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" sx={{ color: 'primary.main' }}>INTELLIGENCE CENTER</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Analytics Dashboard</Typography>
      </Box>

      <Grid container spacing={2.5}>
        {/* Revenue Trends */}
        <Grid item xs={12} md={8}>
          <ChartPaper title="Revenue Trends">
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={data.monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c8fff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6c8fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
                <XAxis dataKey="month" stroke="#7986cb" fontSize={11} />
                <YAxis stroke="#7986cb" fontSize={11} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                <Area type="monotone" dataKey="revenue" stroke="#6c8fff" strokeWidth={3} fill="url(#colorRevenue)" dot={{ fill: '#6c8fff', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartPaper>
        </Grid>

        {/* Payment Distribution */}
        <Grid item xs={12} md={4}>
          <ChartPaper title="Payment Distribution">
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie data={data.payments} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  dataKey="value" stroke="none"
                  label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}>
                  {data.payments.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartPaper>
        </Grid>

        {/* Category Breakdown */}
        <Grid item xs={12} md={6}>
          <ChartPaper title="Category Breakdown">
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={data.categories}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
                <XAxis dataKey="name" stroke="#7986cb" fontSize={11} />
                <YAxis stroke="#7986cb" fontSize={11} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                <Bar dataKey="value" radius={[4,4,0,0]}>
                  {data.categories.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartPaper>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <ChartPaper title="Top Selling Products">
            <ResponsiveContainer width="100%" height="85%">
              <BarChart layout="vertical" data={data.topProducts} margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,143,255,0.1)" />
                <XAxis type="number" stroke="#7986cb" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#7986cb" fontSize={11} width={100} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e2637', border: '1px solid rgba(108,143,255,0.2)', borderRadius: 8, color: '#e8eaf6' }} />
                <Bar dataKey="sales" fill="#00e5a0" radius={[0,4,4,0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
