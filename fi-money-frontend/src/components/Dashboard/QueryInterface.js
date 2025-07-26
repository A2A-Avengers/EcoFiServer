import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  Send,
  Psychology,
  AutoAwesome,
} from '@mui/icons-material';

const QueryInterface = ({ onQuery, loading, connectionStatus }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError('');
    setResponse('');
    
    try {
      const result = await onQuery(query);
      setResponse(result);
    } catch (err) {
      setError(err.message || 'Query failed');
    }
  };

  const suggestedQueries = [
    "Show my net worth",
    "List my bank transactions",
    "Get my credit report",
    "Show EPF details",
    "List mutual fund transactions"
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Psychology sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" component="h2">
            AI Query Interface
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Ask Fi Money AI anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={!connectionStatus || loading}
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="What would you like to know about your finances?"
          />

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {suggestedQueries.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                variant="outlined"
                size="small"
                onClick={() => setQuery(suggestion)}
                sx={{ cursor: 'pointer' }}
                disabled={!connectionStatus || loading}
              />
            ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={!connectionStatus || !query.trim() || loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
            fullWidth
            sx={{ mb: 2 }}
          >
            {loading ? 'Processing...' : 'Ask Fi AI'}
          </Button>
        </form>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {response && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AutoAwesome sx={{ color: 'primary.main', mr: 1, fontSize: 18 }} />
              <Typography variant="subtitle2" color="primary">
                Fi AI Response
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {response}
            </Typography>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default QueryInterface;