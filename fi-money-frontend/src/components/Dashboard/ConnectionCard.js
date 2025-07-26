import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Link as LinkIcon,
  LinkOff,
  CheckCircle,
  Error,
} from '@mui/icons-material';

const ConnectionCard = ({ 
  connectionStatus, 
  serverUrl, 
  onConnect, 
  onDisconnect, 
  loading 
}) => {
  const [url, setUrl] = useState('http://localhost:3000');
  const [error, setError] = useState('');

  const handleConnect = async () => {
    if (!url.trim()) {
      setError('Please enter a server URL');
      return;
    }
    
    setError('');
    try {
      await onConnect(url);
    } catch (err) {
      setError(err.message || 'Connection failed');
    }
  };

  const handleDisconnect = async () => {
    setError('');
    try {
      await onDisconnect();
    } catch (err) {
      setError(err.message || 'Disconnect failed');
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {connectionStatus ? (
            <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
          ) : (
            <Error sx={{ color: 'error.main', mr: 1 }} />
          )}
          <Typography variant="h6" component="h2">
            Server Connection
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Server URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={connectionStatus || loading}
            variant="outlined"
            placeholder="http://localhost:3000"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {!connectionStatus ? (
            <Button
              variant="contained"
              onClick={handleConnect}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <LinkIcon />}
              fullWidth
            >
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleDisconnect}
              disabled={loading}
              startIcon={<LinkOff />}
              fullWidth
              color="error"
            >
              Disconnect
            </Button>
          )}
        </Box>

        {connectionStatus && serverUrl && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Connected to:
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: 'monospace',
                backgroundColor: 'grey.100',
                p: 1,
                borderRadius: 1,
                wordBreak: 'break-all'
              }}>
                {serverUrl}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;