// src/components/sections/Newsletter/index.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';

const Newsletter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(true);
      return;
    }
    
    // Here you would call your API to subscribe the user
    console.log('Subscribing email:', email);
    setSuccess(true);
    setEmail('');
  };
  
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        py: { xs: 4, md: 6 },
        mt: 6
      }}
    >
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              mb: 2,
              color: 'white'
            }}
          >
            Stay Updated on New Treasures
          </Typography>
          
          <Typography
            variant="body1"
            sx={{ mb: 3 }}
          >
            Subscribe to our newsletter for exclusive previews and special offers.
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Your email address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                backgroundColor: 'white',
                borderRadius: theme.shape.borderRadius,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
            />
            
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: 'grey.900',
                color: 'white',
                px: 3,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'grey.800',
                },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Thank you for subscribing!
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Please enter a valid email address.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Newsletter;
