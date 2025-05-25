import React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

const Newsletter = () => {
  return (
        <Box sx={{ 
        width: '100%', 
        bgcolor: '#c62828', 
        py: { xs: 4, md: 6 },
        mt: 6
      }}>
        <Container>
          <Box sx={{ 
            textAlign: 'center',
            color: 'white',
            maxWidth: '800px',
            mx: 'auto'
          }}>
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
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '4px',
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
                variant="contained" 
                sx={{ 
                  bgcolor: '#333',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#000',
                  },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
  );
};

export default Newsletter;
