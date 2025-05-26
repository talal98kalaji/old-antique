// src/components/sections/Hero/index.jsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import heroImage from '../../../assets/images/uivase.png';

const Hero = ({ onSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        bgcolor: 'background.light',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          px: { xs: 2, md: 5 },
          alignSelf: 'center',
          mb: { xs: 4, md: 0 }
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
            lineHeight: 1.2
          }}
        >
          Discover Timeless Treasures from Syria
        </Typography>
        
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 3,
            fontSize: { xs: '1rem', md: '1.1rem' }
          }}
        >
          Handcrafted antiques and vintage goods, shipped directly to Europe.
        </Typography>
        
        <Paper
          elevation={1}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: 400 },
            borderRadius: '24px'
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, py: 1 }}
            placeholder="Search for your treasure"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => onSearch(e.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          p: 2,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img
          src={heroImage}
          alt="Hero"
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: theme.shape.borderRadius
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
