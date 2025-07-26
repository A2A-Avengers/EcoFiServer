import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  AccountBalance,
  Settings,
  Notifications,
  AccountCircle,
} from '@mui/icons-material';

const Navbar = ({ connectionStatus, serverUrl }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ 
      background: 'linear-gradient(135deg, #00C853 0%, #1B5E20 100%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <AccountBalance sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Fi Money MCP
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={connectionStatus ? 'Connected' : 'Disconnected'}
            color={connectionStatus ? 'success' : 'error'}
            variant="filled"
            size="small"
          />
          
          {serverUrl && (
            <Chip
              label={serverUrl}
              variant="outlined"
              size="small"
              sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)' }}
            />
          )}
          
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;