import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  AccountBalance,
  Build,
  Storage,
  CheckCircle,
} from '@mui/icons-material';

const StatsCards = ({ stats }) => {
  const statsData = [
    {
      title: 'Connection Status',
      value: stats.connected ? 'Connected' : 'Disconnected',
      icon: <CheckCircle />,
      color: stats.connected ? 'success' : 'error',
    },
    {
      title: 'Available Tools',
      value: stats.toolCount || 0,
      icon: <Build />,
      color: 'primary',
    },
    {
      title: 'Resources',
      value: stats.resourceCount || 0,
      icon: <Storage />,
      color: 'secondary',
    },
    {
      title: 'Server URL',
      value: stats.serverUrl ? 'Active' : 'None',
      icon: <AccountBalance />,
      color: stats.serverUrl ? 'success' : 'warning',
    },
  ];

  return (
    <Grid container spacing={3}>
      {statsData.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {React.cloneElement(stat.icon, {
                  sx: { color: `${stat.color}.main`, mr: 1 }
                })}
                <Typography variant="h6" component="div">
                  {stat.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
              <Chip
                size="small"
                label={stat.color}
                color={stat.color}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;