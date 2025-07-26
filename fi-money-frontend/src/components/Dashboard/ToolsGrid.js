import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Build,
  PlayArrow,
  Code,
  AccountBalance,
  TrendingUp,
  CreditCard,
} from '@mui/icons-material';

const ToolsGrid = ({ tools, onCallTool, loading, connectionStatus }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [arguments1, setArguments] = useState('{}');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [callLoading, setCallLoading] = useState(false);

  const getToolIcon = (toolName) => {
    if (toolName.includes('bank')) return <AccountBalance />;
    if (toolName.includes('credit')) return <CreditCard />;
    if (toolName.includes('stock') || toolName.includes('mf')) return <TrendingUp />;
    return <Build />;
  };

  const getToolColor = (toolName) => {
    if (toolName.includes('bank')) return 'primary';
    if (toolName.includes('credit')) return 'error';
    if (toolName.includes('stock') || toolName.includes('mf')) return 'success';
    return 'secondary';
  };

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setArguments('{}');
    setResult('');
    setError('');
  };

  const handleCallTool = async () => {
    if (!selectedTool) return;

    setCallLoading(true);
    setError('');
    setResult('');

    try {
      let parsedArgs = {};
      if (arguments1.trim()) {
        parsedArgs = JSON.parse(arguments1);
      }
      
      const response = await onCallTool(selectedTool.name, parsedArgs);
      setResult(JSON.stringify(response, null, 2));
    } catch (err) {
      setError(err.message || 'Tool call failed');
    } finally {
      setCallLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedTool(null);
    setResult('');
    setError('');
  };

  if (!connectionStatus) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Available Tools
          </Typography>
          <Alert severity="info">
            Connect to server to view available tools
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Build sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" component="h2">
              Available Tools ({tools.length})
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {tools.map((tool, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s',
                    }}
                    onClick={() => handleToolClick(tool)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {React.cloneElement(getToolIcon(tool.name), {
                          sx: { color: `${getToolColor(tool.name)}.main`, mr: 1 }
                        })}
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {tool.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {tool.description}
                      </Typography>
                      <Chip
                        size="small"
                        label="Execute"
                        color={getToolColor(tool.name)}
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Tool Execution Dialog */}
      <Dialog 
        open={Boolean(selectedTool)} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Code sx={{ mr: 1 }} />
            Execute Tool: {selectedTool?.name}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {selectedTool?.description}
          </Typography>

          <TextField
            fullWidth
            label="Arguments (JSON)"
            multiline
            rows={4}
            value={arguments1}
            onChange={(e) => setArguments(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder='{"key": "value"}'
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Result:
              </Typography>
              <Box 
                component="pre" 
                sx={{ 
                  backgroundColor: 'grey.100',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  maxHeight: 300,
                }}
              >
                {result}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCallTool}
            variant="contained"
            disabled={callLoading}
            startIcon={callLoading ? <CircularProgress size={20} /> : <PlayArrow />}
          >
            {callLoading ? 'Executing...' : 'Execute'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToolsGrid;