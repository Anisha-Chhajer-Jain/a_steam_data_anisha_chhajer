import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ title, value, icon: Icon, color = 'primary.light' }) => (
  <Card sx={{ height: '100%', bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, border: 1, borderColor: 'divider', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography color="textSecondary" variant="overline" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {Icon && <Icon sx={{ color, fontSize: 32 }} />}
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
        {value ?? '—'}
      </Typography>
    </CardContent>
  </Card>
);

export default StatCard;
